// 4. katman: ilanlar ve pozisyonlar
// Kurum → İlan → Pozisyon. En küçük birim pozisyondur; şartlar pozisyona bağlanır.
// Bu dosya araçlar dışında elle de düzenlenebilir; alanların anlamı docs/veri-modeli.md'de.
//
// Yeni ilan eklerken:
// - Kurum veri/3-kurumlar.js'de yoksa önce oraya ekleyin.
// - İlan bir kalıba uyuyorsa (veri/2-kaliplar.js) "kalip" alanını yazın; kalıptaki ortak şartları tekrarlamayın.
// - İlanı listenin sonuna ekleyin. Her pozisyona bir sonraki numarayı (id) verin; numaralar tekrar
//   kullanılmaz, çünkü ilan alarmı yeni pozisyonu numarasından tanır. Son kullanılan numara: 283.
// - Bilinmeyen bilgileri null bırakın ya da hiç yazmayın. Tarihler "YYYY-AA-GG" biçimindedir.
// - Kontrol için: node araclar/dogrula.js
//
// İçerik: 17 ilan, 275 pozisyon satırı, 777 kadro.
window.ILANLAR = [
    {
        "id": "hbv-2026-ogretim-uyesi",
        "kurum": "hbv",
        "kalip": "ogretim-uyesi",
        "baslik": "Öğretim üyesi alım ilanı",
        "resmiGazete": "2026-10-05",
        "kaynak": "resmi-gazete",
        "link": "https://ilan.hacibayram.edu.tr",
        "basvuru": {
            "baslangic": "2026-10-05",
            "bitis": "2026-10-20",
            "bitisTahmini": true,
            "saat": "17:30",
            "kanal": [
                "kurum-sistemi"
            ],
            "adres": "https://ilan.hacibayram.edu.tr",
            "belgeler": [
                "Başvuru formu",
                "Fotoğraf",
                "Kimlik kartı fotokopisi veya nüfus kayıt örneği",
                "Özgeçmiş ve yayın listesi (puan alınan çalışmaların belgeleriyle)",
                "Yabancı dil belgesi"
            ]
        },
        "ortakSartlar": [
            {
                "tur": "engel",
                "metin": "Doçent kadrosuna profesörler, doktor öğretim üyesi kadrolarına profesörler ve kadro ünvanı doçent olanlar başvuramaz."
            },
            {
                "tur": "diger",
                "metin": "Yabancı dille eğitim veren bölümlerde Yükseköğretim Kurumlarında Yabancı Dil Öğretimi ve Yabancı Dille Öğretim Yapılmasında Uyulacak Esaslara İlişkin Yönetmelik uygulanır."
            }
        ],
        "notlar": [
            "Son başvuru günü, Resmî Gazete yayım tarihine 15 gün eklenerek hesaplanmıştır; kurumun duyurusundan doğrulanmalı.",
            "Şahsen veya posta ile başvuru kabul edilmez."
        ],
        "pozisyonlar": [
            {
                "id": 9,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Edebiyat Fakültesi · Arkeoloji Bölümü",
                "alan": "Klasik Arkeoloji",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Arkeoloji alanında Doktora yapmış olmak; Hellenistik ve Roma dönemi heykeltraşlığı konusunda çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 10,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Edebiyat Fakültesi · Felsefe Bölümü",
                "alan": "Bilim Tarihi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Felsefe alanında Doktora yapmış olmak; bilim felsefesi, fizik felsefesi ve yapay zeka felsefesi alanlarında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 11,
                "unvan": "docent",
                "birim": "Hukuk Fakültesi · Özel Hukuk Bölümü",
                "alan": "Ticaret Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Ticaret Hukuku alanında Doçent ünvanına sahip olmak; şirketler hukuku, sigorta hukuku, sermaye piyasası hukuku, deniz ticareti hukuku alanlarında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 12,
                "unvan": "docent",
                "birim": "Hukuk Fakültesi · Özel Hukuk Bölümü",
                "alan": "Ticaret Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Ticaret Hukuku alanında Doçent ünvanına sahip olmak; anonim ve limited şirketler hukuku, kıymetli evrak hukuku, rekabet hukuku, enerji hukuku alanlarında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 13,
                "unvan": "profesor",
                "birim": "Hukuk Fakültesi · Özel Hukuk Bölümü",
                "alan": "İş ve Sosyal Güvenlik Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İş ve Sosyal Güvenlik Hukuku alanında Doçent ünvanına sahip olmak; sendikalar hukuku ve sosyal güvenlik hukuku alanlarında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 14,
                "unvan": "docent",
                "birim": "Hukuk Fakültesi · Özel Hukuk Bölümü",
                "alan": "Medeni Usul ve İcra İflas Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Medeni Usul ve İcra İflas Hukuku alanında Doçent ünvanına sahip olmak; iflas ve konkordato hukuku ve davada taraf konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 15,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Çalışma Ekonomisi ve Endüstri İlişkileri Bölümü",
                "alan": "Çalışma Ekonomisi ve Endüstri İlişkileri",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İş ve Sosyal Güvenlik Hukuku alanında Doçent ünvanına sahip olmak; yeni çalışma biçimleri konusunda çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 16,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İşletme Bölümü",
                "alan": "İşletme",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Üretim ve Operasyon yönetimi alanında Doçent ünvanına sahip olmak; sürdürülebilir üretim, lojistik yönetimi ve kalite konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 17,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İşletme Bölümü",
                "alan": "İşletme",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Nicel Karar Yöntemleri alanında Doçent ünvanına sahip olmak; deneysel yöntemler ile doğrusal olmayan zaman serisi analizleri ve zamanla değişen nedensellik analizleri konularında SSCI veya SCI-Exp. kapsamında taranan dergilerde yayınlanmış çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 18,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Yönetim Bilişim Sistemleri Bölümü",
                "alan": "Yönetim Bilişim Sistemleri",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Elektrik-Elektronik Mühendisliği alanında Doçent ünvanına sahip olmak; yapay zeka ve derin öğrenme konularının pratik uygulamaları konusunda çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 19,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İktisat Bölümü",
                "alan": "İktisat",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uluslararası İktisat alanında Doçent ünvanına sahip olmak; uluslararası üretim ve işgücü politikaları, Avrupa Birliği'nin sanayi ve ticaret sistemi konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 20,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İktisat Bölümü",
                "alan": "İktisat",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Makro İktisat alanında Doçent ünvanına sahip olmak; kurumsal kalite, ekonomik güven ve yoksulluk konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 21,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Siyaset Bilimi ve Kamu Yönetimi Bölümü",
                "alan": "Kamu Yönetimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Siyaset Bilimi alanında Doçent ünvanına sahip olmak; kadın ve aile politikaları analizi, dekolonyalizm konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 22,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Siyaset Bilimi ve Kamu Yönetimi Bölümü",
                "alan": "Kamu Yönetimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Kamu Yönetimi alanında Doçent ünvanına sahip olmak; yönetişim ve kamu özel ortaklığı konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 23,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Siyaset Bilimi ve Kamu Yönetimi Bölümü",
                "alan": "Kamu Yönetimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Siyasi Tarih alanında Doçent ünvanına sahip olmak; Türk siyasal hayatı ve son dönem Osmanlı tarihi konularında AHCI veya SSCI kapsamında taranan dergilerde yayınlanmış çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 24,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Siyaset Bilimi ve Kamu Yönetimi Bölümü",
                "alan": "Kamu Yönetimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Siyaset Bilimi ve Kamu Yönetimi alanında Doktora yapmış olmak; yeni toplumsal hareketler ve alternatif demokratik katılım modelleri konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 25,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Uluslararası Ticaret ve Finansman Bölümü",
                "alan": "Uluslararası Ticaret ve Finansman",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Makro iktisat alanında Doçent ünvanına sahip olmak; basitleştirilmiş gümrük prosedürleri ve enerji yoksulluğu konularında SSCI veya SCI- Exp. kapsamında taranan dergilerde yayınlanmış çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 26,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İlahiyat Fakültesi · Temel İslam Bilimleri Bölümü",
                "alan": "Tasavvuf",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tasavvuf alanında Doktora yapmış olmak; çocuklarda ahlaki gelişim ve tasavvuf ilişkisi konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 27,
                "unvan": "docent",
                "birim": "İlahiyat Fakültesi · Temel İslam Bilimleri Bölümü",
                "alan": "Kuran'ı Kerim Okuma ve Kıraat İlmi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Kur’an-ı Kerim Okuma ve Kıraat İlmi alanında Doçent ünvanına sahip olmak; Kur’an tilaveti ve kıraat farklılıkları konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 28,
                "unvan": "profesor",
                "birim": "İlahiyat Fakültesi · Temel İslam Bilimleri Bölümü",
                "alan": "Tefsir",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Temel İslam Bilimleri alanında Doçent ünvanına sahip olmak; Esbabı nüzul analizleri ve hatimesi bulunan klasik tefsirler üzerine çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 29,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İlahiyat Fakültesi · Felsefe ve Din Bilimleri Bölümü",
                "alan": "Din Felsefesi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Din Felsefesi alanında Doktora yapmış olmak; zihin felsefesi ve teistik bilinç argümanları konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 30,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İletişim Fakültesi · Gazetecilik Bölümü",
                "alan": "Gazetecilik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Gazetecilik alanında Doktora yapmış olmak; sosyal medya, dijital gazetecilik, yapay zeka ve robot gazetecilik konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 31,
                "unvan": "profesor",
                "birim": "İletişim Fakültesi · Halkla İlişkiler ve Tanıtım Bölümü",
                "alan": "Halkla İlişkiler ve Tanıtım",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İletişim Çalışmaları alanında Doçent ünvanına sahip olmak; halkla ilişkiler, siyasal iletişim ve karşılaştırmalı iletişim konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 32,
                "unvan": "docent",
                "birim": "İletişim Fakültesi · Halkla İlişkiler ve Tanıtım Bölümü",
                "alan": "Halkla İlişkiler ve Tanıtım",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İletişim Çalışmaları alanında Doçent ünvanına sahip olmak; halkla ilişkiler, siyasal iletişim ve yeni medya konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 33,
                "unvan": "profesor",
                "birim": "Türk Müziği Devlet Konservatuvarı · Çalgı Eğitimi Bölümü",
                "alan": "Çalgı Eğitimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Müzik alanında Doçent ünvanına sahip olmak; Klasik kemençe icrası ile Türk müziğinde postmodernizm, gelenek ve yenilik konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 34,
                "unvan": "docent",
                "birim": "Türk Müziği Devlet Konservatuvarı · Çalgı Eğitimi Bölümü",
                "alan": "Çalgı Eğitimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Müzik alanında Doçent ünvanına sahip olmak, Türk Müziği keman icrası, eğitimi ve Türk Müziği icra üslubu konularında çalışmaları bulunmak"
                    }
                ]
            },
            {
                "id": 35,
                "unvan": "docent",
                "birim": "Turizm Fakültesi · Turizm Rehberliği Bölümü",
                "alan": "Turizm Rehberliği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Turizm alanında Doçent ünvanına sahip olmak; Turizm rehberliği, turizmde girişimcilik, sürdürülebilir turizm konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 36,
                "unvan": "profesor",
                "birim": "Turizm Fakültesi · Gastronomi ve Mutfak Sanatları Bölümü",
                "alan": "Gastronomi ve Mutfak Sanatları",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Yönetim ve Strateji alanında Doçent ünvanına sahip olmak, gastronomi eğitimi ve yerel yiyecek tüketimi konularında çalışmaları bulunmak."
                    }
                ]
            },
            {
                "id": 37,
                "unvan": "docent",
                "birim": "Tapu Kadastro Yüksekokulu · Tapu Kadastro Bölümü",
                "alan": "Tapu Kadastro",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Harita Mühendisliği alanında Doçent ünvanına sahip olmak; ölçme tekniği, GNSS yazılımları ve iyonosferik modelleme konularında çalışmaları bulunmak."
                    }
                ]
            }
        ],
        "yayinTarihi": null
    },
    {
        "id": "ahievran-2026-ogretim-uyesi",
        "kurum": "ahievran",
        "kalip": "ogretim-uyesi",
        "baslik": "Öğretim üyesi alım ilanı",
        "resmiGazete": null,
        "kaynak": "resmi-gazete",
        "link": "https://basvuru.ahievran.edu.tr/",
        "basvuru": {
            "baslangic": null,
            "bitis": null,
            "saat": "17:00",
            "kanal": [
                "kurum-sistemi"
            ],
            "adres": "https://basvuru.ahievran.edu.tr/",
            "tekBasvuru": true,
            "belgeler": [
                "Başvuru dilekçesi ve özgeçmiş",
                "Diploma ve doçentlik belgeleri",
                "Yabancı dil belgesi (yabancı dil alanında başvuranlar için 85 puan, ikinci dilden en az 55)",
                "Yayın dosyası ve puanlama tablosu"
            ]
        },
        "ortakSartlar": [
            {
                "tur": "diger",
                "metin": "Yabancı ülkelerden alınan diplomaların Üniversitelerarası Kurulca denkliğinin onaylanmış olması gerekir."
            },
            {
                "tur": "diger",
                "metin": "%30 kotası ile başvuru yapılabilecek doktor öğretim üyesi kadrosu yoktur."
            }
        ],
        "notlar": [
            "İlan metninde Resmî Gazete yayım tarihi yok; başvuru süresi yayımdan itibaren 15 gündür. Tarih doğrulanmalı.",
            "Profesörler ve doçentler daimi statüye atanır."
        ],
        "pozisyonlar": [
            {
                "id": 38,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Çiçekdağı Meslek Yüksekokulu · Çocuk Bakımı ve Gençlik Hizmetleri",
                "alan": "Çocuk Gelişimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını Çocuk Gelişimi veya Eğitim Programları ve Öğretim programlarında yapmış olup; çocuk eğitiminde ebeveyn yeterlilikleri ve okul öncesi eğitiminde afet eğitimi konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 39,
                "unvan": "profesor",
                "birim": "Eğitim Fakültesi · Matematik ve Fen Bilimleri Eğitimi",
                "alan": "Matematik Eğitimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Matematik Eğitimi alanından almış olup; uzamsal yetenek ve matematiksel ilişkilendirme becerileri konularında çalışma yapmış olmak."
                    }
                ]
            },
            {
                "id": 40,
                "unvan": "profesor",
                "birim": "Eğitim Fakültesi · Türkçe ve Sosyal Bilimler Eğitimi",
                "alan": "Türkçe Eğitimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Türkçe Eğitimi veya Eğitim Yönetimi alanından almış olup; Türkçe öğretmen yeterlikleri, Türkçe öğretim süreç ve yönetimi konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 41,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eğitim Fakültesi · Yabancı Diller Eğitimi",
                "alan": "İngiliz Dili Eğitimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını İngiliz Dili Eğitimi alanında yapmış olup; yabancı dilde yazma becerilerinin eğitiminde yazılı düzeltici dönüt verilmesi ve karşılaştırmalı derlembilim konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 42,
                "unvan": "profesor",
                "birim": "Eğitim Fakültesi · Eğitim Bilimleri",
                "alan": "Öğretim Teknolojileri",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Bilgisayar ve Öğretim Teknolojileri Eğitimi alanında almış olup; akran öğretimi ve eğitsel veri madenciliği konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 43,
                "unvan": "profesor",
                "birim": "Fen Edebiyat Fakültesi · Matematik",
                "alan": "Cebir ve Sayılar Teorisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Matematik alanında almış olup; nilpotent uyumlu leibniz cebirlerinin sınıflandırılması konusunda çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 44,
                "unvan": "docent",
                "birim": "Fen Edebiyat Fakültesi · Matematik",
                "alan": "Topoloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Matematik alanında almış olup; esnek-kaba kümeler üzerindeki topolojik yapılar ve karar verme yöntemleri konusunda çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 45,
                "unvan": "docent",
                "birim": "Fen Edebiyat Fakültesi · Antropoloji",
                "alan": "Fiziki Antropoloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Fiziki Antropoloji ve Paleoantropoloji alanında almış olup; dental kimliklendirme konusunda çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 46,
                "unvan": "profesor",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İşletme",
                "alan": "Kooperatifçilik",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Yenilenebilir enerji kooperatifçiliği, sağlık hizmetleri kooperatifçiliği, ahilik ve kooperatifçilik konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 47,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · İşletme",
                "alan": "Üretim Yönetimi ve Pazarlama",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Pazarlama veya Yönetim ve Organizasyon alanından almış olup; sessiz direniş ve örgütsel farkındalık konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 48,
                "unvan": "docent",
                "birim": "İktisadi ve İdari Bilimler Fakültesi · Siyaset Bilimi ve Kamu Yönetimi",
                "alan": "Yönetim Bilimleri",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Stratejik Yönetim veya Yönetim ve Organizasyon alanından almış olup; bilge liderlik ve sosyal sermaye konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 49,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İlahiyat Fakültesi · Temel İslam Bilimleri",
                "alan": "Hadis",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını hadis alanında yapmış olup; bölgesel hadis tarihi ve hadis havzaları üzerine bilimsel çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 50,
                "unvan": "docent",
                "birim": "İlahiyat Fakültesi · Felsefe ve Din Bilimleri Bölümü",
                "alan": "Din Felsefesi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Din Felsefesi alanından almış olup; din epistemolojisi, pragmatizm ve din konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 51,
                "unvan": "dr-ogretim-uyesi",
                "birim": "İlahiyat Fakültesi · Felsefe ve Din Bilimleri Bölümü",
                "alan": "Din Sosyolojisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Felsefe ve Din Bilimleri alanında doktora yapmış olup; popüler kültür, görsel sanat ve medya konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 52,
                "unvan": "docent",
                "birim": "Kaman Meslek Yüksekokulu · Gıda İşleme",
                "alan": "Gıda Teknolojisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Gıda Mühendisliği veya Kimya alanında almış olup; elektrokimyasal sakkarit sensörleri ve enzim inhibisyonu konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 53,
                "unvan": "docent",
                "birim": "Mucur Meslek Yüksekokulu · Finans- Bankacılık ve Sigortacılık",
                "alan": "Bankacılık ve Sigortacılık",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Finans alanından almış olup; uluslararası borsalarda işlem gören kuruluşların finansal yapıları, dijital ve mobil bankacılığın kârlılığa etkileri konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 54,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Mühendislik- Mimarlık Fakültesi · Mimarlık",
                "alan": "Yapı Bilgisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Lisans, yüksek lisans ve doktorasını Mimarlık alanında yapmış olup; endüstriyel atık kullanımı ve tarihi yığma yapıların yapısal analizi konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 55,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Sağlık Bilimleri Fakültesi · Hemşirelik",
                "alan": "İç Hastalıkları Hemşireliği",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İç Hastalıkları Hemşireliği alanında doktora yapmış olup; enteral nütrisyon eğitimi ve yoğun bakım hemşirelerinde klinik yetkinlik konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 56,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Sosyal Bilimler Meslek Yüksekokulu · Dış Ticaret",
                "alan": "Dış Ticaret",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını finans veya bankacılık alanında yapmış olup; bankacılık sektörünün beceri ihtiyaçları, sanayi ve sürdürülebilirlik konularında bilimsel çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 57,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Tıp Fakültesi · Temel Tıp Bilimleri",
                "alan": "Fizyoloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tıp fakültesi mezunu olup, fizyoloji alanında doktora yapmış olmak. Elektrofizyoloji ve kalsiyum görüntüleme konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 58,
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Temel Tıp Bilimleri",
                "alan": "Histoloji ve Embriyoloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Histoloji ve Embriyoloji alanında almış olup; kök hücre ve deneysel hastalık modelleri konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 59,
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "Halk Sağlığı",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tıp Fakültesi mezunu olup, doçentlik ünvanını Halk Sağlığı alanından almış olmak. Aile planlaması, tütün ve tütün ürünleri konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 60,
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "Nöroloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tıp Fakültesi mezunu olup, doçentlik ünvanını Nöroloji alanından almış olmak. Multipl skleroz, epilepsi konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 61,
                "unvan": "dr-ogretim-uyesi",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Göz Hastalıkları",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tıp Fakültesi mezunu olup, uzmanlığını göz hastalıkları alanından almış olmak. Retinal ven tıkanıklılığı ve diabetik hastalarda intravitreal uygulamalar konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 62,
                "unvan": "docent",
                "birim": "Ziraat Fakültesi · Zootekni",
                "alan": "Yemler ve Hayvan Besleme",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Zootekni alanından almış olup; kanatlı hayvanlarda alternatif yem katkı maddeleri ve bağırsak histomorfolojisi konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 63,
                "unvan": "docent",
                "birim": "Ziraat Fakültesi · Toprak Bilimi ve Bitki Besleme",
                "alan": "Toprak Bilimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik ünvanını Toprak Bilimi ve Bitki Besleme alanından almış olup; vermikompostlama süreçleri ve arıtma çamuru konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 64,
                "unvan": "docent",
                "birim": "Ziraat Fakültesi · Toprak Bilimi ve Bitki Besleme",
                "alan": "Toprak Bilimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını Toprak bilimi ve Bitki Besleme alanında yapmış olup; orman ekosistemlerinde karbon stoğu ve tıbbi aromatik bitkilerde biyolojik aktiviteler konularında çalışmalar yapmış olmak."
                    }
                ]
            }
        ],
        "yayinTarihi": null
    },
    {
        "id": "alku-2026-03-ogretim-uyesi",
        "kurum": "alku",
        "kalip": "ogretim-uyesi",
        "baslik": "Öğretim üyesi alım ilanı (2026/03)",
        "resmiGazete": null,
        "kaynak": "resmi-gazete",
        "link": "https://pdb.alanya.edu.tr",
        "basvuru": {
            "baslangic": "2026-09-29",
            "bitis": "2026-10-13",
            "saat": "mesai bitimi",
            "kanal": [
                "sahsen"
            ],
            "adres": "Profesör ve doçent: Personel Daire Başkanlığı; doktor öğretim üyesi: ilanın çıktığı birim",
            "belgeler": [
                "Başvuru dilekçesi",
                "Akademik değerlendirme puan bildirim formu",
                "Yabancı dil sonuç/yeterlilik belgesi",
                "Diploma ve mezuniyet belgeleri",
                "Fiziki başvuru dosyası ve içeriğinin PDF'i olan salt okunur USB bellekler"
            ]
        },
        "ortakSartlar": [
            {
                "tur": "engel",
                "metin": "Profesör kadrosundakiler doçent kadrosuna, doçent ünvanını alanlar doktor öğretim üyesi kadrosuna başvuramaz."
            },
            {
                "tur": "diger",
                "metin": "%30 kota kapsamında başvuru yapılabilecek doktor öğretim üyesi kadrosu yoktur."
            }
        ],
        "notlar": [
            "Eksik belgeyle yapılan başvurular kabul edilmez."
        ],
        "pozisyonlar": [
            {
                "id": 65,
                "kod": "2026/03-1",
                "unvan": "profesor",
                "birim": "Rafet Kayış Mühendislik Fakültesi · Metalurji ve Malzeme Mühendisliği",
                "alan": "Metalurji ve Malzeme Mühendisliği",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Malzeme ve Metalurji Mühendisliği Alanında Almış Olmak. Toz Metalurjisi Üretim Teknikleri ile Metalik, Kompozit ve İleri Mühendislik Malzemelerin Üretimi ve Mikroyapı, Mekanik ve Aşınma Özellikleri Konularında Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 66,
                "kod": "2026/03-2",
                "unvan": "profesor",
                "birim": "Rafet Kayış Mühendislik Fakültesi · Mühendislik Temel Bilimleri",
                "alan": "Mühendislik Temel Bilimleri",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Matematik Alanında Almış Olmak. Kelimeler Üzerine Kombinatorik, Özel Sayılar ve Polinomlar ile Bunlara Yönelik Algoritmalar Konularında Çalışmalar Yapmış Olmak. İngilizce Ders Verme Yeterliliğine Sahip Olmak."
                    }
                ]
            },
            {
                "id": 67,
                "kod": "2026/03-3",
                "unvan": "docent",
                "birim": "Rafet Kayış Mühendislik Fakültesi · Mühendislik Temel Bilimleri",
                "alan": "Mühendislik Temel Bilimleri",
                "adet": 1,
                "derece": 2,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Kimya Alanında Almış Olmak. Elektrokromik Hibrit Sistemler ve Elektrokimyasal Biyosensör Teknolojileri Konularında Çalışmalar Yapmış Olmak. İngilizce Ders Verme Yeterliliğine Sahip Olmak."
                    }
                ]
            },
            {
                "id": 68,
                "kod": "2026/03-4",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Rafet Kayış Mühendislik Fakültesi · Endüstri Mühendisliği",
                "alan": "Endüstri Mühendisliği",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Lisans, Yüksek Lisans ve Doktora Derecelerini Endüstri Mühendisliği Alanında Almış Olmak. Modelleme ve Optimizasyon, Yapay Zekâ ve Çizelgeleme Alanlarında Çalışmalar Yapmış Olmak. İngilizce Ders Verme Yeterliliğine Sahip Olmak."
                    }
                ]
            },
            {
                "id": 69,
                "kod": "2026/03-5",
                "unvan": "profesor",
                "birim": "İktisadi, İdari ve Sosyal Bilimler Fakültesi · İşletme",
                "alan": "Ticaret Hukuku",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İş ve Sosyal Güvenlik Hukuku Alanında Doçent Ünvanı Almış Olmak. Bireysel İş Hukuku ve Karşılaştırmalı İş Hukuku Konularında Akademik Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 70,
                "kod": "2026/03-6",
                "unvan": "docent",
                "birim": "Diş Hekimliği Fakültesi · Klinik Bilimler",
                "alan": "Diş Hastalıkları ve Tedavisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Tamamlamış Olmak. Doçentlik Ünvanını İlgili Alanda Almış Olmak."
                    }
                ]
            },
            {
                "id": 71,
                "kod": "2026/03-7",
                "unvan": "profesor",
                "birim": "Eğitim Fakültesi · Yabancı Diller Eğitimi",
                "alan": "İngiliz Dili Eğitimi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İngiliz Dili Eğitimi Alanında Doçentliğini Almış Olmak. Yabancı Dil Öğretim Programı Geliştirme, Teknoloji Destekli Dil Becerileri Öğretimi ve Değerlendirme ile Öz Düzenlemeli Öğrenme Konularında Bilimsel Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 72,
                "kod": "2026/03-8",
                "unvan": "profesor",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "Aile Hekimliği",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Diyabet, Diyabetin Akut ve Kronik Komplikasyonları ve İlişkili Metabolik Hastalıklar Alanlarında Çalışmaları Olmak, Diyabet Tedavisi ile İlgi Yürütülen Klinik İlaç Faz Çalışmalarında Sorumlu Araştırmacı Olarak Yer Almış Olmak."
                    }
                ]
            },
            {
                "id": 73,
                "kod": "2026/03-9",
                "unvan": "profesor",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "İç Hastalıkları",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Tıbbi Onkoloji Alanında Almış Olmak. Metastatik Prostat Kanserinde PSA Kinetiği ile İlgili Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 74,
                "kod": "2026/03-10",
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "Radyoloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Almış Olmak. Peroneus Kuartus Kasının Peroneal Tendon Patolojilerinde Görülme Sıklığı Konusunda Çalışma Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 75,
                "kod": "2026/03-11",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Tıp Fakültesi · Dahili Tıp Bilimleri",
                "alan": "Nükleer Tıp",
                "adet": 1,
                "derece": 5,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Tamamlamış Olmak. Akciğer Kanserlerinde PET/BT ile Güncel Evreleme ve Prognosik Değerlendirme Üzerine Bilimsel Çalışma Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 76,
                "kod": "2026/03-12",
                "unvan": "profesor",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Üroloji",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Üroloji Alanında Almış Olmak. İnterstisyel Sistit ile İlgili Çalışma Yapmış Olmak. Rekonstrüktif Üroloji Cerrahisi Konularında Deneyimlere Sahip Olmak."
                    }
                ]
            },
            {
                "id": 77,
                "kod": "2026/03-13",
                "unvan": "profesor",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Kalp ve Damar Cerrahisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını Kalp ve Damar Cerrahisi Alanında Almış Olmak. Periferik Arter Hastalıkları Üzerine Çok Merkezli Uluslararası Çalışmalarda Yer Almak ve Anjiyogenez Konusunda Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 78,
                "kod": "2026/03-14",
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Göz Hastalıkları",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Almış Olmak. Pediatrik Malnütrisyonun Göze Etkileri Üzerine Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 79,
                "kod": "2026/03-15",
                "unvan": "docent",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Kalp ve Damar Cerrahisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Almış Olmak. Dual Antiplatelet Tedavi Rejimlerinin Periferik Vasküler Sistem Üzerindeki Terapötik Etkileri ve Anjiyogenez Mekanizmaları Konularında Çalışma Yapmış Olmak. Kalp Nakli Yapılan Bir Merkezde En Az 1 (Bir) Yıl Çalışmış Olmak."
                    }
                ]
            },
            {
                "id": 80,
                "kod": "2026/03-16",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Tıp Fakültesi · Cerrahi Tıp Bilimleri",
                "alan": "Üroloji",
                "adet": 1,
                "derece": 4,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uzmanlığını İlgili Alanda Tamamlamış Olmak. Pediatrik Hastalarda İşeme Disfonksiyonu ve Üroterapi Üzerine Bilimsel Çalışma Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 81,
                "kod": "2026/03-17",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Tıp Fakültesi · Temel Tıp Bilimleri",
                "alan": "Biyoistatistik ve Tıp Bilişimi",
                "adet": 1,
                "derece": 2,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doktorasını Biyoistatistik Alanında Yapmış Olmak. Yapay Zekâ Robotları Konusunda Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 82,
                "kod": "2026/03-18",
                "unvan": "profesor",
                "birim": "Sağlık Bilimleri Fakültesi · Hemşirelik",
                "alan": "Doğum, Kadın Sağlığı ve Hastalıkları Hemşireliği",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentlik Ünvanını İlgili Alanda Almış Olmak. Gebelikte Maneviyat, Aile Planlamasında Dini İnanışlar ve Kadın Cinsel Sağlığı Konularında Bilimsel Çalışmalar Yapmış Olmak."
                    }
                ]
            },
            {
                "id": 83,
                "kod": "2026/03-19",
                "unvan": "docent",
                "birim": "Spor Bilimleri Fakültesi · Antrenörlük Eğitimi",
                "alan": "Hareket ve Antrenman Bilimleri",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentliğini Hareket ve Antrenman Bilimleri Alanında Almış Olmak. Sporcularda Kas-İskelet Sistemi Problemlerinin Değerlendirilmesi ile Mücadele Sporcularında Biyomotor Özellikler ve Fiziksel Uygunluk Parametreleri Üzerine Bilimsel Çalışmalar Yapmış Olmak. Taekwondo Branşında En Az 3. Kademe Kıdemli Antrenörlük Belgesine Sahip Olmak."
                    }
                ]
            },
            {
                "id": 84,
                "kod": "2026/03-20",
                "unvan": "docent",
                "birim": "Alanya Ticaret ve Sanayi Odası Turizm Meslek Yüksekokulu · Seyahat-Turizm ve Eğlence Hizmetleri",
                "alan": "Turizm Animasyonu",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Spor Yönetimi Alanında Doçentliğini Almış Olmak. Halk Oyunları Alanında Toksik Liderlik ve Halk Dansçılarında Mutluluk Konusunda Çalışmalar Yapmış Olmak."
                    }
                ]
            }
        ],
        "yayinTarihi": null
    },
    {
        "id": "tkgm-2026-bilisim",
        "kurum": "tkgm",
        "kalip": "sozlesmeli-bilisim",
        "baslik": "Sözleşmeli bilişim personeli alım ilanı",
        "yayinTarihi": "2026-09-28",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr",
        "varsayilan": {
            "birim": "Bilgi Teknolojileri Dairesi Başkanlığı"
        },
        "basvuru": {
            "baslangic": "2026-10-12",
            "bitis": "2026-10-19",
            "saat": "17:00",
            "adres": "https://kariyerkapisi.gov.tr",
            "tekBasvuru": true,
            "belgeler": [
                "Yabancı okul mezunları için denklik belgesi",
                "YDS dışında varsa YÖK denkliği olan İngilizce dil belgesi",
                "Fotoğraflı özgeçmiş (PDF)",
                "Mesleki tecrübe belgeleri (SGK hizmet dökümü, çalışma belgesi vb.)",
                "En az iki programlama dilini bildiğini gösteren belgeler",
                "Özel şartlarda istenen sertifikalar"
            ]
        },
        "secme": {
            "aciklama": "Sözlü ve uygulamalı sınav.",
            "sinavTarihi": "2026-11-10/2026-11-20",
            "sinavYeri": "Tapu ve Kadastro Genel Müdürlüğü"
        },
        "ortakSartlar": [
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P3"
                ],
                "yillar": [
                    2025,
                    2026
                ],
                "zorunlu": false,
                "metin": "2025 veya 2026 KPSS P3 puanı sıralamada kullanılır; KPSS puanı olmayanın puanı 70 sayılır."
            },
            {
                "tur": "sinav",
                "sinav": "yds",
                "dil": "İngilizce",
                "zorunlu": false,
                "metin": "Son 5 yılda alınmış İngilizce YDS (veya dengi) puanı sıralamada kullanılır; puanı olmayanın puanı 0 sayılır."
            }
        ],
        "notlar": [
            "Mesleki tecrübede lisans mezuniyeti sonrası süreler sayılır.",
            "Puan eşitliğinde iş tecrübesi, bilinen programlama dili sayısı, yüksek lisans ve dil puanına bakılır."
        ],
        "pozisyonlar": [
            {
                "id": 85,
                "unvan": "yazilim-takim-lideri",
                "ilandakiAd": "Yazılım Takım Lideri",
                "adet": 2,
                "ucret": {
                    "tavanKati": 4
                },
                "sartlar": [
                    {
                        "tur": "deneyim",
                        "yil": 7,
                        "yerineGecer": true,
                        "metin": "İlgili alanda en az 7 yıl tecrübe (ayrıntı teknik niteliklerde)."
                    },
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Yazılım geliştirme alanında en az yedi yıl fiilen çalışmış ve bunu belgeliyor olmak.",
                            "En az 100.000 (yüz bin) kayıtlı kullanıcıya sahip bir yazılım sisteminde görev yapmış olmak ve bu hususu belgelemek.",
                            "Yazılım ekiplerine teknik liderlik etmiş; kod ve mimari inceleme süreçlerini yürütmüş olmak.",
                            "Kurumsal ölçekte, yüksek erişilebilirlik ve yatay ölçeklenebilirlik gerektiren yazılım sistemlerinin mimari tasarımında görev almış olmak.",
                            ".NET/.NET Core, C#, ASP.NET Core Web API ve dağıtık sistem mimarileri konusunda ileri düzey deneyim sahibi olmak.",
                            "Mikroservis mimarisi, etki alanı odaklı tasarım, olay güdümlü mimari ve API yönetimi yaklaşımlarından en az ikisinde uygulamalı deneyim sahibi olmak.",
                            "Kubernetes ve konteyner tabanlı uygulama yaşam döngüsü; servis keşfi, yapılandırma, ölçekleme ve dayanıklılık yaklaşımlarında deneyimli olmak.",
                            "Mesajlaşma teknolojileri, dağıtık önbellekleme, ilişkisel ve ilişkisel olmayan veri tabanları hakkında deneyim sahibi olmak.",
                            "OAuth 2.0, OpenID Connect, merkezi kimlik ve erişim yönetimi ile rol/yetki modellerinin tasarımında deneyimli olmak.",
                            "Merkezi loglama, metrik ve denetim kayıtlarının kullanımı ile canlı ortam sorunlarının tespiti ve kök neden analizinde görev almış olmak.",
                            "Çevik yazılım geliştirme süreçlerinin (Scrum, Kanban veya benzeri) yürütülmesi, iş listesinin önceliklendirilmesi, iş dağıtımı, efor tahmini ve teslim takviminin yönetimi konularında deneyim sahibi olmak.",
                            "Kod inceleme, kodlama standartları, birim test kapsamı, statik kod analizi ve sürüm kontrol iş akışlarının kurulması veya yürütülmesinde görev almış olmak.",
                            "Sürüm planlaması, yayın (release) yönetimi, canlı ortam sorunlarının koordinasyonu ve olay sonrası değerlendirme süreçlerinde görev almış olmak.",
                            "Mimari karar kayıtları, teknik standartlar, referans mimariler ve teknik dokümantasyon hazırlamış olmak."
                        ]
                    }
                ]
            },
            {
                "id": 86,
                "unvan": "yazilim-takim-lideri",
                "ilandakiAd": "CBS Yazılım Takım Lideri",
                "adet": 1,
                "ucret": {
                    "tavanKati": 4
                },
                "sartlar": [
                    {
                        "tur": "deneyim",
                        "yil": 7,
                        "yerineGecer": true,
                        "metin": "İlgili alanda en az 7 yıl tecrübe (ayrıntı teknik niteliklerde)."
                    },
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Coğrafi bilgi sistemleri yazılım geliştirme alanında en az 7 (yedi) yıl tecrübeye sahip olmak ve bunu belgelemek.",
                            "Yazılım geliştirme ekiplerine teknik liderlik etmiş; kod ve mimari inceleme süreçlerini yürütmüş olmak.",
                            "Java veya C# dillerinden birinin ve açık kaynak kodlu CBS bileşenlerinin (PostGIS, GeoServer vb.) kullanıldığı, 5.000 (beş bin) ve üzeri kullanıcıya sahip coğrafi bilgi sistemi (CBS) projelerinde görev yapmış olmak ve bunu belgelemek.",
                            "Üretim ortamında harita servisi isteği karşılayan, kurumlar arası veri paylaşımı yapılan coğrafi bilgi sistemlerinde en az 2 (iki) yıl yazılım mimarı, çözüm mimarı veya teknik lider olarak görev yapmış; performans optimizasyonu, yatay ve dikey ölçeklenebilirlik, kapasite planlaması ve kurumlar arası entegrasyon mimarisi çalışmalarında doğrudan bilgi ve deneyim sahibi olmak.",
                            "PostgreSQL/PostGIS veya eş değer bir mekânsal veri tabanı (Microsoft SQL Server, Oracle vb.) ile büyük hacimli veri setlerinde mekânsal veri modelleme, indeksleme, bölümleme ve sorgu optimizasyonu konularında ileri düzey bilgi ve tecrübe sahibi olmak.",
                            "Mekânsal analiz, geometri doğrulama ve topoloji kontrolleri ile yüksek istek hacminde düşük gecikmeyle yanıt veren mekânsal sorgu servislerinin tasarımı konularında bilgi ve tecrübe sahibi olmak.",
                            "OGC standartları (WMS, WFS, WMTS) ve GeoServer veya eş değer coğrafi sunucunun yönetimi, SLD ile tematik harita üretimi; yüksek istek hacimli harita servislerinde kapasite planlaması, tile önbellekleme, katman ve bölge bazlı yetkilendirme ve yük dengeleme konularında bilgi ve tecrübe sahibi olmak.",
                            "Raster verilerin koordinat dönüşümü, tile üretimi ve WMTS/TMS servisi olarak sunulması konularında bilgi ve tecrübe sahibi olmak.",
                            "Coğrafi veri formatları (GML, GeoJSON, SHP, KML) ve açık kaynak kodlu CBS yazılımları (QGIS, GDAL vb.) konularında bilgi ve tecrübe sahibi olmak.",
                            "OpenLayers veya Leaflet gibi kütüphanelerle web tabanlı harita uygulamaları geliştirme ve .NET ile mekânsal veri işleme (NetTopologySuite, GeoJSON/WKT) konularında bilgi ve tecrübe sahibi olmak.",
                            "Kurumlar arası coğrafi veri ve servis entegrasyonu, artımlı mekânsal veri toplama (WFS vb.) ve e-Devlet Kapısı entegrasyonu konularında bilgi ve tecrübe sahibi olmak.",
                            "Kurumsal yazılım mimarisi, nesne yönelimli programlama, tasarım kalıpları (MVC ve MVVM dâhil) ve ORM araçları (Entity Framework, NHibernate) konularında ileri düzey bilgi ve tecrübe sahibi olmak.",
                            "Mikroservis mimarisi, olay tabanlı entegrasyon, API ağ geçidi ve eski teknolojiye dayalı büyük ölçekli sistemlerin kademeli modernizasyonu; mesaj kuyruğu (RabbitMQ vb.) ve Redis ile önbellekleme konularında bilgi ve tecrübe sahibi olmak.",
                            "OAuth 2.0, OpenID Connect ve JWT ile kimlik ve erişim yönetimi konusunda bilgi ve tecrübe sahibi olmak.",
                            "Docker ile konteynerleştirme, Kubernetes ortamına uygun uygulama tasarımı, kaynak kod yönetim araçları (Git, SVN, TFS), CI/CD süreçleri ve ELK ile merkezi loglama konularında bilgi ve tecrübe sahibi olmak.",
                            "Teknik şartname ve kabul kriteri hazırlama ile yüklenici teslimatlarının mimari denetimi konularında tecrübe; yazılım geliştirme hayat döngüleri ve UML hakkında bilgi sahibi olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "3 boyutlu CBS (CityGML, 3D Tiles, CesiumJS) konularında bilgi ve tecrübe sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 87,
                "unvan": "siber-guvenlik-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Siber Güvenlik Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 4
                },
                "sartlar": [
                    {
                        "tur": "deneyim",
                        "yil": 7,
                        "yerineGecer": true,
                        "metin": "İlgili alanda en az 7 yıl tecrübe (ayrıntı teknik niteliklerde)."
                    },
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya kurumsal bilgi teknolojileri altyapılarında siber güvenlik alanında en az yedi yıl fiilen çalışmış olmak ve bu hususu belgelemek.",
                            "En az 5.000 (beş bin) aktif kullanıcıya veya istemciye hizmet veren bilgi sistemlerinde siber güvenlik altyapılarının kurulumu, işletimi, yönetimi veya güvenliğinin sağlanması süreçlerinde görev almış olmak ve bu hususu belgelemek.",
                            "Güvenlik duvarı (Firewall/NGFW), Web Uygulama Güvenlik Duvarı (WAF), Saldırı Tespit ve Önleme Sistemleri (IDS/IPS), VPN, e-posta güvenliği, DNS güvenliği ve proxy sistemlerinden en az dördünün kurulumu, yapılandırılması veya yönetimi konusunda bilgi ve tecrübe sahibi olmak.",
                            "Kurumsal siber güvenlik mimarisinin tasarlanması; ağ segmentasyonu, güvenlik katmanlarının konumlandırılması, sıfır güven (Zero Trust) yaklaşımı ve yeni sistem ile projelerin güvenlik gereksinimlerinin belirlenmesi konularında bilgi ve tecrübe sahibi olmak.",
                            "E-posta güvenlik ağ geçidi çözümlerinin kurulumu, yapılandırılması ve yönetimi; SPF, DKIM ve DMARC yapılandırması ile oltalama ve zararlı ek içeren e-postaların analizi konularında bilgi ve tecrübe sahibi olmak.",
                            "SIEM (Security Information and Event Management) sistemlerinin kurulumu, yönetimi, log kaynaklarının entegrasyonu, korelasyon kurallarının oluşturulması ve güvenlik olaylarının analizi konularında bilgi ve tecrübe sahibi olmak.",
                            "SOC/SOME süreçleri ile siber olayların tespiti, analizi, müdahalesi, kayıt altına alınması ve olay sonrası iyileştirme çalışmalarında bilgi ve tecrübe sahibi olmak.",
                            "EDR/XDR, antivirüs ve uç nokta güvenliği çözümlerinin kurulumu, yapılandırılması ve yönetimi konusunda bilgi ve tecrübe sahibi olmak.",
                            "Zafiyet tarama ve yönetimi, penetrasyon testi sonuçlarının değerlendirilmesi, güvenlik açıklarının sınıflandırılması, önceliklendirilmesi ve giderilmesinin takibi konularında bilgi ve tecrübe sahibi olmak.",
                            "TCP/IP, DNS, HTTP/HTTPS, TLS ve SMTP gibi temel ağ ve uygulama protokolleri ile LAN, WAN, VLAN ve VPN teknolojileri konusunda bilgi sahibi olmak; Wireshark, tcpdump veya benzeri araçlarla ağ trafiği analizi yapabilmek.",
                            "Ayrıcalıklı hesap yönetimi (PAM), çok faktörlü kimlik doğrulama ve Active Directory güvenliği ile Kerberos/NTLM tabanlı saldırı teknikleri ve bunlara karşı alınacak önlemler konusunda bilgi ve tecrübe sahibi olmak.",
                            "Linux ve Windows sunucu işletim sistemlerinin güvenliği, yetkilendirme, erişim kontrolü, güvenlik sıkılaştırması (hardening) ve güvenlik kayıtlarının yönetimi konularında bilgi ve tecrübe sahibi olmak.",
                            "DDoS saldırıları, kimlik avı (phishing), zararlı yazılım, fidye yazılımı, yetkisiz erişim, web uygulama saldırıları ve benzeri siber tehditlerin tespiti ve bunlara karşı alınabilecek güvenlik önlemleri konusunda bilgi sahibi olmak.",
                            "ISO/IEC 27001 Bilgi Güvenliği Yönetim Sistemi, risk yönetimi, iş sürekliliği ve bilgi güvenliği politika ve prosedürlerinin hazırlanması konularında bilgi sahibi olmak.",
                            "Siber güvenlik ürün ve hizmetlerine yönelik ihtiyaç analizi yapılması, teknik şartname hazırlanması, ürün değerlendirme süreçlerinin yürütülmesi ile dışarıdan alınan sızma testi hizmetlerinin yönetimi ve bulguların giderilmesinin takibi konularında bilgi ve tecrübe sahibi olmak.",
                            "OWASP Top 10, MITRE ATT&CK ve güncel siber saldırı teknikleri hakkında bilgi ve deneyim sahibi olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "CISSP, OSCP, CEH, CISM, GIAC veya eş değer uluslararası geçerliliğe sahip siber güvenlik sertifikalarına sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 88,
                "unvan": "devops-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli DevOps Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 4
                },
                "sartlar": [
                    {
                        "tur": "deneyim",
                        "yil": 7,
                        "yerineGecer": true,
                        "metin": "İlgili alanda en az 7 yıl tecrübe (ayrıntı teknik niteliklerde)."
                    },
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında yazılım geliştirme, sistem yönetimi ya da DevOps alanlarında en az yedi yıl fiilen çalışmış; bu sürenin en az iki yılında DevOps, DevSecOps, CI/CD, konteyner orkestrasyonu veya uygulama altyapıları alanlarında görev yapmış olmak ve bu hususu belgelemek.",
                            "En az 5.000 (beş bin) aktif kullanıcıya hizmet veren bilgi sistemlerinin DevOps, uygulama altyapısı, CI/CD veya konteyner platformlarının kurulumu, işletimi veya yönetiminde görev almış olmak ve bu hususu belgelemek.",
                            "Kubernetes mimarisi ve bileşenleri konusunda ileri düzeyde bilgi sahibi olmak; üretim ortamında Kubernetes kümelerinin kurulumu, yapılandırılması, işletimi, güncellenmesi, ölçeklendirilmesi ve sorun giderme süreçlerinde görev almış olmak.",
                            "Docker veya benzeri konteyner teknolojileri konusunda ileri düzeyde bilgi ve tecrübe sahibi olmak.",
                            "Git tabanlı kaynak kod yönetimi ile GitLab CI/CD, Jenkins, Azure DevOps, GitHub Actions veya benzeri CI/CD araçlarından en az biriyle kurumsal ölçekte pipeline tasarlama, oluşturma ve yönetme konusunda tecrübe sahibi olmak.",
                            "Helm, Kustomize veya benzeri Kubernetes uygulama paketleme ve yapılandırma araçlarından en az biri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Infrastructure as Code (IaC) yaklaşımına hâkim olmak; Terraform, Ansible veya benzeri altyapı otomasyon araçlarından en az biri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Linux işletim sistemlerinin yönetimi, servis yönetimi, dosya sistemleri, kullanıcı ve yetkilendirme işlemleri, ağ yapılandırması, performans analizi ve sorun giderme konularında ileri düzeyde bilgi sahibi olmak.",
                            "Prometheus, Grafana, Elasticsearch, OpenSearch, Loki, Jaeger, OpenTelemetry veya benzeri loglama, metrik, iz sürme ve gözlemlenebilirlik teknolojilerinden en az üçü konusunda bilgi ve tecrübe sahibi olmak.",
                            "Nginx, HAProxy, Traefik veya benzeri ters vekil sunucu/yük dengeleyici teknolojilerinden en az biri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Mikroservis mimarileri, API Gateway, servis keşfi, dağıtık sistemler ve yüksek erişilebilirlik konularında bilgi sahibi olmak.",
                            "Kubernetes ortamlarında Secret, ConfigMap, RBAC, Network Policy, TLS/sertifika yönetimi ve konteyner güvenliği konularında bilgi sahibi olmak.",
                            "PostgreSQL, MongoDB, Redis, Elasticsearch veya benzeri veri tabanı/önbellekleme teknolojilerinden en az ikisinin uygulama altyapısı açısından kurulumu, bağlantı yönetimi, yüksek erişilebilirliği veya izlenmesi konusunda bilgi sahibi olmak.",
                            "Bash, PowerShell, Python veya benzeri betik dillerinden en az biriyle otomasyon geliştirebilecek düzeyde bilgi sahibi olmak.",
                            "TCP/IP, DNS, HTTP/HTTPS, TLS, yük dengeleme ve temel ağ teknolojileri konusunda bilgi sahibi olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "GitOps yaklaşımı ile Argo CD, Flux veya benzeri teknolojileri kullanmış olmak.",
                            "HashiCorp Vault veya benzeri gizli bilgi yönetimi çözümlerini kullanmış olmak.",
                            "Yoğun işlem hacmine sahip mikroservis mimarilerinin üretim ortamlarının işletiminde görev almış olmak.",
                            "DevSecOps süreçlerinde (SAST/DAST, statik kod analizi, konteyner/imaj güvenlik taraması, güvenlik açığı yönetimi, policy as code, yazılım tedarik zinciri güvenliği vb.) görev almış; SonarQube, Checkmarx, Snyk, Trivy, Aqua, OPA/Gatekeeper, Kyverno veya benzeri araçlardan en az biriyle tecrübe sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 89,
                "unvan": "sistem-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Sistem Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 4
                },
                "sartlar": [
                    {
                        "tur": "deneyim",
                        "yil": 7,
                        "yerineGecer": true,
                        "metin": "İlgili alanda en az 7 yıl tecrübe (ayrıntı teknik niteliklerde)."
                    },
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında sistem yönetimi alanında en az yedi yıl fiilen çalışmış olmak ve bu hususu belgelemek.",
                            "En az 5.000 (beş bin) aktif kullanıcıya veya istemciye hizmet veren bilgi işlem altyapılarında sistem, sunucu, sanallaştırma veya veri merkezi altyapılarının kurulumu, işletimi veya yönetiminde görev almış olmak ve bu hususu belgelemek.",
                            "Microsoft Windows Server işletim sistemlerinin kurulumu, yapılandırılması, yönetimi, güncellenmesi, performans analizi ve sorun giderme konularında ileri düzeyde bilgi ve tecrübe sahibi olmak.",
                            "Linux işletim sistemlerinin kurulumu, yapılandırılması, servis yönetimi, kullanıcı/yetki yönetimi, disk ve dosya sistemleri, log yönetimi ve sorun giderme konularında bilgi ve tecrübe sahibi olmak.",
                            "Microsoft Active Directory Domain Services (AD DS), DNS, DHCP, Group Policy (GPO), LDAP ve sertifika servisleri (PKI/CA) konularında ileri düzeyde bilgi ve tecrübe sahibi olmak.",
                            "VMware vSphere/ESXi, Microsoft Hyper-V veya benzeri kurumsal sanallaştırma platformlarından en az biri konusunda kurulum, yapılandırma, küme yönetimi, yüksek erişilebilirlik ve sorun giderme tecrübesine sahip olmak.",
                            "Kurumsal depolama sistemleri (SAN/NAS), Fibre Channel, iSCSI, RAID ve depolama alanı yönetimi konularında bilgi ve tecrübe sahibi olmak.",
                            "Kurumsal yedekleme ve felaket kurtarma çözümlerinin kurulumu ve yönetimi, yedekleme politikalarının oluşturulması, yüksek erişilebilirlik ve Failover Cluster mimarileri ile felaket kurtarma merkezine replikasyon tasarımı ve düzenli kurtarma tatbikatlarının yürütülmesi konularında ileri düzeyde bilgi ve tecrübe sahibi olmak.Yüksek erişilebilirlik, Failover Cluster, yük dengeleme ve felaket kurtarma mimarileri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Sistem kurulum standartlarının, güvenlik sıkılaştırma, yama ve ayrıcalıklı hesap yönetimi politikalarının hazırlanması, uygulanmasının takibi ile merkez ve taşra birimlerinin bu konularda teknik olarak yönlendirilmesi konularında bilgi ve tecrübe sahibi olmak.",
                            "PowerShell, Bash veya benzeri betik dillerinden en az biriyle sistem yönetimi ve operasyon süreçlerini otomatikleştirebilecek düzeyde bilgi sahibi olmak.",
                            "TCP/IP, VLAN, DNS, DHCP, NTP, yönlendirme, güvenlik duvarı ve yük dengeleme gibi temel ağ teknolojileri ve protokolleri konusunda bilgi sahibi olmak.",
                            "Sistem performansının ve kapasitesinin Zabbix, Prometheus, Grafana, SCOM veya benzeri merkezi izleme sistemlerinden en az biri ile izlenmesi, kapasite planlaması yapılması ve performans sorunlarının tespit edilerek giderilmesi konularında ileri düzeyde bilgi ve tecrübe sahibi olmak.",
                            "Windows ve Linux sistemlerinin güvenlik sıkılaştırması (hardening), yama yönetimi, yetkilendirme, ayrıcalıklı hesap yönetimi ve güvenlik politikaları konusunda bilgi sahibi olmak.",
                            "Veri merkezi sistemlerinin envanter, kapasite, erişilebilirlik ve süreklilik süreçlerinin yönetimi konusunda bilgi sahibi olmak.",
                            "Merkezî istemci ve sunucu yönetimi (MECM/SCCM), kurumsal e-posta (Exchange veya benzeri) ve dosya sunucusu (File Server, DFS) altyapılarının mimari tasarımı, kurulumu, yüksek erişilebilirlik yapılandırması ve sürüm yükseltmeleri konularında ileri düzeyde bilgi ve tecrübe sahibi olmak.",
                            "Sunucu, depolama, sanallaştırma ve lisans alımlarına yönelik ihtiyaç analizi yapılması, teknik şartname hazırlanması ve ürün değerlendirme süreçlerinin yürütülmesi konularında bilgi ve tecrübe sahibi olmak.Veeam, Commvault veya benzeri kurumsal yedekleme çözümlerinde tecrübeli olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Microsoft, Red Hat, VMware veya benzeri üreticilerin sistem yönetimi alanındaki profesyonel sertifikalarından birine sahip olmak.",
                            "Gerçek ortamda felaket kurtarma tatbikatı planlamış ve yürütmüş olmak."
                        ]
                    }
                ]
            },
            {
                "id": 90,
                "unvan": "yazilim-gelistirme-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Yazılım Geliştirme Uzmanı",
                "adet": 3,
                "ucret": {
                    "tavanKati": 3
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Yazılım geliştirme alanında en az beş yıl fiilen çalışmış olmak ve bunu belgelemek.",
                            "En az 20.000 (yirmi bin) kayıtlı kullanıcıya sahip bir yazılım sisteminin analiz, tasarım, geliştirme, test, devreye alma veya bakım süreçlerinin en az birinde toplamda en az bir yıl fiilen görev yapmış olmak ve bu hususu belgelemek.",
                            ".NET/.NET Core platformunda, C# ve ASP.NET Core Web API teknolojileriyle kurumsal ölçekte uygulama geliştirmiş olmak.",
                            "Mikroservis veya servis odaklı mimari yaklaşımıyla uygulama geliştirme deneyimine sahip olmak.",
                            "Modern front end uygulama geliştirme kütüphaneleri (React, Angular, Vue vb.) ile uygulama geliştirmiş olmak.",
                            "RESTFUL servisler başta olmak üzere SOAP, WCF, WSDL, XML tabanlı servis mimarilerinde kurumsal entegrasyon konusunda bilgi ve deneyim sahibi olmak",
                            "İlişkisel veri tabanları, veri modelleme, ileri seviye SQL ve performans iyileştirme konularında deneyimli olmak.",
                            "Mesaj kuyruğu veya olay güdümlü mimari çözümlerinden en az biriyle çalışmış olmak.",
                            "Redis veya eş değer dağıtık önbellekleme teknolojilerinden en az biriyle çalışmış olmak.",
                            "Docker veya eş değer konteyner teknolojileri konusunda deneyimli olmak.",
                            "Kimlik doğrulama ve yetkilendirme süreçleri; OAuth 2.0, OpenID Connect veya JWT standartlarından en az biri hakkında deneyim sahibi olmak.",
                            "Birim ve entegrasyon testleri, kod inceleme, CI/CD ve güvenli yazılım geliştirme süreçlerinde görev almış olmak.",
                            "Versiyon kontrol sistemi (TFS, Git) ve CI-CD (Continuous Integration-Continuous Delivery) konusunda bilgi sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 91,
                "unvan": "veritabani-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Veritabanı Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 3
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında en az beş yıl fiilen çalışmış; bu sürenin en az üç yılında veritabanı yöneticisi (DBA) olarak görev yapmış olmak ve bu hususu belgelemek.",
                            "En az 5.000 (beş bin) aktif kullanıcıya hizmet veren bilgi sistemlerinde kullanılan veritabanlarının kurulumu, yapılandırılması, işletimi, yönetimi, izlenmesi veya performans çalışmalarında görev almış olmak ve bu hususu belgelemek.",
                            "PostgreSQL ve Microsoft SQL Server ilişkisel veritabanı yönetim sistemlerinin kurulumu, yapılandırılması, yönetimi, güncellenmesi ve sorun giderme süreçlerinde bilgi ve tecrübe sahibi olmak.",
                            "İlişkisel veritabanlarında SQL sorgularının analizi ve optimizasyonu, execution plan analizi, indeksleme stratejileri, istatistik yönetimi, partitioning ve performans iyileştirme konularında bilgi ve tecrübe sahibi olmak.",
                            "Veritabanlarında yüksek erişilebilirlik, replikasyon, clustering, failover ve yük dengeleme mimarileri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Veritabanı yedekleme, geri yükleme, Point-in-Time Recovery (PITR), felaket kurtarma ve iş sürekliliği süreçleri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Veritabanı kullanıcıları, roller, yetkilendirme, erişim kontrolü, parola politikaları, veri şifreleme ve güvenlik sıkılaştırması konularında bilgi sahibi olmak.",
                            "Veritabanı performansının izlenmesi; CPU, bellek, disk I/O, bağlantı sayıları, lock, blocking, deadlock ve uzun süren sorgular gibi performans göstergelerinin analiz edilmesi ve sorunların giderilmesi konusunda tecrübe sahibi olmak.",
                            "Veritabanı kapasite planlaması, büyüme analizi, disk alanı yönetimi, arşivleme ve veri yaşam döngüsü süreçleri konusunda bilgi sahibi olmak.",
                            "Linux işletim sistemlerinde veritabanı servislerinin yönetimi, disk ve dosya sistemleri, kullanıcı/yetkilendirme, servis ve log yönetimi konularında bilgi sahibi olmak.",
                            "TCP/IP, DNS, TLS/SSL ve veritabanı bağlantı mimarileri gibi veritabanı sistemlerini ilgilendiren temel ağ teknolojileri konusunda bilgi sahibi olmak.",
                            "Bash, PowerShell, Python veya benzeri betik dillerinden en az biriyle veritabanı yönetim ve operasyon süreçlerinin otomasyonu konusunda bilgi sahibi olmak.",
                            "Veritabanı izleme, alarm üretme ve performans takibi amacıyla kullanılan kurumsal izleme araçlarından en az biri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Üretim ortamlarında meydana gelen veritabanı sorunlarının kök neden analizinin (Root Cause Analysis) yapılması, giderilmesi ve tekrarının önlenmesine yönelik çalışmalar konusunda tecrübe sahibi olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "MongoDB, Elasticsearch veya benzeri NoSQL/dağıtık veri platformlarından en az birinin yönetimi konusunda bilgi sahibi olmak.",
                            "Yoğun işlem hacmine ve yüksek erişilebilirlik gereksinimine sahip kritik üretim veritabanlarının yönetiminde görev almış olmak.",
                            "PostgreSQL, Oracle veya Microsoft SQL Server alanında üretici veya uluslararası geçerliliğe sahip profesyonel sertifikalardan birine sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 92,
                "unvan": "yazilim-gelistirme-uzmani",
                "ilandakiAd": "Yazılım Geliştirme Uzmanı",
                "adet": 6,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Yazılım geliştirme alanında en az üç yıl fiilen çalışmış olmak ve bu deneyimini belgelemek.",
                            ".NET/.NET Core platformunda ve C# programlama dilinde kurumsal uygulama geliştirmiş olmak ve bunu belgelemek.",
                            "ASP.NET Core Web API kullanarak RESTful servisler geliştirme ve katmanlı yazılım mimarileri konusunda deneyim sahibi olmak.",
                            "İlişkisel veri tabanlarından en az biriyle uygulama geliştirmiş; SQL, veri modelleme ve sorgu optimizasyonu konularında bilgi sahibi olmak.",
                            "Entity Framework Core veya eş değer bir nesne-ilişkisel eşleme aracı kullanmış olmak.",
                            "Nesne yönelimli programlama, SOLID prensipleri, tasarım desenleri ve temiz kod yaklaşımı konusunda bilgi sahibi olmak.",
                            "Git veya eşdeğer bir sürüm kontrol sistemi kullanmış olmak ve yazılım geliştirme yaşam döngüsü süreçlerine hâkim olmak.",
                            "Docker, Redis, mesaj kuyruğu sistemleri, React/Angular/Vue veya CI/CD araçları konusunda deneyim sahibi olmak.",
                            "Birim test yazımı, hata ayıklama ve kod inceleme süreçlerine hâkim olmak."
                        ]
                    }
                ]
            },
            {
                "id": 93,
                "unvan": "siber-guvenlik-uzmani",
                "ilandakiAd": "Siber Güvenlik Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında en az üç yıl fiilen çalışmış; bu sürenin en az iki yılında siber güvenlik, bilgi güvenliği, ağ güvenliği veya güvenlik operasyonları alanında görev yapmış olmak ve bu hususu belgelemek.",
                            "Güvenlik duvarı (Firewall/NGFW), Web Uygulama Güvenlik Duvarı (WAF), IDS/IPS, VPN, proxy, e-posta güvenliği veya DNS güvenliği teknolojilerinden en az ikisi konusunda bilgi ve tecrübe sahibi olmak.",
                            "SIEM sistemlerinde log kaynaklarının izlenmesi, güvenlik olaylarının incelenmesi, korelasyon kurallarının değerlendirilmesi ve alarm analizi konularında bilgi ve tecrübe sahibi olmak.",
                            "EDR/XDR, antivirüs ve uç nokta güvenliği çözümlerinden en az biri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Zafiyet tarama araçlarının kullanımı, tespit edilen güvenlik açıklarının değerlendirilmesi, sınıflandırılması ve giderilmesinin takibi konularında bilgi sahibi olmak.",
                            "TCP/IP, DNS, HTTP/HTTPS, TLS/SSL, SMTP, NAT ve VPN gibi temel ağ protokolleri ve teknolojileri konusunda bilgi sahibi olmak.",
                            "Windows ve Linux işletim sistemlerinin temel güvenlik yapılandırmaları, kullanıcı ve yetkilendirme işlemleri, log yönetimi ve güvenlik sıkılaştırması konularında bilgi sahibi olmak.",
                            "Kimlik avı, zararlı yazılım, fidye yazılımı, yetkisiz erişim, web uygulama saldırıları, DDoS ve benzeri siber tehditler ile bunlara karşı uygulanabilecek güvenlik önlemleri konusunda bilgi sahibi olmak.",
                            "OWASP Top 10, MITRE ATT&CK ve temel siber saldırı teknikleri konusunda bilgi sahibi olmak.",
                            "Siber güvenlik olaylarının tespiti, analizi, kayıt altına alınması, müdahalesi ve raporlanması süreçleri konusunda bilgi sahibi olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "CompTIA Security+, CySA+, CEH (Certified Ethical Hacker), GCIH (GIAC Certified Incident Handler), GSOC/SOC Analyst, CompTIA CASP+ veya OSCP gibi uluslararası geçerliliği bulunan siber güvenlik sertifikalarından birine sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 94,
                "unvan": "ag-uzmani",
                "ilandakiAd": "Ağ Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında en az üç yıl fiilen çalışmış; bu sürenin en az iki yılında ağ teknolojileri ve ağ yönetimi alanında görev yapmış olmak ve bu hususu belgelemek.",
                            "TCP/IP, IPv4/IPv6, subnetting, VLAN, STP/RSTP, LACP, NAT, DHCP, DNS ve NTP protokolleri ve teknolojileri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Kurumsal ağlarda kullanılan router ve switch cihazlarının kurulumu, yapılandırılması, yönetimi ve sorun giderme süreçlerinde bilgi ve tecrübe sahibi olmak.",
                            "OSPF ve BGP yönlendirme protokolleri konusunda bilgi sahibi olmak; en az birinin kurumsal ağ ortamında yapılandırılması veya işletiminde görev almış olmak.",
                            "LAN, WAN, WLAN, VPN ve veri merkezi ağ mimarileri konusunda bilgi sahibi olmak.",
                            "Yüksek erişilebilirlik, bağlantı/cihaz yedekliliği, ağ devralma ve ağ sürekliliği konularında bilgi sahibi olmak.",
                            "Firewall, ACL, NAT, site-to-site VPN ve remote-access VPN teknolojileri konusunda bilgi ve tecrübe sahibi olmak.",
                            "SNMP, Syslog, NetFlow/sFlow ve benzeri ağ izleme ve analiz teknolojileri konusunda bilgi sahibi olmak.",
                            "Wireshark, tcpdump veya benzeri araçlarla paket ve ağ trafiği analizi yapabilecek bilgiye sahip olmak.",
                            "Ağ performans sorunları, paket kaybı, gecikme, bağlantı problemleri ve yönlendirme sorunlarının tespiti ve giderilmesi konusunda bilgi ve tecrübe sahibi olmak.",
                            "Ağ cihazlarının erişim güvenliği, AAA, RADIUS/TACACS+, 802.1X ve Network Access Control (NAC) teknolojileri konusunda bilgi sahibi olmak.",
                            "Cisco, Juniper, Huawei, HPE/Aruba veya benzeri kurumsal ağ ürünlerinde tecrübeli olmak.",
                            "Kablosuz ağ ve Wireless Controller sistemlerinin yönetiminde görev almış olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "CCNA, CCNP veya eş değer ağ teknolojileri sertifikalarından birine sahip olmak.",
                            "Veri merkezi ağ mimarileri ve yüksek erişilebilir ağ altyapılarında görev almış olmak."
                        ]
                    }
                ]
            },
            {
                "id": 95,
                "unvan": "sistem-uzmani",
                "ilandakiAd": "Sistem Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Bilgi işlem birimlerinde veya kurumsal bilişim altyapılarında en az üç yıl fiilen çalışmış; bu sürenin en az iki yılında sistem, sunucu, sanallaştırma veya veri merkezi altyapılarının yönetimi alanında görev yapmış olmak ve bu hususu belgelemek.",
                            "Microsoft Windows Server işletim sistemlerinin kurulumu, yapılandırılması, yönetimi, güncellenmesi ve sorun giderme konularında bilgi ve tecrübe sahibi olmak.",
                            "Linux işletim sistemlerinin kurulumu, temel sistem ve servis yönetimi, kullanıcı/yetkilendirme, disk ve dosya sistemleri ile log yönetimi konularında bilgi sahibi olmak.",
                            "Microsoft Active Directory Domain Services (AD DS), DNS, DHCP ve Group Policy (GPO) servislerinin kurulumu, yapılandırılması ve yönetimi konusunda bilgi ve tecrübe sahibi olmak.",
                            "VMware vSphere/ESXi, Microsoft Hyper-V veya benzeri kurumsal sanallaştırma teknolojilerinden en az biri konusunda; sanal sunucu oluşturma, kaynak yönetimi, snapshot, template ve taşıma (migration) işlemleri ile yüksek erişilebilirlik kavramları konusunda bilgi ve tecrübe sahibi olmak.",
                            "Kurumsal yedekleme sistemleri, yedekleme politikaları, geri yükleme ve felaket kurtarma süreçleri konusunda bilgi sahibi olmak.",
                            "SAN/NAS, RAID, iSCSI, Fibre Channel ve benzeri kurumsal depolama teknolojileri konusunda temel bilgi sahibi olmak.",
                            "TCP/IP, DNS, DHCP, NTP, VLAN ve güvenlik duvarı gibi sistem yönetimini ilgilendiren temel ağ teknolojileri konusunda bilgi sahibi olmak.",
                            "Microsoft Endpoint Configuration Manager (MECM/SCCM) ile istemci ve sunucu yönetimi, işletim sistemi ve yazılım dağıtımı, güncelleme (yama) dağıtımı ve WSUS entegrasyonu konularında bilgi ve tecrübe sahibi olmak.",
                            "Windows dosya sunucusu (File Server) yönetimi, paylaşım ve NTFS izinleri, kota yönetimi ile DFS Namespace ve DFS Replication konularında bilgi ve tecrübe sahibi olmak.",
                            "PowerShell, Bash veya benzeri betik dillerinden en az biriyle temel sistem yönetimi ve otomasyon işlemleri yapabilecek bilgiye sahip olmak.",
                            "Zabbix, Prometheus, Grafana, SCOM veya benzeri merkezi izleme sistemlerinden en az biri konusunda bilgi sahibi olmak.",
                            "Sistemlerde CPU, bellek, disk ve ağ kaynaklarının izlenmesi, performans problemlerinin tespiti ve temel sorun giderme işlemleri konusunda bilgi ve tecrübe sahibi olmak.",
                            "Microsoft Active Directory ve Group Policy yönetiminde tecrübeli olmak.",
                            "Microsoft Exchange Server veya benzeri kurumsal e-posta sistemlerinin yönetiminde tecrübeli olmak."
                        ]
                    }
                ]
            }
        ],
        "resmiGazete": null
    },
    {
        "id": "msu-2026-muvazzaf-subay",
        "kurum": "msu",
        "kalip": "muvazzaf-subay",
        "baslik": "Muvazzaf subay (öğretmen ve mühendis) temini",
        "kaynak": "kurum-sitesi",
        "link": "https://personeltemin.msb.gov.tr",
        "basvuru": {
            "baslangic": "2026-10-05",
            "bitis": "2026-10-20",
            "saat": "17:30",
            "adres": "https://personeltemin.msb.gov.tr",
            "ucret": {
                "tutar": 600,
                "aciklama": "600 TL başvuru ücreti; 20 Ekim 2026 saat 23.30'a kadar Vakıfbank kanallarından yatırılır. Şehit/gazi eş ve çocuklarından alınmaz."
            }
        },
        "secme": {
            "asamalar": [
                "Ön başvuru",
                "Kişilik değerlendirme testi",
                "Fiziki yeterlilik testi",
                "Mülakat",
                "Sağlık muayenesi"
            ],
            "formul": "ALES puanının %60'ı + fiziki yeterlilik testinin %15'i + mülakatın %25'i.",
            "sinavYeri": "MEBS Okulu ve Eğitim Merkezi Komutanlığı, Mamak/Ankara"
        },
        "ortakSartlar": [
            {
                "tur": "engel",
                "metin": "Siyasi parti veya dernek üyeliği varsa kesin kayıttan önce sonlandırılmalıdır."
            },
            {
                "tur": "diger",
                "metin": "Yurt dışında öğrenim görenlerin programı, kaynak programlarla YÖK tarafından denk sayılmış olmalıdır."
            }
        ],
        "kontenjanNotu": "Şehit ve gazi eş ve çocuklarına kontenjanın %5'ine kadar yer ayrılır; en az 70 ALES puanı olanların ALES puanına %10 eklenir.",
        "notlar": [
            "Birden fazla ihtisas grubuna tercih yapılırsa ihtiyacın fazla olduğu gruba öncelik verilir."
        ],
        "pozisyonlar": [
            {
                "id": 96,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Matematik",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2896 - Finansal Matematik",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "5648 - Uygulamalı Matematik",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8910 - Matematik-astronomi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 97,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Fizik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2903 - Fizik",
                            "2904 - Fizik Öğretmenliği",
                            "4057 - Matematiksel Fizik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 98,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Eğitim Bilimleri",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1767 - Alman Dili Öğretmenliği",
                            "1771 - Almanca Eğitimi",
                            "2005 - Bilgisayar Öğretmenliği",
                            "2024 - Bilgisayar Sistemleri Öğretmenliği",
                            "20248 - Sosyal Bilgiler Eğitimi",
                            "20302 - İngiliz Dili Eğitimi",
                            "2037 - Bilgisayar Ve Öğretim Teknolojileri Eğitimi",
                            "2126 - Biyoloji Eğitimi",
                            "2214 - Coğrafya Öğretmenliği",
                            "2592 - Eğitimde Psikolojik Hizmetler",
                            "2858 - Felsefe Grubu Öğretmenliği",
                            "2862 - Fen Bilgisi Öğretmenliği",
                            "2865 - Fen Bilimleri Öğretmenliği",
                            "2896 - Finansal Matematik",
                            "2904 - Fizik Öğretmenliği",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2946 - Fransızca Öğretmenliği",
                            "3174 - Halk Eğitimi Öğretmenliği",
                            "3409 - İlköğretim Fen Bilgisi Öğretmenliği",
                            "3410 - İlköğretim Matematik Öğretmenliği",
                            "3415 - İlköğretim Sosyal Bilgiler Öğretmenliği",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3441 - İngilizce Öğretmenliği",
                            "3519 - İstatistik",
                            "3747 - Kimya Eğitimi",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "4727 - Rehberlik Ve Psikolojik Danışmanlık",
                            "4915 - Sınıf Eğitimi",
                            "4990 - Sosyal Bilgiler Eğitimi",
                            "5164 - Tarih Öğretmenliği",
                            "5257 - Temel Eğitim",
                            "5467 - Türk Dili Öğretmenliği",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5518 - Türkçe Öğretmenliği",
                            "5648 - Uygulamalı Matematik",
                            "5707 - Üstün Zekâlılar Öğretmenliği",
                            "6746 - Fen Bilimleri Eğitimi",
                            "7098 - İlköğretim Öğretmenliği",
                            "7549 - Türkçenin Eğitimi Ve Öğretimi",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "7857 - Stratejik Planlama Ve Performans Yönetimi",
                            "7960 - Fen Ve Tabiat Bilgileri Öğretmenliği",
                            "7980 - Fen Ve Tabiat Bilgisi",
                            "7981 - Sosyal Bilgiler",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset",
                            "8910 - Matematik-astronomi",
                            "9060 - Sosyoloji Öğretmenliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (54 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Eğitim Programları ve Öğretimi, Eğitimde Ölçme ve Değerlendirme, Eğitim Yönetimi (ve benzeri adlarla), Eğitim Teknolojileri, Eğitimde Program Geliştirme ya da Askerî Eğitim Yönetimi alanlarının birinde en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 99,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İstatistik",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3519 - İstatistik",
                            "3522 - İstatistik Ve Bilgisayar Bilimleri",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 100,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Türk Dili ve Edebiyatı",
                "adet": 8,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2797 - Eski Türk Edebiyatı",
                            "5466 - Türk Dili",
                            "5467 - Türk Dili Öğretmenliği",
                            "5468 - Türk Dili Ve Edebiyatı",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5480 - Türk Edebiyatı",
                            "5516 - Türkçe",
                            "5839 - Yeni Türk Edebiyatı",
                            "8311 - Yeni Türk Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 101,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Hukuk",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3309 - Hukuk"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun-veya-devam",
                        "metin": "Kamu Hukuku, Harp ve Silahlı Çatışma Hukuku, Deniz Hukuku, Hava ve Uzay Hukuku, Bilişim Hukuku veya Uluslararası Hukuk alanlarının birinde en az yüksek lisans yapmış veya yapıyor olmak."
                    }
                ]
            },
            {
                "id": 102,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Rehberlik",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2592 - Eğitimde Psikolojik Hizmetler",
                            "4727 - Rehberlik Ve Psikolojik Danışmanlık",
                            "9870 - Psikolojik Danışmanlık Ve Rehberlik Öğretmenliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 103,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Arapça",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20036 - Arapça Mütercim Ve Tercümanlık",
                            "4265 - Mütercim-tercümanlık",
                            "7587 - Arapça Öğretmenliği",
                            "1821 - Arap Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 104,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Fransızca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20048 - Fransızca Mütercim Ve Tercümanlık",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2944 - Fransız Dili Ve Edebiyatı",
                            "2946 - Fransızca Öğretmenliği",
                            "4260 - Mütercim Tercümanlık (fransızca)",
                            "4261 - Mütercim-tercümanlık",
                            "7647 - Fransızca",
                            "7648 - Fransız Edebiyatı",
                            "8671 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 105,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İngilizce",
                "adet": 8,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20063 - Mütercim Ve Tercümanlık",
                            "20302 - İngiliz Dili Eğitimi",
                            "2250 - Çeviribilim",
                            "2355 - Çok Dilli Sözlü Çeviri",
                            "2465 - Diller Ve Kültürlerarası Çeviribilim",
                            "3430 - İngiliz Dil Bilimi",
                            "3431 - İngiliz Dili Ve Edebiyatı",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3433 - İngiliz Dili Ve Karşılaştırmalı Edebiyat",
                            "3434 - İngiliz Dili Ve Kültürü",
                            "3435 - İngiliz Edebiyatı",
                            "3439 - İngilizce",
                            "3441 - İngilizce Öğretmenliği",
                            "4261 - Mütercim-tercümanlık",
                            "4264 - Mütercim Tercümanlık (ingilizce)",
                            "5638 - Uygulamalı İngilizce Ve Çevirmenlik",
                            "5661 - Uygulamalı Yabancı Diller",
                            "6792 - İngilizce Mütercim Ve Tercümanlık",
                            "7289 - Mütercim-tercümanlık",
                            "8500 - Çeviribilim (ingilizce)",
                            "8671 - Mütercim-tercümanlık",
                            "9078 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (22 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "dil": "İngilizce",
                        "metin": "İngilizce YDS / e-YDS'den en az 85 puan (2025–2026) ya da ÖSYM eşdeğerlik tablosundaki muadili."
                    }
                ]
            },
            {
                "id": 106,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Almanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1767 - Alman Dili Öğretmenliği",
                            "1768 - Alman Dili Ve Edebiyatı",
                            "1769 - Alman Dili Ve Kültürü",
                            "1771 - Almanca Eğitimi",
                            "1772 - Mütercim Tercümanlık (almanca)",
                            "20033 - Almanca Mütercim Ve Tercümanlık",
                            "7625 - Almanca"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "dil": "Almanca",
                        "metin": "Almanca YDS / e-YDS'den en az 85 puan (2025–2026) ya da ÖSYM eşdeğerlik tablosundaki muadili."
                    }
                ]
            },
            {
                "id": 107,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Bulgarca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2171 - Bulgar Dili Ve Edebiyatı",
                            "4266 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 108,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İbranice",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3323 - İbrani Dili Ve Edebiyatı",
                            "6783 - İbrani Dili Ve Kültürü"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 109,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Rusça",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20066 - Rusça Mütercim Ve Tercümanlık",
                            "4262 - Mütercim-tercümanlık",
                            "4775 - Rus Dili Ve Edebiyatı",
                            "7253 - Rus Dili",
                            "7327 - Rus Dili Ve Edebiyatı Öğretmenliği",
                            "9882 - Türkçe, Rusça Mütercim Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 110,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İspanyolca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3512 - İspanyol Dili Ve Edebiyatı",
                            "6799 - İspanyolca Mütercim Ve Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 111,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İtalyanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3575 - İtalyan Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 112,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Çince",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2295 - Çin Dili Ve Edebiyatı",
                            "4934 - Sinoloji",
                            "6714 - Çince Mütercim Ve Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 113,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Romence",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4763 - Romen Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 114,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Yunanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2224 - Çağdaş Yunan Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 115,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Uluslararası İlişkiler",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1866 - Avrupa Birliği Çalışmaları",
                            "1870 - Avrupa Birliği İlişkileri",
                            "3917 - Küresel Ve Uluslararası İlişkiler",
                            "4968 - Siyaset Bilimi Ve Uluslararası İlişkiler",
                            "5562 - Uluslararası Çalışmalar",
                            "5581 - Uluslararası İlişkiler",
                            "5582 - Uluslararası İlişkiler Ve Avrupa Birliği",
                            "8254 - Diplomasi Ve Dış Münasebetler",
                            "8366 - Uluslararası İlişkiler Ve Deniz Güvenliği",
                            "9107 - Gümrük Ve Uluslararası Dış İlişkiler",
                            "9109 - Gümrük Ve Uluslararası İlişkiler"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (11 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Uluslararası İlişkiler, Siyaset Bilimi veya Güvenlik Araştırmaları alanında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 116,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Uçak Gövde Motor",
                "adet": 2,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20073 - Uçak Gövde Ve Motor Bakımı",
                            "5543 - Uçak Gövde Bakım",
                            "5544 - Uçak Gövde-motor",
                            "5545 - Uçak Gövde-motor Bakım",
                            "5550 - Uçak Teçhizat Bakım",
                            "7354 - Uçak Motor Bakım",
                            "8367 - Uçak Bakım Ve Onarım"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 117,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Tarih",
                "adet": 4,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2801 - Eskiçağ Tarihi",
                            "3038 - Genel Türk Tarihi",
                            "4425 - Ortaçağ Tarihi",
                            "5163 - Tarih",
                            "5164 - Tarih Öğretmenliği",
                            "5530 - Türkiye Cumhuriyeti Tarihi",
                            "5756 - Yakın Çağ Tarihi",
                            "5832 - Yeniçağ Tarihi",
                            "8226 - Dünya Tarihi",
                            "8236 - Türk Memleketler Tarihi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (10 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 118,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Kütüphanecilik",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1843 - Arşivcilik",
                            "1988 - Bilgi Ve Belge Yönetimi",
                            "2530 - Dokümantasyon Ve Enformasyon",
                            "3922 - Kütüphanecilik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 119,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Psikoloji",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4679 - Psikoloji",
                            "7635 - Davranış Bilimleri - Psikoloji Disiplini"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 120,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Beden Eğitimi",
                "adet": 8,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1813 - Antrenörlük",
                            "1814 - Antrenörlük Eğitimi",
                            "1951 - Beden Eğitimi Ve Spor Eğitimi",
                            "221 - Beden Eğitimi Ve Spor Yüksekokulu",
                            "5031 - Spor Bilimleri Ve Teknolojisi",
                            "7559 - Beden Eğitim Öğretmenliği",
                            "7982 - Basketbol",
                            "7983 - Hentbol",
                            "7984 - Yüzme",
                            "7985 - Voleybol",
                            "7986 - Futbol",
                            "7987 - Atletizm",
                            "7988 - Kayak",
                            "7989 - Aletli Jimnastik",
                            "7990 - Güreş"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (15 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA",
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA / SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "Pedagojik formasyon almış olmak."
                    }
                ]
            },
            {
                "id": 121,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Bilgisayar",
                "adet": 6,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1722 - Ağ",
                            "1995 - Bilgisayar Bilimleri",
                            "1997 - Bilgisayar Bilimleri Ve Mühendisliği",
                            "2010 - Bilgisayar Mühendisliği",
                            "2028 - Bilgisayar Teknolojisi Ve Bilişim Sistemleri",
                            "2034 - Bilgisayar Ve Enformasyon Sistemleri",
                            "2038 - Bilgisayar Ve Yazılım Mühendisliği",
                            "2059 - Bilişim Sistemleri Mühendisliği",
                            "2060 - Bilişim Sistemleri Ve Teknolojileri",
                            "4943 - Sistem Yönetimi",
                            "5716 - Veri Tabanı Uygulama",
                            "5741 - Web Tasarım",
                            "5821 - Yazılım Mühendisliği",
                            "5964 - Bilgisayar Ve Enformatik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (14 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 122,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Endüstri",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2704 - Endüstri Mühendisliği",
                            "2710 - Endüstri Sistemleri Mühendisliği",
                            "2717 - Endüstri Ve Sistem Mühendisliği",
                            "4940 - Sistem Mühendisliği",
                            "5693 - Üretim Sistemleri Mühendisliği Programları",
                            "8921 - Sanayi Mühendisliği",
                            "9637 - Endüstri Mühendisliği Programları",
                            "9646 - Üretim Sistemleri Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (8 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 123,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Elektrik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2637 - Elektrik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 124,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Uçak",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3220 - Havacılık Ve Uzay Mühendisliği",
                            "5548 - Uçak Mühendisliği",
                            "5549 - Uçak Sistemleri Mühendisliği",
                            "5553 - Uçak Ve Uzay Mühendisliği",
                            "5673 - Uzay Mühendisliği",
                            "5676 - Uzay Ve Uydu Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 125,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Makine",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3419 - İmalat Mühendisliği",
                            "3987 - Makine Mühendisliği",
                            "4004 - Makine Ve İmalat Mühendisliği",
                            "4005 - Makine Ve Malzeme Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 126,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Mekatronik",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4095 - Mekatronik Mühendisliği",
                            "4096 - Mekatronik Sistemler Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 127,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "İnşaat",
                "adet": 3,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3468 - İnşaat Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 128,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Kara Kuvvetleri Komutanlığı",
                "alan": "Elektronik",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği",
                            "2664 - Elektronik Mühendisliği",
                            "2675 - Elektronik Ve Haberleşme Mühendisliği",
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "5238 - Telekomünikasyon Mühendisliği",
                            "7570 - Mikroelektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 129,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Matematik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2896 - Finansal Matematik",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "5648 - Uygulamalı Matematik",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8910 - Matematik-astronomi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 130,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Fizik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2903 - Fizik",
                            "2904 - Fizik Öğretmenliği",
                            "4057 - Matematiksel Fizik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 131,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Eğitim Bilimleri",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1767 - Alman Dili Öğretmenliği",
                            "1771 - Almanca Eğitimi",
                            "2005 - Bilgisayar Öğretmenliği",
                            "2024 - Bilgisayar Sistemleri Öğretmenliği",
                            "20248 - Sosyal Bilgiler Eğitimi",
                            "20302 - İngiliz Dili Eğitimi",
                            "2037 - Bilgisayar Ve Öğretim Teknolojileri Eğitimi",
                            "2126 - Biyoloji Eğitimi",
                            "2214 - Coğrafya Öğretmenliği",
                            "2592 - Eğitimde Psikolojik Hizmetler",
                            "2858 - Felsefe Grubu Öğretmenliği",
                            "2862 - Fen Bilgisi Öğretmenliği",
                            "2865 - Fen Bilimleri Öğretmenliği",
                            "2896 - Finansal Matematik",
                            "2904 - Fizik Öğretmenliği",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2946 - Fransızca Öğretmenliği",
                            "3174 - Halk Eğitimi Öğretmenliği",
                            "3409 - İlköğretim Fen Bilgisi Öğretmenliği",
                            "3410 - İlköğretim Matematik Öğretmenliği",
                            "3415 - İlköğretim Sosyal Bilgiler Öğretmenliği",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3441 - İngilizce Öğretmenliği",
                            "3519 - İstatistik",
                            "3747 - Kimya Eğitimi",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "4727 - Rehberlik Ve Psikolojik Danışmanlık",
                            "4915 - Sınıf Eğitimi",
                            "4990 - Sosyal Bilgiler Eğitimi",
                            "5164 - Tarih Öğretmenliği",
                            "5257 - Temel Eğitim",
                            "5467 - Türk Dili Öğretmenliği",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5518 - Türkçe Öğretmenliği",
                            "5648 - Uygulamalı Matematik",
                            "5707 - Üstün Zekâlılar Öğretmenliği",
                            "6746 - Fen Bilimleri Eğitimi",
                            "7098 - İlköğretim Öğretmenliği",
                            "7549 - Türkçenin Eğitimi Ve Öğretimi",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "7857 - Stratejik Planlama Ve Performans Yönetimi",
                            "7960 - Fen Ve Tabiat Bilgileri Öğretmenliği",
                            "7980 - Fen Ve Tabiat Bilgisi",
                            "7981 - Sosyal Bilgiler",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset",
                            "8910 - Matematik-astronomi",
                            "9060 - Sosyoloji Öğretmenliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (54 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Eğitim Programları ve Öğretimi, Eğitimde Ölçme ve Değerlendirme, Eğitim Yönetimi (ve benzeri adlarla), Eğitim Teknolojileri, Eğitimde Program Geliştirme ya da Askerî Eğitim Yönetimi alanlarının birinde en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 132,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "İstatistik",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3519 - İstatistik",
                            "3522 - İstatistik Ve Bilgisayar Bilimleri",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 133,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Türk Dili ve Edebiyatı",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2797 - Eski Türk Edebiyatı",
                            "5466 - Türk Dili",
                            "5467 - Türk Dili Öğretmenliği",
                            "5468 - Türk Dili Ve Edebiyatı",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5480 - Türk Edebiyatı",
                            "5516 - Türkçe",
                            "5839 - Yeni Türk Edebiyatı",
                            "8311 - Yeni Türk Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 134,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Hukuk",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3309 - Hukuk"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun-veya-devam",
                        "metin": "Kamu Hukuku, Harp ve Silahlı Çatışma Hukuku, Deniz Hukuku, Hava ve Uzay Hukuku, Bilişim Hukuku veya Uluslararası Hukuk alanlarının birinde en az yüksek lisans yapmış veya yapıyor olmak."
                    }
                ]
            },
            {
                "id": 135,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Arapça",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20036 - Arapça Mütercim Ve Tercümanlık",
                            "4265 - Mütercim-tercümanlık",
                            "7587 - Arapça Öğretmenliği",
                            "1821 - Arap Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 136,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Fransızca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20048 - Fransızca Mütercim Ve Tercümanlık",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2944 - Fransız Dili Ve Edebiyatı",
                            "2946 - Fransızca Öğretmenliği",
                            "4260 - Mütercim Tercümanlık (fransızca)",
                            "4261 - Mütercim-tercümanlık",
                            "7647 - Fransızca",
                            "7648 - Fransız Edebiyatı",
                            "8671 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 137,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "İngilizce",
                "adet": 6,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20063 - Mütercim Ve Tercümanlık",
                            "20302 - İngiliz Dili Eğitimi",
                            "2250 - Çeviribilim",
                            "2355 - Çok Dilli Sözlü Çeviri",
                            "2465 - Diller Ve Kültürlerarası Çeviribilim",
                            "3430 - İngiliz Dil Bilimi",
                            "3431 - İngiliz Dili Ve Edebiyatı",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3433 - İngiliz Dili Ve Karşılaştırmalı Edebiyat",
                            "3434 - İngiliz Dili Ve Kültürü",
                            "3435 - İngiliz Edebiyatı",
                            "3439 - İngilizce",
                            "3441 - İngilizce Öğretmenliği",
                            "4261 - Mütercim-tercümanlık",
                            "4264 - Mütercim Tercümanlık (ingilizce)",
                            "5638 - Uygulamalı İngilizce Ve Çevirmenlik",
                            "5661 - Uygulamalı Yabancı Diller",
                            "6792 - İngilizce Mütercim Ve Tercümanlık",
                            "7289 - Mütercim-tercümanlık",
                            "8500 - Çeviribilim (ingilizce)",
                            "8671 - Mütercim-tercümanlık",
                            "9078 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (22 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "dil": "İngilizce",
                        "metin": "İngilizce YDS / e-YDS'den en az 85 puan (2025–2026) ya da ÖSYM eşdeğerlik tablosundaki muadili."
                    }
                ]
            },
            {
                "id": 138,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Almanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1767 - Alman Dili Öğretmenliği",
                            "1768 - Alman Dili Ve Edebiyatı",
                            "1769 - Alman Dili Ve Kültürü",
                            "1771 - Almanca Eğitimi",
                            "1772 - Mütercim Tercümanlık (almanca)",
                            "20033 - Almanca Mütercim Ve Tercümanlık",
                            "7625 - Almanca"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "dil": "Almanca",
                        "metin": "Almanca YDS / e-YDS'den en az 85 puan (2025–2026) ya da ÖSYM eşdeğerlik tablosundaki muadili."
                    }
                ]
            },
            {
                "id": 139,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Rusça",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20066 - Rusça Mütercim Ve Tercümanlık",
                            "4262 - Mütercim-tercümanlık",
                            "4775 - Rus Dili Ve Edebiyatı",
                            "7253 - Rus Dili",
                            "7327 - Rus Dili Ve Edebiyatı Öğretmenliği",
                            "9882 - Türkçe, Rusça Mütercim Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 140,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "İspanyolca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3512 - İspanyol Dili Ve Edebiyatı",
                            "6799 - İspanyolca Mütercim Ve Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 141,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Çince",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2295 - Çin Dili Ve Edebiyatı",
                            "4934 - Sinoloji",
                            "6714 - Çince Mütercim Ve Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 142,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Yunanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2224 - Çağdaş Yunan Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 143,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Uluslararası İlişkiler",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1866 - Avrupa Birliği Çalışmaları",
                            "1870 - Avrupa Birliği İlişkileri",
                            "3917 - Küresel Ve Uluslararası İlişkiler",
                            "4968 - Siyaset Bilimi Ve Uluslararası İlişkiler",
                            "5562 - Uluslararası Çalışmalar",
                            "5581 - Uluslararası İlişkiler",
                            "5582 - Uluslararası İlişkiler Ve Avrupa Birliği",
                            "8254 - Diplomasi Ve Dış Münasebetler",
                            "8366 - Uluslararası İlişkiler Ve Deniz Güvenliği",
                            "9107 - Gümrük Ve Uluslararası Dış İlişkiler",
                            "9109 - Gümrük Ve Uluslararası İlişkiler"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (11 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Uluslararası İlişkiler, Siyaset Bilimi veya Güvenlik Araştırmaları alanında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 144,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Tarih",
                "adet": 2,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2801 - Eskiçağ Tarihi",
                            "3038 - Genel Türk Tarihi",
                            "4425 - Ortaçağ Tarihi",
                            "5163 - Tarih",
                            "5164 - Tarih Öğretmenliği",
                            "5530 - Türkiye Cumhuriyeti Tarihi",
                            "5756 - Yakın Çağ Tarihi",
                            "5832 - Yeniçağ Tarihi",
                            "8226 - Dünya Tarihi",
                            "8236 - Türk Memleketler Tarihi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (10 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 145,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Kütüphanecilik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1843 - Arşivcilik",
                            "1988 - Bilgi Ve Belge Yönetimi",
                            "2530 - Dokümantasyon Ve Enformasyon",
                            "3922 - Kütüphanecilik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 146,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Psikoloji",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4679 - Psikoloji",
                            "7635 - Davranış Bilimleri - Psikoloji Disiplini"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 147,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Beden Eğitimi",
                "adet": 6,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1813 - Antrenörlük",
                            "1814 - Antrenörlük Eğitimi",
                            "1951 - Beden Eğitimi Ve Spor Eğitimi",
                            "221 - Beden Eğitimi Ve Spor Yüksekokulu",
                            "5031 - Spor Bilimleri Ve Teknolojisi",
                            "7559 - Beden Eğitim Öğretmenliği",
                            "7982 - Basketbol",
                            "7983 - Hentbol",
                            "7984 - Yüzme",
                            "7985 - Voleybol",
                            "7986 - Futbol",
                            "7987 - Atletizm",
                            "7988 - Kayak",
                            "7989 - Aletli Jimnastik",
                            "7990 - Güreş"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (15 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA",
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA / SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "Pedagojik formasyon almış olmak."
                    }
                ]
            },
            {
                "id": 148,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Uçak Helo. Bakım",
                "adet": 1,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20073 - Uçak Gövde Ve Motor Bakımı",
                            "5544 - Uçak Gövde-motor",
                            "5545 - Uçak Gövde-motor Bakım",
                            "5550 - Uçak Teçhizat Bakım",
                            "7354 - Uçak Motor Bakım",
                            "8367 - Uçak Bakım Ve Onarım",
                            "5543 - Uçak Gövde Bakım"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 149,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Korece",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3841 - Kore Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 150,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Bilgisayar",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1722 - Ağ",
                            "1995 - Bilgisayar Bilimleri",
                            "1997 - Bilgisayar Bilimleri Ve Mühendisliği",
                            "2010 - Bilgisayar Mühendisliği",
                            "2028 - Bilgisayar Teknolojisi Ve Bilişim Sistemleri",
                            "2034 - Bilgisayar Ve Enformasyon Sistemleri",
                            "2038 - Bilgisayar Ve Yazılım Mühendisliği",
                            "2059 - Bilişim Sistemleri Mühendisliği",
                            "2060 - Bilişim Sistemleri Ve Teknolojileri",
                            "4943 - Sistem Yönetimi",
                            "5716 - Veri Tabanı Uygulama",
                            "5741 - Web Tasarım",
                            "5821 - Yazılım Mühendisliği",
                            "5964 - Bilgisayar Ve Enformatik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (14 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 151,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Gemi İnşa",
                "adet": 5,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1843 - Arşivcilik",
                            "1988 - Bilgi Ve Belge Yönetimi",
                            "2530 - Dokümantasyon Ve Enformasyon",
                            "3922 - Kütüphanecilik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 152,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Endüstri",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2704 - Endüstri Mühendisliği",
                            "2710 - Endüstri Sistemleri Mühendisliği",
                            "2717 - Endüstri Ve Sistem Mühendisliği",
                            "4940 - Sistem Mühendisliği",
                            "5693 - Üretim Sistemleri Mühendisliği Programları",
                            "8921 - Sanayi Mühendisliği",
                            "9637 - Endüstri Mühendisliği Programları",
                            "9646 - Üretim Sistemleri Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (8 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 153,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Elektrik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2637 - Elektrik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 154,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Uçak",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3220 - Havacılık Ve Uzay Mühendisliği",
                            "5548 - Uçak Mühendisliği",
                            "5549 - Uçak Sistemleri Mühendisliği",
                            "5553 - Uçak Ve Uzay Mühendisliği",
                            "5673 - Uzay Mühendisliği",
                            "5676 - Uzay Ve Uydu Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 155,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Makine",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3419 - İmalat Mühendisliği",
                            "3987 - Makine Mühendisliği",
                            "4004 - Makine Ve İmalat Mühendisliği",
                            "4005 - Makine Ve Malzeme Mühendisliği",
                            "4096 - Mekatronik Sistemler Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (5 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 156,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "İnşaat",
                "adet": 1,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3468 - İnşaat Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 157,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Deniz Kuvvetleri Komutanlığı",
                "alan": "Elektronik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği",
                            "2664 - Elektronik Mühendisliği",
                            "2675 - Elektronik Ve Haberleşme Mühendisliği",
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "5238 - Telekomünikasyon Mühendisliği",
                            "7570 - Mikroelektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 158,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Matematik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2896 - Finansal Matematik",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "5648 - Uygulamalı Matematik",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8910 - Matematik-astronomi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 159,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Fizik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2903 - Fizik",
                            "2904 - Fizik Öğretmenliği",
                            "4057 - Matematiksel Fizik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 160,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Eğitim Bilimleri",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1767 - Alman Dili Öğretmenliği",
                            "1771 - Almanca Eğitimi",
                            "2005 - Bilgisayar Öğretmenliği",
                            "2024 - Bilgisayar Sistemleri Öğretmenliği",
                            "20248 - Sosyal Bilgiler Eğitimi",
                            "20302 - İngiliz Dili Eğitimi",
                            "2037 - Bilgisayar Ve Öğretim Teknolojileri Eğitimi",
                            "2126 - Biyoloji Eğitimi",
                            "2214 - Coğrafya Öğretmenliği",
                            "2592 - Eğitimde Psikolojik Hizmetler",
                            "2858 - Felsefe Grubu Öğretmenliği",
                            "2862 - Fen Bilgisi Öğretmenliği",
                            "2865 - Fen Bilimleri Öğretmenliği",
                            "2896 - Finansal Matematik",
                            "2904 - Fizik Öğretmenliği",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2946 - Fransızca Öğretmenliği",
                            "3174 - Halk Eğitimi Öğretmenliği",
                            "3409 - İlköğretim Fen Bilgisi Öğretmenliği",
                            "3410 - İlköğretim Matematik Öğretmenliği",
                            "3415 - İlköğretim Sosyal Bilgiler Öğretmenliği",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3441 - İngilizce Öğretmenliği",
                            "3519 - İstatistik",
                            "3747 - Kimya Eğitimi",
                            "4051 - Matematik",
                            "4052 - Matematik Eğitimi",
                            "4727 - Rehberlik Ve Psikolojik Danışmanlık",
                            "4915 - Sınıf Eğitimi",
                            "4990 - Sosyal Bilgiler Eğitimi",
                            "5164 - Tarih Öğretmenliği",
                            "5257 - Temel Eğitim",
                            "5467 - Türk Dili Öğretmenliği",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5518 - Türkçe Öğretmenliği",
                            "5648 - Uygulamalı Matematik",
                            "5707 - Üstün Zekâlılar Öğretmenliği",
                            "6746 - Fen Bilimleri Eğitimi",
                            "7098 - İlköğretim Öğretmenliği",
                            "7549 - Türkçenin Eğitimi Ve Öğretimi",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "7857 - Stratejik Planlama Ve Performans Yönetimi",
                            "7960 - Fen Ve Tabiat Bilgileri Öğretmenliği",
                            "7980 - Fen Ve Tabiat Bilgisi",
                            "7981 - Sosyal Bilgiler",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8528 - Yüksek Matematik-tasarı Geometri-perspektif",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset",
                            "8910 - Matematik-astronomi",
                            "9060 - Sosyoloji Öğretmenliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (54 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Eğitim Programları ve Öğretimi, Eğitimde Ölçme ve Değerlendirme, Eğitim Yönetimi (ve benzeri adlarla), Eğitim Teknolojileri, Eğitimde Program Geliştirme ya da Askerî Eğitim Yönetimi alanlarının birinde en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 161,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "İstatistik",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3519 - İstatistik",
                            "3522 - İstatistik Ve Bilgisayar Bilimleri",
                            "7656 - İstatistik-matematik",
                            "7657 - İstatistik Ve Yöneylem Araştırması",
                            "8386 - İstatistik-ekonometri Ve Planlama",
                            "8535 - Maliye-istatistik",
                            "8536 - Siyasi İlimler-istatistik",
                            "8884 - İstatistik-ekonometri",
                            "8892 - İstatistik-sosyal Siyaset"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 162,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Türk Dili ve Edebiyatı",
                "adet": 4,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2797 - Eski Türk Edebiyatı",
                            "5466 - Türk Dili",
                            "5467 - Türk Dili Öğretmenliği",
                            "5468 - Türk Dili Ve Edebiyatı",
                            "5469 - Türk Dili Ve Edebiyatı Eğitimi",
                            "5480 - Türk Edebiyatı",
                            "5516 - Türkçe",
                            "5839 - Yeni Türk Edebiyatı",
                            "8311 - Yeni Türk Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 163,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Hukuk",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3309 - Hukuk"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun-veya-devam",
                        "metin": "Kamu Hukuku, Harp ve Silahlı Çatışma Hukuku, Deniz Hukuku, Hava ve Uzay Hukuku, Bilişim Hukuku veya Uluslararası Hukuk alanlarının birinde en az yüksek lisans yapmış veya yapıyor olmak."
                    }
                ]
            },
            {
                "id": 164,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Rehberlik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2592 - Eğitimde Psikolojik Hizmetler",
                            "4727 - Rehberlik Ve Psikolojik Danışmanlık",
                            "9870 - Psikolojik Danışmanlık Ve Rehberlik Öğretmenliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 165,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Arapça",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20036 - Arapça Mütercim Ve Tercümanlık",
                            "4265 - Mütercim-tercümanlık",
                            "7587 - Arapça Öğretmenliği",
                            "1821 - Arap Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 166,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Fransızca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20048 - Fransızca Mütercim Ve Tercümanlık",
                            "2943 - Fransız Dili Öğretmenliği",
                            "2944 - Fransız Dili Ve Edebiyatı",
                            "2946 - Fransızca Öğretmenliği",
                            "4260 - Mütercim Tercümanlık (fransızca)",
                            "4261 - Mütercim-tercümanlık",
                            "7647 - Fransızca",
                            "7648 - Fransız Edebiyatı",
                            "8671 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (9 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 167,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "İngilizce",
                "adet": 6,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20063 - Mütercim Ve Tercümanlık",
                            "20302 - İngiliz Dili Eğitimi",
                            "2250 - Çeviribilim",
                            "2355 - Çok Dilli Sözlü Çeviri",
                            "2465 - Diller Ve Kültürlerarası Çeviribilim",
                            "3430 - İngiliz Dil Bilimi",
                            "3431 - İngiliz Dili Ve Edebiyatı",
                            "3432 - İngiliz Dili Öğretmenliği",
                            "3433 - İngiliz Dili Ve Karşılaştırmalı Edebiyat",
                            "3434 - İngiliz Dili Ve Kültürü",
                            "3435 - İngiliz Edebiyatı",
                            "3439 - İngilizce",
                            "3441 - İngilizce Öğretmenliği",
                            "4261 - Mütercim-tercümanlık",
                            "4264 - Mütercim Tercümanlık (ingilizce)",
                            "5638 - Uygulamalı İngilizce Ve Çevirmenlik",
                            "5661 - Uygulamalı Yabancı Diller",
                            "6792 - İngilizce Mütercim Ve Tercümanlık",
                            "7289 - Mütercim-tercümanlık",
                            "8500 - Çeviribilim (ingilizce)",
                            "8671 - Mütercim-tercümanlık",
                            "9078 - Mütercim-tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (22 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "dil": "İngilizce",
                        "metin": "İngilizce YDS / e-YDS'den en az 85 puan (2025–2026) ya da ÖSYM eşdeğerlik tablosundaki muadili."
                    }
                ]
            },
            {
                "id": 168,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Rusça",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20066 - Rusça Mütercim Ve Tercümanlık",
                            "4262 - Mütercim-tercümanlık",
                            "4775 - Rus Dili Ve Edebiyatı",
                            "7253 - Rus Dili",
                            "7327 - Rus Dili Ve Edebiyatı Öğretmenliği",
                            "9882 - Türkçe, Rusça Mütercim Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 169,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Çince",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2295 - Çin Dili Ve Edebiyatı",
                            "4934 - Sinoloji",
                            "6714 - Çince Mütercim Ve Tercümanlık"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (3 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 170,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Yunanca",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2224 - Çağdaş Yunan Dili Ve Edebiyatı"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 171,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Uluslararası İlişkiler",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1866 - Avrupa Birliği Çalışmaları",
                            "1870 - Avrupa Birliği İlişkileri",
                            "3917 - Küresel Ve Uluslararası İlişkiler",
                            "4968 - Siyaset Bilimi Ve Uluslararası İlişkiler",
                            "5562 - Uluslararası Çalışmalar",
                            "5581 - Uluslararası İlişkiler",
                            "5582 - Uluslararası İlişkiler Ve Avrupa Birliği",
                            "8254 - Diplomasi Ve Dış Münasebetler",
                            "8366 - Uluslararası İlişkiler Ve Deniz Güvenliği",
                            "9107 - Gümrük Ve Uluslararası Dış İlişkiler",
                            "9109 - Gümrük Ve Uluslararası İlişkiler"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (11 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Uluslararası İlişkiler, Siyaset Bilimi veya Güvenlik Araştırmaları alanında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 172,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Uçak Gövde Motor",
                "adet": 2,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "20073 - Uçak Gövde Ve Motor Bakımı",
                            "5543 - Uçak Gövde Bakım",
                            "5544 - Uçak Gövde-motor",
                            "5545 - Uçak Gövde-motor Bakım",
                            "5550 - Uçak Teçhizat Bakım",
                            "7354 - Uçak Motor Bakım",
                            "8367 - Uçak Bakım Ve Onarım"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 173,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Tarih",
                "adet": 2,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2801 - Eskiçağ Tarihi",
                            "3038 - Genel Türk Tarihi",
                            "4425 - Ortaçağ Tarihi",
                            "5163 - Tarih",
                            "5164 - Tarih Öğretmenliği",
                            "5530 - Türkiye Cumhuriyeti Tarihi",
                            "5756 - Yakın Çağ Tarihi",
                            "5832 - Yeniçağ Tarihi",
                            "8226 - Dünya Tarihi",
                            "8236 - Türk Memleketler Tarihi"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (10 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "mezun",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapmış olmak."
                    }
                ]
            },
            {
                "id": 174,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Kütüphanecilik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1843 - Arşivcilik",
                            "1988 - Bilgi Ve Belge Yönetimi",
                            "2530 - Dokümantasyon Ve Enformasyon",
                            "3922 - Kütüphanecilik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 175,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Psikoloji",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4679 - Psikoloji",
                            "7635 - Davranış Bilimleri - Psikoloji Disiplini"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "egitim",
                        "duzey": [
                            "yuksek-lisans"
                        ],
                        "durum": "devam",
                        "metin": "Kadro alanının ana bilim dalı veya program dallarında en az yüksek lisans yapıyor olmak."
                    }
                ]
            },
            {
                "id": 176,
                "unvan": "subay",
                "ilandakiAd": "Öğretmen sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Beden Eğitimi",
                "adet": 6,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1813 - Antrenörlük",
                            "1814 - Antrenörlük Eğitimi",
                            "1951 - Beden Eğitimi Ve Spor Eğitimi",
                            "221 - Beden Eğitimi Ve Spor Yüksekokulu",
                            "5031 - Spor Bilimleri Ve Teknolojisi",
                            "7559 - Beden Eğitim Öğretmenliği",
                            "7982 - Basketbol",
                            "7983 - Hentbol",
                            "7984 - Yüzme",
                            "7985 - Voleybol",
                            "7986 - Futbol",
                            "7987 - Atletizm",
                            "7988 - Kayak",
                            "7989 - Aletli Jimnastik",
                            "7990 - Güreş"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (15 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "EA",
                            "SÖZ"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES EA / SÖZ puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "Pedagojik formasyon almış olmak."
                    }
                ]
            },
            {
                "id": 177,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Bilgisayar",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "1722 - Ağ",
                            "1995 - Bilgisayar Bilimleri",
                            "1997 - Bilgisayar Bilimleri Ve Mühendisliği",
                            "2010 - Bilgisayar Mühendisliği",
                            "2028 - Bilgisayar Teknolojisi Ve Bilişim Sistemleri",
                            "2034 - Bilgisayar Ve Enformasyon Sistemleri",
                            "2038 - Bilgisayar Ve Yazılım Mühendisliği",
                            "2059 - Bilişim Sistemleri Mühendisliği",
                            "2060 - Bilişim Sistemleri Ve Teknolojileri",
                            "4943 - Sistem Yönetimi",
                            "5716 - Veri Tabanı Uygulama",
                            "5741 - Web Tasarım",
                            "5821 - Yazılım Mühendisliği",
                            "5964 - Bilgisayar Ve Enformatik"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (14 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 178,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Havacılık ve Uzay",
                "adet": 2,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3220 - Havacılık Ve Uzay Mühendisliği",
                            "5548 - Uçak Mühendisliği",
                            "5549 - Uçak Sistemleri Mühendisliği",
                            "5553 - Uçak Ve Uzay Mühendisliği",
                            "5673 - Uzay Mühendisliği",
                            "5676 - Uzay Ve Uydu Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 179,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Endüstri",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2704 - Endüstri Mühendisliği",
                            "2710 - Endüstri Sistemleri Mühendisliği",
                            "2717 - Endüstri Ve Sistem Mühendisliği",
                            "4940 - Sistem Mühendisliği",
                            "5693 - Üretim Sistemleri Mühendisliği Programları",
                            "8921 - Sanayi Mühendisliği",
                            "9637 - Endüstri Mühendisliği Programları",
                            "9646 - Üretim Sistemleri Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (8 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 180,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Elektrik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2637 - Elektrik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 181,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Uçak",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3220 - Havacılık Ve Uzay Mühendisliği",
                            "5548 - Uçak Mühendisliği",
                            "5549 - Uçak Sistemleri Mühendisliği",
                            "5553 - Uçak Ve Uzay Mühendisliği",
                            "5673 - Uzay Mühendisliği",
                            "5676 - Uzay Ve Uydu Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (6 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 182,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Makine",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3419 - İmalat Mühendisliği",
                            "3987 - Makine Mühendisliği",
                            "4004 - Makine Ve İmalat Mühendisliği",
                            "4005 - Makine Ve Malzeme Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (4 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 183,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Mekatronik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "4095 - Mekatronik Mühendisliği",
                            "4096 - Mekatronik Sistemler Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (2 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 184,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "İnşaat",
                "adet": 1,
                "cinsiyet": "erkek",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "3468 - İnşaat Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (1 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            },
            {
                "id": 185,
                "unvan": "subay",
                "ilandakiAd": "Mühendis sınıfı subay",
                "birim": "MSÜ Hava Kuvvetleri Komutanlığı",
                "alan": "Elektronik",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "11061 - Elektrik Ve Elektronik Mühendisliği",
                            "2644 - Elektrik-elektronik Mühendisliği",
                            "2664 - Elektronik Mühendisliği",
                            "2675 - Elektronik Ve Haberleşme Mühendisliği",
                            "2682 - Elektrik Elektronik Mühendisliği",
                            "5238 - Telekomünikasyon Mühendisliği",
                            "7570 - Mikroelektronik Mühendisliği"
                        ],
                        "metin": "Tabloda gösterilen kaynak programlardan birinden (en az dört yıllık) mezun olmak (7 program)."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "ales",
                        "puanTurleri": [
                            "SAY"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2022,
                            2023,
                            2024,
                            2025,
                            2026
                        ],
                        "metin": "ALES SAY puanı en az 70 (2022–2026 döneminde açıklanmış sınavlar, en yüksek puan esas)."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "subu-2026-ogretim-uyesi",
        "kurum": "subu",
        "kalip": "ogretim-uyesi",
        "baslik": "Öğretim üyesi alım ilanı",
        "resmiGazete": "2026-10-07",
        "kaynak": "resmi-gazete",
        "link": "https://personel.subu.edu.tr/tr",
        "basvuru": {
            "baslangic": "2026-10-07",
            "bitis": "2026-10-22",
            "bitisTahmini": true,
            "kanal": [
                "sahsen",
                "posta"
            ],
            "tekBasvuru": true,
            "adres": "Profesör ve doçent: Rektörlük Personel Daire Başkanlığı; doktor öğretim üyesi: ilgili birim",
            "belgeler": [
                "Başvuru formu",
                "Özgeçmiş",
                "Atanma ölçütleri inceleme komisyonu bildirim formu",
                "2 fotoğraf",
                "Nüfus cüzdanı sureti",
                "Doçentlik belgesi (profesör ve doçent)",
                "Öğrenim belgeleri",
                "Yabancı dil belgesi (doktor öğretim üyesi)",
                "Dosya içeriğinin taşınabilir belleklere kopyası (profesör 6, diğerleri 4 adet)"
            ]
        },
        "notlar": [
            "Resmî Gazete tarihi ilan dosyasının adından alındı; son başvuru günü 15 gün eklenerek hesaplandı. Doğrulanmalı.",
            "E-posta ile başvuru kabul edilmez."
        ],
        "pozisyonlar": [
            {
                "id": 186,
                "kod": "ÖÜ-2026.26",
                "unvan": "profesor",
                "birim": "Hendek Meslek Yüksekokulu · Elektrik ve Enerji",
                "alan": "Elektrik",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentliğini Elektrik- Elektronik Mühendisliği alanında almış olmak, Elektrik Güç Sistemlerinde Rüzgâr ve Güneş Enerjisi Kullanımı, Hidrojen Enerjisi ve Yakıt Pilleri konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 187,
                "kod": "ÖÜ-2026.27",
                "unvan": "docent",
                "birim": "Teknoloji Fakültesi · Mühendislik Temel Bilimleri(Matematik)",
                "alan": "Mühendislik Temel Bilimleri(Matematik)",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Doçentliğini Matematik alanında almış olmak, Kesirli Diferansiyel Denklemlerin Çözümleri, Kararlılık Analizi ve Kesirli Türev Operatörleri konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 188,
                "kod": "ÖÜ-2026.28",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Teknoloji Fakültesi · İnşaat Mühendisliği",
                "alan": "İnşaat Mühendisliği",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İnşaat Mühendisliği alanında doktora yapmış olmak, Deprem Mühendisliği, Sismik Taban Yalıtımı ve Patlama Etkileri alanlarında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 189,
                "kod": "ÖÜ-2026.29",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Teknoloji Fakültesi · Bilgisayar Mühendisliği",
                "alan": "Bilgisayar Mühendisliği",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Bilgisayar Mühendisliği alanında doktora yapmış olmak, Siber Güvenlik, Kuantum Sinir Ağları ve Sanal Gerçeklik konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 190,
                "kod": "ÖÜ-2026.30",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Teknoloji Fakültesi · Mekatronik Mühendisliği",
                "alan": "Mekatronik Mühendisliği",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Mekatronik Mühendisliği alanında doktora yapmış olmak, Robotik Sistemler, IOT Tabanlı Mekatronik Sistemler ve Sistem Kontrolü konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 191,
                "kod": "ÖÜ-2026.31",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Teknoloji Fakültesi · Metalurji ve Malzeme Mühendisliği",
                "alan": "Metalurji ve Malzeme Mühendisliği",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Metalurji ve Malzeme Mühendisliği alanında doktora yapmış olmak, Cam Seramikler, Alüminyum Kompozit Malzemeler ve Radyasyon Zırhlama konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 192,
                "kod": "ÖÜ-2026.32",
                "unvan": "dr-ogretim-uyesi",
                "birim": "İşletme ve Yönetim Bilimleri Fakültesi · Uluslararası Ticaret ve Finansman",
                "alan": "Uluslararası Ticaret ve Finansman",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Uluslararası Ticaret ve Finansman ya da Siyaset Bilimi ve Kamu Yönetimi alanında doktora yapmış olmak, Uluslararası Geriye Göçün Ekonomik Etkileri, Hibrit Tehditler ve Stratejik İletişim konularında çalışmalar yapmış olmak"
                    }
                ]
            },
            {
                "id": 193,
                "kod": "ÖÜ-2026.33",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Sağlık Bilimleri Fakültesi · Hemşirelik",
                "alan": "Hemşirelik",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Hemşirelik alanında doktora yapmış olmak, Kalp Yetersizliği, Kronik Hastalıklarda Egzersiz ve Sanal Gerçeklik konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 194,
                "kod": "ÖÜ-2026.34",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Akyazı Sağlık Hizmetleri Meslek Yüksekokulu · Tıbbi Hizmetler ve Teknikler",
                "alan": "İlk ve Acil Yardım",
                "adet": 1,
                "derece": 3,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Hemşirelik Esasları alanında doktora yapmış olmak, Afetler, Tele-Sağlık ve Tıbbi Hatalar konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 195,
                "kod": "ÖÜ-2026.35",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Bilişim Teknolojileri Meslek Yüksekokulu · Bilgisayar Teknolojileri",
                "alan": "Bilgisayar Programcılığı",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Yazılım Mühendisliği ya da Endüstri Mühendisliği alanında doktora yapmış olmak, Makine Öğrenmesi, Veri Madenciliği ve Hiperparametre Optimizasyonu konularında çalışmalar yapmış olmak."
                    }
                ]
            },
            {
                "id": 196,
                "kod": "ÖÜ-2026.36",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Pamukova Meslek Yüksekokulu · Gıda İşleme",
                "alan": "Gıda Teknolojisi",
                "adet": 1,
                "derece": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Gıda Mühendisliği alanında doktora yapmış olmak, Mikrodalgalı Kurutma Sistemleri, Yağ Analizi ve Antibiyofilm konularında çalışmalar yapmış olmak."
                    }
                ]
            }
        ],
        "yayinTarihi": null
    },
    {
        "id": "bddk-2026-bilisim",
        "kurum": "bddk",
        "kalip": "sozlesmeli-bilisim",
        "baslik": "Sözleşmeli bilişim personeli alım ilanı",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr/isealim",
        "basvuru": {
            "baslangic": "2026-10-19",
            "bitis": "2026-11-02",
            "saat": "23:59",
            "adres": "https://kariyerkapisi.gov.tr/isealim",
            "belgeler": [
                "Fotoğraflı özgeçmiş",
                "Mesleki çalışma sürelerini gösteren belgeler",
                "Varsa İngilizce YDS/e-YDS belgesi",
                "Varsa KPSS sonuç belgesi",
                "En az iki programlama dilini bildiğini gösteren belgeler",
                "Özel şartlarda istenen sertifikalar"
            ]
        },
        "secme": {
            "sinavYeri": "BDDK hizmet binası, Ümraniye/İstanbul"
        },
        "ortakSartlar": [
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P3"
                ],
                "yillar": [
                    2025,
                    2026
                ],
                "zorunlu": false,
                "metin": "2025 veya 2026 KPSS P3 puanı sıralamada kullanılır; KPSS puanı olmayanın puanı 70 sayılır."
            },
            {
                "tur": "sinav",
                "sinav": "yds",
                "dil": "İngilizce",
                "zorunlu": false,
                "metin": "Son 5 yılda alınmış İngilizce YDS (veya dengi) puanı sıralamada kullanılır."
            },
            {
                "tur": "diger",
                "metin": "Hizmetin gerektirdiği niteliklere, muhakeme yeteneğine ve temsil kabiliyetine sahip olmak; yoğun iş temposuna uyum ve takım çalışmasına yatkınlık."
            }
        ],
        "notlar": [
            "Tabloda her pozisyon için sözlü sınava çağrılacak aday sayısı verilmiştir (kadronun 10 katı)."
        ],
        "pozisyonlar": [
            {
                "id": 197,
                "unvan": "siber-guvenlik-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Siber Güvenlik Uzmanı",
                "adet": 2,
                "ucret": {
                    "tavanKati": 3
                },
                "cagriSayisi": 20,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya milli güvenliği tehdit edebilecek ya da kamu düzeninin bozulmasına yol açabilecek kritik türdeki verilerin bulunduğu kamu kurum ve kuruluşlarında yahut en az 1000 (bin) iç veya 5.000 (beş bin) dış kullanıcısı bulunan özel sektördeki sistem merkezlerinde sistem/ağ güvenliği, siber güvenlik veya bilgi güvenliği uzmanı olarak en az 5 (beş) yıl çalıştığını belgelemek",
                            "Fortigate Firewall, FortiAuthenticator, FortiAnalyzer, FortiSandbox, Fortimail, FortiEMS, Intrusion Prevention System (IPS), URL Filtering, Mail Gateway, Antivirüs, Sandbox ve DoS/DDoS önleme cihazlarının kurulum, yapılandırma ve yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Microsoft ve Unix/Linux işletim sistemleri güvenliği konusunda bilgi ve tecrübe sahibi olmak",
                            "Web Application Firewall (WAF) hakkında bilgi ve tecrübe sahibi olmak",
                            "VPN, WAN, DNS ve alan adları yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Kurumsal log yönetimi, SIEM ve log korelasyonu sistemlerinin yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Data Loss Prevention (DLP) hakkında bilgi ve tecrübe sahibi olmak",
                            "Penetrasyon/sızma testleri hakkında bilgi ve tecrübe sahibi olmak",
                            "Ağ zafiyet tarama ve trafik analizi yazılımlarından (Nessus, AppScan, Wireshark, Tcpdump, Nmap, Netcat vb.) en az ikisinin kullanımı konusunda bilgi ve tecrübe sahibi olmak",
                            "Proje yönetim birimleri ile ortak çalışabilecek, teknik liderlik yapabilecek seviyede proje görev yönetimi konusunda bilgi ve tecrübe sahibi olmak",
                            "Zararlı kod analizi hakkında bilgi sahibi olmak",
                            "NAC (Network Access Control) uygulamalarının kurulumu ve yönetiminde bilgi sahibi olmak",
                            "Siber olaylara müdahale (SOME) faaliyetleri hakkında bilgi sahibi olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Fortinet Certified Solution Specialist (Fortinet NSE 7) veya Fortinet Certified Professional (Fortinet NSE 4) sertifikalarından en az birine sahip olmak",
                            "Certified Information Systems Security Professional (CISSP), Certified Ethical Hacker (CEH) veya ISO 27001 (Bilgi Güvenliği Yönetimi Sistemi) Standardı denetçi sertifikalarından en az birine sahip olmak",
                            "ISO 27001 (Bilgi Güvenliği Yönetimi Sistemi) Standardı konusunda, sertifikasyon hazırlık çalışmaları ve uygulamaları ile bilgi güvenliği süreçleri, iş sürekliliği, risk analizi ve risk yönetimi konularında uygulama bilgisine sahip olmak ve sertifikanın başarı ile alındığı en az bir uygulamada aktif rol almak."
                        ]
                    }
                ]
            },
            {
                "id": 198,
                "unvan": "yazilim-gelistirme-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Yazılım Geliştirme Uzmanı",
                "adet": 4,
                "ucret": {
                    "tavanKati": 3
                },
                "cagriSayisi": 40,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Microsoft.NET teknolojilerine ve özellikle C# programlama diline hâkim olmak ve bu konularda en az 5 yıl tecrübe sahibi olmak",
                            "ASP.Net MVC ve ASP.Net Core teknolojilerinde iyi derecede bilgiye ve geliştirme tecrübesine sahip olmak",
                            "Nesne tabanlı programlama ve SOLID prensipleri hakkında bilgi ve tecrübe sahibi olmak",
                            "ORM (Nesne İlişkisel Eşleme), Entity Framework, LINQ vb. teknolojiler ile code-first ve database-first yaklaşımları konusunda bilgi ve tecrübe sahibi olmak",
                            "Çok katmanlı mimari ve servis tabanlı mimari (SOA) hakkında bilgi ve tecrübe sahibi olmak",
                            "SOAP ve REST web servisler, WCF, Web API teknolojileri hakkında bilgi ve tecrübe sahibi olmak",
                            "JQuery, Javascript, AJAX, HTML, Bootstrap, CSS vb. web teknolojilerinde bilgi ve tecrübe sahibi olmak",
                            "MS SQL Server üzerinde SQL sorgusu yazma, stored procedure ve function tanımlama konularında bilgi ve tecrübe sahibi olmak",
                            "İlişkisel veri tabanlarında tasarım, normalizasyon ve optimizasyon hakkında bilgi ve tecrübe sahibi olmak",
                            "ETL, OLAP ve OLTP modellerinin tasarımı, geliştirilmesi, yönetimi ve optimizasyonu konusunda bilgi sahibi olmak",
                            "Microsoft Power BI ile veri modelleme, dashboard geliştirme, raporlama, DAX, Power Query (M), Row Level Security (RLS) ve Power BI Report Server sunucu bakımı ve yönetimi konularında bilgi sahibi olmak",
                            "SAP BusinessObjects ile veri modelleme, dashboard geliştirme, raporlama, Row Level Security (RLS) ve BusinessObjects sunucu bakımı ve yönetimi konularında bilgi sahibi olmak",
                            "Yazılım yaşam döngüsü, yazılım analiz ve tasarımı, güvenli yazılım geliştirme konularında bilgi ve tecrübe sahibi olmak",
                            "Proje yönetimi ve çevik metodoloji konusunda bilgi ve tecrübe sahibi olmak",
                            "Yazılım Versiyon Kontrol Sistemleri (Azure DevOps, Git vb.) hakkında bilgi sahibi olmak",
                            "İş analistliği ve gereksinim belirleme konusunda bilgi sahibi olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Yazılım testleri konusunda bilgi sahibi olmak",
                            "Mikroservis mimarisi hakkında bilgi sahibi olmak",
                            "Yazılım kalite, güvence, değişiklik yönetimi ve yazılım doğrulama faaliyetleri konusunda bilgi sahibi olmak",
                            "ISO27001 Bilgi Güvenliği Standardı hakkında bilgi sahibi olmak",
                            "Unit Of Work, Repository vb. tasarım desenleri konusunda bilgi sahibi olmak",
                            "IIS 8.0 ve üzeri sürümlerde web uygulaması yayımlama (deployment) konusunda bilgi ve tecrübe sahibi olmak",
                            "Microsoft SQL Server Integration Services (SSIS), SQL Server Analysis Services (SSAS) ve SQL Server Reporting Services (SSRS) teknolojilerinin en az birinde bilgi sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 199,
                "unvan": "yapay-zeka-uzmani",
                "ilandakiAd": "Yapay Zekâ Geliştirme Uzmanı",
                "adet": 2,
                "ucret": {
                    "tavanKati": 2
                },
                "cagriSayisi": 20,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Veri Madenciliği, Makine Öğrenimi, Derin Öğrenme, Yapay Zekâ vb. konularında en az 3 yıl tecrübe sahibi olmak",
                            "Büyük dil modelleri (LLM) ve Doğal dil işleme (NLP) konularında bilgi ve tecrübe sahibi olmak",
                            "Güvenlik filtreleri, içerik denetleme ve koruma mekanizmaları uygulaması konularında bilgi sahibi olmak",
                            "Pyhton programlama dili, nesne tabanlı programlama ve SOLID prensipleri hakkında bilgi ve tecrübe sahibi olmak, Chatbot tabanlı yapay zekâ uygulamaları geliştirme, yapay zekâ uygulamaları için eş zamansız API geliştirme, veri doğrulama, veri işleme, performans iyileştirme konularında bilgi ve tecrübe sahibi olmak",
                            "Retrieval-Augmented Generation (RAG) sistemlerinin tasarımı, geliştirilmesi ve optimizasyonu konusunda bilgi ve tecrübe sahibi olmak",
                            "Vektör veri tabanı (MsSQL ve PostgreSQL) kullanımı, indeksleme stratejileri, sorgu iyileştirme, yedekleme, replikasyon ve load-balancing konularında bilgi ve tecrübe sahibi olmak",
                            "Embedding modelleri ve semantic arama, chunking stratejileri, metadata filtering, hibrid arama, document processing pipeline ve knowledge base yönetimi konularında bilgi ve tecrübe sahibi olmak",
                            "Çoklu ajan sistemleri, iş akışı düzenleme konularında bilgi ve tecrübe sahibi olmak",
                            "Kubernetes orkestrasyon sistemi, mikroservis mimarisi ve Docker teknolojisi konusunda bilgi ve tecrübe sahibi olmak",
                            "Linux/Unix işletim sistemleri, sunucu yedekleme, replikasyon ve load-balancing konusunda bilgi ve tecrübe sahibi olmak",
                            "Temel sistem ve ağ yönetimi konularında bilgi ve tecrübe sahibi olmak",
                            "Fine-tuning, Context Engineering vb. konularda bilgi sahibi olmak",
                            "Yapay zekâ etiği, adil yapay zekâ, yanlılık tespiti ve azaltma, veri gizliliği, model sağlamlığı konularında bilgi sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 200,
                "unvan": "siber-guvenlik-uzmani",
                "ilandakiAd": "Ağ Güvenlik Uzmanı",
                "adet": 3,
                "ucret": {
                    "tavanKati": 2
                },
                "cagriSayisi": 30,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya milli güvenliği tehdit edebilecek ya da kamu düzeninin bozulmasına yol açabilecek kritik türdeki verilerin bulunduğu kamu kurum ve kuruluşlarında yahut en az 1000 (bin) iç veya 5.000 (beş bin) dış kullanıcısı bulunan özel sektördeki sistem merkezlerinde sistem/ağ güvenliği, siber güvenlik, bilgi güvenliği veya ağ uzmanı olarak en az 3 (üç) yıl çalıştığını belgelemek",
                            "Firewall, Intrusion Prevention System (IPS), URL Filtering, Mail Gateway, Antivirüs, Sandbox ve DoS/DDoS önleme cihazlarının kurulum, yapılandırma ve yönetiminde bilgi ve tecrübe sahibi olmak",
                            "VPN, WAN, DNS ve alan adları yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Kurumsal log yönetimi, SIEM ve log korelasyonu sistemlerinin yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Cisco veya HP ağ cihazlarının ana omurga anahtarı (Backbone switch) ve kenar anahtarı (kenar switch) kurulumu, konfigürasyonu ve yönetiminde bilgi ve tecrübe sahibi olmak",
                            "Routing, Switching, Tunneling ve DHCP protokolleri ile 802.11ac/ax kablosuz standartları ve 802.1X ağ erişim kontrolü süreçleri hakkında bilgi sahibi olmak",
                            "NAC (Network Access Control) uygulamalarının kurulumu ve yönetiminde bilgi sahibi olmak",
                            "Ağ zafiyet tarama ve trafik analizi yazılımlarından (Nessus, AppScan, Wireshark, Tcpdump, Nmap, Netcat vb.) en az ikisinin kullanımı konusunda bilgi sahibi olmak",
                            "Siber olaylara müdahale (SOME) faaliyetleri hakkında bilgi sahibi olmak",
                            "ISO 27001 Bilgi Güvenliği Yönetim Sistemi (BGYS) standartlarına uygun politika ve prosedürlerin oluşturulmasında, dokümante edilmesinde ve BGYS uygulama süreçlerinde aktif rol üstlenmiş olmak",
                            "6698 sayılı KVKK uyum süreçleri, veri güvenliği gereksinimleri ve yasal yükümlülükler hakkında bilgi sahibi olmak",
                            "5651 sayılı kanun ve ilgili mevzuat hakkında bilgi sahibi olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Fortinet Certified Solution Specialist (Fortinet NSE 7) veya Fortinet Certified Professional (Fortinet NSE 4) sertifikalarından en az birine sahip olmak",
                            "Cisco Certified Network Associate(CCNA), Cisco Certified Network Professional (CCNP) veya Cisco Certified Network Professional Security (CCNP Security) sertifikalarından en az birine sahip olmak",
                            "ISO27001 Baş Denetçi Sertifikası, Certified Ethical Hacker (CEH), Licensed Penetration Tester (LPT), GIAC Penetration Tester (GPEN), Offensive Security Certified Professional (OSCP), Certified Information System Security Profesional (CISSP) sertifikalarından en az birine sahip olmak",
                            "Web Application Firewall (WAF) ve Data Loss Prevention (DLP) yazılımları hakkında bilgi ve tecrübe sahibi olmak",
                            "Sandboxing, zararlı kod analizi, tersine mühendislik, atak yüzeyleri, atak yaşam döngüsü hakkında bilgi sahibi olmak",
                            "Penetrasyon/sızma testleri hakkında bilgi ve tecrübe sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 201,
                "unvan": "sistem-uzmani",
                "ilandakiAd": "Sistem Uzmanı",
                "adet": 2,
                "ucret": {
                    "tavanKati": 2
                },
                "cagriSayisi": 20,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimlerinde veya milli güvenliği tehdit edebilecek ya da kamu düzeninin bozulmasına yol açabilecek kritik türdeki verilerin bulunduğu kamu kurum ve kuruluşlarında yahut en az 1000 (bin) iç veya 5.000 (beş bin) dış kullanıcısı bulunan özel sektördeki sistem merkezlerinde sistem yönetimi uzmanı olarak en az 3 (üç) yıl çalıştığını belgelemek",
                            "Microsoft Active Directory, DNS, DHCP, Dosya Sunucusu (File Server) ve Exchange Server servislerinin kurulum, yapılandırma ve yönetiminde tecrübe sahibi olmak",
                            "Sanallaştırma teknolojileri (Hyper-V, Vmware) üzerine mimari tasarım yapabilme, kurulumları gerçekleştirip yönetebilme, kısa orta ve uzun vade için kapasite planları çıkarabilme tecrübesine sahip olmak",
                            "Veri yedekleme, kurtarma ve iş sürekliliği çözümleri (Veeam, Netbackup vb.) ile e-posta arşivleme teknolojilerinde bilgi ve tecrübe sahibi olmak",
                            "Microsoft System Center ailesi (MECM/SCCM, SCOM, DPM) bileşenlerinin yönetimi ve yapılandırılması konusunda bilgi ve tecrübe sahibi olmak",
                            "Powershell scripting ile sistem otomasyonu yapabilmek; GPO, LDAP ve Windows Server (2019/2022/2025) platformlarını yönetebilmek",
                            "Temel sunucu (web, mail, domain, DNS) servislerinin iş sürekliliğini tasarlayıp kurabilme tecrübesine sahip olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Microsoft Certified Solutions Expert (MCSE) veya Windows Certified Solution Associate (MCSA) - (2012 ve sonrası) sertifikalarından en az birine sahip olmak",
                            "Microsoft’un yetkili eğitim ortaklarından Windows Server (2016 ve sonrası), Active Directory ve Exchange Server veya bu sistemlerin güvenliği hakkındaki eğitimlerden en az ikisini aldığını katılım sertifikası ile belgelemek",
                            "Ağ yönetimi konusunda bilgi ve tecrübe sahibi olmak",
                            "Veri merkezi (Datacenter) kurulumu, yönetimi ve TIER standartları/sertifikasyon süreçleri hakkında bilgi sahibi olmak",
                            "ODM (Olağanüstü Durum Merkezi) sistemlerinin kurulumu ve yönetimi hakkında bilgi ve tecrübe sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 202,
                "unvan": "yazilim-gelistirme-uzmani",
                "ilandakiAd": "Yazılım Geliştirme Uzmanı",
                "adet": 2,
                "ucret": {
                    "tavanKati": 2
                },
                "cagriSayisi": 20,
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Microsoft.NET teknolojilerine ve özellikle C# programlama diline hâkim olmak ve bu konularda en az 3 yıl tecrübe sahibi olmak",
                            "ASP.Net MVC ve ASP.Net Core teknolojilerinde iyi derecede bilgiye ve geliştirme tecrübesine sahip olmak",
                            "Nesne tabanlı programlama ve SOLID prensipleri hakkında bilgi ve tecrübe sahibi olmak",
                            "ORM (Nesne İlişkisel Eşleme), Entity Framework, LINQ vb. teknolojiler ile code-first ve database-first yaklaşımları konusunda bilgi ve tecrübe sahibi olmak",
                            "Çok katmanlı mimari ve servis tabanlı mimari (SOA) hakkında bilgi ve tecrübe sahibi olmak",
                            "SOAP ve REST web servisler, WCF, Web API teknolojileri hakkında bilgi ve tecrübe sahibi olmak",
                            "JQuery, Javascript, AJAX, HTML, Bootstrap, CSS vb. web teknolojilerinde bilgi ve tecrübe sahibi olmak",
                            "MS SQL Server üzerinde SQL sorgusu yazma, stored procedure ve function tanımlama konularında bilgi sahibi olmak",
                            "İlişkisel veri tabanlarında tasarım, normalizasyon ve optimizasyon hakkında bilgi sahibi olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Yazılım testleri konusunda bilgi sahibi olmak",
                            "Mikroservis mimarisi hakkında bilgi sahibi olmak",
                            "ISO27001 Bilgi Güvenliği Standardı hakkında bilgi sahibi olmak",
                            "ETL, OLAP ve OLTP modellerinin tasarımı, geliştirilmesi, yönetimi ve optimizasyonu konusunda bilgi sahibi olmak",
                            "Microsoft Power BI ile veri modelleme, dashboard geliştirme, raporlama, DAX, Power Query (M), Row Level Security (RLS) ve Power BI Report Server sunucu bakımı ve yönetimi konularında bilgi sahibi olmak",
                            "SAP BusinessObjects ile veri modelleme, dashboard geliştirme, raporlama, Row Level Security (RLS) ve BusinessObjects sunucu bakımı ve yönetimi konularında bilgi sahibi olmak",
                            "Microsoft SQL Server Integration Services (SSIS), SQL Server Analysis Services (SSAS) ve SQL Server Reporting Services (SSRS) teknolojilerinin en az birinde bilgi sahibi olmak. 2."
                        ]
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "tmsf-2026-giris-sinavi",
        "kurum": "tmsf",
        "baslik": "Fon denetçi yardımcılığı, fon uzman yardımcılığı ve fon avukatlığı giriş sınavı",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr/isealim",
        "varsayilan": {
            "statu": "ozel-kanun-kadrolu",
            "yontem": "kurum-sinavi",
            "egitim": "lisans",
            "birim": "İstanbul merkez teşkilatı"
        },
        "basvuru": {
            "baslangic": "2026-10-12",
            "bitis": "2026-10-30",
            "saat": "17:00",
            "kanal": [
                "kariyer-kapisi"
            ],
            "adres": "https://kariyerkapisi.gov.tr/isealim",
            "tekBasvuru": true
        },
        "secme": {
            "yontem": "kurum-sinavi",
            "asamalar": [
                "Yazılı sınav",
                "Sözlü sınav"
            ],
            "sinavTarihi": "2026-11-21/2026-11-22",
            "sinavYeri": "İstanbul",
            "aciklama": "Başvuranlar puan sırasına göre çağrılır: denetçi yardımcılığına ilk 200, uzman yardımcılığına ilk 900, avukatlığa ilk 400 aday."
        },
        "ortakSartlar": [
            {
                "tur": "yas",
                "enFazla": 35,
                "tarih": "2026-01-01",
                "metin": "Sınavın yapıldığı yılın 1 Ocak günü itibarıyla 35 yaşını doldurmamış olmak."
            },
            {
                "tur": "diger",
                "metin": "657 sayılı Devlet Memurları Kanunu'nun 48. maddesindeki genel şartları taşımak."
            },
            {
                "tur": "engel",
                "metin": "Müflis olmamak, konkordato ilan etmemiş olmak; Fona devredilen bankalarda nitelikli paya sahip olmamak; 5411 sayılı Kanun md. 26 uyarınca çalışması yasaklananlardan olmamak."
            },
            {
                "tur": "engel",
                "metin": "İlanda sayılan suçlardan hükümlü bulunmamak; arşiv araştırması ve güvenlik soruşturmasında engel bulunmamak."
            }
        ],
        "pozisyonlar": [
            {
                "id": 203,
                "unvan": "denetci-yardimcisi",
                "ilandakiAd": "Fon Denetçi Yardımcısı",
                "adet": 10,
                "derece": 9,
                "cagriSayisi": 200,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Siyasal bilgiler",
                            "Hukuk",
                            "İktisadi ve idari bilimler",
                            "İktisat ve işletme",
                            "Bankacılık",
                            "Bankacılık ve finans",
                            "Bilgisayar",
                            "Yazılım",
                            "Endüstri",
                            "Elektrik",
                            "Elektronik",
                            "Elektrik ve elektronik",
                            "Elektronik ve haberleşme",
                            "Mekatronik",
                            "Bilgisayar sistemleri ve teknolojileri",
                            "Bilgisayar sistemleri ve ağları",
                            "İstatistik",
                            "Matematik",
                            "Ekonometri"
                        ],
                        "metin": "En az 4 yıllık siyasal bilgiler, hukuk, iktisadi ve idari bilimler, iktisat ve işletme, bankacılık ve finans fakülteleri ile mühendislik ve fen-edebiyat fakültelerinin bilgisayar, yazılım, endüstri, elektrik-elektronik, mekatronik, istatistik, matematik ve ekonometri bölümlerinden mezun olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "grup": "A",
                        "puanTurleri": [
                            "P8",
                            "P9",
                            "P11",
                            "P16",
                            "P17",
                            "P18",
                            "P21",
                            "P22",
                            "P23",
                            "P26",
                            "P27",
                            "P28",
                            "P31",
                            "P32",
                            "P33",
                            "P37",
                            "P38",
                            "P41",
                            "P42",
                            "P43",
                            "P46",
                            "P47",
                            "P48"
                        ],
                        "enAz": 75,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "metin": "2025 veya 2026 KPSS (A grubu) puan türlerinden birinden en az 75."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 50,
                        "yillar": [
                            2024,
                            2025,
                            2026
                        ],
                        "dil": "İngilizce, Fransızca veya Almanca",
                        "metin": "2024–2026 yıllarında YDS veya e-YDS'den (İngilizce, Fransızca, Almanca) en az 50."
                    }
                ]
            },
            {
                "id": 204,
                "unvan": "uzman-yardimcisi",
                "ilandakiAd": "Fon Uzman Yardımcısı",
                "adet": 45,
                "derece": 9,
                "cagriSayisi": 900,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Siyasal bilgiler",
                            "Hukuk",
                            "İktisadi ve idari bilimler",
                            "İktisat ve işletme",
                            "Bankacılık",
                            "Bankacılık ve finans",
                            "Bilgisayar",
                            "Yazılım",
                            "Endüstri",
                            "Elektrik",
                            "Elektronik",
                            "Elektrik ve elektronik",
                            "Elektronik ve haberleşme",
                            "Mekatronik",
                            "Bilgisayar sistemleri ve teknolojileri",
                            "Bilgisayar sistemleri ve ağları",
                            "İstatistik",
                            "Matematik",
                            "Ekonometri"
                        ],
                        "metin": "En az 4 yıllık siyasal bilgiler, hukuk, iktisadi ve idari bilimler, iktisat ve işletme, bankacılık ve finans fakülteleri ile mühendislik ve fen-edebiyat fakültelerinin bilgisayar, yazılım, endüstri, elektrik-elektronik, mekatronik, istatistik, matematik ve ekonometri bölümlerinden mezun olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "grup": "A",
                        "puanTurleri": [
                            "P8",
                            "P9",
                            "P11",
                            "P16",
                            "P17",
                            "P18",
                            "P21",
                            "P22",
                            "P23",
                            "P26",
                            "P27",
                            "P28",
                            "P31",
                            "P32",
                            "P33",
                            "P37",
                            "P38",
                            "P41",
                            "P42",
                            "P43",
                            "P46",
                            "P47",
                            "P48"
                        ],
                        "enAz": 75,
                        "yillar": [
                            2025,
                            2026
                        ],
                        "metin": "2025 veya 2026 KPSS (A grubu) puan türlerinden birinden en az 75."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 50,
                        "yillar": [
                            2024,
                            2025,
                            2026
                        ],
                        "dil": "İngilizce, Fransızca veya Almanca",
                        "metin": "2024–2026 yıllarında YDS veya e-YDS'den (İngilizce, Fransızca, Almanca) en az 50."
                    }
                ]
            },
            {
                "id": 205,
                "unvan": "avukat",
                "ilandakiAd": "Fon Avukatı",
                "alan": "Hukuk",
                "adet": 20,
                "derece": 9,
                "cagriSayisi": 400,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Hukuk"
                        ],
                        "metin": "En az 4 yıllık hukuk fakültesi mezunu olmak."
                    },
                    {
                        "tur": "belge",
                        "ad": "Avukatlık ruhsatnamesi",
                        "metin": "Avukatlık ruhsatnamesine sahip olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "grup": "B",
                        "puanTurleri": [
                            "P3"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2026
                        ],
                        "metin": "2026 KPSS (B grubu) P3 puanı en az 70."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "adalet-2026-icra-muduru",
        "kurum": "adalet",
        "baslik": "İcra müdürü ve icra müdür yardımcısı sınavı",
        "kaynak": "osym",
        "link": "https://ais.osym.gov.tr",
        "varsayilan": {
            "statu": "657-4a",
            "yontem": "kurum-sinavi",
            "il": "TR"
        },
        "basvuru": {
            "baslangic": "2026-10-20",
            "bitis": "2026-10-26",
            "gecBasvuru": "2026-11-05",
            "kanal": [
                "osym"
            ],
            "adres": "https://ais.osym.gov.tr",
            "ucret": {
                "tutar": null,
                "aciklama": "ÖSYM sınav ücreti ve başvuru merkezinde başvuru hizmeti ücreti ödenir."
            }
        },
        "secme": {
            "yontem": "kurum-sinavi",
            "asamalar": [
                "Yazılı sınav (ÖSYM)",
                "Sözlü sınav"
            ],
            "sinavTarihi": "2026-12-05",
            "sinavYeri": "Ankara (Çankaya ve Yenimahalle sınav merkezleri)"
        },
        "pozisyonlar": [
            {
                "id": 206,
                "unvan": "icra-muduru",
                "ilandakiAd": "İcra Müdürü ve İcra Müdür Yardımcısı",
                "adet": 150,
                "egitim": "onlisans",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "onlisans",
                            "lisans"
                        ],
                        "bolumler": [
                            "Hukuk fakültesi",
                            "Adalet meslek yüksekokulu",
                            "Meslek yüksekokullarının adalet bölümü",
                            "Adalet meslek eğitimi ön lisans programı"
                        ],
                        "metin": "Hukuk fakültesi, adalet meslek yüksekokulu, meslek yüksekokullarının adalet bölümü ya da adalet meslek eğitimi ön lisans programı mezunu olmak."
                    },
                    {
                        "tur": "yas",
                        "enFazla": 35,
                        "tarih": "2026-01-01",
                        "dogumEnErken": "1991-01-01",
                        "metin": "1 Ocak 2026 itibarıyla 35 yaşını doldurmamış olmak (01.01.1991 ve sonrası doğanlar)."
                    },
                    {
                        "tur": "diger",
                        "metin": "Türk vatandaşı olmak; kamu haklarından mahrum bulunmamak; askerlikle ilgisi bulunmamak ya da askerliğini yapmış, ertelemiş veya yedek sınıfa geçmiş olmak."
                    },
                    {
                        "tur": "engel",
                        "metin": "Görev yapmasına engel akıl hastalığı bulunmamak; ilanda sayılan suçlardan mahkûm olmamak."
                    }
                ]
            }
        ],
        "notlar": [
            "KPSS şartı yoktur; yazılı sınavı ÖSYM yapar.",
            "Atama yeri ilanda belirtilmemiştir; yurt geneli olarak gösterildi."
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "yargitay-2026-bilisim",
        "kurum": "yargitay",
        "kalip": "sozlesmeli-bilisim",
        "baslik": "Sözleşmeli bilişim personeli alım ilanı",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr",
        "varsayilan": {
            "birim": "Bilgi İşlem Merkezi Müdürlüğü"
        },
        "basvuru": {
            "baslangic": "2026-10-19",
            "bitis": "2026-10-23",
            "saat": "17:30",
            "adres": "https://kariyerkapisi.gov.tr",
            "tekBasvuru": true
        },
        "ortakSartlar": [
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P3"
                ],
                "yillar": [
                    2024
                ],
                "zorunlu": false,
                "metin": "2024 KPSS P3 puanı sıralamada kullanılır; KPSS puanı olmayanın puanı 70 sayılır."
            },
            {
                "tur": "sinav",
                "sinav": "yds",
                "zorunlu": false,
                "metin": "YDS (veya dengi) puanı sıralamada kullanılır; puanı olmayanın puanı 0 sayılır."
            },
            {
                "tur": "diger",
                "metin": "Görevini devamlı yapmasına engel sağlık sorunu bulunmamak."
            },
            {
                "tur": "diger",
                "metin": "(c) bendindeki bölüm mezunları, Hazine ve Maliye Bakanlığı vizesi gereği yalnızca 2 katına kadar olan pozisyonlara başvurabilir."
            }
        ],
        "notlar": [
            "Sözlü sınavın yeri ve zamanı başvuru sonuçlarıyla duyurulacak."
        ],
        "pozisyonlar": [
            {
                "id": 207,
                "unvan": "yazilim-gelistirme-uzmani",
                "ilandakiAd": "Mobil Yazılım Geliştirme Uzmanı",
                "adet": 2,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Yazılım geliştirme konusunda en az 3 yıllık tecrübe sahibi olmak ve belgelemek",
                            "Mobil Uygulama projelerinde aktif olarak en az 1 yıl çalışmış olmak",
                            "React Native veya Flutter konusunda bilgi ve tecrübe sahibi olmak, Reactive programlama konusunda bilgi sahibi olmak",
                            "Mobil uygulama kullanıcı deneyimi (UI / UX) konusunda bilgi ve tecrübe sahibi olmak",
                            "Android Studio ve Xcode geliştirme ortamının kullanımında tecrübeli olmak, Android ve IOS frameworkler ve API'leri ve Gradle konusunda bilgi sahibi olmak",
                            "REST/SOAP, Web API, JSON, XML ve web servisleri konusunda bilgi ve tecrübe sahibi olmak",
                            "Oauth 2.0, JWT ve benzeri kimlik doğrulama ve yetkilendirme mekanizmaları konusunda bilgi sahibi olmak",
                            "SOLID yazılım prensipleri konusunda tecrübe sahibi olmak",
                            "Yaygın olarak kullanılan mobil yazılım geliştirme desenleri (MVC, MVP, MVVM vb.) hakkında tecrübe sahibi olmak",
                            "Kurumun kurumsal mobil hesaplarını yönetebilecek yetkinlikte olmak, uygulama sürüm yönetimi ve güncelleme süreçleri konusunda bilgi sahibi olmak",
                            "Google Play Store/ Apple App Store üzerinde mobil uygulama yayınlama deneyimi olmak"
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "JavaScript, JavaScript Frameworkleri (React / Vue / Angular), ES6, TypeScript, Async/Await ve Responsive Design ve Adaptive Design konularında bilgi sahibi olmak."
                        ]
                    }
                ]
            },
            {
                "id": 208,
                "unvan": "siber-guvenlik-uzmani",
                "ilandakiAd": "Siber Güvenlik Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 2
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimine sahip kamu kurum ve kuruluşlarında veya en az 1.000 (bin) iç ya da 5.000 (beş bin) dış kullanıcısı bulunan özel sektör kuruluşlarında; ağ ve güvenlik uzmanı, siber güvenlik uzmanı, siber güvenlik analisti veya benzeri pozisyonlarda en az 3 (üç) yıl çalışmış olmak ve bunu belgelemek",
                            "Firewall, IPS/IDS, WAF, LoadBalancer, Sandbox, DDoS, AV/EDR/XDR, NAC, PAM gibi siber güvenlik ürünleri hakkında bilgi ve tecrübe sahibi olmak",
                            "SIEM altyapısı ve çalışma prensipleri konusunda bilgi sahibi olmak; log kaynaklarının SIEM sistemine entegrasyonu, log analizi ve korelasyon kurallarının hazırlanması konularında tecrübe sahibi olmak",
                            "Syslog, Windows EventLog ve benzeri log kaynakları konusunda bilgi ve tecrübe sahibi olmak",
                            "Regex kullanarak log analizi, filtreleme ve SIEM korelasyon kurallarının oluşturulması konusunda bilgi sahibi olmak",
                            "Siber olayların tespiti, analizi, sınıflandırılması ve olaylara müdahale süreçleri hakkında bilgi sahibi olmak",
                            "Güncel siber saldırı teknikleri, kötü amaçlı yazılımlar, kimlik bilgisi saldırıları, web uygulama saldırıları ve ağ tabanlı saldırılar hakkında bilgi sahibi olmak",
                            "Zafiyet tarama ve güvenlik testi araçları (Nessus, Burp Suite, Acunetix/Invicti vb.) hakkında bilgi sahibi olmak ve gerektiğinde kullanabilmek",
                            "Kablolu ve kablosuz ağ güvenliği, TCP/IP, DNS, DHCP, VPN, SSL/TLS ve IEEE 802.1X teknolojileri konusunda bilgi sahibi olmak",
                            "Ağ trafiği ve protokol analizi gerçekleştirebilmek ve Wireshark, Tcpdump, Netcat gibi araçları kullanabilmek",
                            "Siber tehdit istihbaratı kaynaklarını takip edebilmek, elde edilen tehdit istihbaratı verilerini analiz edebilmek ve ilgili birimlere raporlayabilmek",
                            "Güvenlik olayları kapsamında IOC (Indicator of Compromise) tespiti, olay analizi ve temel kök neden analizi gerçekleştirebilmek",
                            "Linux ve Microsoft Windows işletim sistemlerinin temel güvenlik yapılandırmaları, log yapıları ve güvenlik kontrolleri hakkında bilgi sahibi olmak",
                            "Teknik dokümantasyon ve teknik şartname hazırlanması konusunda bilgi sahibi olmak",
                            "ISO/IEC 27001 Bilgi Güvenliği Yönetim Sistemi konusunda bilgi sahibi olmak",
                            "MITRE ATT&CK ve OWASP gibi siber güvenlik çerçeve ve metodolojileri konusunda bilgi sahibi olmak",
                            "Yoğun ve dinamik çalışma ortamına uyum sağlayabilen, ekip çalışmasına yatkın, analitik düşünebilen, çözüm odaklı ve gelişime açık olmak."
                        ]
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "CEH, Security+, eJPT veya benzeri uluslararası geçerliliğe sahip sertifikalardan birine sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 209,
                "unvan": "siber-guvenlik-uzmani",
                "kidem": "kidemli",
                "ilandakiAd": "Kıdemli Siber Güvenlik Uzmanı",
                "adet": 1,
                "ucret": {
                    "tavanKati": 3
                },
                "sartlar": [
                    {
                        "tur": "teknik",
                        "metin": "Aranan bilgi ve tecrübe",
                        "maddeler": [
                            "Büyük ölçekli bilgi işlem birimine sahip kamu kurum ve kuruluşlarında veya en az 1.000 (bin) iç ya da 10.000 (on bin) dış kullanıcısı bulunan özel sektör kuruluşlarında; ağ ve güvenlik uzmanı, ağ ve güvenlik yöneticisi, siber güvenlik uzmanı, siber güvenlik analisti veya benzeri pozisyonlarda en az 5 (beş) yıl çalışmış olmak ve bunu belgelemek",
                            "Kurumsal ölçekte kullanılan Firewall, IDS/IPS, WAF, EDR/XDR, NDR, Sandbox, NAC, PAM, DDoS ve güvenli ağ erişim çözümleri gibi siber güvenlik ürünlerinin yönetimi, yapılandırılması, izlenmesi ve güvenlik politikalarının oluşturulması konularında bilgi ve tecrübe sahibi olmak",
                            "SIEM sistemlerinin yönetimi, log kaynaklarının entegrasyonu, logların anlamlandırılması, korelasyon kurallarının oluşturulması, mevcut kuralların iyileştirilmesi (tuning) ve siber güvenlik kullanım senaryolarının (usecase) geliştirilmesi konularında tecrübe sahibi olmak",
                            "Siber olaylara müdahale (IncidentResponse) süreçlerinde; olayın tespiti, analiz edilmesi, sınıflandırılması, sınırlandırılması, temizlenmesi, kurtarılması ve olay sonrası kök neden analizinin gerçekleştirilmesi konularında bilgi ve tecrübe sahibi olmak",
                            "MITRE ATT&CK, CyberKillChain, NIST Cybersecurity Framework, NIST SP 800 serisi, OWASP ve ISO/IEC 27001 gibi siber güvenlik metodolojileri, standartları ve çerçeveleri konusunda bilgi sahibi olmak",
                            "Linux ve Microsoft Windows işletim sistemlerinin sunucu ve istemci güvenliği, güvenlik sıkılaştırması (hardening), log analizi, erişim kontrolü ve güvenlik yapılandırmaları konusunda bilgi ve tecrübe sahibi olmak",
                            "Ağ trafiği ve protokol analizi gerçekleştirebilmek; Wireshark, Tcpdump, Netcat ve benzeri araçları etkin şekilde kullanabilmek",
                            "Sızma testleri, zafiyet analizi ve güvenlik doğrulama süreçleri hakkında bilgi ve tecrübe sahibi olmak; Nessus, Burp Suite, Acunetix/Invicti ve benzeri zafiyet tarama ve güvenlik test araçlarını kullanabilmek",
                            "Siber güvenlik operasyonlarının otomasyonu ve olay müdahale süreçlerinde kullanılabilecek Python, PowerShell veya Bash gibi betik/programlama dillerinden en az birinde uygulama geliştirebilecek seviyede bilgi sahibi olmak",
                            "Güvenlik ürünleri, bilgi sistemleri ve ağ altyapılarının güvenlik açısından analiz edilmesi; güvenlik açıklarının ve iyileştirme alanlarının belirlenmesi ve çözüm önerilerinin oluşturulması konularında tecrübe sahibi olmak",
                            "Siber güvenlik mimarisi, güvenlik politikaları, prosedürleri ve teknik dokümantasyonun hazırlanması konusunda bilgi ve tecrübe sahibi olmak",
                            "Teknik şartname hazırlanması, teknik değerlendirme yapılması ve siber güvenlik ürünlerinin tedarik/yenileme süreçlerine teknik katkı sağlanması konularında tecrübe sahibi olmak",
                            "Güncel siber tehditler, saldırı teknikleri, zafiyetler ve güvenlik teknolojilerini takip edebilecek düzeyde İngilizce bilgisine sahip olmak",
                            "Yoğun ve dinamik çalışma ortamına uyum sağlayabilen, ekip çalışmasına yatkın, analitik düşünebilen, çözüm odaklı ve gelişime açık olmak.",
                            "CISSP, OSCP, CEH, GPEN, GCIH veya benzeri uluslararası geçerliliğe sahip sertifikalardan en az birine sahip olmak ve belgelemek."
                        ]
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "istka-2026-uzman",
        "kurum": "istka",
        "kalip": "kalkinma-ajansi-uzman",
        "baslik": "Uzman personel alım ilanı",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr/isealim",
        "basvuru": {
            "baslangic": "2026-11-02",
            "bitis": "2026-11-22",
            "saat": "23:59",
            "adres": "https://kariyerkapisi.gov.tr/isealim",
            "belgeler": [
                "Özgeçmiş ve fotoğraf",
                "Diploma ya da mezuniyet belgesi (e-Devlet bilgisi eksikse)",
                "YDS dışı yabancı dil belgesi (beyan edildiyse)",
                "Tercih sebeplerini gösteren belgeler"
            ]
        },
        "secme": {
            "sinavYeri": "İstanbul Kalkınma Ajansı, Beyoğlu/İstanbul",
            "aciklama": "Mülakata katılacaklar 4 Aralık 2026'da ilan edilir; mülakat tarihleri ayrıca duyurulacak."
        },
        "notlar": [
            "Mühendislik grubunda 3 uzman alınır: 2'si KPSS puanıyla, 1'i KPSS aranmadan deneyimle."
        ],
        "pozisyonlar": [
            {
                "id": 210,
                "alan": "Mühendislik, matematik, şehir ve bölge planlama, YBS",
                "ilandakiAd": "Uzman (KPSS ile)",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Bilgisayar Mühendisliği",
                            "Çevre Mühendisliği",
                            "Elektrik-Elektronik Mühendisliği",
                            "Elektronik ve Haberleşme Mühendisliği",
                            "Endüstri Mühendisliği",
                            "İşletme Mühendisliği",
                            "Makine Mühendisliği",
                            "Matematik Mühendisliği",
                            "Matematik",
                            "Metalurji Mühendisliği",
                            "Metalurji ve Malzeme Mühendisliği",
                            "Şehir ve Bölge Planlama",
                            "Yönetim Bilişim Sistemleri"
                        ],
                        "metin": "En az dört yıllık lisans: Bilgisayar Mühendisliği, Çevre Mühendisliği, Elektrik-Elektronik Mühendisliği, Elektronik ve Haberleşme Mühendisliği, Endüstri Mühendisliği, İşletme Mühendisliği, Makine Mühendisliği, Matematik Mühendisliği, Matematik, Metalurji Mühendisliği, Metalurji ve Malzeme Mühendisliği, Şehir ve Bölge Planlama, Yönetim Bilişim Sistemleri."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P1",
                            "P2",
                            "P3"
                        ],
                        "enAz": 80,
                        "metin": "Geçerli KPSS P1, P2 veya P3 puanlarından birinden en az 80."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "dil": "İngilizce",
                        "dilDuzeyi": "C",
                        "metin": "Son başvuru tarihinden önceki 5 yıl içinde İngilizce YDS / e-YDS'den veya denk bir sınavdan en az (C) düzeyi (ÜDS-YÖKDİL kabul edilmez)."
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Devlet destekleri (hibeler, teşvik mevzuatı, vb.), Proje Döngüsü Yönetimi, Avrupa Birliği Destek Mekanizmaları ve Uygulamaları, Dünya Bankası, Birleşmiş Milletler, Kalkınma Ajansları gibi kurum- kuruluşlar tarafından desteklenen program, projelerin yürütülmesi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Bölgesel araştırma, fizibilite çalışmaları, proje, analiz ve raporlar hazırlanmasına yönelik çalışmaları yürütmek üzere; araştırma, analiz ve raporlama yöntemlerine hakim, yazılı ve sözlü iletişim becerilerine sahip, kayıt tutma, bilgi sistemlerinin kullanılması, planlama ve süreç yönetimi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Satın alma işlemlerinin gerçekleştirilmesi (şartname, ihale, sözleşme süreçleri) ve hakediş kontrolü-ödeme konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Temel düzeyde maliyet analizi, fiyat- kalite karşılaştırması yapabilecek finansal tecrübe ve/veya bilgi sahibi olmak,",
                            "Birden fazla yabancı dil bilmek bakımından asgari C düzeyinde belge sahibi olmak,",
                            "İlgili alanda lisans üstü eğitime sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 211,
                "alan": "İktisat, işletme, maliye",
                "ilandakiAd": "Uzman (KPSS ile)",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "İktisat",
                            "İşletme",
                            "Maliye"
                        ],
                        "metin": "En az dört yıllık lisans: İktisat, İşletme veya Maliye."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P14",
                            "P15",
                            "P19",
                            "P20",
                            "P21",
                            "P24",
                            "P25"
                        ],
                        "enAz": 80,
                        "metin": "Geçerli KPSS P14, P15, P19, P20, P21, P24 veya P25 puanlarından birinden en az 80."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "dil": "İngilizce",
                        "dilDuzeyi": "C",
                        "metin": "Son başvuru tarihinden önceki 5 yıl içinde İngilizce YDS / e-YDS'den veya denk bir sınavdan en az (C) düzeyi (ÜDS-YÖKDİL kabul edilmez)."
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Devlet destekleri (hibeler, teşvik mevzuatı, vb.), Proje Döngüsü Yönetimi, Avrupa Birliği Destek Mekanizmaları ve Uygulamaları, Dünya Bankası, Birleşmiş Milletler, Kalkınma Ajansları gibi kurum- kuruluşlar tarafından desteklenen program, projelerin yürütülmesi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Bölgesel araştırma, fizibilite çalışmaları, proje, analiz ve raporlar hazırlanmasına yönelik çalışmaları yürütmek üzere; araştırma, analiz ve raporlama yöntemlerine hakim, yazılı ve sözlü iletişim becerilerine sahip, kayıt tutma, bilgi sistemlerinin kullanılması, planlama ve süreç yönetimi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Satın alma işlemlerinin gerçekleştirilmesi (şartname, ihale, sözleşme süreçleri) ve hakediş kontrolü-ödeme konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Temel düzeyde maliyet analizi, fiyat- kalite karşılaştırması yapabilecek finansal tecrübe ve/veya bilgi sahibi olmak,",
                            "Birden fazla yabancı dil bilmek bakımından asgari C düzeyinde belge sahibi olmak,",
                            "İlgili alanda lisans üstü eğitime sahip olmak,",
                            "İnsan kaynakları ve personel işlemleri alanında tecrübe ve/veya bilgi sahibi,",
                            "Bordrolama yapabilmek ve ilgili programları kullanabilmek,",
                            "Sendikalar Kanunu ve Sendikal süreçler hakkında bilgi sahibi olmak,",
                            "İş Kanunu ve SGK mevzuatına hakim olmak,",
                            "İş Hukuku ve Sosyal Güvenlik konularında tecrübe ve/veya bilgi sahibi olmak,",
                            "Performans değerlendirme sistemleri ve uygulamaları konusunda tecrübe ve/veya bilgi sahibi olmak,",
                            "İş sağlığı ve güvenliği konularında tecrübe ve/veya bilgi sahibi,",
                            "Office programlarını kullanma becerisine sahip olmak,",
                            "Kurumsal satın alma konusunda bilgi sahibi olmak,",
                            "Kamu İhale Kanunu ve meri mevzuat hakkında bilgi sahibi olmak,",
                            "Bütçe, muhasebe ve finans konularında tecrübe ve/veya bilgi sahibi olmak,",
                            "Planlama ve zaman yönetimi konularında bilgi ve beceri sahibi olmak,",
                            "Kolay iletişim kurabilme niteliğine haiz olmak,",
                            "SMMM belgesine sahip olmak."
                        ]
                    }
                ]
            },
            {
                "id": 212,
                "alan": "Mühendislik, matematik, şehir ve bölge planlama, YBS",
                "ilandakiAd": "Uzman (KPSS'siz, deneyimle)",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Bilgisayar Mühendisliği",
                            "Çevre Mühendisliği",
                            "Elektrik-Elektronik Mühendisliği",
                            "Elektronik ve Haberleşme Mühendisliği",
                            "Endüstri Mühendisliği",
                            "İşletme Mühendisliği",
                            "Makine Mühendisliği",
                            "Matematik Mühendisliği",
                            "Matematik",
                            "Metalurji Mühendisliği",
                            "Metalurji ve Malzeme Mühendisliği",
                            "Şehir ve Bölge Planlama",
                            "Yönetim Bilişim Sistemleri"
                        ],
                        "metin": "En az dört yıllık lisans: Bilgisayar Mühendisliği, Çevre Mühendisliği, Elektrik-Elektronik Mühendisliği, Elektronik ve Haberleşme Mühendisliği, Endüstri Mühendisliği, İşletme Mühendisliği, Makine Mühendisliği, Matematik Mühendisliği, Matematik, Metalurji Mühendisliği, Metalurji ve Malzeme Mühendisliği, Şehir ve Bölge Planlama, Yönetim Bilişim Sistemleri."
                    },
                    {
                        "tur": "yas",
                        "enFazla": 50,
                        "tarih": "basvuru",
                        "metin": "Başvuru tarihi itibarıyla 50 yaşını doldurmamış olmak."
                    },
                    {
                        "tur": "deneyim",
                        "yil": 5,
                        "metin": "Kamu veya özel kesimde planlama-programlama, proje üretimi ve yönetimi, strateji geliştirme, izleme-değerlendirme ya da tanıtım-danışmanlık konularında belgelenmiş en az 5 yıl fiilî çalışma."
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Devlet destekleri (hibeler, teşvik mevzuatı, vb.), Proje Döngüsü Yönetimi, Avrupa Birliği Destek Mekanizmaları ve Uygulamaları, Dünya Bankası, Birleşmiş Milletler, Kalkınma Ajansları gibi kurum- kuruluşlar tarafından desteklenen program, projelerin yürütülmesi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Bölgesel araştırma, fizibilite çalışmaları, proje, analiz ve raporlar hazırlanmasına yönelik çalışmaları yürütmek üzere; araştırma, analiz ve raporlama yöntemlerine hakim, yazılı ve sözlü iletişim becerilerine sahip, kayıt tutma, bilgi sistemlerinin kullanılması, planlama ve süreç yönetimi konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Satın alma işlemlerinin gerçekleştirilmesi (şartname, ihale, sözleşme süreçleri) ve hakediş kontrolü-ödeme konularında bilgi ve/veya tecrübe sahibi olmak,",
                            "Temel düzeyde maliyet analizi, fiyat- kalite karşılaştırması yapabilecek finansal tecrübe ve/veya bilgi sahibi olmak,",
                            "Birden fazla yabancı dil bilmek bakımından asgari C düzeyinde belge sahibi olmak,",
                            "İlgili alanda lisans üstü eğitime sahip olmak."
                        ]
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "mevka-2026-uzman",
        "kurum": "mevka",
        "kalip": "kalkinma-ajansi-uzman",
        "baslik": "Uzman personel alım ilanı",
        "yayinTarihi": "2026-10-13",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr",
        "basvuru": {
            "baslangic": "2026-11-02",
            "bitis": "2026-11-13",
            "saat": "23:59",
            "adres": "https://kariyerkapisi.gov.tr"
        },
        "secme": {
            "sinavYeri": "Mevlana Kalkınma Ajansı, Meram/Konya",
            "aciklama": "Sözlü sınava katılacaklar 20 Kasım 2026'da ilan edilir."
        },
        "pozisyonlar": [
            {
                "id": 213,
                "alan": "İnşaat mühendisliği",
                "iller": [
                    "42",
                    "70"
                ],
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "İnşaat mühendisliği"
                        ],
                        "metin": "En az dört yıllık lisans: İnşaat Mühendisliği."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P1",
                            "P2",
                            "P3"
                        ],
                        "enAz": 80,
                        "metin": "Geçerli KPSS P1, P2 veya P3 puanlarından birinden en az 80."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "dil": "İngilizce",
                        "enAz": 70,
                        "dilDuzeyi": "C",
                        "metin": "Son 5 yıl içinde İngilizce YDS / e-YDS'den en az 70 (C düzeyi) ya da denk bir sınav (ÜDS-YÖKDİL kabul edilmez)."
                    },
                    {
                        "tur": "tercih",
                        "metin": "Tercih sebepleri",
                        "maddeler": [
                            "Ajansın faaliyet alanlarıyla ilgili konularda bilgi ve deneyim sahibi olmak",
                            "TR52 (Konya-Karaman) bölgesiyle ilgili çalışmalar yapmış olmak",
                            "Mezun olunan dalda ya da ilgili alanlarda yüksek lisans veya doktora derecesi",
                            "İngilizce dışında ikinci yabancı dil belgesi",
                            "MS Office programlarını, özellikle Excel'i iyi derecede kullanabilmek",
                            "(B) sınıfı sürücü belgesine sahip olmak ve aktif araç kullanabilmek"
                        ]
                    }
                ]
            }
        ],
        "notlar": [
            "Başarılı aday Konya veya Karaman'da görevlendirilebilir."
        ],
        "resmiGazete": null
    },
    {
        "id": "vgm-2026-uzman-yardimcisi",
        "kurum": "vgm",
        "baslik": "Vakıf uzman yardımcılığı sınavı",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.cbiko.gov.tr",
        "varsayilan": {
            "statu": "657-4a",
            "yontem": "kurum-sinavi",
            "egitim": "lisans",
            "unvan": "uzman-yardimcisi",
            "ilandakiAd": "Vakıf Uzman Yardımcısı",
            "derece": 7,
            "hizmetSinifi": "GİH",
            "birim": "Merkez teşkilatı"
        },
        "basvuru": {
            "baslangic": "2026-10-12",
            "bitis": "2026-10-25",
            "kanal": [
                "kariyer-kapisi"
            ],
            "adres": "https://kariyerkapisi.cbiko.gov.tr"
        },
        "secme": {
            "yontem": "kurum-sinavi",
            "asamalar": [
                "Yazılı sınav",
                "Sözlü sınav"
            ],
            "cagriKati": 20,
            "sinavTarihi": "2026-11-15",
            "sinavYeri": "Ankara",
            "aciklama": "Her grup için KPSS P3 sırasına göre kontenjanın 20 katı aday yazılı sınava çağrılır; yazılı sınavda 70 puan gerekir."
        },
        "ortakSartlar": [
            {
                "tur": "diger",
                "metin": "657 sayılı Devlet Memurları Kanunu'nun 48. maddesindeki şartları taşımak."
            },
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P3"
                ],
                "enAz": 70,
                "yillar": [
                    2025,
                    2026
                ],
                "metin": "2025 veya 2026 KPSS P3 puanı en az 70."
            },
            {
                "tur": "yas",
                "enFazla": 35,
                "tarih": "2026-01-01",
                "dogumEnErken": "1991-01-01",
                "metin": "Sınav yılının 1 Ocak günü itibarıyla 35 yaşını doldurmamış olmak (01.01.1991 ve sonrası doğanlar)."
            }
        ],
        "pozisyonlar": [
            {
                "id": 214,
                "kod": "1. Grup",
                "alan": "Arap Dili ve Edebiyatı",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Arap Dili ve Edebiyatı"
                        ],
                        "metin": "En az 4 yıllık lisans: Arap Dili ve Edebiyatı."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 80,
                        "dil": "Arapça veya İngilizce",
                        "metin": "Son beş yılda YDS / e-YDS / e-YÖKDİL'den (Arapça veya İngilizce) en az 80 ya da ÖSYM eşdeğeri."
                    }
                ]
            },
            {
                "id": 215,
                "kod": "2. Grup",
                "alan": "İlahiyat",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "İlahiyat"
                        ],
                        "metin": "En az 4 yıllık lisans: İlahiyat."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 80,
                        "dil": "Arapça veya İngilizce",
                        "metin": "Son beş yılda YDS / e-YDS / e-YÖKDİL'den (Arapça veya İngilizce) en az 80 ya da ÖSYM eşdeğeri."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "kesan-bel-2026-memur",
        "kurum": "kesan-bel",
        "baslik": "İlk defa atanmak üzere memur alım ilanı",
        "kaynak": "kurum-sitesi",
        "link": "https://www.kesan.bel.tr",
        "varsayilan": {
            "statu": "657-4a",
            "yontem": "kpss-kurum",
            "egitim": "lisans",
            "unvan": "muhendis",
            "hizmetSinifi": "TH",
            "derece": 8
        },
        "basvuru": {
            "baslangic": "2026-11-16",
            "bitis": "2026-11-19",
            "saat": "17:00",
            "kanal": [
                "e-posta",
                "sahsen",
                "posta"
            ],
            "adres": "insankaynaklari@kesan.bel.tr; şahsen veya iadeli taahhütlü posta ile belediyeye",
            "tekBasvuru": true,
            "belgeler": [
                "Başvuru formu",
                "Kimlik kartı fotokopisi",
                "Hangi kadroya başvurduğunu belirten dilekçe",
                "İlanda sayılan diğer belgeler"
            ]
        },
        "secme": {
            "yontem": "kpss-kurum",
            "cagriKati": 5,
            "sinavTarihi": "2026-12-04",
            "sinavYeri": "Keşan Belediyesi encümen toplantı salonu",
            "aciklama": "KPSS puanına göre kadronun 5 katı aday sözlü sınava çağrılır; liste 25 Kasım 2026'da belediyenin sitesinde ilan edilir."
        },
        "ortakSartlar": [
            {
                "tur": "diger",
                "metin": "657 sayılı Devlet Memurları Kanunu'nun 48. maddesindeki genel şartları taşımak (erkek adaylar için askerlik durumu dahil)."
            }
        ],
        "pozisyonlar": [
            {
                "id": 216,
                "kod": "1",
                "alan": "İnşaat mühendisliği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "İnşaat mühendisliği"
                        ],
                        "metin": "Lisans düzeyinde inşaat mühendisliği programından mezun olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "grup": "B",
                        "puanTurleri": [
                            "P3"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2026
                        ],
                        "metin": "2026 KPSS (B grubu) P3 puanı en az 70."
                    }
                ]
            },
            {
                "id": 217,
                "kod": "2",
                "alan": "Elektrik-elektronik mühendisliği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "lisans"
                        ],
                        "bolumler": [
                            "Elektrik-elektronik mühendisliği"
                        ],
                        "metin": "Lisans düzeyinde elektrik-elektronik mühendisliği programından mezun olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "grup": "B",
                        "puanTurleri": [
                            "P3"
                        ],
                        "enAz": 70,
                        "yillar": [
                            2026
                        ],
                        "metin": "2026 KPSS (B grubu) P3 puanı en az 70."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "jgk-2027-muvazzaf-subay",
        "kurum": "jgk",
        "kalip": "muvazzaf-subay",
        "baslik": "Muvazzaf subay temini (2027)",
        "kaynak": "kurum-sitesi",
        "link": "https://personeltemin.jandarma.gov.tr",
        "varsayilan": {
            "birim": "Jandarma ve Sahil Güvenlik Akademisi Başkanlığı"
        },
        "basvuru": {
            "baslangic": "2026-10-12",
            "bitis": "2026-10-26",
            "saat": "23:59",
            "adres": "https://personeltemin.jandarma.gov.tr",
            "ucret": {
                "tutar": 600,
                "aciklama": "600 TL sınav ücreti, başvuru sonuçlarından sonra çağrılan adaylardan alınır. Şehit veya vazife malulü eş ve çocuklarından alınmaz."
            }
        },
        "secme": {
            "asamalar": [
                "Belge incelemesi",
                "Fiziki kontrol",
                "Fiziki yeterlilik sınavı",
                "Mülakat"
            ],
            "formul": "KPSS %30 + ALES %10 + fiziki yeterlilik %20 + vücut kitle indeksi %10 + mülakat %30. KPSS ve ALES istenmeyen branşlarda: fiziki yeterlilik %40 + VKİ %10 + mülakat %50."
        },
        "ortakSartlar": [
            {
                "tur": "egitim",
                "duzey": [
                    "lisans"
                ],
                "metin": "Branş için Tablo-1'de gösterilen en az dört yıllık lisans programlarından mezun olmak ya da geçici kayıt tarihine kadar mezun olabilecek durumda olmak. Jandarma branşı tüm lisans programlarını kapsar."
            },
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P3"
                ],
                "enAz": 65,
                "yillar": [
                    2025,
                    2026
                ],
                "kosul": {
                    "alan": [
                        "Jandarma",
                        "İstihkam",
                        "Muhabere",
                        "İkmal",
                        "Bakım",
                        "Maliye",
                        "Mühendis (İnşaat)",
                        "Öğretmen (Beden Eğitimi)",
                        "Öğretmen (Rehberlik)",
                        "Öğretmen (Hukuk)",
                        "Veteriner",
                        "Öğretmen (İngilizce)",
                        "Öğretmen (İtalyanca)",
                        "Öğretmen (Fransızca)"
                    ]
                },
                "metin": "2025–2026 KPSS P3 puanı en az 65 (şehit veya vazife malulü eş ve çocukları için 52)."
            },
            {
                "tur": "sinav",
                "sinav": "ales",
                "puanTurleri": [
                    "EA"
                ],
                "enAz": 65,
                "kosul": {
                    "alan": [
                        "Jandarma",
                        "İstihkam",
                        "Muhabere",
                        "İkmal",
                        "Bakım",
                        "Maliye",
                        "Mühendis (İnşaat)",
                        "Öğretmen (Beden Eğitimi)",
                        "Öğretmen (Rehberlik)",
                        "Öğretmen (Hukuk)",
                        "Veteriner",
                        "Öğretmen (İngilizce)",
                        "Öğretmen (İtalyanca)",
                        "Öğretmen (Fransızca)"
                    ]
                },
                "metin": "Son 5 yılda ALES eşit ağırlık puanı en az 65 (şehit veya vazife malulü eş ve çocukları için 52)."
            },
            {
                "tur": "sinav",
                "sinav": "kpss",
                "puanTurleri": [
                    "P4"
                ],
                "enAz": 70,
                "yillar": [
                    2025,
                    2026
                ],
                "kosul": {
                    "alan": [
                        "Hukuk"
                    ]
                },
                "metin": "2025–2026 KPSS P4 puanı en az 70."
            },
            {
                "tur": "sinav",
                "sinav": "ales",
                "puanTurleri": [
                    "EA"
                ],
                "enAz": 70,
                "kosul": {
                    "alan": [
                        "Hukuk"
                    ]
                },
                "metin": "Son 5 yılda ALES eşit ağırlık puanı en az 70."
            },
            {
                "tur": "fiziksel",
                "boy": {
                    "erkek": 1.67,
                    "kadin": 1.62
                },
                "metin": "Erkeklerde 1,67 m, kadınlarda 1,62 m'den kısa olmamak; vücut kitle indeksi puanlanır."
            },
            {
                "tur": "engel",
                "metin": "Başvuru tarihinde herhangi bir siyasi partiye veya yan kuruluşuna üye olmadığına dair beyan sunmak."
            },
            {
                "tur": "engel",
                "metin": "Silah taşımaya engel bulunmamak; askerî okullardan veya TSK, Jandarma ve Sahil Güvenlik'ten ayrılmamış ya da çıkarılmamış olmak; hamile olmamak."
            }
        ],
        "notlar": [
            "Tabip ve diş tabibi branşlarında KPSS ve ALES şartı yoktur.",
            "Adaylar iki tercih yapabilir; tercihlerden birinin jandarma branşı olması önerilir.",
            "Muhtemel geçici kayıt tarihi Ocak 2027."
        ],
        "pozisyonlar": [
            {
                "id": 218,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Jandarma",
                "cinsiyet": "erkek",
                "adet": 70
            },
            {
                "id": 219,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Jandarma",
                "cinsiyet": "kadin",
                "adet": 2
            },
            {
                "id": 220,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Jandarma",
                "cinsiyet": "erkek",
                "kontenjan": "sehit-gazi-yakini",
                "adet": 6
            },
            {
                "id": 221,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Jandarma",
                "cinsiyet": "kadin",
                "kontenjan": "sehit-gazi-yakini",
                "adet": 1
            },
            {
                "id": 222,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "İstihkam",
                "cinsiyet": "erkek",
                "adet": 11
            },
            {
                "id": 223,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Muhabere",
                "cinsiyet": "erkek",
                "adet": 9
            },
            {
                "id": 224,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Muhabere",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 225,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "İkmal",
                "cinsiyet": "erkek",
                "adet": 1
            },
            {
                "id": 226,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Bakım",
                "cinsiyet": "erkek",
                "adet": 7
            },
            {
                "id": 227,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Maliye",
                "cinsiyet": "erkek",
                "adet": 1
            },
            {
                "id": 228,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Maliye",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 229,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Mühendis (İnşaat)",
                "cinsiyet": "erkek",
                "adet": 1
            },
            {
                "id": 230,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Mühendis (İnşaat)",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 231,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (Beden Eğitimi)",
                "cinsiyet": "erkek",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "belge",
                        "ad": "Sporcu lisansı veya 1. kademe yardımcı antrenörlük belgesi",
                        "metin": "İlanda sayılan spor dallarının birinde en az 1 yıl lisanslı sporcu olmak ya da 1. kademe yardımcı antrenörlük belgesi (millî sporcularda antrenörlük belgesi aranmaz)."
                    }
                ]
            },
            {
                "id": 232,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (Rehberlik)",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 233,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (Hukuk)",
                "cinsiyet": "erkek",
                "adet": 3
            },
            {
                "id": 234,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (Hukuk)",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 235,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Veteriner",
                "cinsiyet": "erkek",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "yas",
                        "enFazla": 32,
                        "tarih": "2026-01-01",
                        "dogumEnErken": "1994-01-01",
                        "yerineGecer": true,
                        "metin": "1 Ocak 2026 itibarıyla 32 yaşını bitirmemiş olmak (01.01.1994 ve sonrası doğanlar)."
                    }
                ]
            },
            {
                "id": 236,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (İngilizce)",
                "cinsiyet": "erkek",
                "adet": 3,
                "sartlar": [
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "metin": "Son 5 yıl içinde YDS veya e-YDS'den en az 85."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "İngilizce ve İtalyanca öğretmenliği dışındaki programlardan mezun olanlar için pedagojik formasyon."
                    }
                ]
            },
            {
                "id": 237,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (İngilizce)",
                "cinsiyet": "kadin",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "metin": "Son 5 yıl içinde YDS veya e-YDS'den en az 85."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "İngilizce ve İtalyanca öğretmenliği dışındaki programlardan mezun olanlar için pedagojik formasyon."
                    }
                ]
            },
            {
                "id": 238,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (İtalyanca)",
                "cinsiyet": "kadin",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "metin": "Son 5 yıl içinde YDS veya e-YDS'den en az 85."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "İngilizce ve İtalyanca öğretmenliği dışındaki programlardan mezun olanlar için pedagojik formasyon."
                    }
                ]
            },
            {
                "id": 239,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Öğretmen (Fransızca)",
                "cinsiyet": "kadin",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "sinav",
                        "sinav": "yds",
                        "enAz": 85,
                        "metin": "Son 5 yıl içinde YDS veya e-YDS'den en az 85."
                    },
                    {
                        "tur": "belge",
                        "ad": "Pedagojik formasyon belgesi",
                        "metin": "İngilizce ve İtalyanca öğretmenliği dışındaki programlardan mezun olanlar için pedagojik formasyon."
                    }
                ]
            },
            {
                "id": 240,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Hukuk",
                "cinsiyet": "erkek",
                "adet": 3
            },
            {
                "id": 241,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Hukuk",
                "cinsiyet": "kadin",
                "adet": 1
            },
            {
                "id": 242,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Tabip",
                "cinsiyet": "erkek",
                "adet": 2,
                "sartlar": [
                    {
                        "tur": "yas",
                        "enFazla": 32,
                        "tarih": "2026-01-01",
                        "dogumEnErken": "1994-01-01",
                        "yerineGecer": true,
                        "metin": "1 Ocak 2026 itibarıyla 32 yaşını bitirmemiş olmak (01.01.1994 ve sonrası doğanlar)."
                    }
                ]
            },
            {
                "id": 243,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Diş Tabibi",
                "cinsiyet": "erkek",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "yas",
                        "enFazla": 32,
                        "tarih": "2026-01-01",
                        "dogumEnErken": "1994-01-01",
                        "yerineGecer": true,
                        "metin": "1 Ocak 2026 itibarıyla 32 yaşını bitirmemiş olmak (01.01.1994 ve sonrası doğanlar)."
                    }
                ]
            },
            {
                "id": 244,
                "ilandakiAd": "Muvazzaf subay",
                "alan": "Diş Tabibi",
                "cinsiyet": "kadin",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "yas",
                        "enFazla": 32,
                        "tarih": "2026-01-01",
                        "dogumEnErken": "1994-01-01",
                        "yerineGecer": true,
                        "metin": "1 Ocak 2026 itibarıyla 32 yaşını bitirmemiş olmak (01.01.1994 ve sonrası doğanlar)."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    },
    {
        "id": "itu-2026-sozlesmeli",
        "kurum": "itu",
        "baslik": "Sözleşmeli personel alım ilanı (657/4-B)",
        "resmiGazete": "2026-10-13",
        "kaynak": "kariyer-kapisi",
        "link": "https://kariyerkapisi.gov.tr",
        "varsayilan": {
            "statu": "657-4b",
            "yontem": "kpss-kurum"
        },
        "dayanak": "657 sayılı Kanun md. 4/B; Sözleşmeli Personel Çalıştırılmasına İlişkin Esaslar Ek 2(c)",
        "basvuru": {
            "baslangic": "2026-10-13",
            "bitis": "2026-10-27",
            "kanal": [
                "kariyer-kapisi"
            ],
            "adres": "https://kariyerkapisi.gov.tr"
        },
        "secme": {
            "yontem": "kpss-kurum",
            "cagriKati": 3,
            "aciklama": "KPSS puan sırasına göre her pozisyon için kadronun 3 katı aday sözlü sınava çağrılır."
        },
        "ortakSartlar": [
            {
                "tur": "yas",
                "enFazla": 35,
                "metin": "35 yaşından küçük olmak."
            },
            {
                "tur": "engel",
                "metin": "Yükseköğretim kurumlarında örgün öğrenci olmamak."
            },
            {
                "tur": "engel",
                "metin": "Herhangi bir sosyal güvenlik kurumundan emeklilik veya yaşlılık aylığı almıyor olmak."
            }
        ],
        "notlar": [
            "İlan metni görüntü olarak yayımlandığı için gözle aktarıldı; puan ve şartlar resmi metinden doğrulanmalı.",
            "Koruma ve güvenlik görevlileri vardiyalı çalışır."
        ],
        "pozisyonlar": [
            {
                "id": 245,
                "kod": "DP-1",
                "unvan": "destek-personeli",
                "alan": "Destek hizmetleri",
                "adet": 12,
                "egitim": "ortaogretim",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "ortaogretim"
                        ],
                        "metin": "Ortaöğretim (lise ve dengi) mezunu olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P94"
                        ],
                        "enAz": 55,
                        "yillar": [
                            2024
                        ],
                        "metin": "2024 KPSS P94 puanı en az 55."
                    }
                ]
            },
            {
                "id": 246,
                "kod": "KGG-1",
                "unvan": "koruma-guvenlik-gorevlisi",
                "cinsiyet": "erkek",
                "adet": 11,
                "egitim": "onlisans",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "onlisans"
                        ],
                        "metin": "Ön lisans mezunu olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P93"
                        ],
                        "enAz": 60,
                        "yillar": [
                            2024
                        ],
                        "metin": "2024 KPSS P93 puanı en az 60."
                    },
                    {
                        "tur": "belge",
                        "ad": "Geçerli özel güvenlik kimlik kartı",
                        "metin": "Geçerli özel güvenlik kimlik kartına sahip olmak."
                    },
                    {
                        "tur": "fiziksel",
                        "metin": "İlandaki boy–kilo kuralını sağlamak; görünür yerlerde dövme bulunmamak."
                    }
                ]
            },
            {
                "id": 247,
                "kod": "KGG-2",
                "unvan": "koruma-guvenlik-gorevlisi",
                "cinsiyet": "kadin",
                "adet": 1,
                "egitim": "onlisans",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "onlisans"
                        ],
                        "metin": "Ön lisans mezunu olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P93"
                        ],
                        "enAz": 60,
                        "yillar": [
                            2024
                        ],
                        "metin": "2024 KPSS P93 puanı en az 60."
                    },
                    {
                        "tur": "belge",
                        "ad": "Geçerli özel güvenlik kimlik kartı",
                        "metin": "Geçerli özel güvenlik kimlik kartına sahip olmak."
                    },
                    {
                        "tur": "fiziksel",
                        "metin": "İlandaki boy–kilo kuralını sağlamak; görünür yerlerde dövme bulunmamak."
                    }
                ]
            },
            {
                "id": 248,
                "kod": "TKN-1",
                "unvan": "teknisyen",
                "alan": "Tesisat teknolojisi ve iklimlendirme",
                "cinsiyet": "erkek",
                "adet": 1,
                "egitim": "ortaogretim",
                "sartlar": [
                    {
                        "tur": "egitim",
                        "duzey": [
                            "ortaogretim"
                        ],
                        "bolumler": [
                            "Tesisat Teknolojisi ve İklimlendirme"
                        ],
                        "metin": "Mesleki ve teknik ortaöğretim kurumlarının Tesisat Teknolojisi ve İklimlendirme alanından mezun olmak."
                    },
                    {
                        "tur": "sinav",
                        "sinav": "kpss",
                        "puanTurleri": [
                            "P94"
                        ],
                        "enAz": 60,
                        "yillar": [
                            2024
                        ],
                        "metin": "2024 KPSS P94 puanı en az 60."
                    }
                ]
            }
        ],
        "yayinTarihi": null
    },
    {
        "id": "omu-2026-ogretim-uyesi",
        "kurum": "omu",
        "kalip": "ogretim-uyesi",
        "baslik": "Öğretim üyesi alım ilanı",
        "kaynak": "resmi-gazete",
        "link": "https://ubys.omu.edu.tr/HRM/AkademikBasvuru/PersonelBasvuru/Giris",
        "basvuru": {
            "baslangic": null,
            "bitis": "2026-10-27",
            "saat": "17:00",
            "kanal": [
                "kurum-sistemi"
            ],
            "adres": "https://ubys.omu.edu.tr/HRM/AkademikBasvuru/PersonelBasvuru/Giris",
            "tekBasvuru": true,
            "belgeler": [
                "Çevrim içi başvuru",
                "Doktor öğretim üyesi kadroları için 1 adet fiziki başvuru dosyası (ilgili birime teslim)"
            ]
        },
        "ortakSartlar": [
            {
                "tur": "engel",
                "metin": "Doktor öğretim üyesi ilanına doçent ünvanını alanlar veya doçent kadrosunda olanlar başvuramaz."
            }
        ],
        "notlar": [
            "Başvuru süresi Resmî Gazete yayımından itibaren 15 gündür; yayım tarihi ilan metninde yok.",
            "Şahsen veya posta ile başvuru kabul edilmez."
        ],
        "pozisyonlar": [
            {
                "id": 249,
                "kod": "2026/97",
                "unvan": "profesor",
                "birim": "Ali Fuad Başgil Hukuk Fakültesi",
                "alan": "Ticaret Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Hukuk Fakültesi lisans mezunu olmak. Ticaret Hukuku alanında Doçent ünvanı almış olmak. Sermaye piyasası hukuku, rekabet hukuku ve sınai mülkiyet hukuku konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 250,
                "kod": "2026/98",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Ali Fuad Başgil Hukuk Fakültesi",
                "alan": "İş ve Sosyal Güvenlik Hukuku",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Hukuk fakültesi lisans mezunu olmak. Özel Hukuk alanında yüksek lisans ve doktorasını tamamlamış olmak. İş hukuku, sosyal sigortalar hukuku, iş sağlığı ve güvenliği hukuku konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 251,
                "kod": "2026/99",
                "unvan": "docent",
                "birim": "Bafra Meslek Yüksekokulu",
                "alan": "Muhasebe ve Vergi Uygulamaları",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Finans alanında Doçent ünvanı almış olmak. Finansal gevşeklik, sürdürülebilirlik ve bölgesel finansal entegrasyon konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 252,
                "kod": "2026/100",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Çarşamba İnsan ve Toplum Bilimleri Fakültesi",
                "alan": "Genel Türk Tarihi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Genel Türk Tarihi alanında yüksek lisans ve doktorasını tamamlamış olmak. Türk dünyası arkeolojisi konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 253,
                "kod": "2026/101",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Devlet Konservatuvarı",
                "alan": "Türk Halk Müziği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Türk Müziği alanında doktora yapmış olmak. Kaval çalgısı konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 254,
                "kod": "2026/102",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Diş Hekimliği Fakültesi",
                "alan": "Pedodonti",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Pedodonti alanında Diş Hekimliğinde uzmanlık eğitimini tamamlamış olmak. Çocuklarda sedasyon altında gerçekleştirilen dental tedaviler konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 255,
                "kod": "2026/103",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eczacılık Fakültesi",
                "alan": "Klinik Eczacılık",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Eczacılık Fakültesi lisans mezunu olmak. Klinik eczacılık alanında uzmanlık eğitimini tamamlamış olmak."
                    }
                ]
            },
            {
                "id": 256,
                "kod": "2026/104",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eczacılık Fakültesi",
                "alan": "Farmasötik Biyoteknoloji",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Eczacılık Fakültesi lisans mezunu olmak. Farmasötik Teknoloji alanında doktora yapmış olmak. Farmasötik biyoteknoloji ve farklı kanser tiplerin sağaltımında kullanılan ilaç taşıyıcı sistemlerinin tasarlanması konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 257,
                "kod": "2026/105",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eczacılık Fakültesi",
                "alan": "Farmakoloji",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Eczacılık Fakültesi lisans mezunu olmak. Tıbbi Farmakoloji alanında doktora yapmış olmak. Kanser farmakolojisi, hücre kültürü ve moleküler farmakoloji konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 258,
                "kod": "2026/106",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eğitim Fakültesi",
                "alan": "Öğretim Teknolojileri",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Bilgisayar ve Öğretim Teknolojileri Eğitimi alanında yüksek lisans ve doktorasını tamamlamış olmak. Eğitimde e-portfolyo kullanımı ve bilgi işlemsel düşünme becerileri konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 259,
                "kod": "2026/107",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eğitim Fakültesi",
                "alan": "Sınıf Eğitimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Sınıf Öğretmenliği lisans mezunu olmak. Sınıf Eğitimi alanında yüksek lisans ve doktorasını tamamlamış olmak. Konuşma bozuklukları ve dikkat konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 260,
                "kod": "2026/108",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Eğitim Fakültesi",
                "alan": "Rehberlik ve Psikolojik Danışmanlık",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Rehberlik ve Psikolojik Danışmanlık alanında yüksek lisans ve doktorasını tamamlamış olmak. Öznel eksik istihdam ve insana yakışır iş konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 261,
                "kod": "2026/109",
                "unvan": "docent",
                "birim": "Fen Fakültesi",
                "alan": "Fonksiyonlar Teorisi ve Fonksiyonel Analiz",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Matematik Bilim alanında Doçent ünvanı almış olmak. Bikompleks değerli p-integrallenebilir fonksiyonlar konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 262,
                "kod": "2026/110",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Fen Fakültesi",
                "alan": "Bilgi Güvenliği Teknolojisi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Bilgisayar Mühendisliği alanında doktora yapmış olmak."
                    }
                ]
            },
            {
                "id": 263,
                "kod": "2026/111",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Fen Fakültesi",
                "alan": "Yazılım Geliştirme",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Bilgisayar Mühendisliği alanında yüksek lisansını ve İstatistik bilim alanında doktorasını tamamlamış olmak. Bayesçi makine öğrenmesi konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 264,
                "kod": "2026/112",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Güzel Sanatlar Fakültesi",
                "alan": "Endüstriyel Tasarım",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Endüstriyel Tasarım/Endüstri Ürünleri Tasarımı lisans mezunu olup; bu alanda yüksek lisans ve doktorasını tamamlamış olmak. Tasarım ve teknoloji etkileşimi konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 265,
                "kod": "2026/113",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Havza Meslek Yüksekokulu",
                "alan": "İşletme Yönetimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İşletme alanında doktora yapmış olmak. Güvenlik kültürü ve ergonomi konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 266,
                "kod": "2026/114",
                "unvan": "dr-ogretim-uyesi",
                "birim": "İktisadi ve İdari Bilimler Fakültesi",
                "alan": "Sayısal Yöntemler",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Sayısal Yöntemler alanında doktora yapmış olmak. Kanonik korelasyon analizi, hedef programlama ve bibliyometrik analiz konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 267,
                "kod": "2026/115",
                "unvan": "dr-ogretim-uyesi",
                "birim": "İlahiyat Fakültesi",
                "alan": "Mantık",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İlahiyat Fakültesi lisans mezunu olmak. Mantık alanında doktora yapmış olmak. Klasik mantık konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 268,
                "kod": "2026/116",
                "unvan": "dr-ogretim-uyesi",
                "birim": "İletişim Fakültesi",
                "alan": "Gazetecilik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "İletişim Fakültesi Gazetecilik bölümü lisans mezunu olmak. Gazetecilik alanında yüksek lisans ve doktorasını tamamlamış olmak. Teyit haberciliği konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 269,
                "kod": "2026/117",
                "unvan": "dr-ogretim-uyesi",
                "birim": "İnsan ve Toplum Bilimleri Fakültesi",
                "alan": "Sualtı Arkeolojisi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Arkeoloji alanında doktora yapmış olmak. Sualtı arkeolojisi ve arkeolojik buluntuların üç boyutlu belgelenmesi konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 270,
                "kod": "2026/118",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Kenevir Araştırmaları Enstitüsü",
                "alan": "Tarım ve Islah",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Zootekni alanında doktora yapmış olmak. Yapay zeka ve makine öğrenmesi yöntemlerinin tarımsal alanlarda uygulanması, keten ve kenevirin lif verimi ve verim kriterleri konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 271,
                "kod": "2026/119",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Mühendislik Fakültesi",
                "alan": "Malzeme Bilimi ve Mühendisliği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Malzeme Bilimi ve Mühendisliği alanında doktora yapmış olmak. Enerji hasadı ve malzemelerin elektriksel ve optik özellikleri konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 272,
                "kod": "2026/120",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Mühendislik Fakültesi",
                "alan": "Mekanik",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Makine Mühendisliği alanında lisans mezunu olmak. Eklemeli imalat ve termo-mekanik sayısal analiz konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 273,
                "kod": "2026/121",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Sağlık Bilimleri Fakültesi",
                "alan": "Toplum Beslenmesi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Beslenme ve Diyetetik alanında doktora yapmış olmak. Yeme farkındalığı ve kronotip konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 274,
                "kod": "2026/122",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Sağlık Hizmetleri Meslek Yüksekokulu",
                "alan": "İlk ve Acil Yardım",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Acil Hemşireliği alanında doktora yapmış olmak. Resüsitasyon ve afet konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 275,
                "kod": "2026/123",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Samsun Meslek Yüksekokulu",
                "alan": "Muhasebe ve Vergi Uygulamaları",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Muhasebe ve Finansman Öğretmenliği alanında lisans mezunu olmak. Bankacılık alanında doktora yapmış olmak. Katılım bankacılığı ve altın sertifikası konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 276,
                "kod": "2026/124",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Terme Meslek Yüksekokulu",
                "alan": "Pazarlama",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Ticaret ve Turizm Eğitim Fakültesinde lisans mezunu olmak. Eğitim Yönetimi alanında yüksek lisans ve doktorasını tamamlamış olmak. Dönüşümcü, dağıtımcı ve etik liderlik konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 277,
                "kod": "2026/125",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Turizm Fakültesi",
                "alan": "Turizm İşletmeciliği",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Turizm İşletmeciliği lisans mezunu olup; bu alanda yüksek lisans ve doktorasını tamamlamış olmak. Yavaş yemek hareketi ve yavaş seyahat hareketi konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 278,
                "kod": "2026/126",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Veteriner Fakültesi",
                "alan": "Veteriner Viroloji",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Veteriner Fakültesi mezunu olmak. Veteriner Viroloji alanında doktora yapmış olmak. Balık viral hastalıkları konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 279,
                "kod": "2026/127",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Vezirköprü Meslek Yüksekokulu",
                "alan": "Çocuk Gelişimi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Bağımlılık ve Bağımlılıkla Mücadele alanında doktora yapmış olmak. Madde bağımlılığı, çocuk ve ergenlerde teknoloji bağımlılığı konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 280,
                "kod": "2026/128",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Yeşilyurt Demir Çelik Meslek Yüksekokulu",
                "alan": "Hibrid ve Elektrikli Taşıtlar Teknolojisi",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Makine mühendisliği alanında doktora yapmış olmak. Katı cisimler mekaniği, peridinamik teorisi ve ulaştırma sistemlerinde mekanik analiz ve uygulamalar konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 281,
                "kod": "2026/129",
                "unvan": "docent",
                "birim": "Ziraat Fakültesi",
                "alan": "Robotik ve Otonom Sistemleri",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Biyosistem Mühendisliği alanında Doçent ünvanı almış olmak. Tarım robotları veya tarımsal otomasyon/robotik sistemler konusunda yayını olmak."
                    }
                ]
            },
            {
                "id": 282,
                "kod": "2026/130",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Ziraat Fakültesi",
                "alan": "Toprak",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Toprak Bilimi ve Bitki Besleme alanında doktora yapmış olmak. Toprakta abiyotik stres faktörleri, ağır metaller, katyonların tutulmasında matematiksel modeller konularında yayını olmak."
                    }
                ]
            },
            {
                "id": 283,
                "kod": "2026/131",
                "unvan": "dr-ogretim-uyesi",
                "birim": "Ziraat Fakültesi",
                "alan": "Tarımsal Yapılar ve Sulama",
                "adet": 1,
                "sartlar": [
                    {
                        "tur": "akademik",
                        "metin": "Tarımsal Yapılar ve Sulama alanında doktora yapmış olmak. Su basması ve tuzluluk streslerinin bitki gelişimi konularında yayını olmak."
                    }
                ]
            }
        ],
        "yayinTarihi": null,
        "resmiGazete": null
    }
];
