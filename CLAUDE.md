# Kamu İlan Platformu (devletisi)

Kamu kurumlarının personel alım ilanlarını Türkiye haritası üzerinden il il gösteren statik site. Sunucu, veritabanı programı ve derleme adımı yok; sayfalar tarayıcıda doğrudan açılır. Veri, `veri/` klasöründe katmanlı bir veri tabanı olarak tutulur; kullanıcı için en önemli iş bu veri tabanının temelidir.

Kullanıcı Türkçe yazıyor; yanıtlar Türkçe, kısa ve teknik olmayan bir dille.

## Dosyalar

- `index.html`, `ilanlar.html`, `kurumlar.html`, `unvanlar.html`, `alarm.html`: sayfalar. Üst menü ve alt bilgi her sayfada tekrarlanır; değiştirirken beşini birlikte güncelle. Her sayfa sırasıyla `veri/1-sozluk-iller.js`, `veri/1-sozluk-siniflandirma.js`, `veri/2-kaliplar.js`, `veri/3-kurumlar.js`, `veri/4-ilanlar.js`, `app.js` yükler.
- `style.css`: tüm stiller. Renkler `:root` token'larında; açık ve koyu tema desteklenir.
- `veri/`: katmanlı veri tabanı (ayrıntı: `docs/veri-modeli.md`). Her katman yalnız alttakilere kimlikle başvurur.
  - `1-sozluk-iller.js` (81 il), `1-sozluk-siniflandirma.js` (kurum türü, statü, ünvan, eğitim, alım yöntemi, kaynak, sınav, şart türü, başvuru kanalı, kontenjan türü). Kimlik değiştirmek üst katmanları ve kayıtlı alarmları etkiler.
  - `2-kaliplar.js`: aynı türdeki ilanların ortak kuralları (öğretim üyesi, sözleşmeli bilişim, kalkınma ajansı, muvazzaf subay).
  - `3-kurumlar.js`: kurumlar (id, ad, tur, il).
  - `4-ilanlar.js`: ilanlar → pozisyonlar → şartlar. Yeni ilan sonuna eklenir; her pozisyon bir sonraki `id` numarasını alır. Pozisyon numaraları tekrar kullanılmaz (eski 1–8 dahil), çünkü ilan alarmı yeni pozisyonu `id`'den tanır.
  - Miras: kalıp → ilan (`varsayilan`, `ortakSartlar`) → pozisyon. Şartta `kosul` yalnız uyan pozisyona ekler; `yerineGecer: true` üstteki aynı türden şartları düşürür.
- `app.js`: tüm sayfaların davranışı; sayfa `<body data-page="...">` ile seçilir. Katmanları birleştirip düz bir pozisyon listesi, etiketler ve başvuru durumu üretir; bilinmeyen kimlikleri tarayıcı konsolunda `veri:` ile başlayan uyarıyla bildirir.
- `araclar/`: `dogrula.js` (bütünlük denetimi; veri değişince çalıştır), `disa-aktar.js` (`disari/` klasörüne CSV tablolar), `ortak.js` (birleştirme kuralları; `app.js` ile aynı tutulmalı).
- `disari/`: `disa-aktar.js` çıktısı; veri değişince yeniden üret.
- `docs/veri-modeli.md`: katmanlar, alanlar, şart modeli, yeni ilan ekleme.
- `docs/siniflandirma.md`: sınıflandırmanın gerekçeli açıklaması ve açık sorular.
- `docs/ilan-analizi.md`: kullanıcının yüklediği 17 gerçek ilanın (Ekim 2026) analizi; buradaki öneriler uygulandı.
- `turkey.svg`: harita kaynağı. `index.html` içine gömülü harita bundan üretildi; il kimlikleri `TR-xx`, `xx` plaka kodudur.

## Kararlar

### Harita
- Gerçek il sınırlarıyla SVG harita, dış bağımlılık yok. Leaflet (tile sunucusu) veya D3 kullanılmaz; önizleme ortamı dış istekleri engelliyor.
- claude.ai sohbetindeki Leaflet ve D3 haritalı JSX/HTML denemeleri bu repoya alınmadı; esas olan bu repo.

### İlanlar sayfası
- Arama: "Ne" (ünvan, kurum, alan, bölüm adları, teknik nitelikler) ve "Nerede" (il adı, plaka ya da "Yurt geneli"; listeden seçilince hemen uygulanır). Ana sayfadaki arama ilanlar sayfasına `sessionStorage` (`kamuilan.arama`) ile taşınır.
- Filtreler: kurum türü, çalışma statüsü, meslek grubu, eğitim düzeyi. Seçeneklerde yalnız sitede karşılığı olan değerler, sayılarıyla görünür; hiç verisi olmayan filtre gizlenir.
- Kurum türü ve statüde bir grubun tamamı ("tümü", değer `grup:<id>`) veya tek öğe seçilebilir.
- Bağlantıyla filtre: `ilanlar.html#70` (il), `#TR` (yurt geneli), `#tur-…`, `#statu-…`, `#statu-grup-…`, `#meslek-…`, `#egitim-…`, `#kurum-…`, `#unvan-…`, `#poz-…` (pozisyonu ayrıntısıyla açar).
- Arama ve alarm eşleştirmesi Türkçe karakter farkını yok sayar ve ünvanların eş yazılışlarını da tarar ("Öğr. Gör.", "itfaiyeci").
- Konum: pozisyon tek ilde, birden çok ilde (`iller`) ya da yurt genelinde (`"TR"`) olabilir. Yurt geneli pozisyonlar haritada bir ile düşmez; ana sayfadaki il listesinin başında ayrı görünür.
- Ayrıntı panelinde: pozisyon bilgileri, türlerine göre başvuru şartları, başvuru (tarih, yol, ücret, tek başvuru, belgeler), seçme ve değerlendirme, notlar. Kartlarda başvuru durumu (yakında / son günler / süresi doldu) ve türetilen etiketler.

