// data.js
// Sitedeki kurumlar ve ilanlar; sitenin tek veri kaynağı.
// Sınıflandırma kimlikleri (tur, unvan, statu, egitim, yontem, kaynak) siniflandirma.js
// sözlüğünden gelir; açıklamaları docs/siniflandirma.md dosyasındadır.
//
// Yeni ilan eklerken:
// - Kurum KURUMLAR listesinde yoksa önce oraya ekleyin (il: plaka kodu).
// - İlanı ILANLAR listesinin sonuna ekleyin. Her pozisyona bir sonraki pozisyon numarasını (id)
//   verin; ilan alarmları yeni pozisyonları bu numarayla tanır. Silinen numarayı tekrar kullanmayın.
// - Pozisyonun ili kurumun ilinden farklıysa pozisyona il: "plaka" ekleyin.
// - Bilinmeyen bilgileri null bırakın. Tarihler "YYYY-AA-GG" biçiminde yazılır.
window.KURUMLAR = [
    { id: 'mtu', ad: 'Malatya Turgut Özal Üniversitesi', tur: 'devlet-universitesi', il: '44' },
    { id: 'mersin-bb', ad: 'Mersin Büyükşehir Belediyesi', tur: 'buyuksehir-belediyesi', il: '33' },
    { id: 'kmu', ad: 'Karamanoğlu Mehmetbey Üniversitesi', tur: 'devlet-universitesi', il: '70' }
];

// Aşağıdaki statüler ünvandan çıkarıldı; resmi ilan metinlerinden doğrulanmalı.
window.ILANLAR = [
    {
        id: 'mtu-buro-personeli', kurum: 'mtu',
        yayinTarihi: null, sonBasvuru: null, kaynak: null, link: null,
        pozisyonlar: [
            { id: 1, unvan: 'buro-personeli', alan: null, statu: '657-4b', adet: null, egitim: null, yontem: null },
            { id: 2, unvan: 'buro-personeli', alan: null, statu: '657-4b', adet: null, egitim: null, yontem: null }
        ]
    },
    {
        id: 'mersin-bb-itfaiye-eri', kurum: 'mersin-bb',
        yayinTarihi: null, sonBasvuru: null, kaynak: null, link: null,
        pozisyonlar: [
            { id: 3, unvan: 'itfaiye-eri', alan: null, statu: '657-4a', adet: null, egitim: null, yontem: null }
        ]
    },
    {
        id: 'kmu-ogretim-gorevlisi', kurum: 'kmu',
        yayinTarihi: null, sonBasvuru: null, kaynak: null, link: null,
        pozisyonlar: [
            { id: 4, unvan: 'ogretim-gorevlisi', alan: 'İlk ve Acil Yardım', statu: 'akademik-kadro', adet: null, egitim: null, yontem: null },
            { id: 5, unvan: 'ogretim-gorevlisi', alan: 'Optisyenlik', statu: 'akademik-kadro', adet: null, egitim: null, yontem: null },
            { id: 6, unvan: 'ogretim-gorevlisi', alan: 'Tıbbi Görüntüleme', statu: 'akademik-kadro', adet: null, egitim: null, yontem: null },
            { id: 7, unvan: 'ogretim-gorevlisi', alan: 'Elektrik', statu: 'akademik-kadro', adet: null, egitim: null, yontem: null },
            { id: 8, unvan: 'ogretim-gorevlisi', alan: 'Bilgi İşlem', statu: 'akademik-kadro', adet: null, egitim: null, yontem: null }
        ]
    }
];
