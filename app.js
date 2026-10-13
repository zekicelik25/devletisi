// app.js
// Tüm sayfaların davranışı. Hangi sayfada olduğumuz <body data-page="..."> ile belirlenir.
// Veri data.js'ten (KURUMLAR, ILANLAR), sınıflandırma siniflandirma.js'ten, il adları iller.js'ten gelir.
(function () {
    const S = window.SINIFLANDIRMA;
    const collator = new Intl.Collator('tr');
    const ALARM_KEY = 'kamuilan.alarmlar.v2';
    const ESKI_ALARM_KEY = 'kamuilan.alarmlar.v1';
    const TASLAK_KEY = 'kamuilan.alarm-taslak';
    const ZIL = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';

    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Büyük/küçük harf ve Türkçe karakter farkını yok sayar: "Öğretim" ile "ogretim" eşleşir.
    function norm(s) {
        return String(s).toLocaleLowerCase('tr').replace(/ı/g, 'i')
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
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
    const IL = new Map((window.ILLER || []).map(x => [x.plaka, x.il]));

    function veriUyarisi(...parca) {
        console.warn('data.js:', ...parca);
    }

    // ---------- Veri: kurum → ilan → pozisyon ----------
    // Sayfalar düz bir pozisyon listesiyle çalışır; her pozisyon kurum ve ilan bilgisini taşır.
    const kurumlar = sozluk(window.KURUMLAR || []);
    const pozisyonlar = [];

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

                const unvan = UNVAN.get(poz.unvan);
                const statu = poz.statu ? STATU.get(poz.statu) : null;
                if (!unvan) veriUyarisi('bilinmeyen ünvan:', poz.unvan, `(pozisyon ${poz.id})`);
                if (poz.statu && !statu) veriUyarisi('bilinmeyen statü:', poz.statu, `(pozisyon ${poz.id})`);
                if (poz.egitim && !EGITIM.has(poz.egitim)) veriUyarisi('bilinmeyen eğitim düzeyi:', poz.egitim, `(pozisyon ${poz.id})`);
                if (poz.yontem && !YONTEM.has(poz.yontem)) veriUyarisi('bilinmeyen alım yöntemi:', poz.yontem, `(pozisyon ${poz.id})`);

                const plaka = poz.il || kurum.il;
                const p = {
                    id: poz.id,
                    ilanId: ilan.id,
                    kurumId: kurum.id,
                    kurum: kurum.ad,
                    kurumTur: tur ? tur.id : 'diger-kurum',
                    kurumTurAd: tur ? tur.ad : 'Diğer kamu kurumu',
                    kurumGrup: tur ? tur.grup : 'diger',
                    unvanId: String(poz.unvan),
                    unvan: unvan ? unvan.ad : String(poz.unvan),
                    unvanEs: unvan && unvan.es ? unvan.es : [],
                    meslek: unvan ? unvan.grup : 'diger',
                    alan: poz.alan || '',
                    statu: statu ? statu.id : null,
                    statuAd: statu ? statu.ad : null,
                    statuGrup: statu ? statu.grup : null,
                    adet: typeof poz.adet === 'number' ? poz.adet : null,
                    egitim: EGITIM.has(poz.egitim) ? poz.egitim : null,
                    yontem: YONTEM.has(poz.yontem) ? poz.yontem : null,
                    plaka,
                    il: IL.get(plaka) || plaka,
                    sonBasvuru: ilan.sonBasvuru || null,
                    link: typeof ilan.link === 'string' && /^https?:\/\//i.test(ilan.link) ? ilan.link : null
                };
                p.arama = norm([p.unvan, ...p.unvanEs, p.alan, p.kurum, p.il].join(' '));
                pozisyonlar.push(p);
            });
        });
        pozisyonlar.sort((a, b) => b.id - a.id); // en yeni pozisyon üstte
    })();

    // ---------- Ortak görünüm parçaları ----------
    const tarihBicim = new Intl.DateTimeFormat('tr', { day: 'numeric', month: 'long', year: 'numeric' });

    function tarihYaz(gun) {
        const d = new Date(`${gun}T00:00:00`);
        return isNaN(d) ? '' : tarihBicim.format(d);
    }

    function ilEtiket(plaka) {
        return IL.get(plaka) || plaka;
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
        return `<span class="plaka" title="Plaka kodu">${esc(plaka)}</span>`;
    }

    function pozisyonBasligi(p) {
        return p.alan ? `${p.unvan} · ${p.alan}` : p.unvan;
    }

    function pozisyonRow(p, yeni) {
        const ek = [];
        if (p.adet) ek.push(`${p.adet} kadro`);
        if (p.egitim) ek.push(EGITIM.get(p.egitim).ad);
        if (p.sonBasvuru) ek.push(`son başvuru ${tarihYaz(p.sonBasvuru)}`);
        const link = p.link ? ` · <a class="row-link" href="${esc(p.link)}" target="_blank" rel="noopener">İlan metni</a>` : '';
        return `<li class="row">
            ${plakaBadge(p.plaka)}
            <div class="row-main">
                <p class="row-title">${esc(pozisyonBasligi(p))}</p>
                <p class="row-sub">${esc([p.kurum, ...ek].join(' · '))}${link}</p>
            </div>
            <div class="row-meta">
                ${yeni ? '<span class="tag new">Yeni</span>' : ''}
                ${p.statuAd ? `<span class="tag statu">${esc(p.statuAd)}</span>` : ''}
                <span class="tag">${esc(p.kurumTurAd)}</span>
                <span class="tag plain">${esc(p.il)}</span>
            </div>
        </li>`;
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
        if (a.iller.length && !a.iller.includes(p.plaka)) return false;
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
        const ilSayilari = say(pozisyonlar, 'plaka');

        document.getElementById('stats').innerHTML = [
            [new Set(pozisyonlar.map(p => p.ilanId)).size, 'aktif ilan'],
            [pozisyonlar.length, 'pozisyon'],
            [new Set(pozisyonlar.map(p => p.kurumId)).size, 'kurum'],
            [ilSayilari.size, 'il']
        ].map(([n, ad]) => `<li><strong>${n}</strong><span>${ad}</span></li>`).join('');

        // Harita: ilan sayısına göre gri tonlar, üzerine gelinen il kırmızı.
        const seviye = n => (n >= 10 ? 4 : n >= 5 ? 3 : n >= 2 ? 2 : 1);
        const readout = document.getElementById('map-readout');
        const defaultReadout = readout.innerHTML;
        document.querySelectorAll('#turkey-map path').forEach(path => {
            const plaka = path.dataset.plaka;
            const il = path.dataset.il;
            const n = ilSayilari.get(plaka) || 0;

            const show = () => {
                readout.innerHTML = n
                    ? `<b>${esc(plaka)} · ${esc(il)}</b> — ${n} pozisyon, görmek için tıklayın`
                    : `<b>${esc(plaka)} · ${esc(il)}</b> — şu an ilan yok`;
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

        document.getElementById('il-chips').innerHTML = [...ilSayilari.keys()]
            .sort((a, b) => collator.compare(ilEtiket(a), ilEtiket(b)))
            .map(p => `<li><a class="chip" href="ilanlar.html#${esc(p)}">
                ${plakaBadge(p)} ${esc(ilEtiket(p))} <span class="count">${ilSayilari.get(p)}</span>
            </a></li>`).join('');

        // Sınıflandırmaya göre göz at: her satır ilanlar sayfasını o filtreyle açar.
        const satir = (href, ad, n) => `<li><a href="ilanlar.html#${esc(href)}"><span>${esc(ad)}</span><span class="browse-count">${n}</span></a></li>`;
        const kolon = (baslik, satirlar) => (satirlar ? `<div class="browse-col"><h3>${baslik}</h3><ul class="browse-list">${satirlar}</ul></div>` : '');
        const statuSay = say(pozisyonlar, 'statuGrup');
        const turSay = say(pozisyonlar, 'kurumTur');
        const meslekSay = say(pozisyonlar, 'meslek');
        document.getElementById('browse').innerHTML = [
            kolon('Çalışma statüsü', S.STATU_GRUPLARI.filter(g => statuSay.get(g.id))
                .map(g => satir(`statu-grup-${g.id}`, g.ad, statuSay.get(g.id))).join('')),
            kolon('Kurum türü', S.KURUM_TURLERI.filter(t => turSay.get(t.id))
                .map(t => satir(`tur-${t.id}`, t.ad, turSay.get(t.id))).join('')),
            kolon('Meslek grubu', S.MESLEK_GRUPLARI.filter(m => meslekSay.get(m.id))
                .map(m => satir(`meslek-${m.id}`, m.ad, meslekSay.get(m.id))).join(''))
        ].join('');

        document.getElementById('recent').innerHTML = pozisyonlar.slice(0, 4).map(p => pozisyonRow(p)).join('');
    }

    // ---------- İlanlar ----------
    function initIlanlar() {
        const $ = id => document.getElementById(id);
        const f = { il: $('f-il'), tur: $('f-tur'), statu: $('f-statu'), meslek: $('f-meslek'), egitim: $('f-egitim') };
        const ara = $('f-ara');
        const list = $('ilan-list');
        const count = $('result-count');
        const empty = $('empty');
        const heading = $('ilanlar-heading');
        const reset = $('reset');
        const chips = $('aktif-filtreler');
        const alarmLink = $('alarm-kur-link');
        const alarmMetin = $('alarm-kur-metin');
        let ekFiltre = { kurum: null, unvan: null }; // yalnızca bağlantıyla gelen filtreler

        // Seçenekler: yalnızca sitede pozisyonu olan değerler, sayılarıyla.
        const ilSay = say(pozisyonlar, 'plaka');
        [...ilSay.keys()].sort((a, b) => collator.compare(ilEtiket(a), ilEtiket(b)))
            .forEach(p => f.il.appendChild(secenek(p, `${ilEtiket(p)} (${p}) · ${ilSay.get(p)}`)));
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
        Object.values(f).forEach(sel => { sel.closest('.field').hidden = sel.options.length <= 1; });

        function secenekVar(sel, deger) {
            return [...sel.options].some(o => o.value === deger);
        }

        // Bağlantıyla gelen filtre: #70 (il), #tur-…, #statu-…, #meslek-…, #egitim-…, #kurum-…, #unvan-…
        // "grup-" ile başlayan değer bir grubun tamamıdır: #statu-grup-sozlesmeli
        function hashOku() {
            Object.values(f).forEach(sel => { sel.value = ''; });
            ekFiltre = { kurum: null, unvan: null };
            let h = '';
            try { h = decodeURIComponent(window.location.hash.slice(1)); } catch (e) { return; }
            if (/^\d{2}$/.test(h)) {
                if (secenekVar(f.il, h)) f.il.value = h;
                return;
            }
            const m = h.match(/^(kurum|unvan|tur|statu|meslek|egitim)-(.+)$/);
            if (!m) return;
            const deger = m[2].startsWith('grup-') ? `grup:${m[2].slice(5)}` : m[2];
            if (m[1] === 'kurum') ekFiltre.kurum = kurumlar.has(deger) ? deger : null;
            else if (m[1] === 'unvan') ekFiltre.unvan = UNVAN.has(deger) ? deger : null;
            else if (secenekVar(f[m[1]], deger)) f[m[1]].value = deger;
        }

        function hashTemizle() {
            if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
        }

        function filtreVar() {
            return Object.values(f).some(sel => sel.value) || ara.value.trim() !== '' || !!ekFiltre.kurum || !!ekFiltre.unvan;
        }

        function render() {
            const q = norm(ara.value);
            const sonuc = pozisyonlar.filter(p =>
                (!f.il.value || p.plaka === f.il.value) &&
                (!f.tur.value || degerUyar(f.tur.value, p.kurumTur, p.kurumGrup)) &&
                (!f.statu.value || (p.statu && degerUyar(f.statu.value, p.statu, p.statuGrup))) &&
                (!f.meslek.value || p.meslek === f.meslek.value) &&
                (!f.egitim.value || p.egitim === f.egitim.value) &&
                (!ekFiltre.kurum || p.kurumId === ekFiltre.kurum) &&
                (!ekFiltre.unvan || p.unvanId === ekFiltre.unvan) &&
                (!q || p.arama.includes(q)));

            const kurum = ekFiltre.kurum ? kurumlar.get(ekFiltre.kurum) : null;
            heading.textContent = kurum ? `${kurum.ad} ilanları`
                : f.il.value ? `${ilEtiket(f.il.value)} ilindeki ilanlar`
                : filtreVar() ? 'Filtrelenmiş ilanlar' : 'Tüm aktif ilanlar';

            const aktif = [];
            if (kurum) aktif.push(['kurum', `Kurum: ${kurum.ad}`]);
            if (ekFiltre.unvan) aktif.push(['unvan', `Ünvan: ${UNVAN.get(ekFiltre.unvan).ad}`]);
            chips.innerHTML = aktif.map(([k, metin]) => `<li class="chip">${esc(metin)}
                <button type="button" class="chip-x" data-filtre="${k}" aria-label="Kaldır: ${esc(metin)}">×</button></li>`).join('');
            chips.hidden = aktif.length === 0;

            list.innerHTML = sonuc.map(p => pozisyonRow(p)).join('');
            list.hidden = sonuc.length === 0;
            empty.hidden = sonuc.length !== 0;
            count.textContent = `${sonuc.length} pozisyon · ${new Set(sonuc.map(p => p.ilanId)).size} ilan`;
            reset.hidden = !filtreVar();
            alarmMetin.textContent = filtreVar() ? 'Bu arama için alarm kur' : 'İlan alarmı kur';
        }

        Object.values(f).forEach(sel => sel.addEventListener('change', () => { hashTemizle(); render(); }));
        ara.addEventListener('input', render);
        chips.addEventListener('click', e => {
            const btn = e.target.closest('[data-filtre]');
            if (!btn) return;
            ekFiltre[btn.dataset.filtre] = null;
            hashTemizle();
            render();
        });
        reset.addEventListener('click', () => {
            Object.values(f).forEach(sel => { sel.value = ''; });
            ara.value = '';
            ekFiltre = { kurum: null, unvan: null };
            hashTemizle();
            render();
        });

        // Seçili filtreler alarm formuna taşınır; kurum ve ünvan anahtar kelime olarak geçer.
        alarmLink.addEventListener('click', () => {
            const kelimeler = [];
            if (ara.value.trim()) kelimeler.push(ara.value.trim());
            if (ekFiltre.unvan) kelimeler.push(UNVAN.get(ekFiltre.unvan).ad);
            if (ekFiltre.kurum) kelimeler.push(kurumlar.get(ekFiltre.kurum).ad);
            depoYaz('sessionStorage', TASLAK_KEY, {
                iller: f.il.value ? [f.il.value] : [],
                turler: f.tur.value ? [f.tur.value] : [],
                statuler: f.statu.value ? [f.statu.value] : [],
                meslekler: f.meslek.value ? [f.meslek.value] : [],
                kelimeler
            });
        });

        window.addEventListener('hashchange', () => { hashOku(); render(); });
        hashOku();
        render();
    }

    // ---------- Kurumlar ----------
    function initKurumlar() {
        const kurumPoz = groupBy(pozisyonlar, 'kurumId');

        function kurumRow(k, poz) {
            const statuler = [...new Set(poz.map(p => p.statuAd).filter(Boolean))];
            const ilanSayisi = new Set(poz.map(p => p.ilanId)).size;
            return `<li class="row">
                ${plakaBadge(k.il)}
                <div class="row-main">
                    <p class="row-title">${esc(k.ad)}</p>
                    <p class="row-sub">${esc(ilEtiket(k.il))} · ${ilanSayisi} ilan, ${poz.length} pozisyon</p>
                </div>
                <div class="row-meta">
                    ${statuler.map(s => `<span class="tag statu">${esc(s)}</span>`).join('')}
                    <a class="row-action" href="ilanlar.html#kurum-${esc(k.id)}">İlanları gör</a>
                </div>
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
                    <ul class="rows">${ks.map(k => kurumRow(k, kurumPoz.get(k.id))).join('')}</ul>
                </div>`;
            }).join('');
            return bloklar ? `<section class="group"><h2 class="group-head">${esc(g.ad)}</h2>${bloklar}</section>` : '';
        }).join('');
    }

    // ---------- Ünvanlar ----------
    function initUnvanlar() {
        function unvanRow(id, poz) {
            const alanlar = [...new Set(poz.map(p => p.alan).filter(Boolean))];
            const kurumAdlari = [...new Set(poz.map(p => p.kurum))];
            const statuler = [...new Set(poz.map(p => p.statuAd).filter(Boolean))];
            const iller = [...new Set(poz.map(p => p.il))];
            const alt = alanlar.length ? `Alanlar: ${alanlar.join(', ')}` : kurumAdlari.join(', ');
            const link = UNVAN.has(id) ? `<a class="row-action" href="ilanlar.html#unvan-${esc(id)}">İlanları gör</a>` : '';
            return `<li class="row">
                <span class="num" title="Pozisyon sayısı">${poz.length}</span>
                <div class="row-main">
                    <p class="row-title">${esc(poz[0].unvan)}</p>
                    <p class="row-sub">${esc(alt)}</p>
                </div>
                <div class="row-meta">
                    ${statuler.map(s => `<span class="tag statu">${esc(s)}</span>`).join('')}
                    ${iller.map(il => `<span class="tag plain">${esc(il)}</span>`).join('')}
                    ${link}
                </div>
            </li>`;
        }

        document.getElementById('unvan-gruplari').innerHTML = S.MESLEK_GRUPLARI.map(g => {
            const poz = pozisyonlar.filter(p => p.meslek === g.id);
            if (!poz.length) return '';
            const unvanlar = [...groupBy(poz, 'unvanId').entries()]
                .sort((a, b) => b[1].length - a[1].length || collator.compare(a[1][0].unvan, b[1][0].unvan));
            return `<section class="group">
                <h2 class="group-head">${esc(g.ad)}</h2>
                <ul class="rows">${unvanlar.map(([id, ps]) => unvanRow(id, ps)).join('')}</ul>
            </section>`;
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
        const ilSay = say(pozisyonlar, 'plaka');
        (window.ILLER || []).slice().sort((a, b) => collator.compare(a.il, b.il)).forEach(k => {
            const n = ilSay.get(k.plaka);
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
                    ${yeni.length ? `<ul class="rows compact">${yeni.map(p => pozisyonRow(p, true)).join('')}</ul>` : ''}
                    ${digerleri.length ? `<details>
                        <summary>${yeni.length ? 'Uyan diğer pozisyonlar' : 'Uyan pozisyonlar'} (${digerleri.length})</summary>
                        <ul class="rows compact">${digerleri.map(p => pozisyonRow(p)).join('')}</ul>
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
