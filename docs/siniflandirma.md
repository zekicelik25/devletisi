# İlan sınıflandırması

Bu belge sitedeki ilanların hangi boyutlara ayrıldığını ve neden böyle ayrıldığını anlatır. Sözlüğün kendisi `siniflandirma.js` dosyasındadır; aşağıdaki tablolar o dosyadan üretildi. Sitenin nasıl kullandığı 6. bölümde.

## Özet

- En küçük birim **pozisyon**dur. Bir ilan birden çok pozisyon içerebilir; her pozisyonun kendi ünvanı, statüsü, kadro sayısı ve ili vardır.
- Pozisyonlar beş boyutta sınıflandırılır: **kurum türü**, **istihdam statüsü**, **ünvan**, **eğitim düzeyi** ve **alım yöntemi**. İlanın kaynağı da ayrıca tutulur.
- Kapsam: 8 grupta 26 kurum türü, 6 grupta 19 istihdam statüsü, 13 meslek grubunda 71 ünvan.

## Veri modeli: kurum → ilan → pozisyon

```
Kurum     Karamanoğlu Mehmetbey Üniversitesi   tür: Devlet üniversitesi · il: 70
└─ İlan   Öğretim elemanı alım ilanı           kaynak, yayın ve son başvuru tarihi, bağlantı
   ├─ Pozisyon   Öğretim Görevlisi · İlk ve Acil Yardım   statü: Akademik kadro · adet
   ├─ Pozisyon   Öğretim Görevlisi · Optisyenlik
   └─ …
```

Tarih, kaynak ve bağlantı gibi ilan bilgileri bir kez yazılır. Filtreler ve ilan alarmı pozisyon düzeyinde çalışır; böylece "Karaman'da sözleşmeli büro personeli" gibi dar aramalar yapılabilir. Pozisyonun ili kurumun ilinden farklı olabilir; bakanlıkların il il kadro açtığı ilanlar bu şekilde gösterilir.

## 1. Kurum türleri

İki seviyelidir: önce grup (ör. Mahalli idareler), sonra tür (ör. Büyükşehir belediyesi). Sitede filtre önce grubu, istenirse türü seçtirir.

