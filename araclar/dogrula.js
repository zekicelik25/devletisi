// araclar/dogrula.js
// Veri tabanının bütünlüğünü denetler: kimlikler tekrar ediyor mu, başvurulan kimlikler sözlükte
// ve üst katmanlarda var mı, tarihler doğru biçimde mi, şart türleri ve koşulları geçerli mi.
// Kullanım: node araclar/dogrula.js   (hata varsa çıkış kodu 1 olur)
const { yukle, pozisyonuCoz, KOSUL_ALANI } = require('./ortak');

const veri = yukle();
const { s } = veri;
const hatalar = [];
const uyarilar = [];
const hata = (yer, mesaj) => hatalar.push(`${yer}: ${mesaj}`);
const uyar = (yer, mesaj) => uyarilar.push(`${yer}: ${mesaj}`);

const kume = liste => new Set((liste || []).map(x => x.id));
const IL = new Set(veri.iller.map(x => x.plaka));
const KURUM_TUR = kume(s.KURUM_TURLERI);
const STATU = kume(s.STATULER);
const UNVAN = kume(s.UNVANLAR);
const EGITIM = kume(s.EGITIM_DUZEYLERI);
const YONTEM = kume(s.ALIM_YONTEMLERI);
const KAYNAK = kume(s.KAYNAKLAR);
const SINAV = kume(s.SINAVLAR);
const SART_TUR = kume(s.SART_TURLERI);
const KANAL = kume(s.BASVURU_KANALLARI);
const KONTENJAN = kume(s.KONTENJAN_TURLERI);
const TARIH = /^\d{4}-\d{2}-\d{2}$/;

function tekrarYok(liste, ad) {
    const gorulen = new Set();
    liste.forEach(x => {
        if (!x.id) hata(ad, 'kimliği (id) olmayan kayıt');
        else if (gorulen.has(x.id)) hata(ad, `"${x.id}" kimliği iki kez kullanılmış`);
        gorulen.add(x.id);
    });
}

function ilDenetle(yer, il) {
    if (il == null || il === 'TR') return;
    (Array.isArray(il) ? il : [il]).forEach(p => { if (!IL.has(String(p))) hata(yer, `bilinmeyen il "${p}"`); });
}

function alanDenetle(yer, nesne) {
    if (!nesne) return;
    if (nesne.unvan != null && !UNVAN.has(nesne.unvan)) hata(yer, `bilinmeyen ünvan "${nesne.unvan}"`);
    if (nesne.statu != null && !STATU.has(nesne.statu)) hata(yer, `bilinmeyen statü "${nesne.statu}"`);
    if (nesne.egitim != null && !EGITIM.has(nesne.egitim)) hata(yer, `bilinmeyen eğitim düzeyi "${nesne.egitim}"`);
    if (nesne.yontem != null && !YONTEM.has(nesne.yontem)) hata(yer, `bilinmeyen alım yöntemi "${nesne.yontem}"`);
    ilDenetle(yer, nesne.il);
}

function sartlariDenetle(yer, sartlar) {
    if (sartlar == null) return;
    if (!Array.isArray(sartlar)) return hata(yer, 'şartlar bir liste olmalı');
    sartlar.forEach((x, i) => {
        const y = `${yer} şart ${i + 1}`;
        if (!SART_TUR.has(x.tur)) hata(y, `bilinmeyen şart türü "${x.tur}"`);
        if (!x.metin && !x.ad) hata(y, 'şartın metni yok');
        if (x.tur === 'sinav' && !SINAV.has(x.sinav)) hata(y, `bilinmeyen sınav "${x.sinav}"`);
        if (x.tur === 'egitim' && !Array.isArray(x.duzey)) hata(y, 'eğitim şartında duzey bir liste olmalı');
        if (x.tur === 'egitim' && Array.isArray(x.duzey)) x.duzey.forEach(d => { if (!EGITIM.has(d)) hata(y, `bilinmeyen eğitim düzeyi "${d}"`); });
        if (x.tur === 'yas' && typeof x.enFazla !== 'number' && x.enFazla != null) hata(y, 'enFazla sayı olmalı');
        if (x.dogumEnErken && !TARIH.test(x.dogumEnErken)) hata(y, 'dogumEnErken YYYY-AA-GG olmalı');
        if (x.kosul) Object.entries(x.kosul).forEach(([k, v]) => {
            if (!KOSUL_ALANI[k]) hata(y, `bilinmeyen koşul "${k}" (geçerli: ${Object.keys(KOSUL_ALANI).join(', ')})`);
            if (!Array.isArray(v)) hata(y, `"${k}" koşulu bir liste olmalı`);
        });
    });
}

// 1. katman: sözlük
['KURUM_TURLERI', 'STATULER', 'UNVANLAR', 'EGITIM_DUZEYLERI', 'ALIM_YONTEMLERI', 'KAYNAKLAR', 'SART_TURLERI'].forEach(a => tekrarYok(s[a], a));
if (veri.iller.length !== 81) hata('iller', `81 il olmalı, ${veri.iller.length} var`);

// 2. katman: kalıplar
tekrarYok(veri.kaliplar, 'kalıplar');
veri.kaliplar.forEach(k => {
    const yer = `kalıp ${k.id}`;
    alanDenetle(yer, k.varsayilan);
    sartlariDenetle(yer, k.sartlar);
    ((k.basvuru && k.basvuru.kanal) || []).forEach(c => { if (!KANAL.has(c)) hata(yer, `bilinmeyen başvuru kanalı "${c}"`); });
});

