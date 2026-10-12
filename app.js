// app.js
// Tüm sayfaların davranışı. Hangi sayfada olduğumuz <body data-page="..."> ile belirlenir.
(function () {
    // En yeni ilan (en büyük id) en üstte.
    const ilanlar = (window.ILANLAR || []).slice().sort((a, b) => b.id - a.id);
    const collator = new Intl.Collator('tr');
    const KURUM_TURLERI = ['Üniversite', 'Belediye', 'Bakanlık', 'Hastane', 'Diğer'];
    const ALARM_KEY = 'kamuilan.alarmlar.v1';
    const TASLAK_KEY = 'kamuilan.alarm-taslak';
    const ZIL = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>';

    (function idKontrol() {
        const kullanilan = new Set();
        ilanlar.forEach(i => {
            if (typeof i.id !== 'number') console.warn('İlanın id numarası yok:', i);
            else if (kullanilan.has(i.id)) console.warn('Aynı id iki ilanda kullanılmış:', i.id);
            kullanilan.add(i.id);
        });
    })();

    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }

    // Büyük/küçük harf ve Türkçe karakter farkını yok sayar: "Öğretim" ile "ogretim" eşleşir.
    function norm(s) {
        return String(s).toLocaleLowerCase('tr').replace(/ı/g, 'i')
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/\s+/g, ' ').trim();
    }

    function groupBy(list, key) {
        const map = new Map();
        list.forEach(item => {
            const k = typeof key === 'function' ? key(item) : item[key];
            if (!map.has(k)) map.set(k, []);
            map.get(k).push(item);
        });
        return map;
    }

    // Plaka koduna göre iller: { "44": { il: "Malatya", ilanlar: [...] } }
    function illerByPlaka() {
        const out = {};
        ilanlar.forEach(i => {
            if (!out[i.plaka]) out[i.plaka] = { il: i.il, plaka: i.plaka, ilanlar: [] };
            out[i.plaka].ilanlar.push(i);
        });
        return out;
    }

    function ilAdi(plaka) {
        const k = (window.ILLER || []).find(x => x.plaka === plaka) || ilanlar.find(x => x.plaka === plaka);
        return k ? k.il : plaka;
    }

    function plakaBadge(plaka) {
        return `<span class="plaka" title="Plaka kodu">${esc(plaka)}</span>`;
    }

    function ilanBasligi(i) {
        return i.alan ? `${i.unvan} · ${i.alan}` : i.unvan;
    }

    function ilanRow(i, yeni) {
        return `<li class="row">
            ${plakaBadge(i.plaka)}
            <div class="row-main">
                <p class="row-title">${esc(ilanBasligi(i))}</p>
                <p class="row-sub">${esc(i.kurum)}</p>
            </div>
            <div class="row-meta">
                ${yeni ? '<span class="tag new">Yeni</span>' : ''}
                <span class="tag">${esc(i.il)}</span>
                <span class="tag plain">${esc(i.tur)}</span>
            </div>
        </li>`;
    }

    function ilanSayisi(n) {
        return `${n} ilan`;
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

    function alarmlariYukle() {
        if (bellekteAlarmlar) return bellekteAlarmlar;
        const liste = depoOku('localStorage', ALARM_KEY);
        if (!Array.isArray(liste)) return [];
        return liste.filter(a => a && typeof a === 'object' && a.id).map(a => ({
            id: String(a.id),
            iller: dizi(a.iller),
            turler: dizi(a.turler),
            kelimeler: dizi(a.kelimeler),
            tarayici: a.tarayici === true,
            olusturma: String(a.olusturma || ''),
            gorulen: Array.isArray(a.gorulen) ? a.gorulen : [],
            bildirilen: Array.isArray(a.bildirilen) ? a.bildirilen : []
        }));
    }

    function alarmlariKaydet(liste) {
        if (depoYaz('localStorage', ALARM_KEY, liste)) {
            bellekteAlarmlar = null;
            return true;
        }
        bellekteAlarmlar = liste;
        return false;
    }

    function ilanTuru(i) {
        return KURUM_TURLERI.includes(i.tur) ? i.tur : 'Diğer';
    }

    function eslesir(alarm, i) {
        if (alarm.iller.length && !alarm.iller.includes(i.plaka)) return false;
        if (alarm.turler.length && !alarm.turler.includes(ilanTuru(i))) return false;
        if (!alarm.kelimeler.length) return true;
        const metin = norm([i.unvan, i.alan || '', i.kurum].join(' '));
        return alarm.kelimeler.some(k => metin.includes(norm(k)));
    }

    function uyanlar(alarm) {
        return ilanlar.filter(i => eslesir(alarm, i));
    }

    function yeniUyanlar(alarm) {
        return uyanlar(alarm).filter(i => !alarm.gorulen.includes(i.id));
    }

    function alarmAdi(a) {
        const parca = [];
        if (a.iller.length) {
            const adlar = a.iller.map(ilAdi);
            parca.push(adlar.length > 3 ? `${adlar.slice(0, 3).join(', ')} ve ${adlar.length - 3} il daha` : adlar.join(', '));
        }
        if (a.turler.length) parca.push(a.turler.join(', '));
        if (a.kelimeler.length) parca.push(a.kelimeler.map(k => `“${k}”`).join(', '));
        return parca.length ? parca.join(' · ') : 'Tüm yeni ilanlar';
    }

    function rozetiGuncelle(sayi) {
        const rozet = document.getElementById('alarm-badge');
        if (!rozet) return;
        rozet.innerHTML = `${sayi}<span class="sr-only"> yeni ilan</span>`;
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

    // Site açıkken, izin verildiyse, henüz bildirilmemiş her yeni ilan için bir tarayıcı bildirimi.
    function tarayiciBildirimiGonder(alarmlar) {
        if (!('Notification' in window) || Notification.permission !== 'granted') return;
        let degisti = false;
        alarmlar.forEach(a => {
            if (!a.tarayici) return;
            yeniUyanlar(a).forEach(i => {
                if (a.bildirilen.includes(i.id)) return;
                try {
                    new Notification(`Yeni ilan: ${ilanBasligi(i)}`, { body: `${i.kurum} · ${i.il}`, tag: `kamu-ilan-${i.id}` });
                } catch (e) {
                    // Bazı mobil tarayıcılar bu yolla bildirim göstermez; uyarı sayfada yine görünür.
                }
                a.bildirilen.push(i.id);
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
        alarmlar.forEach(a => yeniUyanlar(a).forEach(i => yeniler.set(i.id, i)));
        const yeni = [...yeniler.values()];
        rozetiGuncelle(yeni.length);

        const kutu = document.getElementById('alarm-banner');
        if (kutu && yeni.length) {
            const ilk = yeni[0];
            const ek = yeni.length > 1 ? ` ve ${yeni.length - 1} ilan daha` : '';
            kutu.innerHTML = `${ZIL}
                <p><b>${alarmlar.length > 1 ? 'Alarmlarınıza' : 'Alarmınıza'} uyan ${yeni.length} yeni ilan var.</b>
                ${esc(ilanBasligi(ilk))}, ${esc(ilk.kurum)}${ek}.</p>
                <a href="alarm.html">İlanları gör</a>`;
            kutu.hidden = false;
        }

        tarayiciBildirimiGonder(alarmlar);
    }

    // ---------- Ana sayfa ----------
    function initIndex() {
        const iller = illerByPlaka();
        const kurumSayisi = new Set(ilanlar.map(i => i.kurum)).size;

        const stats = document.getElementById('stats');
        if (stats) {
            stats.innerHTML = `
                <li><strong>${ilanlar.length}</strong> aktif ilan</li>
                <li><strong>${kurumSayisi}</strong> kurum</li>
                <li><strong>${Object.keys(iller).length}</strong> il</li>`;
        }

        const readout = document.getElementById('map-readout');
        const defaultReadout = readout ? readout.innerHTML : '';
        const map = document.getElementById('turkey-map');

        if (map) {
            map.querySelectorAll('path').forEach(path => {
                const plaka = path.dataset.plaka;
                const il = path.dataset.il;
                const kayit = iller[plaka];

                const show = () => {
                    if (!readout) return;
                    readout.innerHTML = kayit
                        ? `<b>${esc(plaka)} · ${esc(il)}</b> — ${ilanSayisi(kayit.ilanlar.length)}, görmek için tıklayın`
                        : `<b>${esc(plaka)} · ${esc(il)}</b> — şu an ilan yok`;
                };
                const hide = () => { if (readout) readout.innerHTML = defaultReadout; };

                path.addEventListener('mouseenter', show);
                path.addEventListener('mouseleave', hide);

                if (kayit) {
                    path.classList.add('has-ilan');
                    path.setAttribute('tabindex', '0');
                    path.setAttribute('role', 'link');
                    path.setAttribute('aria-label', `${il}: ${ilanSayisi(kayit.ilanlar.length)}`);
                    const go = () => { window.location.href = `ilanlar.html#${plaka}`; };
                    path.addEventListener('click', go);
                    path.addEventListener('keydown', e => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
                    });
                    path.addEventListener('focus', show);
                    path.addEventListener('blur', hide);
                }
            });
        }

        const chips = document.getElementById('il-chips');
        if (chips) {
            chips.innerHTML = Object.values(iller)
                .sort((a, b) => collator.compare(a.il, b.il))
                .map(k => `<li><a class="chip" href="ilanlar.html#${esc(k.plaka)}">
                    ${plakaBadge(k.plaka)} ${esc(k.il)} <span class="count">${k.ilanlar.length}</span>
                </a></li>`).join('');
        }

        const recent = document.getElementById('recent');
        if (recent) recent.innerHTML = ilanlar.slice(0, 4).map(i => ilanRow(i)).join('');
    }

    // ---------- İlanlar ----------
    function initIlanlar() {
        const iller = illerByPlaka();
        const select = document.getElementById('il-select');
        const search = document.getElementById('ara');
        const list = document.getElementById('ilan-list');
        const count = document.getElementById('result-count');
        const empty = document.getElementById('empty');
        const heading = document.getElementById('ilanlar-heading');
        const reset = document.getElementById('reset');
        const alarmLink = document.getElementById('alarm-kur-link');
        const alarmMetin = document.getElementById('alarm-kur-metin');

        Object.values(iller)
            .sort((a, b) => collator.compare(a.il, b.il))
            .forEach(k => {
                const opt = document.createElement('option');
                opt.value = k.plaka;
                opt.textContent = `${k.il} (${k.plaka}) · ${ilanSayisi(k.ilanlar.length)}`;
                select.appendChild(opt);
            });

        function readHash() {
            const h = window.location.hash.replace('#', '');
            select.value = iller[h] ? h : '';
        }

        function render() {
            const plaka = select.value;
            const q = norm(search.value);
            const sonuc = ilanlar.filter(i => {
                if (plaka && i.plaka !== plaka) return false;
                if (!q) return true;
                return norm([i.kurum, i.unvan, i.alan || '', i.il].join(' ')).includes(q);
            });

            heading.textContent = plaka ? `${iller[plaka].il} ilindeki ilanlar` : 'Tüm aktif ilanlar';
            list.innerHTML = sonuc.map(i => ilanRow(i)).join('');
            list.hidden = sonuc.length === 0;
            empty.hidden = sonuc.length !== 0;
            count.textContent = `${sonuc.length} ilan gösteriliyor`;
            reset.hidden = !plaka && !q;
            alarmMetin.textContent = plaka || q ? 'Bu arama için alarm kur' : 'İlan alarmı kur';
        }

        // Seçili il ve arama metni alarm formuna taşınır.
        alarmLink.addEventListener('click', () => {
            const kelime = search.value.trim();
            depoYaz('sessionStorage', TASLAK_KEY, {
                iller: select.value ? [select.value] : [],
                kelimeler: kelime ? [kelime] : []
            });
        });

        select.addEventListener('change', () => {
            history.replaceState(null, '', select.value ? `#${select.value}` : window.location.pathname);
            render();
        });
        search.addEventListener('input', render);
        reset.addEventListener('click', () => {
            select.value = '';
            search.value = '';
            history.replaceState(null, '', window.location.pathname);
            render();
        });
        window.addEventListener('hashchange', () => { readHash(); render(); });

        readHash();
        render();
    }

    // ---------- Kurumlar ----------
    function initKurumlar() {
        const list = document.getElementById('kurum-list');
        const gruplar = [...groupBy(ilanlar, 'kurum').entries()]
            .sort((a, b) => collator.compare(a[0], b[0]));
        list.innerHTML = gruplar.map(([kurum, items]) => {
            const i = items[0];
            return `<li class="row">
                ${plakaBadge(i.plaka)}
                <div class="row-main">
                    <p class="row-title">${esc(kurum)}</p>
                    <p class="row-sub">${esc(i.il)} · ${esc(i.tur)}</p>
                </div>
                <div class="row-meta">
                    <a class="tag" href="ilanlar.html#${esc(i.plaka)}">${ilanSayisi(items.length)}</a>
                </div>
            </li>`;
        }).join('');
    }

    // ---------- Ünvanlar ----------
    function initUnvanlar() {
        const list = document.getElementById('unvan-list');
        const gruplar = [...groupBy(ilanlar, 'unvan').entries()]
            .sort((a, b) => b[1].length - a[1].length || collator.compare(a[0], b[0]));
        list.innerHTML = gruplar.map(([unvan, items]) => {
            const alanlar = [...new Set(items.map(i => i.alan).filter(Boolean))];
            const kurumlar = [...new Set(items.map(i => i.kurum))];
            const alt = alanlar.length ? `Alanlar: ${alanlar.join(', ')}` : kurumlar.join(', ');
            return `<li class="row">
                <span class="plaka" title="İlan sayısı">${items.length}</span>
                <div class="row-main">
                    <p class="row-title">${esc(unvan)}</p>
                    <p class="row-sub">${esc(alt)}</p>
                </div>
                <div class="row-meta">
                    ${[...new Set(items.map(i => i.il))].map(il => `<span class="tag">${esc(il)}</span>`).join('')}
                </div>
            </li>`;
        }).join('');
    }

    // ---------- İlan alarmı ----------
    function initAlarm() {
        const tumIller = (window.ILLER || []).slice().sort((a, b) => collator.compare(a.il, b.il));
        const form = document.getElementById('alarm-form');
        const ilSelect = document.getElementById('alarm-il');
        const ilSecili = document.getElementById('alarm-il-secili');
        const turKutusu = document.getElementById('alarm-turler');
        const kelime = document.getElementById('alarm-kelime');
        const bildirim = document.getElementById('alarm-bildirim');
        const bildirimSatiri = document.getElementById('bildirim-satiri');
        const onizleme = document.getElementById('alarm-onizleme');
        const mesaj = document.getElementById('alarm-mesaj');
        const liste = document.getElementById('alarm-list');
        const bos = document.getElementById('alarm-bos');
        const baslik = document.getElementById('alarmlarim');
        const tarihBicim = new Intl.DateTimeFormat('tr', { day: 'numeric', month: 'long', year: 'numeric' });

        let alarmlar = alarmlariYukle();
        let seciliIller = [];
        let silinecek = null;

        const depoCalisiyor = depoYaz('localStorage', 'kamuilan.test', 1) && depoYaz('localStorage', 'kamuilan.test', null);
        document.getElementById('depo-uyari').hidden = depoCalisiyor;

        if (!('Notification' in window)) {
            bildirimSatiri.hidden = true;
        } else if (Notification.permission === 'denied') {
            bildirim.disabled = true;
            bildirimSatiri.querySelector('span').textContent = 'Tarayıcı bildirimleri bu site için kapalı. Yeni ilanlar sitede gösterilir.';
        }

        const ilanSayilari = {};
        ilanlar.forEach(i => { ilanSayilari[i.plaka] = (ilanSayilari[i.plaka] || 0) + 1; });
        tumIller.forEach(k => {
            const opt = document.createElement('option');
            opt.value = k.plaka;
            opt.textContent = ilanSayilari[k.plaka]
                ? `${k.il} (${k.plaka}) · ${ilanSayisi(ilanSayilari[k.plaka])}`
                : `${k.il} (${k.plaka})`;
            ilSelect.appendChild(opt);
        });

        turKutusu.innerHTML = KURUM_TURLERI.map((t, n) =>
            `<label class="pill"><input type="checkbox" id="alarm-tur-${n}" value="${esc(t)}"> ${esc(t)}</label>`).join('');

        function kriterler() {
            return {
                iller: seciliIller.slice(),
                turler: [...turKutusu.querySelectorAll('input:checked')].map(x => x.value),
                kelimeler: [...new Set(kelime.value.split(',').map(s => s.trim()).filter(Boolean))]
            };
        }

        function imza(a) {
            return JSON.stringify([a.iller.slice().sort(), a.turler.slice().sort(), a.kelimeler.map(norm).sort()]);
        }

        function seciliIlleriCiz() {
            ilSecili.innerHTML = seciliIller.map(p => `<li class="chip">${plakaBadge(p)} ${esc(ilAdi(p))}
                <button type="button" class="chip-x" data-plaka="${esc(p)}" aria-label="Çıkar: ${esc(ilAdi(p))}">×</button></li>`).join('');
            ilSecili.hidden = seciliIller.length === 0;
            [...ilSelect.options].forEach(o => { if (o.value) o.disabled = seciliIller.includes(o.value); });
        }

        function onizlemeGuncelle() {
            const n = uyanlar(kriterler()).length;
            onizleme.textContent = n
                ? `Bu kriterlere şu an ${ilanSayisi(n)} uyuyor.`
                : 'Bu kriterlere şu an uyan ilan yok. Uyan bir ilan eklendiğinde haber verilir.';
        }

        function formuSifirla() {
            seciliIller = [];
            turKutusu.querySelectorAll('input').forEach(x => { x.checked = false; });
            kelime.value = '';
            bildirim.checked = false;
            seciliIlleriCiz();
            onizlemeGuncelle();
        }

        // Bu ziyarette "Yeni" etiketiyle gösterilecek ilanlar: alarm id -> ilan id kümesi.
        let yeniGosterilen = new Map();

        function ciz() {
            bos.hidden = alarmlar.length > 0;
            liste.innerHTML = alarmlar.map(a => {
                const hepsi = uyanlar(a);
                const yeniSet = yeniGosterilen.get(a.id) || new Set();
                const yeni = hepsi.filter(i => yeniSet.has(i.id));
                const digerleri = hepsi.filter(i => !yeniSet.has(i.id));
                const tarih = new Date(a.olusturma);
                const meta = [
                    isNaN(tarih) ? '' : `Kuruluş: ${tarihBicim.format(tarih)}`,
                    hepsi.length ? `şu an ${ilanSayisi(hepsi.length)} uyuyor` : 'şu an uyan ilan yok',
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
                    ${yeni.length ? `<ul class="rows compact">${yeni.map(i => ilanRow(i, true)).join('')}</ul>` : ''}
                    ${digerleri.length ? `<details>
                        <summary>${yeni.length ? 'Uyan diğer ilanlar' : 'Uyan ilanlar'} (${digerleri.length})</summary>
                        <ul class="rows compact">${digerleri.map(i => ilanRow(i)).join('')}</ul>
                    </details>` : ''}
                    <div class="alarm-actions">${islemler}</div>
                </li>`;
            }).join('');
        }

        ilSelect.addEventListener('change', () => {
            if (ilSelect.value && !seciliIller.includes(ilSelect.value)) seciliIller.push(ilSelect.value);
            ilSelect.value = '';
            seciliIlleriCiz();
            onizlemeGuncelle();
        });

        ilSecili.addEventListener('click', e => {
            const btn = e.target.closest('[data-plaka]');
            if (!btn) return;
            seciliIller = seciliIller.filter(p => p !== btn.dataset.plaka);
            seciliIlleriCiz();
            onizlemeGuncelle();
            ilSelect.focus();
        });

        turKutusu.addEventListener('change', onizlemeGuncelle);
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
                if (!tarayici) notlar.push('Tarayıcı bildirim izni vermedi; yeni ilanlar yine de sitede gösterilecek.');
            }

            // Şu an uyan ilanlar listede hemen görünür; bildirim sadece bundan sonra eklenenler için gelir.
            const simdiUyan = uyanlar(k).map(i => i.id);
            const alarm = {
                id: String(Date.now()),
                iller: k.iller,
                turler: k.turler,
                kelimeler: k.kelimeler,
                tarayici,
                olusturma: new Date().toISOString(),
                gorulen: simdiUyan,
                bildirilen: simdiUyan.slice()
            };
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

        // İlanlar sayfasından gelindiyse arama kriterlerini forma aktar.
        const taslak = depoOku('sessionStorage', TASLAK_KEY);
        if (taslak) {
            depoYaz('sessionStorage', TASLAK_KEY, null);
            seciliIller = dizi(taslak.iller).filter(p => tumIller.some(k => k.plaka === p));
            kelime.value = dizi(taslak.kelimeler).join(', ');
            if (seciliIller.length || kelime.value) {
                mesaj.textContent = 'Arama kriterleriniz forma aktarıldı. Kontrol edip alarmı kurun.';
            }
        }
        seciliIlleriCiz();
        onizlemeGuncelle();

        // Yeni ilanları bu ziyarette "Yeni" etiketiyle göster, sonra görüldü say:
        // menüdeki sayaç sıfırlanır, bir sonraki ziyarette etiket kalkar.
        yeniGosterilen = new Map(alarmlar.map(a => [a.id, new Set(yeniUyanlar(a).map(i => i.id))]));
        ciz();
        let degisti = false;
        alarmlar.forEach(a => {
            uyanlar(a).forEach(i => {
                if (!a.gorulen.includes(i.id)) { a.gorulen.push(i.id); degisti = true; }
                if (!a.bildirilen.includes(i.id)) { a.bildirilen.push(i.id); degisti = true; }
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
