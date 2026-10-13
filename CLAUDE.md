# Kamu İlan Platformu (devletisi)

Kamu kurumlarının personel alım ilanlarını Türkiye haritası üzerinden il il gösteren statik site. Sunucu, veritabanı ve derleme adımı yok; sayfalar tarayıcıda doğrudan açılır.

Kullanıcı Türkçe yazıyor; yanıtlar Türkçe, kısa ve teknik olmayan bir dille.

## Dosyalar

- `index.html`, `ilanlar.html`, `kurumlar.html`, `unvanlar.html`, `alarm.html`: sayfalar. Üst menü ve alt bilgi her sayfada tekrarlanır; değiştirirken beşini birlikte güncelle. Her sayfa sırasıyla `data.js`, `siniflandirma.js`, `iller.js`, `app.js` yükler.
- `style.css`: tüm stiller. Renkler `:root` token'larında; açık ve koyu tema desteklenir.
- `data.js`: sitenin tek veri kaynağı. `KURUMLAR` (id, ad, tur, il) ve `ILANLAR` (kurum, tarihler, kaynak, link, `pozisyonlar`). Yeni ilan listenin sonuna eklenir; her pozisyon bir sonraki `id` numarasını alır. Pozisyon numaraları tekrar kullanılmaz, çünkü ilan alarmı yeni pozisyonu `id`'den tanır.
- `siniflandirma.js`: kurum türü, istihdam statüsü, ünvan, eğitim düzeyi, alım yöntemi ve kaynak sözlüğü. `data.js` buradaki kimliklere başvurur; kimlik değiştirmek kayıtlı alarmları da etkiler.
- `iller.js`: 81 il (plaka kodu ve ad).
- `app.js`: tüm sayfaların davranışı; sayfa `<body data-page="...">` ile seçilir. Veriyi düz bir pozisyon listesine çevirir; bilinmeyen kimlikleri tarayıcı konsolunda `data.js:` ile başlayan uyarıyla bildirir.
- `docs/siniflandirma.md`: sınıflandırmanın gerekçeli açıklaması ve açık sorular.
- `turkey.svg`: harita kaynağı. `index.html` içine gömülü harita bundan üretildi; il kimlikleri `TR-xx`, `xx` plaka kodudur.

## Kararlar

### Harita
- Gerçek il sınırlarıyla SVG harita, dış bağımlılık yok. Leaflet (tile sunucusu) veya D3 kullanılmaz; önizleme ortamı dış istekleri engelliyor.
- claude.ai sohbetindeki Leaflet ve D3 haritalı JSX/HTML denemeleri bu repoya alınmadı; esas olan bu repo.

### İlanlar sayfası
- Arama: "Ne" (ünvan, kurum, alan) ve "Nerede" (il adı veya plaka; listeden seçilince hemen uygulanır). Ana sayfadaki arama ilanlar sayfasına `sessionStorage` (`kamuilan.arama`) ile taşınır.
- Filtreler: kurum türü, çalışma statüsü, meslek grubu, eğitim düzeyi. Seçeneklerde yalnız sitede karşılığı olan değerler, sayılarıyla görünür; hiç verisi olmayan filtre (şu an eğitim düzeyi) gizlenir.
- Kurum türü ve statüde bir grubun tamamı ("tümü", değer `grup:<id>`) veya tek öğe seçilebilir.
- Bağlantıyla filtre: `ilanlar.html#70` (il), `#tur-…`, `#statu-…`, `#statu-grup-…`, `#meslek-…`, `#egitim-…`, `#kurum-…`, `#unvan-…`, `#poz-…` (pozisyonu ayrıntısıyla açar).
- Arama ve alarm eşleştirmesi Türkçe karakter farkını yok sayar ve ünvanların eş yazılışlarını da tarar ("Öğr. Gör.", "itfaiyeci").

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
- Boyutlar: kurum türü (8 grup, 26 tür), istihdam statüsü (6 grup, 19 statü, yasal dayanaklarıyla), ünvan (13 meslek grubu, 71 ünvan, eş yazılışlarıyla), eğitim düzeyi, alım yöntemi, ilan kaynağı.
- Akademik personel ayrı statü grubudur (2547 sayılı Kanun). "Kadrolu 399" ayrı statüdür.
- "Hastane" kurum türü değildir; hastane ilanları Sağlık meslek grubuyla bulunur.
- Vakıf üniversiteleri kapsam dışı (kullanıcı onayı bekliyor).
- Dal veya branş ünvana değil, pozisyonun `alan` bilgisine yazılır.

## Bekleyen işler

- Mevcut 8 pozisyonun statüleri ünvandan çıkarıldı; resmi ilan metinlerinden doğrulanmalı. Kadro sayısı, eğitim düzeyi, alım yöntemi, tarihler ve bağlantılar da boş.
- Açık sorular `docs/siniflandirma.md` sonunda: site adı ("Kamu İlan Platformu" mu "KamuKariyerim" mi), vakıf üniversiteleri, Malatya Turgut Özal Üniversitesi'nin iki "Büro Personeli" pozisyonu.
