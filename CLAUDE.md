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
- İller yalnız ince konturla çizilir, pozisyon sayısına göre gri tonda (1 / 2–4 / 5–9 / 10+); üzerine gelinen il kırmızı.

### İlanlar sayfası
- Filtreler: il, kurum türü, çalışma statüsü, meslek grubu, eğitim düzeyi ve arama. Seçeneklerde yalnız sitede karşılığı olan değerler, sayılarıyla görünür; hiç verisi olmayan filtre (şu an eğitim düzeyi) gizlenir.
- Kurum türü ve statüde bir grubun tamamı ("tümü", değer `grup:<id>`) veya tek öğe seçilebilir.
- Bağlantıyla filtre: `ilanlar.html#70` (il), `#tur-…`, `#statu-…`, `#statu-grup-…`, `#meslek-…`, `#egitim-…`, `#kurum-…`, `#unvan-…`.
- Arama ve alarm eşleştirmesi Türkçe karakter farkını yok sayar ve ünvanların eş yazılışlarını da tarar ("Öğr. Gör.", "itfaiyeci").

### İlan alarmı
- Alarmlar kullanıcının tarayıcısında (localStorage, `kamuilan.alarmlar.v2`) saklanır. Kriterler: il, kurum türü, statü, meslek grubu, anahtar kelime.
- İlk sürümün alarmları (`kamuilan.alarmlar.v1`) açılışta aktarılır: Üniversite → Devlet üniversitesi, Belediye → üç belediye türü, Bakanlık → Bakanlık, Hastane → Sağlık meslek grubu.
- Uyan yeni pozisyon, siteye girişte menüdeki sayaç ve sayfa üstü uyarıyla, izin varsa site açıkken tarayıcı bildirimiyle haber verilir. E-posta veya telefon bildirimi için sunucu gerekir; henüz yok.

### Tasarım: "gov-tech" (uygulandı)
Resmi ama çağdaş, devlet sitelerinin modern hâli:
- Renk: zemin kireç beyazı `#FAFAF8`, metin antrasit `#1A1D1F`. Tek vurgu rengi kırmızı `#D7263D`, yalnız aksiyonlarda (düğme, bağlantı, üzerine gelinen il). Zeytin yeşili `#3D5A3D` yalnız "yeni" durumlarında (alarm sayacı, uyarı, Yeni etiketi).
- Tipografi: Public Sans; başlıklarda sıkı harf aralığı. Etiketler küçük, büyük harf ve harf aralıklı. Sayılar ve plaka kodları IBM Plex Mono.
- Yapı: gölge yok, 1px ince çizgiler, 4–6px köşe; sayfa üstünde 4px koyu şerit, bölümler arasında ince ayırıcı çizgiler.
- Düğmeler: dolgu yerine kırmızı çerçeve ve küçük, büyük harfli yazı.

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
