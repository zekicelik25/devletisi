# Kamu İlan Platformu (devletisi)

Kamu kurumlarının personel alım ilanlarını Türkiye haritası üzerinden il il gösteren statik site. Sunucu, veritabanı ve derleme adımı yok; sayfalar tarayıcıda doğrudan açılır.

Kullanıcı Türkçe yazıyor; yanıtlar Türkçe, kısa ve teknik olmayan bir dille.

## Dosyalar

- `index.html`, `ilanlar.html`, `kurumlar.html`, `unvanlar.html`, `alarm.html`: sayfalar. Üst menü ve alt bilgi her sayfada tekrarlanır; değiştirirken beşini birlikte güncelle.
- `style.css`: tüm stiller. Renkler `:root` token'larında; açık ve koyu tema desteklenir.
- `data.js`: ilanlar, sitenin tek veri kaynağı. Yeni ilan listenin sonuna, bir sonraki `id` ile eklenir. Silinen ilanın `id`'si tekrar kullanılmaz, çünkü ilan alarmı yeni ilanı `id`'den tanır.
- `iller.js`: 81 il (plaka kodu ve ad).
- `app.js`: tüm sayfaların davranışı; sayfa `<body data-page="...">` ile seçilir.
- `siniflandirma.js`: kurum türü, istihdam statüsü, ünvan, eğitim düzeyi, alım yöntemi sözlüğü. Henüz sayfalara bağlı değil.
- `docs/siniflandirma.md`: sınıflandırmanın gerekçeli açıklaması ve açık sorular.
- `turkey.svg`: harita kaynağı. `index.html` içine gömülü harita bundan üretildi; il kimlikleri `TR-xx`, `xx` plaka kodudur.

## Kararlar

### Harita
- Gerçek il sınırlarıyla SVG harita, dış bağımlılık yok. Leaflet (tile sunucusu) veya D3 kullanılmaz; önizleme ortamı dış istekleri engelliyor.
- claude.ai sohbetindeki Leaflet ve D3 haritalı JSX/HTML denemeleri bu repoya alınmadı; esas olan bu repo.

### İlan alarmı
- Alarmlar kullanıcının tarayıcısında (localStorage) saklanır. Uyan yeni ilan, siteye girişte menüdeki sayaç ve sayfa üstü uyarıyla, izin varsa site açıkken tarayıcı bildirimiyle haber verilir.
- E-posta veya telefon bildirimi için sunucu gerekir; henüz yok.

### Tasarım yönü: "gov-tech"
claude.ai sohbetinde onaylandı ("bence fena değil, buradan devam edelim"); bu siteye **henüz uygulanmadı**. Resmi ama çağdaş, devlet sitelerinin modern hâli:
- Renk: zemin kireç beyazı `#FAFAF8`, metin antrasit `#1A1D1F`. Tek vurgu rengi kırmızı `#D7263D`, yalnız aksiyonlarda. Zeytin yeşili `#3D5A3D` yalnız "açık / aktif / yeni" durumlarında.
- Tipografi: keskin, geometrik sans; başlıklarda sıkı harf aralığı. Etiketler büyük harf ve harf aralıklı, istatistik rakamları monospace. "Her şey büyük harf ve kalın" yerine net hiyerarşi.
- Yapı: gölge yerine 1px ince çizgiler, 4–6px köşe yuvarlaklığı, bölümler arasında ince ayırıcı çizgiler.
- Harita: iller yalnız ince kontur; ilan sayısına göre hafif gri ton; seçili il kırmızı.
- Düğmeler: dolgu yerine outline ve küçük, büyük harfli yazı.

### Sınıflandırma (ayrıntı: `docs/siniflandirma.md`)
- En küçük birim pozisyondur: Kurum → İlan → Pozisyon.
- Boyutlar: kurum türü (8 grup, 26 tür), istihdam statüsü (6 grup, 19 statü, yasal dayanaklarıyla), ünvan (13 meslek grubu, 71 ünvan, eş yazılışlarıyla), eğitim düzeyi, alım yöntemi, ilan kaynağı.
- Akademik personel ayrı statü grubudur (2547 sayılı Kanun). "Kadrolu 399" ayrı statüdür.
- "Hastane" kurum türü değildir; hastane ilanları Sağlık meslek grubuyla bulunur.
- Vakıf üniversiteleri kapsam dışı (kullanıcı onayı bekliyor).
- Dal veya branş ünvana değil, pozisyonun `alan` bilgisine yazılır.

## Bekleyen işler

- **Site güncellemesi, kullanıcı isteyince yapılacak:** `data.js`'i yeni modele taşı, ilanlar sayfasına filtreleri ekle, kurumlar ve ünvanlar sayfalarını gruplara ayır, alarm formunu sözlüğe bağla (kayıtlı alarmları aktar), gov-tech tasarımını uygula.
- Mevcut 8 ilanın statüleri ünvandan çıkarıldı; resmi ilan metinlerinden doğrulanmalı.
- Açık sorular `docs/siniflandirma.md` sonunda: site adı ("Kamu İlan Platformu" mu "KamuKariyerim" mi), vakıf üniversiteleri, Malatya Turgut Özal Üniversitesi'nin iki "Büro Personeli" satırı.
