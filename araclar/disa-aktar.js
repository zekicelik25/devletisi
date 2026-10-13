// araclar/disa-aktar.js
// Veri tabanını Excel'de açılabilen tablolara (CSV) çevirir; disari/ klasörüne yazar.
// Pozisyon ve şart tablolarında kalıptan ve ilandan gelen bilgiler birleştirilmiş hâldedir.
// Kullanım: node araclar/disa-aktar.js
const fs = require('fs');
const path = require('path');
const { KOK, yukle, pozisyonuCoz } = require('./ortak');

const veri = yukle();
const hedef = path.join(KOK, 'disari');
fs.mkdirSync(hedef, { recursive: true });

function hucre(v) {
    if (v == null) return '';
    const m = Array.isArray(v) ? v.join(' | ') : typeof v === 'object' ? JSON.stringify(v) : String(v);
    return /[";\n]/.test(m) ? `"${m.replace(/"/g, '""')}"` : m;
}

// Türkçe Excel için ayraç noktalı virgül; BOM, Türkçe karakterlerin doğru görünmesini sağlar.
function yaz(ad, basliklar, satirlar) {
    const metin = [basliklar, ...satirlar.map(s => basliklar.map(b => s[b]))].map(r => r.map(hucre).join(';')).join('\r\n');
    fs.writeFileSync(path.join(hedef, ad), '﻿' + metin + '\r\n');
    console.log(`${ad}: ${satirlar.length} satır`);
}

yaz('kaliplar.csv', ['id', 'ad', 'dayanak', 'statu', 'yontem', 'egitim', 'sart_sayisi'],
    veri.kaliplar.map(k => ({ ...k, ...(k.varsayilan || {}), sart_sayisi: (k.sartlar || []).length })));

yaz('kurumlar.csv', ['id', 'ad', 'tur', 'il', 'bagli', 'web'], veri.kurumlar);

yaz('ilanlar.csv',
    ['id', 'kurum', 'kalip', 'baslik', 'resmiGazete', 'yayinTarihi', 'baslangic', 'bitis', 'bitisTahmini', 'kanal', 'ucret_tl', 'tekBasvuru', 'cagriKati', 'sinavTarihi', 'sinavYeri', 'kaynak', 'link', 'pozisyon_sayisi', 'kadro'],
    veri.ilanlar.map(i => {
        const p = pozisyonuCoz(veri, i, (i.pozisyonlar || [])[0] || {});
        return {
            ...i, ...p.basvuru,
            ucret_tl: p.basvuru.ucret ? p.basvuru.ucret.tutar : null,
            cagriKati: p.secme.cagriKati, sinavTarihi: p.secme.sinavTarihi, sinavYeri: p.secme.sinavYeri,
            pozisyon_sayisi: (i.pozisyonlar || []).length,
            kadro: (i.pozisyonlar || []).reduce((t, x) => t + (x.adet || 0), 0)
        };
    }));

const pozlar = [];
const sartlar = [];
veri.ilanlar.forEach(i => (i.pozisyonlar || []).forEach(poz => {
    const p = pozisyonuCoz(veri, i, poz);
    pozlar.push({ ...p, ilan: i.id, kurum: i.kurum, ucret_kati: p.ucret ? p.ucret.tavanKati : null, sart_sayisi: p.sartlar.length });
    p.sartlar.forEach((x, n) => sartlar.push({
        pozisyon: p.id, sira: n + 1, katman: x.katman, tur: x.tur, metin: x.metin || x.ad,
        sinav: x.sinav, puanTurleri: x.puanTurleri, enAz: x.enAz, yillar: x.yillar, enFazla: x.enFazla, yil: x.yil,
        egitimDuzeyi: x.tur === 'egitim' ? x.duzey : null, bolumler: x.bolumler, maddeler: x.maddeler, zorunlu: x.zorunlu === false ? 'hayır' : ''
    }));
}));

yaz('pozisyonlar.csv',
    ['id', 'ilan', 'kurum', 'kod', 'unvan', 'ilandakiAd', 'kidem', 'birim', 'alan', 'adet', 'statu', 'egitim', 'yontem', 'il', 'cinsiyet', 'kontenjan', 'derece', 'hizmetSinifi', 'ucret_kati', 'cagriSayisi', 'sart_sayisi'],
    pozlar);
yaz('sartlar.csv',
    ['pozisyon', 'sira', 'katman', 'tur', 'metin', 'sinav', 'puanTurleri', 'enAz', 'yillar', 'enFazla', 'yil', 'egitimDuzeyi', 'bolumler', 'maddeler', 'zorunlu'],
    sartlar);
