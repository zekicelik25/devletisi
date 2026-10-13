// app.js
// Tüm sayfaların davranışı. Hangi sayfada olduğumuz <body data-page="..."> ile belirlenir.
// Veri veri/ klasöründeki katmanlardan gelir: 1 sözlük (ILLER, SINIFLANDIRMA), 2 kalıplar (KALIPLAR),
// 3 kurumlar (KURUMLAR), 4 ilanlar (ILANLAR). Bu dosya 5. katmanı, yani türetilen bilgileri üretir:
// kalıptan miras alınan alanlar, birleştirilmiş şartlar, etiketler ve başvuru durumu.
(function () {
    const S = window.SINIFLANDIRMA;
    const collator = new Intl.Collator('tr');
    const ALARM_KEY = 'kamuilan.alarmlar.v2';
    const ESKI_ALARM_KEY = 'kamuilan.alarmlar.v1';
    const TASLAK_KEY = 'kamuilan.alarm-taslak';
    const ARAMA_KEY = 'kamuilan.arama';
    const ZIL = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';
    const KONUM = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>';

    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Büyük/küçük harf ve Türkçe karakter farkını yok sayar: "Öğretim" ile "ogretim" eşleşir.
    function norm(s) {
        return String(s).toLocaleLowerCase('tr').replace(/ı/g, 'i')
            .normalize('NFD').replace(/\p{M}/gu, '')
            .replace(/\s+/g, ' ').trim();
    }

    function sozluk(liste) {
        return new Map(liste.map(x => [x.id, x]));
    }

    function groupBy(list, key) {
        const map = new Map();
        list.forEach(item => {
            const k = item[key];
            if (!map.has(k)) map.set(k, []);
            map.get(k).push(item);
        });
        return map;
    }

    // Değerlere göre sayım: Map(değer → adet). Boş değerler sayılmaz.
    function say(list, key) {
        const map = new Map();
        list.forEach(item => {
            const k = item[key];
            if (k != null) map.set(k, (map.get(k) || 0) + 1);
        });
        return map;
    }

    const KURUM_GRUP = sozluk(S.KURUM_GRUPLARI);
    const KURUM_TUR = sozluk(S.KURUM_TURLERI);
    const STATU_GRUP = sozluk(S.STATU_GRUPLARI);
    const STATU = sozluk(S.STATULER);
    const MESLEK = sozluk(S.MESLEK_GRUPLARI);
    const UNVAN = sozluk(S.UNVANLAR);
    const EGITIM = sozluk(S.EGITIM_DUZEYLERI);
    const YONTEM = sozluk(S.ALIM_YONTEMLERI);
    const KAYNAK = sozluk(S.KAYNAKLAR);
    const SINAV = sozluk(S.SINAVLAR || []);
    const SART_TUR = sozluk(S.SART_TURLERI || []);
    const KANAL = sozluk(S.BASVURU_KANALLARI || []);
    const KONTENJAN = sozluk(S.KONTENJAN_TURLERI || []);
    const IL = new Map((window.ILLER || []).map(x => [x.plaka, x.il]));
    const YURT_GENELI = 'TR';
    const YURT_GENELI_AD = 'Yurt geneli';

    function veriUyarisi(...parca) {
        console.warn('veri:', ...parca);
    }

    // ---------- Veri: kalıp → kurum → ilan → pozisyon ----------
    // Sayfalar düz bir pozisyon listesiyle çalışır; her pozisyon kurum, ilan ve kalıp bilgisini taşır.
    const kaliplar = sozluk(window.KALIPLAR || []);
    const kurumlar = sozluk(window.KURUMLAR || []);
    const pozisyonlar = [];
    const BUGUN = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();

    function gunFarki(a, b) {
        return Math.round((new Date(`${b}T00:00:00`) - new Date(`${a}T00:00:00`)) / 86400000);
    }

    // Üst düzey nesneyi alt düzeyle birleştirir; alt düzeyde yazılan (null olmayan) değer üsttekini ezer.
    function birlestir(...katmanlar) {
        const sonuc = {};
        katmanlar.forEach(k => {
            if (!k) return;
            Object.entries(k).forEach(([a, v]) => { if (v != null) sonuc[a] = v; });
        });
        return sonuc;
    }

    // Şartın "kosul" alanı pozisyona uyuyor mu? Her anahtar bir değer listesidir; hepsi tutmalı.
    const KOSUL_ALANI = {
        ucretKati: p => (p.ucret ? p.ucret.tavanKati : null),
        unvan: p => p.unvanId,
        alan: p => p.alan,
        cinsiyet: p => p.cinsiyet,
        kontenjan: p => p.kontenjan,
        kod: p => p.kod
    };

    function kosulUyar(kosul, p, yer) {
        if (!kosul) return true;
        return Object.entries(kosul).every(([anahtar, degerler]) => {
            const oku = KOSUL_ALANI[anahtar];
            if (!oku) {
                veriUyarisi('bilinmeyen şart koşulu:', anahtar, yer);
                return false;
            }
            return Array.isArray(degerler) && degerler.includes(oku(p));
        });
    }

    // Şartlar üç düzeyden gelir: kalıp → ilan (ortakSartlar) → pozisyon. Alt düzeyde "yerineGecer"
    // işaretli bir şart, üst düzeydeki aynı türden şartları düşürür.
    function sartlariBirlestir(kalip, ilan, poz, p) {
        const katmanlar = [
            ['kalip', kalip ? kalip.sartlar : null],
            ['ilan', ilan.ortakSartlar],
            ['pozisyon', poz.sartlar]
        ];
        let sonuc = [];
        katmanlar.forEach(([katman, liste]) => {
            const uygun = (Array.isArray(liste) ? liste : []).filter(sart => {
                if (!sart || !SART_TUR.has(sart.tur)) {
                    veriUyarisi('bilinmeyen şart türü:', sart && sart.tur, `(pozisyon ${p.id})`);
                    return false;
                }
                return kosulUyar(sart.kosul, p, `(pozisyon ${p.id})`);
            });
            const ezilen = new Set(uygun.filter(x => x.yerineGecer).map(x => x.tur));
            sonuc = sonuc.filter(x => !ezilen.has(x.tur)).concat(uygun.map(x => ({ ...x, katman })));
        });
        return sonuc;
    }

    // Başvuru durumu bugünün tarihine göre hesaplanır.
    function durumBul(basvuru) {
        if (basvuru.baslangic && basvuru.baslangic > BUGUN) return 'yakinda';
        if (!basvuru.bitis) return 'bilinmiyor';
        const kalan = gunFarki(BUGUN, basvuru.bitis);
        if (kalan < 0) return 'bitti';
        if (kalan <= 3) return 'son-gunler';
        return 'acik';
    }

    // Kartlarda gösterilen kısa etiketler: şartlardan ve ilan bilgilerinden türetilir.
    function etiketleriBul(p) {
        const e = [];
        const kpss = p.sartlar.filter(x => x.tur === 'sinav' && x.sinav === 'kpss');
        if (!kpss.length) e.push({ metin: 'KPSS şartı yok', tur: 'olumlu' });
        else if (kpss.every(x => x.zorunlu === false)) e.push({ metin: 'KPSS\'siz de başvurulabilir', tur: 'olumlu' });
        const yas = p.sartlar.filter(x => x.tur === 'yas' && typeof x.enFazla === 'number' && !x.istisna);
        if (yas.length) e.push({ metin: `Yaş sınırı ${Math.min(...yas.map(x => x.enFazla))}`, tur: '' });
        if (p.cinsiyet) e.push({ metin: p.cinsiyet === 'kadin' ? 'Kadın kadrosu' : 'Erkek kadrosu', tur: '' });
        if (p.kontenjan && p.kontenjan !== 'genel') e.push({ metin: KONTENJAN.has(p.kontenjan) ? KONTENJAN.get(p.kontenjan).ad : p.kontenjan, tur: '' });
        if (p.basvuru.ucret) e.push({ metin: 'Ücretli başvuru', tur: '' });
        if (p.basvuru.tekBasvuru) e.push({ metin: 'Tek başvuru hakkı', tur: '' });
        return e;
    }

    (function duzlestir() {
        const kullanilan = new Set();
        (window.ILANLAR || []).forEach(ilan => {
            const kurum = kurumlar.get(ilan.kurum);
            if (!kurum) {
                veriUyarisi('kurum bulunamadı:', ilan.kurum, `(ilan ${ilan.id})`);
                return;
            }
            const tur = KURUM_TUR.get(kurum.tur);
            if (!tur) veriUyarisi('bilinmeyen kurum türü:', kurum.tur, `(kurum ${kurum.id})`);
            if (ilan.kaynak && !KAYNAK.has(ilan.kaynak)) veriUyarisi('bilinmeyen kaynak:', ilan.kaynak, `(ilan ${ilan.id})`);
            const kalip = ilan.kalip ? kaliplar.get(ilan.kalip) : null;
            if (ilan.kalip && !kalip) veriUyarisi('kalıp bulunamadı:', ilan.kalip, `(ilan ${ilan.id})`);

            const varsayilan = birlestir(kalip && kalip.varsayilan, ilan.varsayilan);
            const basvuru = birlestir(kalip && kalip.basvuru, ilan.basvuru);
            const secme = birlestir(kalip && kalip.secme, ilan.secme);
            (basvuru.kanal || []).forEach(k => { if (!KANAL.has(k)) veriUyarisi('bilinmeyen başvuru kanalı:', k, `(ilan ${ilan.id})`); });
            const durum = durumBul(basvuru);

            (ilan.pozisyonlar || []).forEach(poz => {
                if (typeof poz.id !== 'number') {
                    veriUyarisi(`pozisyonun id numarası yok (ilan ${ilan.id})`);
                    return;
                }
                if (kullanilan.has(poz.id)) {
                    veriUyarisi('pozisyon numarası iki kez kullanılmış:', poz.id);
                    return;
                }
                kullanilan.add(poz.id);
                const al = a => (poz[a] != null ? poz[a] : varsayilan[a] != null ? varsayilan[a] : null);

                const unvanId = al('unvan');
                const unvan = UNVAN.get(unvanId);
                const statuId = al('statu');
                const statu = statuId ? STATU.get(statuId) : null;
                const egitim = al('egitim');
                const yontem = al('yontem') || secme.yontem || null;
                if (!unvan) veriUyarisi('bilinmeyen ünvan:', unvanId, `(pozisyon ${poz.id})`);
                if (statuId && !statu) veriUyarisi('bilinmeyen statü:', statuId, `(pozisyon ${poz.id})`);
                if (egitim && !EGITIM.has(egitim)) veriUyarisi('bilinmeyen eğitim düzeyi:', egitim, `(pozisyon ${poz.id})`);
                if (yontem && !YONTEM.has(yontem)) veriUyarisi('bilinmeyen alım yöntemi:', yontem, `(pozisyon ${poz.id})`);
                if (poz.kontenjan && !KONTENJAN.has(poz.kontenjan)) veriUyarisi('bilinmeyen kontenjan türü:', poz.kontenjan, `(pozisyon ${poz.id})`);

                // Konum: tek il, birden fazla il (iller) ya da yurt geneli ("TR").
                const iller = Array.isArray(poz.iller) ? poz.iller.map(String) : null;
                const ilDeger = iller || al('il') || kurum.il;
                const yurtGeneli = ilDeger === YURT_GENELI;
                const plakalar = yurtGeneli ? [] : (Array.isArray(ilDeger) ? ilDeger : [String(ilDeger)]);
                plakalar.forEach(pl => { if (!IL.has(pl)) veriUyarisi('bilinmeyen il:', pl, `(pozisyon ${poz.id})`); });

                const p = {
                    id: poz.id,
                    ilanId: ilan.id,
                    ilanBaslik: ilan.baslik || '',
                    kalip: kalip ? kalip.id : null,
                    kalipAd: kalip ? kalip.ad : null,
                    dayanak: ilan.dayanak || (kalip ? kalip.dayanak : null),
                    kurumId: kurum.id,
                    kurum: kurum.ad,
                    kurumTur: tur ? tur.id : 'diger-kurum',
                    kurumTurAd: tur ? tur.ad : 'Diğer kamu kurumu',
                    kurumGrup: tur ? tur.grup : 'diger',
                    unvanId: String(unvanId),
                    unvan: unvan ? unvan.ad : String(unvanId),
                    unvanEs: unvan && unvan.es ? unvan.es : [],
                    ilandakiAd: al('ilandakiAd'),
                    kidem: poz.kidem || null,
                    kod: poz.kod || null,
                    birim: al('birim'),
                    meslek: unvan ? unvan.grup : 'diger',
                    alan: poz.alan || '',
                    statu: statu ? statu.id : null,
                    statuAd: statu ? statu.ad : null,
                    statuGrup: statu ? statu.grup : null,
                    adet: typeof poz.adet === 'number' ? poz.adet : null,
                    derece: al('derece'),
                    hizmetSinifi: al('hizmetSinifi'),
                    ucret: poz.ucret || null,
                    cinsiyet: poz.cinsiyet || null,
                    kontenjan: poz.kontenjan || null,
                    cagriSayisi: poz.cagriSayisi || null,
                    egitim: EGITIM.has(egitim) ? egitim : null,
                    yontem: YONTEM.has(yontem) ? yontem : null,
                    plaka: yurtGeneli ? YURT_GENELI : plakalar[0],
                    plakalar,
                    yurtGeneli,
                    il: yurtGeneli ? YURT_GENELI_AD : plakalar.map(x => IL.get(x) || x).join(' veya '),
                    yayinTarihi: ilan.yayinTarihi || ilan.resmiGazete || null,
                    resmiGazete: ilan.resmiGazete || null,
                    sonBasvuru: basvuru.bitis || null,
                    basvuru,
                    secme,
                    durum,
                    notlar: Array.isArray(ilan.notlar) ? ilan.notlar : [],
                    kontenjanNotu: ilan.kontenjanNotu || null,
                    kaynak: KAYNAK.has(ilan.kaynak) ? ilan.kaynak : null,
                    link: typeof ilan.link === 'string' && /^https?:\/\//i.test(ilan.link) ? ilan.link : null
                };
                p.sartlar = sartlariBirlestir(kalip, ilan, poz, p);
                p.etiketler = etiketleriBul(p);
                // Arama metni: ünvan ve eş yazılışları, kurum, yer, alan; şartlardaki bölüm adları ve teknik maddeler.
                const sartMetni = p.sartlar.flatMap(x => [...(x.bolumler || []), ...(x.tur === 'teknik' ? x.maddeler || [] : [])]);
                p.arama = norm([p.unvan, ...p.unvanEs, p.ilandakiAd || '', p.alan, p.birim || '', p.kurum, p.il, p.kod || '', ...sartMetni].join(' '));
                pozisyonlar.push(p);
            });
        });
        pozisyonlar.sort((a, b) => b.id - a.id); // en yeni pozisyon üstte
    })();

    // Bir pozisyonun bir ile düşüp düşmediği; "TR" seçimi yurt geneli pozisyonları getirir.
    function ildeMi(p, plaka) {
        return plaka === YURT_GENELI ? p.yurtGeneli : p.plakalar.includes(plaka);
    }

    // İl başına pozisyon sayısı (birden fazla ilde olan pozisyon her ilde sayılır).
    function ilSay(liste) {
        const map = new Map();
        liste.forEach(p => (p.yurtGeneli ? [YURT_GENELI] : p.plakalar).forEach(k => map.set(k, (map.get(k) || 0) + 1)));
        return map;
    }

    // ---------- Ortak görünüm parçaları ----------
    const tarihBicim = new Intl.DateTimeFormat('tr', { day: 'numeric', month: 'long', year: 'numeric' });

    function tarihYaz(gun) {
        const d = new Date(`${gun}T00:00:00`);
        return isNaN(d) ? '' : tarihBicim.format(d);
    }

    function ilEtiket(plaka) {
        return plaka === YURT_GENELI ? YURT_GENELI_AD : IL.get(plaka) || plaka;
    }

    function ilGecerli(plaka) {
        return plaka === YURT_GENELI || IL.has(plaka);
    }

    // "Nerede" kutusuna yazılan il adını ya da plaka kodunu plakaya çevirir; bulunamazsa ''.
    // "Yurt geneli" (ya da "Türkiye") yurt geneli pozisyonları seçer.
    function ilBul(metin) {
        const n = norm(metin);
        if (n === norm(YURT_GENELI_AD) || n === 'turkiye' || n === 'tr') return YURT_GENELI;
        if (/^\d{1,2}$/.test(n)) {
            const plaka = n.padStart(2, '0');
            return IL.has(plaka) ? plaka : '';
        }
        for (const [plaka, ad] of IL) if (norm(ad) === n) return plaka;
        return '';
    }

    function ilListesiDoldur(datalist) {
        if (!datalist) return;
        datalist.appendChild(secenek(YURT_GENELI_AD, ''));
        [...IL.values()].sort(collator.compare).forEach(ad => {
            const o = document.createElement('option');
            o.value = ad;
            datalist.appendChild(o);
        });
    }

    function turEtiket(v) {
        if (v.startsWith('grup:')) {
            const g = KURUM_GRUP.get(v.slice(5));
            return g ? `${g.ad} (tümü)` : v;
        }
        return KURUM_TUR.has(v) ? KURUM_TUR.get(v).ad : v;
    }

    function statuEtiket(v) {
        if (v.startsWith('grup:')) {
            const g = STATU_GRUP.get(v.slice(5));
            return g ? `${g.ad} (tümü)` : v;
        }
        return STATU.has(v) ? STATU.get(v).ad : v;
    }

    function meslekEtiket(v) {
        return MESLEK.has(v) ? MESLEK.get(v).ad : v;
    }

    // "grup:<id>" bir grubun tamamını, diğer değerler tek bir öğeyi seçer.
    function degerUyar(deger, tekil, grup) {
        return deger.startsWith('grup:') ? grup === deger.slice(5) : tekil === deger;
    }

    function plakaBadge(plaka) {
        return `<span class="plaka" title="${plaka === YURT_GENELI ? 'Yurt geneli' : 'Plaka kodu'}">${esc(plaka)}</span>`;
    }

    // Kartta ve ayrıntıda görünen başlık: ilandaki ad (yoksa standart ünvan) ve alan.
    function pozisyonBasligi(p) {
        const ad = p.ilandakiAd || p.unvan;
        return p.alan && !norm(ad).includes(norm(p.alan)) ? `${ad} · ${p.alan}` : ad;
    }

    // Aynı başlığı taşıyan pozisyonlar (ör. üç kuvvetteki matematik öğretmeni) birim, cinsiyet ve kontenjanla ayrılır.
    function ayirtEdiciBaslik(p, liste) {
        const baslik = pozisyonBasligi(p);
        if (liste.filter(x => pozisyonBasligi(x) === baslik).length < 2) return baslik;
        const ek = [];
        if (p.birim && liste.some(x => pozisyonBasligi(x) === baslik && x.birim !== p.birim)) ek.push(p.birim);
        if (p.cinsiyet) ek.push(p.cinsiyet === 'kadin' ? 'kadın' : 'erkek');
        if (p.kontenjan && KONTENJAN.has(p.kontenjan)) ek.push(KONTENJAN.get(p.kontenjan).ad.toLocaleLowerCase('tr'));
        if (!ek.length && p.kod) ek.push(p.kod);
        return ek.length ? `${baslik} (${ek.join(', ')})` : baslik;
    }

    const DURUM = {
        yakinda: { metin: 'Başvuru yakında', sinif: '' },
        'son-gunler': { metin: 'Son günler', sinif: 'uyari' },
        bitti: { metin: 'Süresi doldu', sinif: 'soluk' }
    };

    function sonBasvuruMetni(p) {
        if (!p.sonBasvuru) return '';
        return `Son başvuru ${tarihYaz(p.sonBasvuru)}${p.basvuru.bitisTahmini ? ' (tahmini)' : ''}`;
    }

    // İlan kartının içi: ünvan, kurum, il, statü ve öne çıkan bilgiler.
    function kartIcerik(p, yeni) {
        const etiketler = [];
        if (yeni) etiketler.push('<span class="chip-sm new">Yeni</span>');
        if (DURUM[p.durum]) etiketler.push(`<span class="chip-sm ${DURUM[p.durum].sinif}">${DURUM[p.durum].metin}</span>`);
        if (p.statuAd) etiketler.push(`<span class="chip-sm">${esc(p.statuAd)}</span>`);
        if (p.adet) etiketler.push(`<span class="chip-sm">${p.adet} kadro</span>`);
        if (p.ucret && p.ucret.tavanKati) etiketler.push(`<span class="chip-sm">Ücret tavanının ${p.ucret.tavanKati} katı</span>`);
        p.etiketler.slice(0, 2).forEach(e => etiketler.push(`<span class="chip-sm">${esc(e.metin)}</span>`));
        const alt = [p.kurumTurAd];
        if (p.sonBasvuru) alt.push(sonBasvuruMetni(p));
        return `<span class="job-title">${esc(pozisyonBasligi(p))}</span>
            <span class="job-company">${esc(p.kurum)}</span>
            <span class="job-location">${KONUM}${esc(p.il)}</span>
            ${etiketler.length ? `<span class="job-tags">${etiketler.join('')}</span>` : ''}
            <span class="job-foot">${esc(alt.join(' · '))}</span>`;
    }

    // Başka sayfalardan, pozisyonu ilanlar sayfasında ayrıntısıyla açan kart.
    function kartLink(p, yeni) {
        return `<li><a class="job-card" href="ilanlar.html#poz-${p.id}">${kartIcerik(p, yeni)}</a></li>`;
    }

    function secenek(deger, metin) {
        const o = document.createElement('option');
        o.value = deger;
        o.textContent = metin;
        return o;
    }

    // <select> içine gruplu seçenekler ekler; her grubun başında "grup:<id>" değerli "tümü" seçeneği olur.
    // sayac verilirse yalnızca sitede karşılığı olan değerler, sayılarıyla gösterilir.
    function grupluDoldur(select, gruplar, ogeler, sayac) {
        gruplar.forEach(g => {
            const icerik = ogeler.filter(o => o.grup === g.id && (!sayac || sayac.get(o.id)));
            if (!icerik.length) return;
            const og = document.createElement('optgroup');
            og.label = g.ad;
            const toplam = sayac ? icerik.reduce((t, o) => t + sayac.get(o.id), 0) : 0;
            og.appendChild(secenek(`grup:${g.id}`, sayac ? `${g.ad}: tümü (${toplam})` : `${g.ad}: tümü`));
            icerik.forEach(o => og.appendChild(secenek(o.id, sayac ? `${o.ad} (${sayac.get(o.id)})` : o.ad)));
            select.appendChild(og);
        });
    }

    // Bir <select> ile seçilen değerleri silinebilir çipler olarak gösteren çoklu seçim.
    function cokluSecim(select, liste, etiket, degisince) {
        let secili = [];
        function ciz() {
            liste.innerHTML = secili.map(v => `<li class="chip">${etiket.html(v)}
                <button type="button" class="chip-x" data-deger="${esc(v)}" aria-label="Çıkar: ${esc(etiket.metin(v))}">×</button></li>`).join('');
            liste.hidden = secili.length === 0;
            [...select.options].forEach(o => { if (o.value) o.disabled = secili.includes(o.value); });
        }
        select.addEventListener('change', () => {
            if (select.value && !secili.includes(select.value)) secili.push(select.value);
            select.value = '';
            ciz();
            degisince();
        });
        liste.addEventListener('click', e => {
            const btn = e.target.closest('[data-deger]');
            if (!btn) return;
            secili = secili.filter(v => v !== btn.dataset.deger);
            ciz();
            degisince();
            select.focus();
        });
        return {
            degerler: () => secili.slice(),
            ayarla(degerler) {
                secili = degerler.filter(v => [...select.options].some(o => o.value === v));
                ciz();
            }
        };
    }

    // ---------- Tarayıcı depolaması ----------
    // Gizli pencere veya kapalı site verisi gibi durumlarda depolama hata verebilir.
    function depoOku(tur, key) {
        let ham = null;
        try { ham = window[tur].getItem(key); } catch (e) { return null; }
        if (!ham) return null;
        try { return JSON.parse(ham); } catch (e) { return null; }
    }

    function depoYaz(tur, key, deger) {
        try {
            if (deger === null) window[tur].removeItem(key);
            else window[tur].setItem(key, JSON.stringify(deger));
            return true;
        } catch (e) {
            return false;
        }
    }

    // ---------- İlan alarmları ----------
    let bellekteAlarmlar = null; // depolamaya yazılamazsa alarmlar sayfa açıkken burada kalır

    function dizi(x) {
        return Array.isArray(x) ? x.map(String) : [];
    }

    function alarmBicimle(a) {
        return {
            id: String(a.id),
            iller: dizi(a.iller),
            turler: dizi(a.turler),
            statuler: dizi(a.statuler),
            meslekler: dizi(a.meslekler),
            kelimeler: dizi(a.kelimeler),
            tarayici: a.tarayici === true,
            olusturma: String(a.olusturma || ''),
            gorulen: Array.isArray(a.gorulen) ? a.gorulen : [],
            bildirilen: Array.isArray(a.bildirilen) ? a.bildirilen : []
        };
    }

    // İlk sürümün alarmlarında kurum türü Üniversite, Belediye, Bakanlık, Hastane veya Diğer idi;
    // bunlar yeni sözlüğe aktarılır. Hastane bir kurum türü olmadığı için Sağlık meslek grubuna çevrilir.
    function eskiAlarmlariAktar() {
        const eski = depoOku('localStorage', ESKI_ALARM_KEY);
        if (!Array.isArray(eski)) return null;
        const karsilik = {
            'Üniversite': ['devlet-universitesi'],
            'Belediye': ['buyuksehir-belediyesi', 'il-belediyesi', 'ilce-belediyesi'],
            'Bakanlık': ['bakanlik'],
            'Diğer': ['diger-kurum']
        };
        const liste = eski.filter(a => a && typeof a === 'object' && a.id).map(a => {
            const turler = [];
            const meslekler = [];
            dizi(a.turler).forEach(t => {
                if (t === 'Hastane') meslekler.push('saglik');
                else (karsilik[t] || []).forEach(x => turler.push(x));
            });
            return alarmBicimle({ ...a, turler, meslekler, statuler: [] });
        });
        if (depoYaz('localStorage', ALARM_KEY, liste)) depoYaz('localStorage', ESKI_ALARM_KEY, null);
        return liste;
    }

    function alarmlariYukle() {
        if (bellekteAlarmlar) return bellekteAlarmlar;
        let liste = depoOku('localStorage', ALARM_KEY);
        if (!Array.isArray(liste)) liste = eskiAlarmlariAktar() || [];
        return liste.filter(a => a && typeof a === 'object' && a.id).map(alarmBicimle);
    }

    function alarmlariKaydet(liste) {
        if (depoYaz('localStorage', ALARM_KEY, liste)) {
            bellekteAlarmlar = null;
            return true;
        }
        bellekteAlarmlar = liste;
        return false;
    }

    function eslesir(a, p) {
        if (a.iller.length && !a.iller.some(il => ildeMi(p, il))) return false;
        if (a.turler.length && !a.turler.some(v => degerUyar(v, p.kurumTur, p.kurumGrup))) return false;
        if (a.statuler.length && !(p.statu && a.statuler.some(v => degerUyar(v, p.statu, p.statuGrup)))) return false;
        if (a.meslekler.length && !a.meslekler.includes(p.meslek)) return false;
        if (!a.kelimeler.length) return true;
        return a.kelimeler.some(k => p.arama.includes(norm(k)));
    }

    function uyanlar(alarm) {
        return pozisyonlar.filter(p => eslesir(alarm, p));
    }

    function yeniUyanlar(alarm) {
        return uyanlar(alarm).filter(p => !alarm.gorulen.includes(p.id));
    }

    function kisalt(adlar, birim) {
        return adlar.length > 3 ? `${adlar.slice(0, 3).join(', ')} ve ${adlar.length - 3} ${birim} daha` : adlar.join(', ');
    }

    function alarmAdi(a) {
        const parca = [];
        if (a.iller.length) parca.push(kisalt(a.iller.map(ilEtiket), 'il'));
        if (a.turler.length) parca.push(kisalt(a.turler.map(turEtiket), 'tür'));
        if (a.statuler.length) parca.push(kisalt(a.statuler.map(statuEtiket), 'statü'));
        if (a.meslekler.length) parca.push(kisalt(a.meslekler.map(meslekEtiket), 'meslek grubu'));
        if (a.kelimeler.length) parca.push(a.kelimeler.map(k => `“${k}”`).join(', '));
        return parca.length ? parca.join(' · ') : 'Tüm yeni pozisyonlar';
    }

    function rozetiGuncelle(sayi) {
        const rozet = document.getElementById('alarm-badge');
        if (!rozet) return;
        rozet.innerHTML = `${sayi}<span class="sr-only"> yeni pozisyon</span>`;
        rozet.hidden = sayi === 0;
    }

    async function bildirimIzniIste() {
        if (!('Notification' in window)) return 'unsupported';
        if (Notification.permission !== 'default') return Notification.permission;
        try {
            return await Notification.requestPermission();
        } catch (e) {
            return 'denied';
        }
    }

    // Site açıkken, izin verildiyse, henüz bildirilmemiş her yeni pozisyon için bir tarayıcı bildirimi.
    function tarayiciBildirimiGonder(alarmlar) {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        let degisti = false;
        alarmlar.forEach(a => {
            if (!a.tarayici) return;
            yeniUyanlar(a).forEach(p => {
                if (a.bildirilen.includes(p.id)) return;
                try {
                    new Notification(`Yeni pozisyon: ${pozisyonBasligi(p)}`, { body: `${p.kurum} · ${p.il}`, tag: `kamu-ilan-${p.id}` });
                } catch (e) {
                    // Bazı mobil tarayıcılar bu yolla bildirim göstermez; uyarı sayfada yine görünür.
                }
                a.bildirilen.push(p.id);
                degisti = true;
            });
        });
        if (degisti) alarmlariKaydet(alarmlar);
    }

    // Alarm sayfası dışındaki her sayfada: menüdeki sayaç, sayfa üstü uyarı ve tarayıcı bildirimi.
    function alarmDurumunuGoster() {
        const alarmlar = alarmlariYukle();
        if (!alarmlar.length) return;

        const yeniler = new Map();
        alarmlar.forEach(a => yeniUyanlar(a).forEach(p => yeniler.set(p.id, p)));
        const yeni = [...yeniler.values()];
        rozetiGuncelle(yeni.length);

        const kutu = document.getElementById('alarm-banner');
        if (kutu && yeni.length) {
            const ilk = yeni[0];
            const ek = yeni.length > 1 ? ` ve ${yeni.length - 1} pozisyon daha` : '';
            kutu.innerHTML = `${ZIL}
                <p><b>${alarmlar.length > 1 ? 'Alarmlarınıza' : 'Alarmınıza'} uyan ${yeni.length} yeni pozisyon var.</b>
                ${esc(pozisyonBasligi(ilk))}, ${esc(ilk.kurum)}${ek}.</p>
                <a href="alarm.html">Pozisyonları gör</a>`;
            kutu.hidden = false;
        }

        tarayiciBildirimiGonder(alarmlar);
    }

    // ---------- Ana sayfa ----------
    function initIndex() {
        const $ = id => document.getElementById(id);
        const ilSayilari = ilSay(pozisyonlar);
        const statuSay = say(pozisyonlar, 'statuGrup');
        const turSay = say(pozisyonlar, 'kurumTur');
        const meslekSay = say(pozisyonlar, 'meslek');

        // Arama: "Ne" ve "Nerede" ilanlar sayfasına taşınır.
        const form = $('ana-arama');
        const ne = $('ana-ne');
        const nerede = $('ana-nerede');
        const hata = $('ana-hata');
        ilListesiDoldur($('il-listesi'));
        form.addEventListener('submit', e => {
            e.preventDefault();
            const yer = nerede.value.trim();
            const plaka = yer ? ilBul(yer) : '';
            if (yer && !plaka) {
                hata.textContent = `"${yer}" adında bir il bulunamadı. Listeden bir il seçin.`;
                hata.hidden = false;
                nerede.focus();
                return;
            }
            depoYaz('sessionStorage', ARAMA_KEY, { q: ne.value.trim(), il: plaka });
            window.location.href = plaka ? `ilanlar.html#${plaka}` : 'ilanlar.html';
        });
        nerede.addEventListener('input', () => { hata.hidden = true; });

        $('populer').innerHTML = [
            ...S.STATU_GRUPLARI.filter(g => statuSay.get(g.id)).map(g => [`statu-grup-${g.id}`, g.ad]),
            ...S.KURUM_TURLERI.filter(t => turSay.get(t.id)).map(t => [`tur-${t.id}`, t.ad])
        ].slice(0, 6).map(([h, ad]) => `<li><a class="chip" href="ilanlar.html#${esc(h)}">${esc(ad)}</a></li>`).join('');

        $('stats').innerHTML = [
            [new Set(pozisyonlar.map(p => p.ilanId)).size, 'ilan'],
            [pozisyonlar.length, 'pozisyon'],
            [pozisyonlar.reduce((t, p) => t + (p.adet || 0), 0), 'kadro'],
            [new Set(pozisyonlar.map(p => p.kurumId)).size, 'kurum'],
            [[...ilSayilari.keys()].filter(k => k !== YURT_GENELI).length, 'il']
        ].map(([n, ad]) => `<li><strong>${n}</strong> ${ad}</li>`).join('');

        // Harita: pozisyon sayısına göre mavi tonlar.
        const seviye = n => (n >= 10 ? 4 : n >= 5 ? 3 : n >= 2 ? 2 : 1);
        const readout = $('map-readout');
        const defaultReadout = readout.innerHTML;
        document.querySelectorAll('#turkey-map path').forEach(path => {
            const plaka = path.dataset.plaka;
            const il = path.dataset.il;
            const n = ilSayilari.get(plaka) || 0;

            const show = () => {
                readout.innerHTML = n
                    ? `<b>${esc(il)} (${esc(plaka)})</b> · ${n} pozisyon, görmek için tıklayın`
                    : `<b>${esc(il)} (${esc(plaka)})</b> · şu an ilan yok`;
            };
            const hide = () => { readout.innerHTML = defaultReadout; };
            path.addEventListener('mouseenter', show);
            path.addEventListener('mouseleave', hide);

            if (!n) return;
            path.classList.add('has-ilan', `lvl-${seviye(n)}`);
            path.setAttribute('tabindex', '0');
            path.setAttribute('role', 'link');
            path.setAttribute('aria-label', `${il}: ${n} pozisyon`);
            const go = () => { window.location.href = `ilanlar.html#${plaka}`; };
            path.addEventListener('click', go);
            path.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
            });
            path.addEventListener('focus', show);
            path.addEventListener('blur', hide);
        });

        // Yurt geneli pozisyonlar haritada bir ile düşmez; listenin başında ayrı gösterilir.
        $('il-chips').innerHTML = [...ilSayilari.keys()]
            .sort((a, b) => (a === YURT_GENELI ? -1 : b === YURT_GENELI ? 1 : collator.compare(ilEtiket(a), ilEtiket(b))))
            .map(p => `<li><a class="chip" href="ilanlar.html#${esc(p)}">
                ${plakaBadge(p)} ${esc(ilEtiket(p))} <span class="count">${ilSayilari.get(p)}</span>
            </a></li>`).join('');

        // Sınıflandırmaya göre göz at: her satır ilanlar sayfasını o filtreyle açar.
        const satir = (href, ad, n) => `<li><a href="ilanlar.html#${esc(href)}"><span>${esc(ad)}</span><span class="browse-count">${n}</span></a></li>`;
        const kolon = (baslik, satirlar) => (satirlar ? `<div class="browse-col"><h3>${baslik}</h3><ul class="browse-list">${satirlar}</ul></div>` : '');
        $('browse').innerHTML = [
            kolon('Çalışma statüsü', S.STATU_GRUPLARI.filter(g => statuSay.get(g.id))
                .map(g => satir(`statu-grup-${g.id}`, g.ad, statuSay.get(g.id))).join('')),
            kolon('Kurum türü', S.KURUM_TURLERI.filter(t => turSay.get(t.id))
                .map(t => satir(`tur-${t.id}`, t.ad, turSay.get(t.id))).join('')),
            kolon('Meslek grubu', S.MESLEK_GRUPLARI.filter(m => meslekSay.get(m.id))
                .map(m => satir(`meslek-${m.id}`, m.ad, meslekSay.get(m.id))).join(''))
        ].join('');

        $('recent').innerHTML = pozisyonlar.slice(0, 4).map(p => kartLink(p)).join('');
    }

    // ---------- İlanlar: solda kartlar, sağda seçili pozisyonun ayrıntısı ----------
    function initIlanlar() {
        const $ = id => document.getElementById(id);
        const aramaForm = $('arama-form');
        const ne = $('ara-ne');
        const nerede = $('ara-nerede');
        const aramaHata = $('arama-hata');
        const f = { tur: $('f-tur'), statu: $('f-statu'), meslek: $('f-meslek'), egitim: $('f-egitim') };
        const liste = $('ilan-list');
        const count = $('result-count');
        const empty = $('empty');
        const heading = $('ilanlar-heading');
        const reset = $('reset');
        const chips = $('aktif-filtreler');
        const alarmLink = $('alarm-kur-link');
        const alarmMetin = $('alarm-kur-metin');
        const sonuclar = $('sonuclar');
        const detay = $('detay');
        const dar = window.matchMedia('(max-width: 63.99rem)');

        let ilSecili = '';
        let ekFiltre = { kurum: null, unvan: null }; // yalnızca bağlantıyla gelen filtreler
        let seciliPoz = null;
        let mobilDetay = false; // dar ekranda ayrıntı listenin yerine açılır

        ilListesiDoldur($('il-listesi'));

        // Filtre seçenekleri: yalnızca sitede pozisyonu olan değerler, sayılarıyla.
        grupluDoldur(f.tur, S.KURUM_GRUPLARI, S.KURUM_TURLERI, say(pozisyonlar, 'kurumTur'));
        grupluDoldur(f.statu, S.STATU_GRUPLARI, S.STATULER, say(pozisyonlar, 'statu'));
        const meslekSay = say(pozisyonlar, 'meslek');
        S.MESLEK_GRUPLARI.forEach(m => {
            if (meslekSay.get(m.id)) f.meslek.appendChild(secenek(m.id, `${m.ad} (${meslekSay.get(m.id)})`));
        });
        const egitimSay = say(pozisyonlar, 'egitim');
        S.EGITIM_DUZEYLERI.forEach(e => {
            if (egitimSay.get(e.id)) f.egitim.appendChild(secenek(e.id, `${e.ad} (${egitimSay.get(e.id)})`));
        });
        // Henüz verisi olmayan filtre gizlenir; ilanlara bilgi eklendikçe kendiliğinden görünür.
        Object.values(f).forEach(sel => { sel.closest('.pill-select').hidden = sel.options.length <= 1; });

        function ilAyarla(plaka) {
            ilSecili = plaka;
            nerede.value = plaka ? ilEtiket(plaka) : '';
            aramaHata.hidden = true;
        }

        // "Nerede" kutusundaki metni il olarak uygular; il bulunamazsa uyarır.
        function ilCoz() {
            const metin = nerede.value.trim();
            if (!metin) {
                ilAyarla('');
                return true;
            }
            const plaka = ilBul(metin);
            if (!plaka) {
                aramaHata.textContent = `"${metin}" adında bir il bulunamadı. Listeden bir il seçin.`;
                aramaHata.hidden = false;
                return false;
            }
            ilAyarla(plaka);
            return true;
        }

        function secenekVar(sel, deger) {
            return [...sel.options].some(o => o.value === deger);
        }

        // Bağlantıyla gelen filtre: #70 (il), #tur-…, #statu-…, #meslek-…, #egitim-…, #kurum-…, #unvan-…, #poz-…
        // "grup-" ile başlayan değer bir grubun tamamıdır: #statu-grup-sozlesmeli
        function hashOku() {
            Object.values(f).forEach(sel => { sel.value = ''; });
            ekFiltre = { kurum: null, unvan: null };
            ilAyarla('');
            ne.value = '';
            seciliPoz = null;
            let h = '';
            try { h = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { return; }
            if (/^\d{2}$/.test(h) || h === YURT_GENELI) {
                if (ilGecerli(h)) ilAyarla(h);
                return;
            }
            const m = h.match(/^(kurum|unvan|tur|statu|meslek|egitim|poz)-(.+)$/);
            if (!m) return;
            const deger = m[2].startsWith('grup-') ? `grup:${m[2].slice(5)}` : m[2];
            if (m[1] === 'poz') seciliPoz = pozisyonlar.some(p => p.id === Number(deger)) ? Number(deger) : null;
            else if (m[1] === 'kurum') ekFiltre.kurum = kurumlar.has(deger) ? deger : null;
            else if (m[1] === 'unvan') ekFiltre.unvan = UNVAN.has(deger) ? deger : null;
            else if (secenekVar(f[m[1]], deger)) f[m[1]].value = deger;
        }

        function hashTemizle() {
            if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        function filtreVar() {
            return Object.values(f).some(sel => sel.value) || !!ilSecili || ne.value.trim() !== '' || !!ekFiltre.kurum || !!ekFiltre.unvan;
        }

        function filtrele() {
            const q = norm(ne.value);
            return pozisyonlar.filter(p =>
                (!ilSecili || ildeMi(p, ilSecili)) &&
                (!f.tur.value || degerUyar(f.tur.value, p.kurumTur, p.kurumGrup)) &&
                (!f.statu.value || (p.statu && degerUyar(f.statu.value, p.statu, p.statuGrup))) &&
                (!f.meslek.value || p.meslek === f.meslek.value) &&
                (!f.egitim.value || p.egitim === f.egitim.value) &&
                (!ekFiltre.kurum || p.kurumId === ekFiltre.kurum) &&
                (!ekFiltre.unvan || p.unvanId === ekFiltre.unvan) &&
                (!q || p.arama.includes(q)));
        }

        function detayHtml(p) {
            const statu = p.statu ? STATU.get(p.statu) : null;
            const grup = KURUM_GRUP.get(p.kurumGrup);
            const yontem = p.yontem ? YONTEM.get(p.yontem) : null;
            const b = p.basvuru;
            const sm = p.secme;
            const fact = (ad, deger, not) => (deger ? `<div class="fact"><dt>${esc(ad)}</dt><dd>${esc(deger)}${not ? `<span class="fact-note">${esc(not)}</span>` : ''}</dd></div>` : '');
            const bolum = (id, baslik, icerik) => (icerik ? `<section class="detail-section" aria-labelledby="${id}"><h3 id="${id}">${baslik}</h3>${icerik}</section>` : '');
            const madde = liste => `<ul class="bullet-list">${liste.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
            const acilir = (ozet, liste) => `<details class="mini-details"><summary>${esc(ozet)} (${liste.length})</summary>${madde(liste)}</details>`;

            // Pozisyon bilgileri
            const cagri = p.cagriSayisi || (sm.cagriKati && p.adet ? sm.cagriKati * p.adet : null);
            const pozBilgi = [
                fact('Ünvan', p.ilandakiAd && p.ilandakiAd !== p.unvan ? p.unvan : null, p.ilandakiAd ? `İlandaki adı: ${p.ilandakiAd}` : ''),
                fact('Kadro kodu', p.kod),
                fact('Birim', p.birim),
                fact('Alan', p.alan || null),
                fact('Kadro sayısı', p.adet ? String(p.adet) : null),
                fact('Kadro derecesi', p.derece ? `${p.derece}. derece${p.hizmetSinifi ? ` · ${p.hizmetSinifi}` : ''}` : (p.hizmetSinifi || null)),
                fact('Ücret', p.ucret && p.ucret.tavanKati ? `Sözleşme ücret tavanının ${p.ucret.tavanKati} katına kadar` : null),
                fact('Cinsiyet', p.cinsiyet ? (p.cinsiyet === 'kadin' ? 'Kadın kadrosu' : 'Erkek kadrosu') : null),
                fact('Kontenjan', p.kontenjan && KONTENJAN.has(p.kontenjan) ? KONTENJAN.get(p.kontenjan).ad : null),
                fact('Çalışma statüsü', statu ? statu.ad : null, statu ? [statu.dayanak, statu.aciklama].filter(Boolean).join('. ') : ''),
                fact('Kurum türü', p.kurumTurAd, grup ? grup.ad : ''),
                fact('Meslek grubu', meslekEtiket(p.meslek)),
                fact('En düşük eğitim düzeyi', p.egitim ? EGITIM.get(p.egitim).ad : null),
                fact('Sınava çağrılacak aday', cagri ? String(cagri) : null, sm.cagriKati ? `Kadronun ${sm.cagriKati} katı` : '')
            ].join('');

            // Başvuru şartları: türlerine göre gruplanır.
            const sartHtml = S.SART_TURLERI.map(t => {
                const liste = p.sartlar.filter(x => x.tur === t.id);
                if (!liste.length) return '';
                return `<div class="sart-grup"><h4>${esc(t.ad)}</h4><ul class="sart-list">${liste.map(x => {
                    const ek = [];
                    if (x.bolumler && x.bolumler.length) ek.push(acilir('Kabul edilen bölümler', x.bolumler));
                    if (x.maddeler && x.maddeler.length) ek.push(x.maddeler.length > 4 ? acilir(x.metin || 'Maddeler', x.maddeler) : madde(x.maddeler));
                    const metin = x.maddeler && x.maddeler.length > 4 ? '' : esc(x.metin || x.ad || '');
                    return `<li>${metin}${ek.join('')}</li>`;
                }).join('')}</ul></div>`;
            }).join('');
            const kendin = p.sartlar.some(x => SART_TUR.has(x.tur) && !SART_TUR.get(x.tur).denetlenebilir && ['akademik', 'teknik'].includes(x.tur));

            // Başvuru
            const tarih = b.baslangic || b.bitis
                ? [b.baslangic ? tarihYaz(b.baslangic) : '', b.bitis ? tarihYaz(b.bitis) : '…'].filter(Boolean).join(' – ') + (b.saat ? ` (son gün ${b.saat})` : '')
                : null;
            const kanallar = (b.kanal || []).map(k => (KANAL.has(k) ? KANAL.get(k).ad : k)).join(', ');
            const adres = b.adres ? (/^https?:\/\//i.test(b.adres) ? `<a href="${esc(b.adres)}" target="_blank" rel="noopener">${esc(b.adres.replace(/^https?:\/\//, ''))}</a>` : esc(b.adres)) : '';
            const basvuruHtml = [
                fact('Başvuru tarihleri', tarih, b.bitisTahmini ? 'Son gün, Resmî Gazete yayımına süre eklenerek hesaplandı; kurumun duyurusundan doğrulayın.' : (!b.bitis ? 'Son başvuru tarihi henüz eklenmedi.' : '')),
                fact('Geç başvuru', b.gecBasvuru ? tarihYaz(b.gecBasvuru) : null),
                fact('Başvuru yolu', kanallar || null),
                adres ? `<div class="fact"><dt>Başvuru adresi</dt><dd>${adres}</dd></div>` : '',
                fact('Ücret', b.ucret ? (b.ucret.tutar ? `${b.ucret.tutar} TL` : 'Ücretli') : null, b.ucret ? b.ucret.aciklama : ''),
                fact('Tek başvuru', b.tekBasvuru ? 'Bu ilanda yalnızca bir kadroya başvurulabilir.' : null),
                b.belgeler && b.belgeler.length ? `<div class="fact"><dt>İstenen belgeler</dt><dd>${acilir('Belge listesi', b.belgeler)}</dd></div>` : ''
            ].join('');

            // Seçme ve değerlendirme
            const sinavTarihi = sm.sinavTarihi ? sm.sinavTarihi.split('/').map(tarihYaz).join(' – ') : null;
            const secmeHtml = [
                fact('Yöntem', yontem ? yontem.ad : null, sm.aciklama || ''),
                sm.asamalar && sm.asamalar.length ? `<div class="fact"><dt>Aşamalar</dt><dd>${esc(sm.asamalar.join(' → '))}</dd></div>` : '',
                fact('Puan hesabı', sm.formul || null),
                fact('Başarı puanı', sm.gecmeNotu ? `En az ${sm.gecmeNotu}` : null),
                fact('Sınav tarihi', sinavTarihi),
                fact('Sınav yeri', sm.sinavYeri || null)
            ].join('');

            const notlar = [...(p.kontenjanNotu ? [p.kontenjanNotu] : []), ...p.notlar];
            const digerleri = pozisyonlar.filter(x => x.ilanId === p.ilanId && x.id !== p.id).sort((a, b2) => a.id - b2.id);
            const ana = p.link ? `<a class="btn-primary" href="${esc(p.link)}" target="_blank" rel="noopener">İlan sayfasına git</a>` : '';
            const durum = DURUM[p.durum] ? `<span class="chip-sm ${DURUM[p.durum].sinif}">${DURUM[p.durum].metin}</span>` : '';

            return `<div class="detail-head">
                <button type="button" class="detail-back btn-text" data-geri>← Sonuçlara dön</button>
                <h2 id="detay-baslik">${esc(pozisyonBasligi(p))}</h2>
                <button type="button" class="detail-company" data-kurum-filtre="${esc(p.kurumId)}">${esc(p.kurum)}</button>
                <p class="detail-location">${KONUM}${esc(p.il)}${p.plakalar.length === 1 ? ` (${esc(p.plaka)})` : ''}</p>
                ${p.sonBasvuru ? `<p class="detail-note">${esc(sonBasvuruMetni(p))}</p>` : ''}
                ${durum || p.etiketler.length ? `<span class="job-tags">${durum}${p.etiketler.map(e => `<span class="chip-sm">${esc(e.metin)}</span>`).join('')}</span>` : ''}
                <div class="detail-actions">
                    ${ana}
                    <a class="${p.link ? 'btn-secondary' : 'btn-primary'}" href="alarm.html" data-alarm-benzer="${p.id}">${ZIL}Benzer ilanlar için alarm kur</a>
                </div>
            </div>
            <div class="detail-body">
                ${bolum('d-bilgi', 'Pozisyon bilgileri', `<dl class="facts">${pozBilgi}</dl>`)}
                ${bolum('d-sart', 'Başvuru şartları', sartHtml ? `${sartHtml}${kendin ? '<p class="missing">Akademik ve teknik şartları ilan metnine göre kendiniz değerlendirin; site bunları otomatik denetlemez.</p>' : ''}` : '<p class="missing">Bu pozisyonun şartları henüz eklenmedi.</p>')}
                ${bolum('d-basvuru', 'Başvuru', basvuruHtml ? `<dl class="facts">${basvuruHtml}</dl>` : '')}
                ${bolum('d-secme', 'Seçme ve değerlendirme', secmeHtml ? `<dl class="facts">${secmeHtml}</dl>` : '')}
                ${bolum('d-not', 'Notlar', notlar.length || p.dayanak ? `${notlar.length ? madde(notlar) : ''}${p.dayanak ? `<p class="fact-note">Dayanak: ${esc(p.dayanak)}</p>` : ''}` : '')}
                ${digerleri.length ? bolum('d-diger', `Bu ilandaki diğer pozisyonlar (${digerleri.length})`,
                    `<ul class="other-list">${digerleri.slice(0, 25).map(x => `<li><button type="button" class="link-btn" data-poz-sec="${x.id}">${esc(ayirtEdiciBaslik(x, digerleri.concat(p)))}</button></li>`).join('')}</ul>
                    ${digerleri.length > 25 ? `<p class="fact-note">ve ${digerleri.length - 25} pozisyon daha. Tümü için kurumun adına tıklayın.</p>` : ''}`) : ''}
                <p class="detail-disclaimer">Başvurmadan önce ilanın tam metnini kurumun resmi sitesinden okuyun. Çalışma statüsü ve başvuru şartları için esas olan kurumun kendi duyurusudur.</p>
            </div>`;
        }

        function kartlariIsaretle() {
            liste.querySelectorAll('[data-poz]').forEach(b => {
                if (Number(b.dataset.poz) === seciliPoz) b.setAttribute('aria-current', 'true');
                else b.removeAttribute('aria-current');
            });
        }

        function detayCiz() {
            const p = pozisyonlar.find(x => x.id === seciliPoz);
            detay.hidden = !p;
            detay.innerHTML = p ? detayHtml(p) : '';
            detay.scrollTop = 0;
            sonuclar.classList.toggle('detay-acik', !!p && mobilDetay && dar.matches);
            kartlariIsaretle();
        }

        function render() {
            const sonuc = filtrele();

            const kurum = ekFiltre.kurum ? kurumlar.get(ekFiltre.kurum) : null;
            heading.textContent = kurum ? `${kurum.ad} ilanları`
                : ilSecili && !filtreVarIlDisinda() ? (ilSecili === YURT_GENELI ? 'Yurt geneli ilanlar' : `${ilEtiket(ilSecili)} ilindeki ilanlar`)
                : filtreVar() ? 'Arama sonuçları' : 'Tüm aktif ilanlar';

            const aktif = [];
            if (kurum) aktif.push(['kurum', `Kurum: ${kurum.ad}`]);
            if (ekFiltre.unvan) aktif.push(['unvan', `Ünvan: ${UNVAN.get(ekFiltre.unvan).ad}`]);
            chips.innerHTML = aktif.map(([k, metin]) => `<li class="chip">${esc(metin)}
                <button type="button" class="chip-x" data-filtre="${k}" aria-label="Kaldır: ${esc(metin)}">×</button></li>`).join('');
            chips.hidden = aktif.length === 0;

            Object.values(f).forEach(sel => sel.closest('.pill-select').classList.toggle('is-active', !!sel.value));
            count.textContent = `${sonuc.length} pozisyon · ${new Set(sonuc.map(p => p.ilanId)).size} ilan`;
            reset.hidden = !filtreVar();
            alarmMetin.textContent = filtreVar() ? 'Bu arama için alarm kur' : 'İlan alarmı kur';

            // Geniş ekranda ilk sonuç kendiliğinden açılır; dar ekranda kullanıcı seçer.
            if (!sonuc.some(p => p.id === seciliPoz)) {
                seciliPoz = !dar.matches && sonuc.length ? sonuc[0].id : null;
                mobilDetay = false;
            }
            liste.innerHTML = sonuc.map(p => `<li><button type="button" class="job-card" data-poz="${p.id}">${kartIcerik(p)}</button></li>`).join('');
            liste.hidden = sonuc.length === 0;
            empty.hidden = sonuc.length !== 0;
            detayCiz();
        }

        function filtreVarIlDisinda() {
            return Object.values(f).some(sel => sel.value) || ne.value.trim() !== '' || !!ekFiltre.unvan;
        }

        function filtreDegisti() {
            hashTemizle();
            render();
        }

        aramaForm.addEventListener('submit', e => {
            e.preventDefault();
            if (ilCoz()) filtreDegisti();
        });
        ne.addEventListener('input', filtreDegisti);
        // Listeden seçilen ya da tam yazılan il hemen uygulanır; yarım metin çıkışta denetlenir.
        nerede.addEventListener('input', () => {
            aramaHata.hidden = true;
            const plaka = ilBul(nerede.value);
            if (plaka && plaka !== ilSecili) {
                ilAyarla(plaka);
                filtreDegisti();
            } else if (!nerede.value.trim() && ilSecili) {
                ilAyarla('');
                filtreDegisti();
            }
        });
        nerede.addEventListener('change', () => { if (ilCoz()) filtreDegisti(); });
        Object.values(f).forEach(sel => sel.addEventListener('change', filtreDegisti));

        chips.addEventListener('click', e => {
            const btn = e.target.closest('[data-filtre]');
            if (!btn) return;
            ekFiltre[btn.dataset.filtre] = null;
            filtreDegisti();
        });

        reset.addEventListener('click', () => {
            Object.values(f).forEach(sel => { sel.value = ''; });
            ne.value = '';
            ilAyarla('');
            ekFiltre = { kurum: null, unvan: null };
            filtreDegisti();
        });

        liste.addEventListener('click', e => {
            const kart = e.target.closest('[data-poz]');
            if (!kart) return;
            seciliPoz = Number(kart.dataset.poz);
            history.replaceState(null, '', `#poz-${seciliPoz}`);
            mobilDetay = dar.matches;
            detayCiz();
            if (mobilDetay) sonuclar.scrollIntoView({ block: 'start' });
        });

        detay.addEventListener('click', e => {
            const kurumBtn = e.target.closest('[data-kurum-filtre]');
            const digerBtn = e.target.closest('[data-poz-sec]');
            const alarmBtn = e.target.closest('[data-alarm-benzer]');
            if (e.target.closest('[data-geri]')) {
                mobilDetay = false;
                detayCiz();
                const kart = liste.querySelector(`[data-poz="${seciliPoz}"]`);
                if (kart) kart.focus();
            } else if (kurumBtn) {
                ekFiltre.kurum = kurumBtn.dataset.kurumFiltre;
                filtreDegisti();
            } else if (digerBtn) {
                seciliPoz = Number(digerBtn.dataset.pozSec);
                history.replaceState(null, '', `#poz-${seciliPoz}`);
                detayCiz();
            } else if (alarmBtn) {
                // Benzer ilanlar: aynı il, aynı statü ve aynı ünvan; alarm sayfasında değiştirilebilir.
                const p = pozisyonlar.find(x => x.id === Number(alarmBtn.dataset.alarmBenzer));
                if (p) depoYaz('sessionStorage', TASLAK_KEY, {
                    iller: p.yurtGeneli ? [YURT_GENELI] : p.plakalar, turler: [], statuler: p.statu ? [p.statu] : [], meslekler: [], kelimeler: [p.unvan]
                });
            }
        });

        // Seçili filtreler alarm formuna taşınır; kurum ve ünvan anahtar kelime olarak geçer.
        alarmLink.addEventListener('click', () => {
            const kelimeler = [];
            if (ne.value.trim()) kelimeler.push(ne.value.trim());
            if (ekFiltre.unvan) kelimeler.push(UNVAN.get(ekFiltre.unvan).ad);
            if (ekFiltre.kurum) kelimeler.push(kurumlar.get(ekFiltre.kurum).ad);
            depoYaz('sessionStorage', TASLAK_KEY, {
                iller: ilSecili ? [ilSecili] : [],
                turler: f.tur.value ? [f.tur.value] : [],
                statuler: f.statu.value ? [f.statu.value] : [],
                meslekler: f.meslek.value ? [f.meslek.value] : [],
                kelimeler
            });
        });

        window.addEventListener('hashchange', () => {
            hashOku();
            mobilDetay = seciliPoz != null;
            render();
        });
        const ekranDegisti = () => { if (!dar.matches) mobilDetay = false; render(); };
        if (dar.addEventListener) dar.addEventListener('change', ekranDegisti);
        else if (dar.addListener) dar.addListener(ekranDegisti);

        hashOku();
        // Ana sayfadaki arama kutusundan gelindiyse aranan kelime ve il uygulanır.
        const arama = depoOku('sessionStorage', ARAMA_KEY);
        if (arama && typeof arama === 'object') {
            depoYaz('sessionStorage', ARAMA_KEY, null);
            if (typeof arama.q === 'string') ne.value = arama.q;
            if (typeof arama.il === 'string' && ilGecerli(arama.il)) ilAyarla(arama.il);
        }
        mobilDetay = seciliPoz != null;
        render();
        const secili = liste.querySelector('[aria-current="true"]');
        if (secili && seciliPoz != null && window.location.hash.startsWith('#poz-')) secili.scrollIntoView({ block: 'nearest' });
    }

    // ---------- Kurumlar ----------
    function basHarfler(ad) {
        return ad.split(/\s+/).filter(k => k && !/^(ve|ile)$/i.test(k)).slice(0, 2)
            .map(k => k.charAt(0).toLocaleUpperCase('tr')).join('');
    }

    function initKurumlar() {
        const kurumPoz = groupBy(pozisyonlar, 'kurumId');

        function kurumKart(k, poz) {
            const statuler = [...new Set(poz.map(p => p.statuAd).filter(Boolean))];
            const ilanSayisi = new Set(poz.map(p => p.ilanId)).size;
            return `<li class="company-card">
                <div class="company-top">
                    <span class="avatar" aria-hidden="true">${esc(basHarfler(k.ad))}</span>
                    <div class="company-id">
                        <p class="company-name">${esc(k.ad)}</p>
                        <p class="company-meta">${KONUM}${esc(ilEtiket(k.il))} · ${ilanSayisi} ilan</p>
                    </div>
                </div>
                ${statuler.length ? `<span class="job-tags">${statuler.map(s => `<span class="chip-sm">${esc(s)}</span>`).join('')}</span>` : ''}
                <a class="company-link" href="ilanlar.html#kurum-${esc(k.id)}">${poz.length} açık pozisyon →</a>
            </li>`;
        }

        document.getElementById('kurum-gruplari').innerHTML = S.KURUM_GRUPLARI.map(g => {
            const bloklar = S.KURUM_TURLERI.filter(t => t.grup === g.id).map(t => {
                const ks = [...kurumPoz.keys()]
                    .map(id => kurumlar.get(id))
                    .filter(k => (KURUM_TUR.has(k.tur) ? k.tur : 'diger-kurum') === t.id)
                    .sort((a, b) => collator.compare(a.ad, b.ad));
                if (!ks.length) return '';
                return `<div class="sub-group">
                    <h3 class="sub-head">${esc(t.ad)}</h3>
                    <ul class="card-grid">${ks.map(k => kurumKart(k, kurumPoz.get(k.id))).join('')}</ul>
                </div>`;
            }).join('');
            return bloklar ? `<section class="group"><h2 class="group-head">${esc(g.ad)}</h2>${bloklar}</section>` : '';
        }).join('');
    }

    // ---------- Ünvanlar ----------
    function initUnvanlar() {
        function unvanSatiri(id, poz) {
            const alanlar = [...new Set(poz.map(p => p.alan).filter(Boolean))];
            const kurumAdlari = [...new Set(poz.map(p => p.kurum))];
            const alt = alanlar.length ? `Alanlar: ${kisalt(alanlar, 'alan')}` : kisalt(kurumAdlari, 'kurum');
            const ad = `<span class="category-name">${esc(poz[0].unvan)}</span><span class="category-num">${poz.length}</span>`;
            return `<li>
                ${UNVAN.has(id) ? `<a href="ilanlar.html#unvan-${esc(id)}">${ad}</a>` : `<span class="category-row">${ad}</span>`}
                <p class="category-sub">${esc(alt)}</p>
            </li>`;
        }

        document.getElementById('unvan-gruplari').innerHTML = S.MESLEK_GRUPLARI.map(g => {
            const poz = pozisyonlar.filter(p => p.meslek === g.id);
            if (!poz.length) return '';
            const unvanlar = [...groupBy(poz, 'unvanId').entries()]
                .sort((a, b) => b[1].length - a[1].length || collator.compare(a[1][0].unvan, b[1][0].unvan));
            return `<li class="category-card">
                <h2 class="category-head">${esc(g.ad)}</h2>
                <p class="category-total">${poz.length} pozisyon</p>
                <ul class="category-list">${unvanlar.map(([id, ps]) => unvanSatiri(id, ps)).join('')}</ul>
            </li>`;
        }).join('');
    }

    // ---------- İlan alarmı ----------
    function initAlarm() {
        const $ = id => document.getElementById(id);
        const form = $('alarm-form');
        const kelime = $('alarm-kelime');
        const bildirim = $('alarm-bildirim');
        const bildirimSatiri = $('bildirim-satiri');
        const meslekKutusu = $('alarm-meslekler');
        const onizleme = $('alarm-onizleme');
        const mesaj = $('alarm-mesaj');
        const liste = $('alarm-list');
        const bos = $('alarm-bos');
        const baslik = $('alarmlarim');

        let alarmlar = alarmlariYukle();
        let silinecek = null;

        const depoCalisiyor = depoYaz('localStorage', 'kamuilan.test', 1) && depoYaz('localStorage', 'kamuilan.test', null);
        $('depo-uyari').hidden = depoCalisiyor;

        if (!('Notification' in window)) {
            bildirimSatiri.hidden = true;
        } else if (Notification.permission === 'denied') {
            bildirim.disabled = true;
            bildirimSatiri.querySelector('span').textContent = 'Tarayıcı bildirimleri bu site için kapalı. Yeni pozisyonlar sitede gösterilir.';
        }

        // Seçenekler: 81 il ve sözlüğün tamamı; ileride açılacak ilanlar için de alarm kurulabilsin.
        const ilSel = $('alarm-il');
        const ilSayisi = ilSay(pozisyonlar);
        const yg = ilSayisi.get(YURT_GENELI);
        ilSel.appendChild(secenek(YURT_GENELI, yg ? `${YURT_GENELI_AD} · ${yg} pozisyon` : YURT_GENELI_AD));
        (window.ILLER || []).slice().sort((a, b) => collator.compare(a.il, b.il)).forEach(k => {
            const n = ilSayisi.get(k.plaka);
            ilSel.appendChild(secenek(k.plaka, n ? `${k.il} (${k.plaka}) · ${n} pozisyon` : `${k.il} (${k.plaka})`));
        });
        grupluDoldur($('alarm-tur'), S.KURUM_GRUPLARI, S.KURUM_TURLERI);
        grupluDoldur($('alarm-statu'), S.STATU_GRUPLARI, S.STATULER);
        meslekKutusu.innerHTML = S.MESLEK_GRUPLARI.map(m =>
            `<label class="pill"><input type="checkbox" id="alarm-meslek-${esc(m.id)}" value="${esc(m.id)}"> ${esc(m.ad)}</label>`).join('');

        const secim = {
            iller: cokluSecim(ilSel, $('alarm-il-secili'),
                { html: p => `${plakaBadge(p)} ${esc(ilEtiket(p))}`, metin: ilEtiket }, onizlemeGuncelle),
            turler: cokluSecim($('alarm-tur'), $('alarm-tur-secili'),
                { html: v => esc(turEtiket(v)), metin: turEtiket }, onizlemeGuncelle),
            statuler: cokluSecim($('alarm-statu'), $('alarm-statu-secili'),
                { html: v => esc(statuEtiket(v)), metin: statuEtiket }, onizlemeGuncelle)
        };

        function kriterler() {
            return {
                iller: secim.iller.degerler(),
                turler: secim.turler.degerler(),
                statuler: secim.statuler.degerler(),
                meslekler: [...meslekKutusu.querySelectorAll('input:checked')].map(x => x.value),
                kelimeler: [...new Set(kelime.value.split(',').map(s => s.trim()).filter(Boolean))]
            };
        }

        function imza(a) {
            return JSON.stringify([a.iller, a.turler, a.statuler, a.meslekler].map(x => x.slice().sort())
                .concat([a.kelimeler.map(norm).sort()]));
        }

        function onizlemeGuncelle() {
            const n = uyanlar(kriterler()).length;
            onizleme.textContent = n
                ? `Bu kriterlere şu an ${n} pozisyon uyuyor.`
                : 'Bu kriterlere şu an uyan pozisyon yok. Uyan bir ilan eklendiğinde haber verilir.';
        }

        function formuSifirla() {
            Object.values(secim).forEach(s => s.ayarla([]));
            meslekKutusu.querySelectorAll('input').forEach(x => { x.checked = false; });
            kelime.value = '';
            bildirim.checked = false;
            onizlemeGuncelle();
        }

        // Bu ziyarette "Yeni" etiketiyle gösterilecek pozisyonlar: alarm id → pozisyon id kümesi.
        let yeniGosterilen = new Map();

        function ciz() {
            bos.hidden = alarmlar.length > 0;
            liste.innerHTML = alarmlar.map(a => {
                const hepsi = uyanlar(a);
                const yeniSet = yeniGosterilen.get(a.id) || new Set();
                const yeni = hepsi.filter(p => yeniSet.has(p.id));
                const digerleri = hepsi.filter(p => !yeniSet.has(p.id));
                const tarih = new Date(a.olusturma);
                const meta = [
                    isNaN(tarih) ? '' : `Kuruluş: ${tarihBicim.format(tarih)}`,
                    hepsi.length ? `şu an ${hepsi.length} pozisyon uyuyor` : 'şu an uyan pozisyon yok',
                    a.tarayici ? 'tarayıcı bildirimi açık' : ''
                ].filter(Boolean).join(' · ');
                const islemler = silinecek === a.id
                    ? `<span>Bu alarm silinsin mi?</span>
                       <button type="button" class="btn-danger" data-sil-onay="${esc(a.id)}">Sil</button>
                       <button type="button" class="btn-text" data-vazgec>Vazgeç</button>`
                    : `<button type="button" class="btn-text" data-sil="${esc(a.id)}">Alarmı sil</button>`;

                return `<li class="alarm-card${yeni.length ? ' has-new' : ''}">
                    <div class="alarm-head">
                        <div>
                            <h3>${esc(alarmAdi(a))}</h3>
                            <p class="alarm-meta">${esc(meta)}</p>
                        </div>
                        ${yeni.length ? `<span class="new-pill">${yeni.length} yeni</span>` : ''}
                    </div>
                    ${yeni.length ? `<ul class="job-list compact">${yeni.map(p => kartLink(p, true)).join('')}</ul>` : ''}
                    ${digerleri.length ? `<details>
                        <summary>${yeni.length ? 'Uyan diğer pozisyonlar' : 'Uyan pozisyonlar'} (${digerleri.length})</summary>
                        <ul class="job-list compact">${digerleri.map(p => kartLink(p)).join('')}</ul>
                    </details>` : ''}
                    <div class="alarm-actions">${islemler}</div>
                </li>`;
            }).join('');
        }

        meslekKutusu.addEventListener('change', onizlemeGuncelle);
        kelime.addEventListener('input', onizlemeGuncelle);

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const k = kriterler();
            if (alarmlar.some(a => imza(a) === imza(k))) {
                mesaj.textContent = 'Bu kriterlerle kurulmuş bir alarmınız zaten var.';
                return;
            }

            const notlar = [];
            let tarayici = false;
            if (bildirim.checked) {
                tarayici = (await bildirimIzniIste()) === 'granted';
                if (!tarayici) notlar.push('Tarayıcı bildirim izni vermedi; yeni pozisyonlar yine de sitede gösterilecek.');
            }

            // Şu an uyan pozisyonlar listede hemen görünür; bildirim yalnızca bundan sonra eklenenler için gelir.
            const simdiUyan = uyanlar(k).map(p => p.id);
            const alarm = alarmBicimle({
                ...k,
                id: String(Date.now()),
                tarayici,
                olusturma: new Date().toISOString(),
                gorulen: simdiUyan,
                bildirilen: simdiUyan.slice()
            });
            alarmlar.unshift(alarm);
            if (!alarmlariKaydet(alarmlar)) {
                notlar.push('Tarayıcınız kaydetmeye izin vermedi; bu alarm sayfayı kapatınca silinir.');
            }

            mesaj.textContent = [`Alarm kuruldu: ${alarmAdi(alarm)}.`, ...notlar].join(' ');
            formuSifirla();
            ciz();
        });

        liste.addEventListener('click', e => {
            const sil = e.target.closest('[data-sil]');
            const onay = e.target.closest('[data-sil-onay]');
            if (sil) {
                silinecek = sil.dataset.sil;
                ciz();
                const onayBtn = liste.querySelector('[data-sil-onay]');
                if (onayBtn) onayBtn.focus();
            } else if (onay) {
                alarmlar = alarmlar.filter(a => a.id !== onay.dataset.silOnay);
                silinecek = null;
                alarmlariKaydet(alarmlar);
                mesaj.textContent = 'Alarm silindi.';
                ciz();
                baslik.focus();
            } else if (e.target.closest('[data-vazgec]')) {
                silinecek = null;
                ciz();
            }
        });

        // İlanlar sayfasından gelindiyse seçili filtreleri forma aktar.
        const taslak = depoOku('sessionStorage', TASLAK_KEY);
        if (taslak && typeof taslak === 'object') {
            depoYaz('sessionStorage', TASLAK_KEY, null);
            secim.iller.ayarla(dizi(taslak.iller));
            secim.turler.ayarla(dizi(taslak.turler));
            secim.statuler.ayarla(dizi(taslak.statuler));
            const meslekler = dizi(taslak.meslekler);
            meslekKutusu.querySelectorAll('input').forEach(x => { x.checked = meslekler.includes(x.value); });
            kelime.value = dizi(taslak.kelimeler).join(', ');
            if (imza(kriterler()) !== imza({ iller: [], turler: [], statuler: [], meslekler: [], kelimeler: [] })) {
                mesaj.textContent = 'Arama kriterleriniz forma aktarıldı. Kontrol edip alarmı kurun.';
            }
        }
        onizlemeGuncelle();

        // Yeni pozisyonları bu ziyarette "Yeni" etiketiyle göster, sonra görüldü say:
        // menüdeki sayaç sıfırlanır, bir sonraki ziyarette etiket kalkar.
        yeniGosterilen = new Map(alarmlar.map(a => [a.id, new Set(yeniUyanlar(a).map(p => p.id))]));
        ciz();
        let degisti = false;
        alarmlar.forEach(a => {
            uyanlar(a).forEach(p => {
                if (!a.gorulen.includes(p.id)) { a.gorulen.push(p.id); degisti = true; }
                if (!a.bildirilen.includes(p.id)) { a.bildirilen.push(p.id); degisti = true; }
            });
        });
        if (degisti) alarmlariKaydet(alarmlar);
        rozetiGuncelle(0);
    }

    function init() {
        const page = document.body.dataset.page;
        if (page === 'index') initIndex();
        else if (page === 'ilanlar') initIlanlar();
        else if (page === 'kurumlar') initKurumlar();
        else if (page === 'unvanlar') initUnvanlar();

        if (page === 'alarm') initAlarm();
        else alarmDurumunuGoster();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