### İlan alarmı
- Alarmlar kullanıcının tarayıcısında (localStorage, `kamuilan.alarmlar.v2`) saklanır. Kriterler: il, kurum türü, statü, meslek grubu, anahtar kelime.
- İlk sürümün alarmları (`kamuilan.alarmlar.v1`) açılışta aktarılır: Üniversite → Devlet üniversitesi, Belediye → üç belediye türü, Bakanlık → Bakanlık, Hastane → Sağlık meslek grubu.
- Uyan yeni pozisyon, siteye girişte menüdeki sayaç ve sayfa üstü uyarıyla, izin varsa site açıkken tarayıcı bildirimiyle haber verilir. E-posta veya telefon bildirimi için sunucu gerekir; henüz yok.

### Tasarım: iş ilanı sitesi düzeni (Indeed benzeri)
Kullanıcı Indeed'e benzer bir düzen istedi (önceki "gov-tech" yönünün yerini aldı). Indeed'in adı, logosu ve marka öğeleri kullanılmaz; site kendi adıyla kalır.
- Renk: beyaz zemin, sıcak gri çizgiler (`#E4E2E0`, `#D4D2D0`), metin `#2D2D2D`. Tek vurgu rengi mavi `#1F5BB5` (düğme, bağlantı, seçili kart, haritadaki iller). Yeşil `#1B7F4C` yalnız "yeni" durumlarında.
- Tipografi: Noto Sans; büyük harf etiket kullanılmaz, hiyerarşi kalınlıkla kurulur.
- Yapı: 8px köşeli kartlar, ince çerçeve, üzerine gelince hafif gölge; filtreler yuvarlak hap düğmeler.
- Ana sayfa: ortada "Ne / Nerede" arama çubuğu ve sık aranan kategoriler; harita, kategoriye göre göz atma, son eklenen pozisyon kartları, alarm çağrısı.
- İlanlar: üstte arama ve filtreler; geniş ekranda solda ilan kartları, sağda seçili pozisyonun ayrıntısı (yapışkan panel). Telefonda karta dokununca ayrıntı listenin yerine açılır, "Sonuçlara dön" ile geri gelinir.
- Harita: iller pozisyon sayısına göre açık maviden koyu maviye (1 / 2–4 / 5–9 / 10+).

### Sınıflandırma (ayrıntı: `docs/siniflandirma.md`)
- En küçük birim pozisyondur: Kurum → İlan → Pozisyon.
- Boyutlar: kurum türü (8 grup, 26 tür), istihdam statüsü (6 grup, 19 statü, yasal dayanaklarıyla), ünvan (13 meslek grubu, 80 ünvan, eş yazılışlarıyla), eğitim düzeyi, alım yöntemi, ilan kaynağı.
- Akademik personel ayrı statü grubudur (2547 sayılı Kanun). "Kadrolu 399" ayrı statüdür.
- "Hastane" kurum türü değildir; hastane ilanları Sağlık meslek grubuyla bulunur.
- Vakıf üniversiteleri kapsam dışı (kullanıcı onayı bekliyor).
- Dal veya branş ünvana değil, pozisyonun `alan` bilgisine yazılır. Kurumun kullandığı ad `ilandakiAd`, "Kıdemli" `kidem` alanındadır.
- Bilinmeyen bilgi uydurulmaz: yazılmaz ya da `null` bırakılır; hesaplanan tarih `bitisTahmini: true` ve notla işaretlenir.

## Bekleyen işler

- Sitede 17 gerçek ilan var (275 pozisyon satırı, 777 kadro; son pozisyon numarası `node araclar/dogrula.js` ile görülür). Eski 8 örnek pozisyon kaldırıldı.
- Doğrulanacaklar: Hacı Bayram Veli ve Sakarya Uygulamalı Bilimler'in son başvuru günü tahmini; Ahi Evran'ın Resmî Gazete tarihi yok; İTÜ ilanı görüntü olarak okundu (puanlar doğrulanmalı).
- Açık sorular `docs/siniflandirma.md` sonunda: site adı ("Kamu İlan Platformu" mu "KamuKariyerim" mi), vakıf üniversiteleri, TMSF'nin kurum türü.
- Sonraki adım adayları: "bana uygun ilanlar" (kullanıcının eğitim, puan, yaş bilgisini şartlarla karşılaştırma), süresi dolan ilanları gizleme, gerçek veri tabanına geçiş (`docs/veri-modeli.md` son bölüm).
