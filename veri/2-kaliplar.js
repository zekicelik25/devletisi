// 2. katman: ilan kalıpları
// Aynı türdeki ilanlar aynı kuralları tekrarlar (öğretim üyesi ilanları, sözleşmeli bilişim ilanları…).
// Bu ortak kurallar burada bir kez yazılır; ilan "kalip" alanıyla bir kalıba bağlanır ve
// yalnızca kendine özgü bilgileri taşır. Ayrıntı: docs/veri-modeli.md.
//
// Bir kalıptaki alanlar:
// - varsayilan: ilandaki pozisyonların boş bıraktığı alanlar (statü, alım yöntemi, eğitim düzeyi…).
// - basvuru, secme: ilanın aynı adlı alanlarına temel olur; ilanda yazılan değer kalıbınkini ezer.
// - sartlar: her pozisyona eklenen başvuru şartları. "kosul" taşıyan şart yalnızca koşula uyan
//   pozisyonlara eklenir (ör. ucretKati: [2] yalnızca ücret tavanının 2 katı olan pozisyonlar).
//   Alt düzeyde (ilan ya da pozisyon) aynı türde "yerineGecer: true" bir şart varsa kalıbın o
//   türdeki şartları düşer.
window.KALIPLAR = [
    {
        id: 'ogretim-uyesi',
        ad: 'Öğretim üyesi alımı',
        dayanak: '2547 sayılı Yükseköğretim Kanunu md. 23, 24 ve 26; Öğretim Üyeliğine Yükseltilme ve Atanma Yönetmeliği; 657 sayılı Kanun md. 48',
        varsayilan: { statu: 'akademik-kadro', yontem: 'akademik-degerlendirme', egitim: 'doktora' },
        basvuru: { sureGun: 15 },
        secme: { yontem: 'akademik-degerlendirme', aciklama: 'Başvurular, üniversitenin atanma ölçütlerine göre jüri ve kurullarca incelenir.' },
        sartlar: [
            { tur: 'diger', metin: '657 sayılı Devlet Memurları Kanunu\'nun 48. maddesindeki genel şartları taşımak.' },
            { tur: 'akademik', metin: 'Üniversitenin öğretim üyeliğine yükseltilme ve atanma yönergesindeki asgari ölçütleri sağlamak.' },
            { tur: 'egitim', duzey: ['doktora'], kosul: { unvan: ['dr-ogretim-uyesi'] }, metin: 'Doktora (ya da tıpta, diş hekimliğinde uzmanlık) yapmış olmak.' },
            { tur: 'akademik', kosul: { unvan: ['docent'] }, metin: 'Doçentlik ünvanına sahip olmak.' },
            { tur: 'akademik', kosul: { unvan: ['profesor'] }, metin: 'Doçentlik ünvanını aldıktan sonra en az beş yıl çalışmış olmak (2547 sayılı Kanun md. 26).' }
        ]
    },
    {
        id: 'sozlesmeli-bilisim',
        ad: 'Sözleşmeli bilişim personeli alımı',
        dayanak: '375 sayılı KHK ek madde 6; Kamu Kurum ve Kuruluşlarının Büyük Ölçekli Bilgi İşlem Birimlerinde Sözleşmeli Bilişim Personeli İstihdamına İlişkin Esas ve Usuller Hakkında Yönetmelik md. 8',
        varsayilan: { statu: '375-bilisim', yontem: 'sozlu-sinav', egitim: 'lisans' },
        basvuru: { kanal: ['kariyer-kapisi'] },
        secme: {
            yontem: 'sozlu-sinav',
            cagriKati: 10,
            formul: 'KPSS P3 puanının %70\'i + İngilizce YDS (veya dengi) puanının %30\'u. KPSS puanı olmayanın puanı 70, YDS puanı olmayanın puanı 0 sayılır.',
            gecmeNotu: 70
        },
        sartlar: [
            { tur: 'diger', metin: '657 sayılı Devlet Memurları Kanunu\'nun 48. maddesindeki genel şartları taşımak.' },
            {
                tur: 'egitim', duzey: ['lisans'], kosul: { ucretKati: [3, 4] },
                bolumler: ['Bilgisayar mühendisliği', 'Yazılım mühendisliği', 'Elektrik mühendisliği', 'Elektronik mühendisliği', 'Elektrik ve elektronik mühendisliği', 'Endüstri mühendisliği'],
                metin: 'Dört yıllık fakültelerin bilgisayar, yazılım, elektrik, elektronik, elektrik ve elektronik ya da endüstri mühendisliği bölümlerinden (veya YÖK denkliği olan yurt dışı okullardan) mezun olmak.'
            },
            {
                tur: 'egitim', duzey: ['lisans'], kosul: { ucretKati: [2] },
                bolumler: ['Bilgisayar mühendisliği', 'Yazılım mühendisliği', 'Elektrik mühendisliği', 'Elektronik mühendisliği', 'Elektrik ve elektronik mühendisliği', 'Endüstri mühendisliği', 'Diğer mühendislik bölümleri', 'Fen-edebiyat, eğitim ve eğitim bilimleri fakültelerinin bilgisayar ve teknoloji bölümleri', 'İstatistik', 'Matematik', 'Fizik'],
                metin: 'Dört yıllık fakültelerin mühendislik bölümlerinden; fen-edebiyat, eğitim ve eğitim bilimleri fakültelerinin bilgisayar ve teknoloji bölümlerinden ya da istatistik, matematik, fizik bölümlerinden mezun olmak. (Bilgisayar, yazılım, elektrik-elektronik ve endüstri mühendisliği dışındaki bölümler yalnızca 2 kat pozisyonlara başvurabilir.)'
            },
            { tur: 'deneyim', yil: 3, kosul: { ucretKati: [2] }, metin: 'Yazılım geliştirme ya da büyük ölçekli ağ sistemlerinin kurulumu ve yönetimi alanında en az 3 yıl mesleki tecrübe.' },
            { tur: 'deneyim', yil: 5, kosul: { ucretKati: [3, 4] }, metin: 'Yazılım geliştirme ya da büyük ölçekli ağ sistemlerinin kurulumu ve yönetimi alanında en az 5 yıl mesleki tecrübe.' },
            { tur: 'belge', ad: 'En az iki güncel programlama dilini bildiğini gösteren belge', metin: 'Güncel programlama dillerinden en az ikisini bildiğini belgelemek.' },
            { tur: 'engel', metin: 'Güvenlik soruşturması ve arşiv araştırmasında çalışmaya engel bir durumu bulunmamak.' }
        ]
    },
    {
        id: 'kalkinma-ajansi-uzman',
        ad: 'Kalkınma ajansı uzman personel alımı',
        dayanak: '4 sayılı Cumhurbaşkanlığı Kararnamesi md. 200; Kalkınma Ajansları Personel Yönetmeliği',
        varsayilan: { statu: 'kurum-sozlesmeli', yontem: 'sozlu-sinav', egitim: 'lisans', unvan: 'uzman' },
        basvuru: { kanal: ['kariyer-kapisi'] },
        secme: { yontem: 'sozlu-sinav', aciklama: 'Yarışma sınavı (mülakat).' },
        sartlar: [
            { tur: 'diger', metin: 'Türk vatandaşı olmak, kamu haklarından mahrum bulunmamak, ilanda sayılan suçlardan hükümlü bulunmamak.' },
            { tur: 'diger', metin: 'Askerlikle ilgisi bulunmamak ya da askerliğini yapmış, ertelemiş veya yedek sınıfa geçmiş olmak.' },
            { tur: 'engel', metin: 'Güvenlik soruşturması ve/veya arşiv araştırması yapılmış olmak; işe giriş sağlık raporu almasına engel bir durumu bulunmamak.' }
        ]
    },
    {
        id: 'muvazzaf-subay',
        ad: 'Muvazzaf subay temini',
        dayanak: '926 sayılı Türk Silahlı Kuvvetleri Personel Kanunu ve kurumların personel temin yönetmelikleri',
        varsayilan: { statu: 'subay-astsubay', yontem: 'askeri-secim', egitim: 'lisans', unvan: 'subay', il: 'TR' },
        basvuru: { kanal: ['personel-temin'] },
        secme: { yontem: 'askeri-secim' },
        sartlar: [
            { tur: 'yas', enFazla: 27, tarih: '2026-01-01', dogumEnErken: '1999-01-01', metin: '1 Ocak 2026 itibarıyla 27 yaşından büyük olmamak (1 Ocak 1999 ve sonrası doğumlular).' },
            { tur: 'yas', enFazla: 32, tarih: '2026-01-01', dogumEnErken: '1994-01-01', istisna: true, metin: 'Lisansüstü eğitimini tamamlamış olanlarda yaş sınırı 32 (1 Ocak 1994 ve sonrası doğumlular).' },
            { tur: 'fiziksel', metin: 'Sağlık yeteneği yönetmeliğindeki şartları taşımak; fiziki yeterlilik testinde başarılı olmak.' },
            { tur: 'engel', metin: 'Güvenlik soruşturması ve arşiv araştırması olumlu olmak.' }
        ]
    }
];