// 3. katman: kurumlar
tekrarYok(veri.kurumlar, 'kurumlar');
veri.kurumlar.forEach(k => {
    if (!KURUM_TUR.has(k.tur)) hata(`kurum ${k.id}`, `bilinmeyen kurum türü "${k.tur}"`);
    if (!IL.has(k.il)) hata(`kurum ${k.id}`, `bilinmeyen il "${k.il}"`);
});

// 4. katman: ilanlar ve pozisyonlar
tekrarYok(veri.ilanlar, 'ilanlar');
const pozNo = new Map();
let enBuyuk = 0;
veri.ilanlar.forEach(ilan => {
    const yer = `ilan ${ilan.id}`;
    if (!veri.kurumlar.some(k => k.id === ilan.kurum)) hata(yer, `kurum "${ilan.kurum}" kurumlar katmanında yok`);
    if (ilan.kalip && !veri.kaliplar.some(k => k.id === ilan.kalip)) hata(yer, `kalıp "${ilan.kalip}" kalıplar katmanında yok`);
    if (ilan.kaynak != null && !KAYNAK.has(ilan.kaynak)) hata(yer, `bilinmeyen kaynak "${ilan.kaynak}"`);
    ['yayinTarihi', 'resmiGazete'].forEach(a => { if (ilan[a] && !TARIH.test(ilan[a])) hata(yer, `${a} YYYY-AA-GG olmalı`); });
    const b = ilan.basvuru || {};
    ['baslangic', 'bitis', 'gecBasvuru'].forEach(a => { if (b[a] && !TARIH.test(b[a])) hata(yer, `basvuru.${a} YYYY-AA-GG olmalı`); });
    if (b.baslangic && b.bitis && b.baslangic > b.bitis) hata(yer, 'başvuru başlangıcı bitişten sonra');
    if (!b.bitis) uyar(yer, 'son başvuru tarihi yok');
    (b.kanal || []).forEach(c => { if (!KANAL.has(c)) hata(yer, `bilinmeyen başvuru kanalı "${c}"`); });
    alanDenetle(yer, ilan.varsayilan);
    sartlariDenetle(yer, ilan.ortakSartlar);
    if (!Array.isArray(ilan.pozisyonlar) || !ilan.pozisyonlar.length) hata(yer, 'pozisyonu yok');

    (ilan.pozisyonlar || []).forEach(poz => {
        const py = `pozisyon ${poz.id} (${ilan.id})`;
        if (!Number.isInteger(poz.id)) return hata(yer, 'tam sayı olmayan pozisyon numarası');
        if (pozNo.has(poz.id)) hata(py, `numara ${pozNo.get(poz.id)} ilanında da kullanılmış`);
        pozNo.set(poz.id, ilan.id);
        enBuyuk = Math.max(enBuyuk, poz.id);
        alanDenetle(py, poz);
        if (poz.kontenjan && !KONTENJAN.has(poz.kontenjan)) hata(py, `bilinmeyen kontenjan "${poz.kontenjan}"`);
        if (poz.cinsiyet && !['erkek', 'kadin'].includes(poz.cinsiyet)) hata(py, 'cinsiyet "erkek" ya da "kadin" olmalı');
        if (poz.adet != null && !(Number.isInteger(poz.adet) && poz.adet > 0)) hata(py, 'adet pozitif tam sayı olmalı');
        sartlariDenetle(py, poz.sartlar);
        const c = pozisyonuCoz(veri, ilan, poz);
        if (!c.unvan) hata(py, 'ünvan yok (ne pozisyonda ne ilanda ne kalıpta)');
        if (!c.statu) uyar(py, 'çalışma statüsü yok');
        if (!c.sartlar.length) uyar(py, 'hiç şartı yok');
    });
});

// Sıra: yeni pozisyonlar listenin sonuna eklenir; numaralar artarak gitmeli.
const sira = veri.ilanlar.flatMap(i => (i.pozisyonlar || []).map(p => p.id));
for (let i = 1; i < sira.length; i++) {
    if (sira[i] <= sira[i - 1]) { uyar('sıra', `pozisyon ${sira[i]}, ${sira[i - 1]} numarasından sonra geliyor`); break; }
}

const kadro = veri.ilanlar.reduce((t, i) => t + (i.pozisyonlar || []).reduce((u, p) => u + (p.adet || 0), 0), 0);
console.log(`Katmanlar: ${veri.iller.length} il, ${s.UNVANLAR.length} ünvan, ${veri.kaliplar.length} kalıp, ${veri.kurumlar.length} kurum, ${veri.ilanlar.length} ilan, ${pozNo.size} pozisyon, ${kadro} kadro.`);
console.log(`Son kullanılan pozisyon numarası: ${enBuyuk}. Yeni pozisyon ${enBuyuk + 1} ile başlar.`);
if (uyarilar.length) {
    console.log(`\n${uyarilar.length} uyarı (eksik bilgi):`);
    uyarilar.forEach(u => console.log('  - ' + u));
}
if (hatalar.length) {
    console.log(`\n${hatalar.length} HATA:`);
    hatalar.forEach(h => console.log('  - ' + h));
    process.exitCode = 1;
} else {
    console.log('\nHata yok.');
}
