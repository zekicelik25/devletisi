// app.js
// Tüm sayfaların davranışı. Hangi sayfada olduğumuz <body data-page="..."> ile belirlenir.
(function () {
    const ilanlar = window.ILANLAR || [];
    const collator = new Intl.Collator('tr');

    function esc(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
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

    function plakaBadge(plaka) {
        return `<span class="plaka" title="Plaka kodu">${esc(plaka)}</span>`;
    }

    function ilanRow(i) {
        const baslik = i.alan ? `${i.unvan} · ${i.alan}` : i.unvan;
        return `<li class="row">
            ${plakaBadge(i.plaka)}
            <div class="row-main">
                <p class="row-title">${esc(baslik)}</p>
                <p class="row-sub">${esc(i.kurum)}</p>
            </div>
            <div class="row-meta">
                <span class="tag">${esc(i.il)}</span>
                <span class="tag plain">${esc(i.tur)}</span>
            </div>
        </li>`;
    }

    function ilanSayisi(n) {
        return `${n} ilan`;
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
        if (recent) recent.innerHTML = ilanlar.slice(0, 4).map(ilanRow).join('');
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

        Object.values(iller)
            .sort((a, b) => collator.compare(a.il, b.il))
            .forEach(k => {
                const opt = document.createElement('option');
                opt.value = k.plaka;
                opt.textContent = `${k.plaka} · ${k.il} (${k.ilanlar.length})`;
                select.appendChild(opt);
            });

        function readHash() {
            const h = window.location.hash.replace('#', '');
            select.value = iller[h] ? h : '';
        }

        function render() {
            const plaka = select.value;
            const q = search.value.trim().toLocaleLowerCase('tr');
            const sonuc = ilanlar.filter(i => {
                if (plaka && i.plaka !== plaka) return false;
                if (!q) return true;
                return [i.kurum, i.unvan, i.alan || '', i.il].join(' ').toLocaleLowerCase('tr').includes(q);
            });

            heading.textContent = plaka ? `${iller[plaka].il} ilindeki ilanlar` : 'Tüm aktif ilanlar';
            list.innerHTML = sonuc.map(ilanRow).join('');
            list.hidden = sonuc.length === 0;
            empty.hidden = sonuc.length !== 0;
            count.textContent = `${sonuc.length} ilan gösteriliyor`;
            reset.hidden = !plaka && !q;
        }

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

    function init() {
        const page = document.body.dataset.page;
        if (page === 'index') initIndex();
        else if (page === 'ilanlar') initIlanlar();
        else if (page === 'kurumlar') initKurumlar();
        else if (page === 'unvanlar') initUnvanlar();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
