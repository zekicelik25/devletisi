// araclar/ortak.js
// Araçların ortak parçası: veri/ katmanlarını Node içinde yükler ve bir pozisyonun kalıptan,
// ilandan ve kendisinden gelen bilgilerini birleştirir. Birleştirme kuralları app.js ile aynıdır
// (ayrıntı: docs/veri-modeli.md); biri değişirse öbürü de değişmeli.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const KOK = path.join(__dirname, '..');
const DOSYALAR = ['1-sozluk-iller.js', '1-sozluk-siniflandirma.js', '2-kaliplar.js', '3-kurumlar.js', '4-ilanlar.js'];

function yukle() {
    const window = {};
    const ortam = vm.createContext({ window });
    DOSYALAR.forEach(d => {
        const yol = path.join(KOK, 'veri', d);
        vm.runInContext(fs.readFileSync(yol, 'utf8'), ortam, { filename: yol });
    });
    return {
        iller: window.ILLER || [],
        s: window.SINIFLANDIRMA,
        kaliplar: window.KALIPLAR || [],
        kurumlar: window.KURUMLAR || [],
        ilanlar: window.ILANLAR || []
    };
}

// Alt düzeyde yazılan (null olmayan) değer üsttekini ezer.
function birlestir(...katmanlar) {
    const sonuc = {};
    katmanlar.forEach(k => {
        if (k) Object.entries(k).forEach(([a, v]) => { if (v != null) sonuc[a] = v; });
    });
    return sonuc;
}

const KOSUL_ALANI = {
    ucretKati: p => (p.ucret ? p.ucret.tavanKati : null),
    unvan: p => p.unvan,
    alan: p => p.alan,
    cinsiyet: p => p.cinsiyet,
    kontenjan: p => p.kontenjan,
    kod: p => p.kod
};

function kosulUyar(kosul, p) {
    if (!kosul) return true;
    return Object.entries(kosul).every(([k, degerler]) => KOSUL_ALANI[k] && Array.isArray(degerler) && degerler.includes(KOSUL_ALANI[k](p)));
}

// Bir pozisyonun tüm alanlarını ve şartlarını katmanlardan birleştirerek döndürür.
function pozisyonuCoz(veri, ilan, poz) {
    const kurum = veri.kurumlar.find(k => k.id === ilan.kurum) || {};
    const kalip = ilan.kalip ? veri.kaliplar.find(k => k.id === ilan.kalip) : null;
    const varsayilan = birlestir(kalip && kalip.varsayilan, ilan.varsayilan);
    const al = a => (poz[a] != null ? poz[a] : varsayilan[a] != null ? varsayilan[a] : null);
    const p = {
        ...poz,
        unvan: al('unvan'), statu: al('statu'), egitim: al('egitim'), yontem: al('yontem'),
        ilandakiAd: al('ilandakiAd'), birim: al('birim'), derece: al('derece'), hizmetSinifi: al('hizmetSinifi'),
        il: Array.isArray(poz.iller) ? poz.iller.join(' ') : al('il') || kurum.il || null
    };
    let sartlar = [];
    [['kalip', kalip ? kalip.sartlar : null], ['ilan', ilan.ortakSartlar], ['pozisyon', poz.sartlar]].forEach(([katman, liste]) => {
        const uygun = (liste || []).filter(x => kosulUyar(x.kosul, p));
        const ezilen = new Set(uygun.filter(x => x.yerineGecer).map(x => x.tur));
        sartlar = sartlar.filter(x => !ezilen.has(x.tur)).concat(uygun.map(x => ({ ...x, katman })));
    });
    p.sartlar = sartlar;
    p.basvuru = birlestir(kalip && kalip.basvuru, ilan.basvuru);
    p.secme = birlestir(kalip && kalip.secme, ilan.secme);
    return p;
}

module.exports = { KOK, yukle, birlestir, pozisyonuCoz, KOSUL_ALANI };
