// 3. katman: kurumlar
// İlan veren kamu kurumları. Her ilan "kurum" alanıyla buradaki bir kimliğe bağlanır.
// - tur: veri/1-sozluk-siniflandirma.js içindeki KURUM_TURLERI kimliği.
// - il: kurumun merkezinin plaka kodu ("06"). Pozisyon başka bir ildeyse il bilgisi pozisyona yazılır.
// - bagli: varsa bağlı olduğu üst kurum (ilan metninde geçtiği biçimiyle).
// - web: yalnızca ilan metninde geçen adres yazılır; bilinmiyorsa alan konmaz.
window.KURUMLAR = [
    { id: 'hbv', ad: 'Ankara Hacı Bayram Veli Üniversitesi', tur: 'devlet-universitesi', il: '06', web: 'https://hacibayram.edu.tr/personel' },
    { id: 'ahievran', ad: 'Kırşehir Ahi Evran Üniversitesi', tur: 'devlet-universitesi', il: '40' },
    { id: 'alku', ad: 'Alanya Alaaddin Keykubat Üniversitesi', tur: 'devlet-universitesi', il: '07', web: 'https://pdb.alanya.edu.tr' },
    { id: 'tkgm', ad: 'Tapu ve Kadastro Genel Müdürlüğü', tur: 'bagli-kurulus', il: '06', web: 'https://www.tkgm.gov.tr' },
    { id: 'msu', ad: 'Millî Savunma Üniversitesi', tur: 'tsk', il: '06', bagli: 'Millî Savunma Bakanlığı' },
    { id: 'subu', ad: 'Sakarya Uygulamalı Bilimler Üniversitesi', tur: 'devlet-universitesi', il: '54', web: 'https://personel.subu.edu.tr/tr' },
    { id: 'bddk', ad: 'Bankacılık Düzenleme ve Denetleme Kurumu', tur: 'duzenleyici', il: '34' },
    // Kurum türü doğrulanmalı: "düzenleyici kurum" mu, "özel statülü kurum" mu (docs/ilan-analizi.md).
    { id: 'tmsf', ad: 'Tasarruf Mevduatı Sigorta Fonu', tur: 'duzenleyici', il: '34', web: 'https://www.tmsf.org.tr' },
    { id: 'adalet', ad: 'Adalet Bakanlığı', tur: 'bakanlik', il: '06' },
    { id: 'yargitay', ad: 'Yargıtay Başkanlığı', tur: 'yasama-yargi', il: '06' },
    { id: 'istka', ad: 'İstanbul Kalkınma Ajansı', tur: 'kalkinma-ajansi', il: '34' },
    { id: 'mevka', ad: 'Mevlana Kalkınma Ajansı', tur: 'kalkinma-ajansi', il: '42', web: 'https://www.mevka.org.tr' },
    { id: 'vgm', ad: 'Vakıflar Genel Müdürlüğü', tur: 'bagli-kurulus', il: '06', bagli: 'Kültür ve Turizm Bakanlığı', web: 'https://vgm.gov.tr' },
    { id: 'kesan-bel', ad: 'Keşan Belediyesi', tur: 'ilce-belediyesi', il: '22', web: 'https://www.kesan.bel.tr' },
    { id: 'jgk', ad: 'Jandarma Genel Komutanlığı', tur: 'jandarma-sg', il: '06' },
    { id: 'itu', ad: 'İstanbul Teknik Üniversitesi', tur: 'devlet-universitesi', il: '34' },
    { id: 'omu', ad: 'Ondokuz Mayıs Üniversitesi', tur: 'devlet-universitesi', il: '55', web: 'https://www.omu.edu.tr/tr/duyurular' }
];
