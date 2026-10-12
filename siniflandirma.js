// siniflandirma.js
// İlanların sınıflandırma sözlüğü: kurum türleri, istihdam statüleri, ünvanlar ve ek boyutlar.
// Gerekçeler ve açıklamalar: docs/siniflandirma.md
//
// Henüz sayfalara bağlı değil. Site güncellenirken data.js bu sözlükteki kimliklere (id)
// göre aşağıdaki veri modeline taşınacak.
//
// Veri modeli (en küçük birim = pozisyon):
//   Kurum    { id, ad, tur, il }
//            tur: KURUM_TURLERI id'si, il: plaka kodu
//   İlan     { id, kurum, yayinTarihi, sonBasvuru, kaynak, link, pozisyonlar: [Pozisyon] }
//            kurum: Kurum id'si, kaynak: KAYNAKLAR id'si, tarihler: "YYYY-AA-GG"
//   Pozisyon { id, unvan, alan, statu, adet, il, egitim, yontem }
//            id: sitedeki tüm pozisyonlarda benzersiz sayı (ilan alarmı bununla çalışır)
//            unvan: UNVANLAR id'si, alan: branş / bölüm (serbest metin)
//            statu: STATULER id'si, adet: kadro sayısı
//            il: plaka kodu (kurumun ilinden farklı olabilir: bakanlıkların il il kadroları gibi)
//            egitim: EGITIM_DUZEYLERI id'si, yontem: ALIM_YONTEMLERI id'si
window.SINIFLANDIRMA = (function () {
    const KURUM_GRUPLARI = [
        { id: 'merkezi', ad: 'Merkezi yönetim' },
        { id: 'yasama-yargi', ad: 'Yasama ve yargı' },
        { id: 'guvenlik', ad: 'Güvenlik ve savunma' },
        { id: 'yuksekogretim', ad: 'Yükseköğretim' },
        { id: 'mahalli', ad: 'Mahalli idareler' },
        { id: 'kit-sirket', ad: 'KİT ve kamu şirketleri' },
        { id: 'ozerk', ad: 'Düzenleyici, sosyal güvenlik ve özel statülü kurumlar' },
        { id: 'diger', ad: 'Diğer' }
    ];

    const KURUM_TURLERI = [
        // Merkezi yönetim
        {
            id: 'cumhurbaskanligi', grup: 'merkezi', ad: 'Cumhurbaşkanlığı ve bağlı kurumlar',
            ornek: ['Cumhurbaşkanlığı İdari İşler Başkanlığı', 'Diyanet İşleri Başkanlığı', 'Savunma Sanayii Başkanlığı', 'İletişim Başkanlığı']
        },
        {
            id: 'bakanlik', grup: 'merkezi', ad: 'Bakanlık',
            aciklama: 'Merkez ve taşra teşkilatı birlikte: il ve ilçe müdürlükleri, devlet hastaneleri, okullar, adliyeler. Milli Savunma Bakanlığının askerî alımları "TSK ve MSB" türündedir.',
            ornek: ['Adalet Bakanlığı', 'Milli Eğitim Bakanlığı', 'Sağlık Bakanlığı', 'Tarım ve Orman Bakanlığı']
        },
        {
            id: 'bagli-kurulus', grup: 'merkezi', ad: 'Bakanlıklara bağlı ve ilgili kuruluşlar',
            aciklama: 'Genel müdürlükler ve başkanlıklar.',
            ornek: ['Karayolları Genel Müdürlüğü', 'Devlet Su İşleri Genel Müdürlüğü', 'Orman Genel Müdürlüğü', 'Tapu ve Kadastro Genel Müdürlüğü', 'AFAD', 'TÜİK']
        },
        {
            id: 'mulki-idare', grup: 'merkezi', ad: 'Valilik ve kaymakamlık',
            aciklama: 'Sosyal Yardımlaşma ve Dayanışma Vakıflarının (SYDV) ilanları da bu türde toplanır.',
            ornek: ['Valilikler', 'Kaymakamlıklar', 'SYDV']
        },
        // Yasama ve yargı
        {
            id: 'yasama-yargi', grup: 'yasama-yargi', ad: 'TBMM ve yüksek yargı organları',
            ornek: ['TBMM', 'Anayasa Mahkemesi', 'Yargıtay', 'Danıştay', 'Sayıştay', 'Hâkimler ve Savcılar Kurulu']
        },
        // Güvenlik ve savunma
        { id: 'emniyet', grup: 'guvenlik', ad: 'Emniyet Genel Müdürlüğü', ornek: ['Polis Akademisi', 'İl emniyet müdürlükleri'] },
        { id: 'jandarma-sg', grup: 'guvenlik', ad: 'Jandarma ve Sahil Güvenlik', ornek: ['Jandarma Genel Komutanlığı', 'Sahil Güvenlik Komutanlığı'] },
        {
            id: 'tsk', grup: 'guvenlik', ad: 'TSK ve Milli Savunma Bakanlığı',
            ornek: ['Kara Kuvvetleri Komutanlığı', 'Deniz Kuvvetleri Komutanlığı', 'Hava Kuvvetleri Komutanlığı', 'Milli Savunma Bakanlığı']
        },
        { id: 'mit', grup: 'guvenlik', ad: 'Millî İstihbarat Teşkilatı', ornek: ['MİT'] },
        // Yükseköğretim
        {
            id: 'devlet-universitesi', grup: 'yuksekogretim', ad: 'Devlet üniversitesi',
            aciklama: 'Üniversite hastaneleri dahil. Vakıf üniversiteleri kamu kurumu olmadığı için kapsam dışıdır.',
            ornek: ['Karamanoğlu Mehmetbey Üniversitesi', 'Malatya Turgut Özal Üniversitesi']
        },
        { id: 'yok-osym', grup: 'yuksekogretim', ad: 'YÖK ve ÖSYM', ornek: ['Yükseköğretim Kurulu', 'ÖSYM'] },
        // Mahalli idareler
        { id: 'buyuksehir-belediyesi', grup: 'mahalli', ad: 'Büyükşehir belediyesi', aciklama: '30 büyükşehir belediyesi.', ornek: ['Mersin Büyükşehir Belediyesi'] },
        { id: 'il-belediyesi', grup: 'mahalli', ad: 'İl belediyesi', aciklama: 'Büyükşehir olmayan illerin merkez belediyeleri.', ornek: ['Karaman Belediyesi'] },
        { id: 'ilce-belediyesi', grup: 'mahalli', ad: 'İlçe ve belde belediyesi', ornek: ['Çankaya Belediyesi'] },
        { id: 'il-ozel-idaresi', grup: 'mahalli', ad: 'İl özel idaresi', aciklama: 'Yalnızca büyükşehir olmayan illerde bulunur.', ornek: ['Karaman İl Özel İdaresi'] },
        {
            id: 'belediye-bagli-kurulus', grup: 'mahalli', ad: 'Belediyeye bağlı kuruluş',
            aciklama: 'Su, ulaşım gibi hizmetleri yürüten genel müdürlükler.',
            ornek: ['İSKİ', 'ASKİ', 'EGO', 'İETT']
        },
        {
            id: 'belediye-sirketi', grup: 'mahalli', ad: 'Belediye şirketi',
            aciklama: 'Belediye sermayeli anonim şirketler; personel genellikle işçi statüsündedir.',
            ornek: ['İSPARK', 'Metro İstanbul']
        },
        { id: 'mahalli-idare-birligi', grup: 'mahalli', ad: 'Mahalli idare birliği', ornek: ['Köylere hizmet götürme birlikleri'] },
        // KİT ve kamu şirketleri
        {
            id: 'kit', grup: 'kit-sirket', ad: 'Kamu iktisadi teşebbüsü (KİT)',
            aciklama: '233 sayılı KHK\'ya tabi teşebbüsler. Personeli 399 sayılı KHK\'ya tabidir.',
            ornek: ['TCDD', 'DHMİ', 'TMO', 'EÜAŞ', 'TEİAŞ', 'TKİ', 'Türkiye Taşkömürü Kurumu']
        },
        { id: 'kamu-bankasi', grup: 'kit-sirket', ad: 'Kamu bankası', ornek: ['T.C. Ziraat Bankası', 'Halkbank', 'VakıfBank', 'Türk Eximbank', 'İLBANK'] },
        {
            id: 'kamu-sirketi', grup: 'kit-sirket', ad: 'Diğer kamu şirketi',
            aciklama: 'Kamu sermayeli anonim şirketler, Türkiye Varlık Fonu şirketleri dahil.',
            ornek: ['Türksat A.Ş.', 'PTT A.Ş.']
        },
        // Düzenleyici, sosyal güvenlik ve özel statülü kurumlar
        {
            id: 'duzenleyici', grup: 'ozerk', ad: 'Düzenleyici ve denetleyici kurum',
            aciklama: '5018 sayılı Kanun\'un (III) sayılı cetvelindeki bağımsız kurumlar.',
            ornek: ['BDDK', 'SPK', 'EPDK', 'RTÜK', 'BTK', 'Rekabet Kurumu', 'Kamu İhale Kurumu', 'KVKK']
        },
        { id: 'sosyal-guvenlik', grup: 'ozerk', ad: 'Sosyal güvenlik kurumu', aciklama: '5018 sayılı Kanun\'un (IV) sayılı cetveli.', ornek: ['SGK', 'İŞKUR'] },
        { id: 'kalkinma-ajansi', grup: 'ozerk', ad: 'Kalkınma ajansı', aciklama: '5449 sayılı Kanun ile kurulan bölgesel ajanslar.', ornek: ['İzmir Kalkınma Ajansı', 'Mevlana Kalkınma Ajansı'] },
        { id: 'ozel-statulu', grup: 'ozerk', ad: 'Özel kanunla kurulan kurum', ornek: ['TÜBİTAK', 'TRT', 'Türk Standardları Enstitüsü'] },
        // Diğer
        { id: 'diger-kurum', grup: 'diger', ad: 'Diğer kamu kurumu' }
    ];

    const STATU_GRUPLARI = [
        { id: 'memur', ad: 'Kadrolu memur' },
        { id: 'sozlesmeli', ad: 'Sözleşmeli personel' },
        { id: 'akademik', ad: 'Akademik personel' },
        { id: 'isci', ad: 'İşçi' },
        { id: 'askeri-kolluk', ad: 'Askerî ve kolluk personeli' },
        { id: 'diger', ad: 'Diğer' }
    ];

    const STATULER = [
        // Kadrolu memur
        {
            id: '657-4a', grup: 'memur', ad: 'Kadrolu memur (657/4-A)',
            dayanak: '657 sayılı Devlet Memurları Kanunu, md. 4/A',
            aciklama: 'Kalıcı memur kadrosu: bakanlıklar, belediyeler, üniversitelerin idari kadroları.'
        },
        {
            id: '399-kadrolu', grup: 'memur', ad: 'KİT kadrolu personeli (399)',
            dayanak: '399 sayılı KHK',
            aciklama: 'KİT\'lerde memur statüsündeki kadrolar ("kadrolu 399").'
        },
        {
            id: 'ozel-kanun-kadrolu', grup: 'memur', ad: 'Özel kanuna tabi kadrolu personel',
            dayanak: 'Kurumun kendi kanunu (ör. 2802 sayılı Hâkimler ve Savcılar Kanunu)',
            aciklama: 'Hâkim ve savcı adayları, bağımsız kurumların meslek personeli gibi kendi kanunu olan kadrolar.'
        },
        // Sözleşmeli
        {
            id: '657-4b', grup: 'sozlesmeli', ad: 'Sözleşmeli personel (657/4-B)',
            dayanak: '657 sayılı Kanun, md. 4/B',
            aciklama: 'Sözleşmeyle çalışılır, genellikle KPSS puanıyla alınır. Sağlık ve büro personeli alımlarında yaygın.'
        },
        {
            id: '399-sozlesmeli', grup: 'sozlesmeli', ad: 'KİT sözleşmeli personeli (399)',
            dayanak: '399 sayılı KHK',
            aciklama: 'KİT\'lerde sözleşmeyle çalışan personel.'
        },
        {
            id: '375-bilisim', grup: 'sozlesmeli', ad: 'Sözleşmeli bilişim personeli',
            dayanak: '375 sayılı KHK, ek madde 6',
            aciklama: 'Kamu kurumlarının bilgi işlem birimleri için yapılan alımlar.'
        },
        {
            id: '5393-sozlesmeli', grup: 'sozlesmeli', ad: 'Belediye sözleşmeli personeli',
            dayanak: '5393 sayılı Belediye Kanunu, md. 49',
            aciklama: 'Belediyelerin tam veya kısmi zamanlı sözleşmeyle çalıştırdığı avukat, mühendis, mimar, tabip gibi personel.'
        },
        {
            id: 'kurum-sozlesmeli', grup: 'sozlesmeli', ad: 'Kurum kanununa tabi sözleşmeli personel',
            dayanak: 'Kurumun kendi kanunu',
            aciklama: 'Kendi kuruluş kanununa göre sözleşmeyle personel çalıştıran kurumlar.'
        },
        // Akademik
        {
            id: 'akademik-kadro', grup: 'akademik', ad: 'Akademik kadro',
            dayanak: '2547 sayılı Yükseköğretim Kanunu, md. 23, 24, 26, 31, 33/a',
            aciklama: 'Öğretim üyesi (profesör, doçent, doktor öğretim üyesi), öğretim görevlisi ve araştırma görevlisi kadroları.'
        },
        {
            id: 'akademik-50d', grup: 'akademik', ad: 'Araştırma görevlisi (50/d)',
            dayanak: '2547 sayılı Kanun, md. 50/d',
            aciklama: 'Lisansüstü eğitim süresince verilen kadro; eğitim bitince görev sona erer.'
        },
        {
            id: 'akademik-yabanci', grup: 'akademik', ad: 'Yabancı uyruklu sözleşmeli öğretim elemanı',
            dayanak: '2547 sayılı Kanun, md. 34'
        },
        // İşçi
        {
            id: 'surekli-isci', grup: 'isci', ad: 'Sürekli (kadrolu) işçi',
            dayanak: '4857 sayılı İş Kanunu',
            aciklama: 'Süresiz iş sözleşmesi. Kamuda alımlar çoğunlukla İŞKUR üzerinden, kura veya sözlü sınavla yapılır.'
        },
        {
            id: 'gecici-isci', grup: 'isci', ad: 'Geçici (mevsimlik) işçi',
            dayanak: '4857 sayılı İş Kanunu',
            aciklama: 'Belirli süreli iş sözleşmesi; orman yangını, tarım gibi mevsimlik işler.'
        },
        // Askerî ve kolluk
        {
            id: 'subay-astsubay', grup: 'askeri-kolluk', ad: 'Subay / astsubay',
            dayanak: '926 sayılı Türk Silahlı Kuvvetleri Personel Kanunu',
            aciklama: 'Muvazzaf veya sözleşmeli subay ve astsubaylar.'
        },
        { id: 'uzman-erbas', grup: 'askeri-kolluk', ad: 'Uzman erbaş', dayanak: '3269 sayılı Uzman Erbaş Kanunu' },
        { id: 'sozlesmeli-er', grup: 'askeri-kolluk', ad: 'Sözleşmeli er' },
        {
            id: 'kolluk', grup: 'askeri-kolluk', ad: 'Polis ve bekçi',
            dayanak: '3201 sayılı Emniyet Teşkilatı Kanunu; 7245 sayılı Çarşı ve Mahalle Bekçileri Kanunu',
            aciklama: 'Emniyet Genel Müdürlüğüne bağlı kadrolu kolluk personeli.'
        },
        // Diğer
        {
            id: '657-4c', grup: 'diger', ad: 'Geçici personel (657/4-C)',
            dayanak: '657 sayılı Kanun, md. 4/C',
            aciklama: 'Yeni alım ilanı nadiren çıkar.'
        },
        {
            id: 'isgucu-programi', grup: 'diger', ad: 'İŞKUR işgücü programı (TYP vb.)',
            aciklama: 'Toplum Yararına Program gibi süreli programlar; kalıcı istihdam değildir.'
        }
    ];

    const MESLEK_GRUPLARI = [
        { id: 'buro', ad: 'Büro ve idari hizmetler' },
        { id: 'uzman-denetim', ad: 'Uzman ve denetim meslek personeli' },
        { id: 'teknik', ad: 'Teknik ve bilişim' },
        { id: 'saglik', ad: 'Sağlık' },
        { id: 'sosyal', ad: 'Sosyal hizmet ve psikoloji' },
        { id: 'egitim', ad: 'Eğitim' },
        { id: 'akademik', ad: 'Akademik' },
        { id: 'hukuk', ad: 'Hukuk ve adalet' },
        { id: 'guvenlik', ad: 'Güvenlik, kolluk ve acil durum' },
        { id: 'askeri', ad: 'Askerî' },
        { id: 'din', ad: 'Din hizmetleri' },
        { id: 'destek', ad: 'Destek hizmetleri' },
        { id: 'diger', ad: 'Diğer' }
    ];

    // es: ilanlarda geçen diğer yazılışlar (arama ve alarm eşleştirmesi için).
    const UNVANLAR = [
        // Büro ve idari hizmetler
        { id: 'memur', grup: 'buro', ad: 'Memur' },
        { id: 'buro-personeli', grup: 'buro', ad: 'Büro Personeli' },
        { id: 'vhki', grup: 'buro', ad: 'Veri Hazırlama ve Kontrol İşletmeni', es: ['VHKİ'] },
        { id: 'sef', grup: 'buro', ad: 'Şef' },
        { id: 'sekreter', grup: 'buro', ad: 'Sekreter' },
        { id: 'tahsildar', grup: 'buro', ad: 'Tahsildar' },
        // Uzman ve denetim meslek personeli
        { id: 'uzman-yardimcisi', grup: 'uzman-denetim', ad: 'Uzman Yardımcısı', not: 'Kurum adıyla geçer: Hazine ve Maliye Uzman Yardımcısı, Bankacılık Uzman Yardımcısı vb.' },
        { id: 'mufettis-yardimcisi', grup: 'uzman-denetim', ad: 'Müfettiş Yardımcısı' },
        { id: 'denetci-yardimcisi', grup: 'uzman-denetim', ad: 'Denetçi Yardımcısı' },
        { id: 'kontrolor-yardimcisi', grup: 'uzman-denetim', ad: 'Kontrolör Yardımcısı' },
        { id: 'kaymakam-adayi', grup: 'uzman-denetim', ad: 'Kaymakam Adayı' },
        { id: 'uzman', grup: 'uzman-denetim', ad: 'Uzman' },
        // Teknik ve bilişim
        { id: 'muhendis', grup: 'teknik', ad: 'Mühendis', not: 'Dal "alan" bilgisine yazılır: İnşaat, Elektrik, Bilgisayar…' },
        { id: 'mimar', grup: 'teknik', ad: 'Mimar' },
        { id: 'sehir-plancisi', grup: 'teknik', ad: 'Şehir Plancısı' },
        { id: 'peyzaj-mimari', grup: 'teknik', ad: 'Peyzaj Mimarı' },
        { id: 'tekniker', grup: 'teknik', ad: 'Tekniker' },
        { id: 'teknisyen', grup: 'teknik', ad: 'Teknisyen' },
        { id: 'bilisim-personeli', grup: 'teknik', ad: 'Bilişim Personeli', es: ['Yazılım Geliştirici', 'Sistem Uzmanı', 'Ağ Uzmanı'] },
        { id: 'programci', grup: 'teknik', ad: 'Programcı' },
        { id: 'istatistikci', grup: 'teknik', ad: 'İstatistikçi' },
        { id: 'kimyager', grup: 'teknik', ad: 'Kimyager' },
        // Sağlık
        { id: 'tabip', grup: 'saglik', ad: 'Tabip', es: ['Hekim', 'Doktor', 'Pratisyen Hekim'] },
        { id: 'uzman-tabip', grup: 'saglik', ad: 'Uzman Tabip', es: ['Uzman Hekim', 'Uzman Doktor'] },
        { id: 'dis-tabibi', grup: 'saglik', ad: 'Diş Tabibi', es: ['Diş Hekimi'] },
        { id: 'eczaci', grup: 'saglik', ad: 'Eczacı' },
        { id: 'hemsire', grup: 'saglik', ad: 'Hemşire' },
        { id: 'ebe', grup: 'saglik', ad: 'Ebe' },
        { id: 'saglik-teknikeri', grup: 'saglik', ad: 'Sağlık Teknikeri', not: 'Dal "alan" bilgisine yazılır: Anestezi, Tıbbi Görüntüleme, Tıbbi Laboratuvar…' },
        { id: 'saglik-teknisyeni', grup: 'saglik', ad: 'Sağlık Teknisyeni' },
        { id: 'fizyoterapist', grup: 'saglik', ad: 'Fizyoterapist' },
        { id: 'diyetisyen', grup: 'saglik', ad: 'Diyetisyen' },
        { id: 'biyolog', grup: 'saglik', ad: 'Biyolog' },
        { id: 'veteriner-hekim', grup: 'saglik', ad: 'Veteriner Hekim', es: ['Veteriner'] },
        // Sosyal hizmet ve psikoloji
        { id: 'sosyal-calismaci', grup: 'sosyal', ad: 'Sosyal Çalışmacı' },
        { id: 'psikolog', grup: 'sosyal', ad: 'Psikolog' },
        { id: 'cocuk-gelisimci', grup: 'sosyal', ad: 'Çocuk Gelişimci' },
        { id: 'sosyolog', grup: 'sosyal', ad: 'Sosyolog' },
        // Eğitim
        { id: 'ogretmen', grup: 'egitim', ad: 'Öğretmen', not: 'Branş "alan" bilgisine yazılır.' },
        { id: 'usta-ogretici', grup: 'egitim', ad: 'Usta Öğretici' },
        // Akademik
        { id: 'profesor', grup: 'akademik', ad: 'Profesör', es: ['Prof. Dr.'] },
        { id: 'docent', grup: 'akademik', ad: 'Doçent', es: ['Doç. Dr.'] },
        { id: 'dr-ogretim-uyesi', grup: 'akademik', ad: 'Doktor Öğretim Üyesi', es: ['Dr. Öğr. Üyesi', 'Yardımcı Doçent', 'Yrd. Doç.'] },
        { id: 'ogretim-gorevlisi', grup: 'akademik', ad: 'Öğretim Görevlisi', es: ['Öğr. Gör.'] },
        { id: 'arastirma-gorevlisi', grup: 'akademik', ad: 'Araştırma Görevlisi', es: ['Arş. Gör.'] },
        // Hukuk ve adalet
        { id: 'avukat', grup: 'hukuk', ad: 'Avukat' },
        { id: 'hakim-savci-adayi', grup: 'hukuk', ad: 'Hâkim ve Savcı Adayı', es: ['Hakim Adayı', 'Savcı Adayı'] },
        { id: 'zabit-katibi', grup: 'hukuk', ad: 'Zabıt Kâtibi', es: ['Zabıt Katibi'] },
        { id: 'icra-katibi', grup: 'hukuk', ad: 'İcra Kâtibi', es: ['İcra Katibi'] },
        { id: 'mubasir', grup: 'hukuk', ad: 'Mübaşir' },
        // Güvenlik, kolluk ve acil durum
        { id: 'polis-memuru', grup: 'guvenlik', ad: 'Polis Memuru', es: ['Polis'] },
        { id: 'bekci', grup: 'guvenlik', ad: 'Çarşı ve Mahalle Bekçisi', es: ['Bekçi'] },
        { id: 'infaz-koruma-memuru', grup: 'guvenlik', ad: 'İnfaz ve Koruma Memuru', es: ['Gardiyan'] },
        { id: 'koruma-guvenlik-gorevlisi', grup: 'guvenlik', ad: 'Koruma ve Güvenlik Görevlisi', es: ['Güvenlik Görevlisi'] },
        { id: 'itfaiye-eri', grup: 'guvenlik', ad: 'İtfaiye Eri', es: ['İtfaiyeci'] },
        { id: 'zabita-memuru', grup: 'guvenlik', ad: 'Zabıta Memuru', es: ['Zabıta'] },
        { id: 'gumruk-muhafaza-memuru', grup: 'guvenlik', ad: 'Gümrük Muhafaza Memuru' },
        // Askerî
        { id: 'subay', grup: 'askeri', ad: 'Subay' },
        { id: 'astsubay', grup: 'askeri', ad: 'Astsubay' },
        { id: 'uzman-erbas', grup: 'askeri', ad: 'Uzman Erbaş', es: ['Uzman Çavuş'] },
        { id: 'sozlesmeli-er', grup: 'askeri', ad: 'Sözleşmeli Er' },
        // Din hizmetleri
        { id: 'imam-hatip', grup: 'din', ad: 'İmam-Hatip' },
        { id: 'muezzin-kayyim', grup: 'din', ad: 'Müezzin-Kayyım' },
        { id: 'kuran-kursu-ogreticisi', grup: 'din', ad: 'Kur\'an Kursu Öğreticisi' },
        { id: 'vaiz', grup: 'din', ad: 'Vaiz' },
        // Destek hizmetleri
        { id: 'temizlik-personeli', grup: 'destek', ad: 'Temizlik Personeli', es: ['Temizlik Görevlisi'] },
        { id: 'hizmetli', grup: 'destek', ad: 'Hizmetli' },
        { id: 'sofor', grup: 'destek', ad: 'Şoför', es: ['Sürücü'] },
        { id: 'asci', grup: 'destek', ad: 'Aşçı' },
        { id: 'bahcivan', grup: 'destek', ad: 'Bahçıvan' },
        { id: 'destek-personeli', grup: 'destek', ad: 'Destek Personeli' }
    ];

    // kpss: bu düzeydeki KPSS (B) grubu alımlarında genellikle kullanılan puan türü.
    const EGITIM_DUZEYLERI = [
        { id: 'ilkogretim', ad: 'İlköğretim' },
        { id: 'ortaogretim', ad: 'Ortaöğretim (lise)', kpss: 'KPSSP94' },
        { id: 'onlisans', ad: 'Önlisans', kpss: 'KPSSP93' },
        { id: 'lisans', ad: 'Lisans', kpss: 'KPSSP3' },
        { id: 'yuksek-lisans', ad: 'Yüksek lisans' },
        { id: 'doktora', ad: 'Doktora' }
    ];

    const ALIM_YONTEMLERI = [
        { id: 'kpss-merkezi', ad: 'KPSS ile merkezi yerleştirme', aciklama: 'ÖSYM tercih kılavuzuyla yapılan yerleştirme.' },
        { id: 'kpss-kurum', ad: 'KPSS puanıyla kurum alımı', aciklama: 'Kurum, KPSS puan sırasına göre kendisi alır; sözlü sınav da olabilir.' },
        { id: 'kurum-sinavi', ad: 'Kurum sınavı', aciklama: 'Yazılı ve/veya sözlü giriş sınavı: uzman, müfettiş, denetçi yardımcılığı gibi.' },
        { id: 'sozlu-sinav', ad: 'Sözlü sınav veya mülakat', aciklama: 'KPSS şartı aranmayan alımlar.' },
        { id: 'kura', ad: 'Noter kurası', aciklama: 'İŞKUR üzerinden yapılan işçi alımlarında başvuranlar arasından kura.' },
        {
            id: 'akademik-degerlendirme', ad: 'Akademik değerlendirme',
            aciklama: 'Öğretim görevlisi ve araştırma görevlisinde ALES, yabancı dil puanı ve giriş sınavı; öğretim üyesinde bilimsel değerlendirme.'
        },
        { id: 'diger-yontem', ad: 'Diğer' }
    ];

    const KAYNAKLAR = [
        { id: 'kariyer-kapisi', ad: 'Kariyer Kapısı', aciklama: 'Kamu İşe Alım ve Kariyer Kapısı' },
        { id: 'resmi-gazete', ad: 'Resmî Gazete' },
        { id: 'iskur', ad: 'İŞKUR' },
        { id: 'osym', ad: 'ÖSYM tercih kılavuzu' },
        { id: 'kurum-sitesi', ad: 'Kurumun resmi sitesi' }
    ];

    return {
        KURUM_GRUPLARI, KURUM_TURLERI,
        STATU_GRUPLARI, STATULER,
        MESLEK_GRUPLARI, UNVANLAR,
        EGITIM_DUZEYLERI, ALIM_YONTEMLERI, KAYNAKLAR
    };
})();