- "Kamu şirketleri" üç türe ayrıldı: **KİT** (personeli 399 sayılı KHK'ya tabi), **kamu bankası** ve **diğer kamu şirketi**. Belediye şirketleri, belediyelerle birlikte aranabilsin diye mahalli idareler grubunda.
- **Hastane** bir kurum türü değildir. Devlet hastaneleri Sağlık Bakanlığına, üniversite hastaneleri üniversitelere aittir. Hastane ilanlarını bulmak için ünvanın meslek grubu (Sağlık) kullanılır.
- **Vakıf üniversiteleri** kamu kurumu olmadığı için kapsam dışında bırakıldı.
- Sosyal Yardımlaşma ve Dayanışma Vakıflarının (SYDV) ilanları valilik ve kaymakamlık türünde toplanır, çünkü bu ilanlar o adla yayımlanır.

| Grup | Tür | Örnekler | Not |
|---|---|---|---|
| Merkezi yönetim | **Cumhurbaşkanlığı ve bağlı kurumlar** | Cumhurbaşkanlığı İdari İşler Başkanlığı, Diyanet İşleri Başkanlığı, Savunma Sanayii Başkanlığı, İletişim Başkanlığı |  |
| Merkezi yönetim | **Bakanlık** | Adalet Bakanlığı, Milli Eğitim Bakanlığı, Sağlık Bakanlığı, Tarım ve Orman Bakanlığı | Merkez ve taşra teşkilatı birlikte: il ve ilçe müdürlükleri, devlet hastaneleri, okullar, adliyeler. Milli Savunma Bakanlığının askerî alımları "TSK ve MSB" türündedir. |
| Merkezi yönetim | **Bakanlıklara bağlı ve ilgili kuruluşlar** | Karayolları Genel Müdürlüğü, Devlet Su İşleri Genel Müdürlüğü, Orman Genel Müdürlüğü, Tapu ve Kadastro Genel Müdürlüğü, AFAD, TÜİK | Genel müdürlükler ve başkanlıklar. |
| Merkezi yönetim | **Valilik ve kaymakamlık** | Valilikler, Kaymakamlıklar, SYDV | Sosyal Yardımlaşma ve Dayanışma Vakıflarının (SYDV) ilanları da bu türde toplanır. |
| Yasama ve yargı | **TBMM ve yüksek yargı organları** | TBMM, Anayasa Mahkemesi, Yargıtay, Danıştay, Sayıştay, Hâkimler ve Savcılar Kurulu |  |
| Güvenlik ve savunma | **Emniyet Genel Müdürlüğü** | Polis Akademisi, İl emniyet müdürlükleri |  |
| Güvenlik ve savunma | **Jandarma ve Sahil Güvenlik** | Jandarma Genel Komutanlığı, Sahil Güvenlik Komutanlığı |  |
| Güvenlik ve savunma | **TSK ve Milli Savunma Bakanlığı** | Kara Kuvvetleri Komutanlığı, Deniz Kuvvetleri Komutanlığı, Hava Kuvvetleri Komutanlığı, Milli Savunma Bakanlığı |  |
| Güvenlik ve savunma | **Millî İstihbarat Teşkilatı** | MİT |  |
| Yükseköğretim | **Devlet üniversitesi** | Karamanoğlu Mehmetbey Üniversitesi, Malatya Turgut Özal Üniversitesi | Üniversite hastaneleri dahil. Vakıf üniversiteleri kamu kurumu olmadığı için kapsam dışıdır. |
| Yükseköğretim | **YÖK ve ÖSYM** | Yükseköğretim Kurulu, ÖSYM |  |
| Mahalli idareler | **Büyükşehir belediyesi** | Mersin Büyükşehir Belediyesi | 30 büyükşehir belediyesi. |
| Mahalli idareler | **İl belediyesi** | Karaman Belediyesi | Büyükşehir olmayan illerin merkez belediyeleri. |
| Mahalli idareler | **İlçe ve belde belediyesi** | Çankaya Belediyesi |  |
| Mahalli idareler | **İl özel idaresi** | Karaman İl Özel İdaresi | Yalnızca büyükşehir olmayan illerde bulunur. |
| Mahalli idareler | **Belediyeye bağlı kuruluş** | İSKİ, ASKİ, EGO, İETT | Su, ulaşım gibi hizmetleri yürüten genel müdürlükler. |
| Mahalli idareler | **Belediye şirketi** | İSPARK, Metro İstanbul | Belediye sermayeli anonim şirketler; personel genellikle işçi statüsündedir. |
| Mahalli idareler | **Mahalli idare birliği** | Köylere hizmet götürme birlikleri |  |
| KİT ve kamu şirketleri | **Kamu iktisadi teşebbüsü (KİT)** | TCDD, DHMİ, TMO, EÜAŞ, TEİAŞ, TKİ, Türkiye Taşkömürü Kurumu | 233 sayılı KHK'ya tabi teşebbüsler. Personeli 399 sayılı KHK'ya tabidir. |
| KİT ve kamu şirketleri | **Kamu bankası** | T.C. Ziraat Bankası, Halkbank, VakıfBank, Türk Eximbank, İLBANK |  |
| KİT ve kamu şirketleri | **Diğer kamu şirketi** | Türksat A.Ş., PTT A.Ş. | Kamu sermayeli anonim şirketler, Türkiye Varlık Fonu şirketleri dahil. |
| Düzenleyici, sosyal güvenlik ve özel statülü kurumlar | **Düzenleyici ve denetleyici kurum** | BDDK, SPK, EPDK, RTÜK, BTK, Rekabet Kurumu, Kamu İhale Kurumu, KVKK | 5018 sayılı Kanun'un (III) sayılı cetvelindeki bağımsız kurumlar. |
| Düzenleyici, sosyal güvenlik ve özel statülü kurumlar | **Sosyal güvenlik kurumu** | SGK, İŞKUR | 5018 sayılı Kanun'un (IV) sayılı cetveli. |
| Düzenleyici, sosyal güvenlik ve özel statülü kurumlar | **Kalkınma ajansı** | İzmir Kalkınma Ajansı, Mevlana Kalkınma Ajansı | 5449 sayılı Kanun ile kurulan bölgesel ajanslar. |
| Düzenleyici, sosyal güvenlik ve özel statülü kurumlar | **Özel kanunla kurulan kurum** | TÜBİTAK, TRT, Türk Standardları Enstitüsü |  |
| Diğer | **Diğer kamu kurumu** |  |  |

## 2. İstihdam statüsü

Her statünün yasal dayanağı yazılıdır; aynı ünvan farklı statülerle ilana çıkabildiği için (ör. kadrolu veya sözleşmeli hemşire) statü ünvandan ayrı tutulur.

- **"Kadrolu 399"** ayrı bir statüdür: KİT'lerdeki memur kadroları 657'ye değil 399 sayılı KHK'ya tabidir. KİT'lerin sözleşmeli personeli de ayrıca yer alır.
- **Akademik personel ayrı bir gruptur.** Öğretim elemanları 657'ye değil 2547 sayılı Yükseköğretim Kanunu'na tabidir ve üniversite ilanlarının büyük kısmını oluşturur. Grup içinde 50/d araştırma görevliliği ayrıca gösterilir; kadrolu sanılır ama lisansüstü eğitim bitince sona erer.

| Grup | Statü | Dayanak | Açıklama |
|---|---|---|---|
| Kadrolu memur | **Kadrolu memur (657/4-A)** | 657 sayılı Devlet Memurları Kanunu, md. 4/A | Kalıcı memur kadrosu: bakanlıklar, belediyeler, üniversitelerin idari kadroları. |
| Kadrolu memur | **KİT kadrolu personeli (399)** | 399 sayılı KHK | KİT'lerde memur statüsündeki kadrolar ("kadrolu 399"). |
| Kadrolu memur | **Özel kanuna tabi kadrolu personel** | Kurumun kendi kanunu (ör. 2802 sayılı Hâkimler ve Savcılar Kanunu) | Hâkim ve savcı adayları, bağımsız kurumların meslek personeli gibi kendi kanunu olan kadrolar. |
| Sözleşmeli personel | **Sözleşmeli personel (657/4-B)** | 657 sayılı Kanun, md. 4/B | Sözleşmeyle çalışılır, genellikle KPSS puanıyla alınır. Sağlık ve büro personeli alımlarında yaygın. |
| Sözleşmeli personel | **KİT sözleşmeli personeli (399)** | 399 sayılı KHK | KİT'lerde sözleşmeyle çalışan personel. |
| Sözleşmeli personel | **Sözleşmeli bilişim personeli** | 375 sayılı KHK, ek madde 6 | Kamu kurumlarının bilgi işlem birimleri için yapılan alımlar. |
| Sözleşmeli personel | **Belediye sözleşmeli personeli** | 5393 sayılı Belediye Kanunu, md. 49 | Belediyelerin tam veya kısmi zamanlı sözleşmeyle çalıştırdığı avukat, mühendis, mimar, tabip gibi personel. |
| Sözleşmeli personel | **Kurum kanununa tabi sözleşmeli personel** | Kurumun kendi kanunu | Kendi kuruluş kanununa göre sözleşmeyle personel çalıştıran kurumlar. |
| Akademik personel | **Akademik kadro** | 2547 sayılı Yükseköğretim Kanunu, md. 23, 24, 26, 31, 33/a | Öğretim üyesi (profesör, doçent, doktor öğretim üyesi), öğretim görevlisi ve araştırma görevlisi kadroları. |
| Akademik personel | **Araştırma görevlisi (50/d)** | 2547 sayılı Kanun, md. 50/d | Lisansüstü eğitim süresince verilen kadro; eğitim bitince görev sona erer. |
| Akademik personel | **Yabancı uyruklu sözleşmeli öğretim elemanı** | 2547 sayılı Kanun, md. 34 |  |
| İşçi | **Sürekli (kadrolu) işçi** | 4857 sayılı İş Kanunu | Süresiz iş sözleşmesi. Kamuda alımlar çoğunlukla İŞKUR üzerinden, kura veya sözlü sınavla yapılır. |
| İşçi | **Geçici (mevsimlik) işçi** | 4857 sayılı İş Kanunu | Belirli süreli iş sözleşmesi; orman yangını, tarım gibi mevsimlik işler. |
| Askerî ve kolluk personeli | **Subay / astsubay** | 926 sayılı Türk Silahlı Kuvvetleri Personel Kanunu | Muvazzaf veya sözleşmeli subay ve astsubaylar. |
| Askerî ve kolluk personeli | **Uzman erbaş** | 3269 sayılı Uzman Erbaş Kanunu |  |
| Askerî ve kolluk personeli | **Sözleşmeli er** |  |  |
| Askerî ve kolluk personeli | **Polis ve bekçi** | 3201 sayılı Emniyet Teşkilatı Kanunu; 7245 sayılı Çarşı ve Mahalle Bekçileri Kanunu | Emniyet Genel Müdürlüğüne bağlı kadrolu kolluk personeli. |
| Diğer | **Geçici personel (657/4-C)** | 657 sayılı Kanun, md. 4/C | Yeni alım ilanı nadiren çıkar. |
| Diğer | **İŞKUR işgücü programı (TYP vb.)** |  | Toplum Yararına Program gibi süreli programlar; kalıcı istihdam değildir. |

## 3. Ünvanlar

Her ünvanın tek bir standart adı vardır; ilanlarda geçen diğer yazılışlar (parantez içinde) arama ve alarm eşleştirmesinde aynı ünvan sayılır. Dal veya branş ünvana değil, pozisyonun **alan** bilgisine yazılır: "Mühendis · İnşaat", "Öğretim Görevlisi · Optisyenlik". Liste, yeni ilanlarda yeni ünvanlar çıktıkça genişletilir.

| Meslek grubu | Ünvanlar |
|---|---|
| **Büro ve idari hizmetler** | Memur, Büro Personeli, Veri Hazırlama ve Kontrol İşletmeni (VHKİ), Şef, Sekreter, Tahsildar |
| **Uzman ve denetim meslek personeli** | Uzman Yardımcısı, Müfettiş Yardımcısı, Denetçi Yardımcısı, Kontrolör Yardımcısı, Kaymakam Adayı, Uzman |
| **Teknik ve bilişim** | Mühendis, Mimar, Şehir Plancısı, Peyzaj Mimarı, Tekniker, Teknisyen, Bilişim Personeli (Yazılım Geliştirici, Sistem Uzmanı, Ağ Uzmanı), Programcı, İstatistikçi, Kimyager |
| **Sağlık** | Tabip (Hekim, Doktor, Pratisyen Hekim), Uzman Tabip (Uzman Hekim, Uzman Doktor), Diş Tabibi (Diş Hekimi), Eczacı, Hemşire, Ebe, Sağlık Teknikeri, Sağlık Teknisyeni, Fizyoterapist, Diyetisyen, Biyolog, Veteriner Hekim (Veteriner) |
| **Sosyal hizmet ve psikoloji** | Sosyal Çalışmacı, Psikolog, Çocuk Gelişimci, Sosyolog |
| **Eğitim** | Öğretmen, Usta Öğretici |
| **Akademik** | Profesör (Prof. Dr.), Doçent (Doç. Dr.), Doktor Öğretim Üyesi (Dr. Öğr. Üyesi, Yardımcı Doçent, Yrd. Doç.), Öğretim Görevlisi (Öğr. Gör.), Araştırma Görevlisi (Arş. Gör.) |
| **Hukuk ve adalet** | Avukat, Hâkim ve Savcı Adayı (Hakim Adayı, Savcı Adayı), Zabıt Kâtibi (Zabıt Katibi), İcra Kâtibi (İcra Katibi), Mübaşir |
| **Güvenlik, kolluk ve acil durum** | Polis Memuru (Polis), Çarşı ve Mahalle Bekçisi (Bekçi), İnfaz ve Koruma Memuru (Gardiyan), Koruma ve Güvenlik Görevlisi (Güvenlik Görevlisi), İtfaiye Eri (İtfaiyeci), Zabıta Memuru (Zabıta), Gümrük Muhafaza Memuru |
| **Askerî** | Subay, Astsubay, Uzman Erbaş (Uzman Çavuş), Sözleşmeli Er |
| **Din hizmetleri** | İmam-Hatip, Müezzin-Kayyım, Kur'an Kursu Öğreticisi, Vaiz |
| **Destek hizmetleri** | Temizlik Personeli (Temizlik Görevlisi), Hizmetli, Şoför (Sürücü), Aşçı, Bahçıvan, Destek Personeli |

## 4. Ek boyutlar

**Eğitim düzeyi.** KPSS puan türü, o düzeydeki KPSS (B) grubu alımlarında genellikle kullanılan türdür; kesin bilgi her ilanın kendi metnindedir.

| Eğitim düzeyi | Genellikle kullanılan KPSS puan türü |
|---|---|
| İlköğretim | — |
| Ortaöğretim (lise) | KPSSP94 |
| Önlisans | KPSSP93 |
| Lisans | KPSSP3 |
| Yüksek lisans | — |
| Doktora | — |

**Alım yöntemi.** "KPSS'siz alım" gibi sık yapılan aramalar bu boyutla yanıtlanır.

| Alım yöntemi | Açıklama |
|---|---|
| KPSS ile merkezi yerleştirme | ÖSYM tercih kılavuzuyla yapılan yerleştirme. |
| KPSS puanıyla kurum alımı | Kurum, KPSS puan sırasına göre kendisi alır; sözlü sınav da olabilir. |
| Kurum sınavı | Yazılı ve/veya sözlü giriş sınavı: uzman, müfettiş, denetçi yardımcılığı gibi. |
| Sözlü sınav veya mülakat | KPSS şartı aranmayan alımlar. |
| Noter kurası | İŞKUR üzerinden yapılan işçi alımlarında başvuranlar arasından kura. |
| Akademik değerlendirme | Öğretim görevlisi ve araştırma görevlisinde ALES, yabancı dil puanı ve giriş sınavı; öğretim üyesinde bilimsel değerlendirme. |
| Diğer |  |

**İlan kaynağı:** Kariyer Kapısı, Resmî Gazete, İŞKUR, ÖSYM tercih kılavuzu, kurumun resmi sitesi.

## 5. Sitedeki ilanların sınıflandırılması

| Kurum | Kurum türü | Ünvan (meslek grubu) | Alan | Statü | Not |
|---|---|---|---|---|---|
| Malatya Turgut Özal Üniversitesi | Devlet üniversitesi | Büro Personeli (Büro ve idari) | — | Sözleşmeli personel (657/4-B) | "Büro personeli" bir sözleşmeli personel ünvanıdır; ilan metninden doğrulanmalı. Eski sitedeki iki ayrı satır, şimdilik tek ilanın iki pozisyonu olarak girildi. |
| Mersin Büyükşehir Belediyesi | Büyükşehir belediyesi | İtfaiye Eri (Güvenlik) | — | Kadrolu memur (657/4-A) | İtfaiye eri memur kadrosudur; ilan metninden doğrulanmalı. |
| Karamanoğlu Mehmetbey Üniversitesi | Devlet üniversitesi | Öğretim Görevlisi (Akademik) | İlk ve Acil Yardım, Optisyenlik, Tıbbi Görüntüleme, Elektrik, Bilgi İşlem | Akademik kadro (2547) | Tek ilanın beş pozisyonu olarak modellenir. |

Statüler ünvandan çıkarıldı; resmi ilan metinleri elimizde olmadığı için kesinleşmiş sayılmamalı. Kadro sayısı, eğitim düzeyi, alım yöntemi ve tarihler de ilan metinlerinden doldurulacak.

## 6. Sitede nasıl kullanılıyor

- `data.js` kurum → ilan → pozisyon modelinde. Eski pozisyon numaraları (1–8) korundu; kurulmuş ilan alarmları bozulmadı.
- İlanlar sayfasında kurum türü, çalışma statüsü, meslek grubu ve eğitim düzeyi filtreleri var. Seçeneklerde yalnız sitede karşılığı olan değerler görünür; eğitim düzeyi filtresi, ilanlara bu bilgi girilince kendiliğinden açılır.
- Kurumlar sayfası kurum türlerine, Ünvanlar sayfası meslek gruplarına göre gruplanmış durumda.
- Ana sayfada statüye, kurum türüne ve meslek grubuna göre göz atma listeleri var; her satır ilanlar sayfasını o filtreyle açar.
- İlan alarmı formunda il, kurum türü, çalışma statüsü, meslek grubu ve anahtar kelime seçilir. Tarayıcılarda kayıtlı eski alarmlar yeni türlere aktarılır: Üniversite → Devlet üniversitesi; Belediye → üç belediye türü; Bakanlık → Bakanlık; Hastane → Sağlık meslek grubu.

## 7. Açık sorular

1. **Site adı:** Repoda "Kamu İlan Platformu", claude.ai sohbetinde "KamuKariyerim" geçiyor. Hangisi kullanılacak?
2. **Vakıf üniversiteleri** kapsam dışı kalsın mı? Akademik ilan arayanlar için eklenebilir, ama site "kamu ilanları" olarak tanımlı.
3. **Malatya Turgut Özal Üniversitesi'nin iki "Büro Personeli" pozisyonu** aynı ilanın iki kadrosu mu, iki ayrı ilan mı? Şimdilik tek ilan olarak girildi.
4. Mevcut ilanların resmi ilan bağlantıları varsa statüleri ve eksik bilgileri onlardan doğrulayalım.
