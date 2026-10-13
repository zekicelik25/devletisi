# Veri modeli: katmanlı ilan veri tabanı

Sitenin verisi `veri/` klasöründe, birbirinin üzerine oturan dört katmandır. Her katman yalnızca altındaki katmanlara kimlikle (id) başvurur. Böylece bir bilgi tek bir yerde yazılır: "657 sayılı Kanun'un 48. maddesi" yüzlerce pozisyona tek tek değil, bir kez kalıba yazılır.

```
1. Sözlük      veri/1-sozluk-iller.js, veri/1-sozluk-siniflandirma.js
               il, kurum türü, statü, ünvan, eğitim düzeyi, alım yöntemi, sınav, şart türü, başvuru kanalı, kontenjan türü
      ▲
2. Kalıplar    veri/2-kaliplar.js
               aynı türdeki ilanların ortak kuralları (öğretim üyesi, sözleşmeli bilişim, kalkınma ajansı, muvazzaf subay)
      ▲
3. Kurumlar    veri/3-kurumlar.js
               ilan veren kurumlar (tür, il)
      ▲
4. İlanlar     veri/4-ilanlar.js
               ilan → pozisyonlar → şartlar
      ▲
5. Türetilen   app.js (tarayıcıda) ve araclar/ortak.js (araçlarda)
               birleştirilmiş pozisyon, şart listesi, etiketler, başvuru durumu
```

Sayfalar bu dosyaları sırayla yükler. Sunucu ya da veri tabanı programı gerekmez; dosyalar ileride gerçek bir veri tabanına (ör. PostgreSQL) aynı tablolarla taşınabilir (bkz. son bölüm).

## Neden katmanlı?

- **Tekrar yok.** Üç bilişim ilanındaki ortak bölüm listesi, deneyim kuralı ve puan formülü kalıpta bir kez durur. Yeni bir bilişim ilanı girilirken yalnızca o ilana özgü bilgiler yazılır.
- **Tutarlılık.** Ünvan, statü, il gibi bilgiler serbest metin değil, sözlükteki kimliklerdir. "Öğr. Gör." ile "Öğretim Görevlisi" aynı kayda gider; filtreler ve alarmlar bu sayede çalışır.
- **Değişiklik kolaylığı.** Bir kanun maddesi değişirse kalıpta düzeltilir, bağlı bütün pozisyonlara yansır.
- **Denetlenebilirlik.** `node araclar/dogrula.js` her başvurunun karşılığını arar; yanlış yazılmış bir kimlik siteye çıkmadan yakalanır.

## 1. Sözlük

Değişmeyen listeler. Gerekçeleri `docs/siniflandirma.md`'de.

| Liste | Kimlik örnekleri | Kullanıldığı yer |
|---|---|---|
| `ILLER` | `"06"`, `"34"` | kurum ve pozisyon ili |
| `KURUM_TURLERI` (gruplu) | `devlet-universitesi`, `bagli-kurulus` | kurum `tur` |
| `STATULER` (gruplu) | `657-4a`, `375-bilisim`, `akademik-kadro` | pozisyon `statu` |
| `UNVANLAR` (meslek gruplu, eş yazılışlı) | `profesor`, `yazilim-gelistirme-uzmani`, `icra-muduru` | pozisyon `unvan` |
| `EGITIM_DUZEYLERI` | `ortaogretim`, `onlisans`, `lisans`, `doktora` | pozisyon `egitim`, eğitim şartı `duzey` |
| `ALIM_YONTEMLERI` | `kpss-kurum`, `kurum-sinavi`, `sozlu-sinav`, `askeri-secim` | pozisyon `yontem`, ilan `secme.yontem` |
| `KAYNAKLAR` | `kariyer-kapisi`, `resmi-gazete`, `osym` | ilan `kaynak` |
| `SINAVLAR` | `kpss`, `ales`, `yds` | sınav şartı `sinav` |
| `SART_TURLERI` | `egitim`, `sinav`, `yas`, `deneyim`, `belge`, `fiziksel`, `akademik`, `engel`, `tercih`, `teknik`, `diger` | şart `tur` |
| `BASVURU_KANALLARI` | `kariyer-kapisi`, `kurum-sistemi`, `sahsen`, `posta`, `e-posta` | ilan `basvuru.kanal` |
| `KONTENJAN_TURLERI` | `genel`, `sehit-gazi-yakini`, `engelli` | pozisyon `kontenjan` |

Bir kimliği değiştirmek, ona başvuran bütün katmanları ve kullanıcıların tarayıcısında kayıtlı ilan alarmlarını etkiler. Yeni kimlik eklemek serbesttir.

## 2. Kalıplar (`KALIPLAR`)

| Alan | Anlamı |
|---|---|
| `id`, `ad` | kimlik ve okunur ad |
| `dayanak` | yasal dayanak (kanun, yönetmelik maddesi) |
| `varsayilan` | pozisyonların boş bıraktığı alanlar için değer: `statu`, `yontem`, `egitim`, `unvan`, `il`… |
| `basvuru`, `secme` | ilanın aynı adlı alanlarına temel; ilanda yazılan değer kalıbınkini ezer |
| `sartlar` | bu kalıba bağlı her pozisyona eklenen şartlar |

Şu an dört kalıp var: `ogretim-uyesi` (5 ilan), `sozlesmeli-bilisim` (3), `kalkinma-ajansi-uzman` (2), `muvazzaf-subay` (2). Kalıba uymayan ilan (TMSF, Adalet, Vakıflar, Keşan, İTÜ) kalıpsız girilir; ortak bilgisini kendi `varsayilan` ve `ortakSartlar` alanlarına yazar. Aynı türden ikinci bir ilan geldiğinde bunlar kalıba taşınabilir.

## 3. Kurumlar (`KURUMLAR`)

| Alan | Anlamı |
|---|---|
| `id` | kısa kimlik: `tkgm`, `omu`, `kesan-bel` |
| `ad` | resmi ad |
| `tur` | sözlükteki kurum türü |
| `il` | merkezin plaka kodu |
| `bagli` | varsa üst kurum (ilan metnindeki biçimiyle) |
| `web` | yalnızca ilan metninde geçen adres |

## 4. İlanlar (`ILANLAR`)

### İlan

| Alan | Anlamı |
|---|---|
| `id` | `kurum-yıl-konu`: `tkgm-2026-bilisim` |
| `kurum`, `kalip` | 3. ve 2. katmana başvuru (`kalip` isteğe bağlı) |
| `baslik` | ilanın kendi başlığı |
| `resmiGazete`, `yayinTarihi` | tarihler (YYYY-AA-GG); bilinmiyorsa `null` |
| `kaynak`, `link` | ilanın yayımlandığı yer ve bağlantı |
| `dayanak` | kalıbınkinden farklıysa ilanın dayanağı |
| `varsayilan` | bu ilandaki bütün pozisyonlar için ortak alanlar (kalıbınkinin üzerine) |
| `basvuru` | `baslangic`, `bitis`, `bitisTahmini`, `saat`, `gecBasvuru`, `sureGun`, `kanal[]`, `adres`, `ucret {tutar, aciklama}`, `tekBasvuru`, `belgeler[]` |
| `secme` | `yontem`, `asamalar[]`, `cagriKati`, `formul`, `gecmeNotu`, `sinavTarihi` (tek gün ya da `başlangıç/bitiş`), `sinavYeri`, `aciklama` |
| `ortakSartlar` | bu ilandaki bütün pozisyonlara eklenen şartlar |
| `kontenjanNotu`, `notlar[]` | kullanıcıya gösterilecek açıklamalar; doğrulanması gereken bilgiler burada belirtilir |
| `pozisyonlar[]` | aşağıda |

### Pozisyon (en küçük birim)

| Alan | Anlamı |
|---|---|
| `id` | sitenin genelinde tek ve artan numara. **Tekrar kullanılmaz:** ilan alarmı yeni pozisyonu bu numaradan tanır. |
| `kod` | kurumun kadro kodu: `ÖÜ-2026.26`, `KGG-1` |
| `unvan` | sözlükteki standart ünvan |
| `ilandakiAd` | kurumun kullandığı ad: "Fon Denetçi Yardımcısı", "Öğretmen sınıfı subay" |
| `kidem` | `kidemli` (bilişimde) |
| `birim`, `alan` | fakülte/bölüm ya da daire; dal veya branş |
| `adet` | kadro sayısı |
| `derece`, `hizmetSinifi` | kadro derecesi ve hizmet sınıfı (`TH`, `GİH`) |
| `ucret` | `{ tavanKati: 2 }`: sözleşme ücret tavanının katı |
| `il` / `iller` | tek il (`"34"`), birden fazla il (`iller: ["42", "70"]`) ya da yurt geneli (`"TR"`). Yazılmazsa kurumun ili. |
| `cinsiyet` | `erkek` / `kadin`; her ikisine açıksa yazılmaz |
| `kontenjan` | `sehit-gazi-yakini` gibi özel kontenjan |
| `cagriSayisi` | ilanda pozisyon için sınava çağrılacak aday sayısı yazıyorsa |
| `statu`, `egitim`, `yontem` | yazılmazsa ilandan, o da yoksa kalıptan gelir |
| `sartlar[]` | bu pozisyona özgü şartlar |

Kontenjan cinsiyete, kuvvete ya da bölüm grubuna göre bölünmüşse her parça ayrı pozisyondur (Jandarma'da "Jandarma · erkek", "Jandarma · kadın", "Jandarma · şehit yakını erkek"…).

## 5. Şart modeli

Her şart bir nesnedir. `tur` ve `metin` zorunludur; metin ilandaki cümlenin sadeleştirilmiş hâlidir ve kullanıcıya gösterilir. Sayıya dökülebilen kısım ayrıca sayı olarak yazılır, böylece ileride "bana uygun ilanlar" denetimi yapılabilir.

| Tür | Sayısal alanlar | Örnek |
|---|---|---|
| `egitim` | `duzey[]`, `bolumler[]`, `durum` (`mezun` / `devam` / `mezun-veya-devam`) | `{ tur: 'egitim', duzey: ['lisans'], bolumler: ['İnşaat mühendisliği'] }` |
| `sinav` | `sinav`, `puanTurleri[]` (biri yeterli), `enAz`, `yillar[]`, `dil`, `dilDuzeyi`, `grup`, `zorunlu: false` | `{ tur: 'sinav', sinav: 'kpss', puanTurleri: ['P3'], enAz: 70, yillar: [2025, 2026] }` |
| `yas` | `enFazla` (ilandaki sınır: "35 yaşını doldurmamış" → 35), `tarih`, `dogumEnErken`, `istisna` | `{ tur: 'yas', enFazla: 35, tarih: '2026-01-01', dogumEnErken: '1991-01-01' }` |
| `deneyim` | `yil` | `{ tur: 'deneyim', yil: 5 }` |
| `belge` | `ad` | `{ tur: 'belge', ad: 'Avukatlık ruhsatnamesi' }` |
| `fiziksel` | `boy { erkek, kadin }` | `{ tur: 'fiziksel', boy: { erkek: 1.67, kadin: 1.62 } }` |
| `akademik`, `engel`, `diger` | — | yalnızca metin |
| `teknik`, `tercih` | `maddeler[]` | bilişim ilanlarındaki 10–20 maddelik nitelik listeleri |

`zorunlu: false`, puanın sıralamada kullanıldığını ama şart olmadığını söyler (bilişim ilanlarında KPSS'si olmayanın puanı 70 sayılır). Site bunu "KPSS'siz de başvurulabilir" etiketiyle gösterir.

### Miras: kalıp → ilan → pozisyon

Bir pozisyonun şartları üç düzeyden toplanır, sırasıyla:

1. kalıbın `sartlar` listesi,
2. ilanın `ortakSartlar` listesi,
3. pozisyonun `sartlar` listesi.

İki kural bu birleşmeyi yönetir:

- **Koşul (`kosul`).** Şart yalnızca koşula uyan pozisyonlara eklenir. Anahtarlar: `ucretKati`, `unvan`, `alan`, `cinsiyet`, `kontenjan`, `kod`; her biri bir değer listesidir.
  - Bilişim kalıbında `{ tur: 'deneyim', yil: 3, kosul: { ucretKati: [2] } }` yalnızca 2 kat pozisyonlara, `yil: 5, kosul: { ucretKati: [3, 4] }` yalnızca 3–4 kat pozisyonlara gelir.
  - Jandarma ilanında KPSS P3 ≥ 65 şartı Hukuk, Tabip ve Diş Tabibi dışındaki branşlara, P4 ≥ 70 yalnız Hukuk'a gelir.
- **Yerine geçme (`yerineGecer: true`).** Alt düzeydeki şart, üst düzeylerden gelen aynı türdeki şartları düşürür.
  - Tapu Kadastro'nun takım lideri pozisyonu 7 yıl deneyim ister; bu şart kalıbın 5 yıllık deneyim şartının yerine geçer.
  - Jandarma'da tabip, diş tabibi ve veteriner için 32 yaş sınırı kalıbın 27 yaş sınırının yerine geçer.

Diğer alanlar (`statu`, `egitim`, `basvuru`, `secme`…) da aynı sırayla birleşir: pozisyonda yazılan ilandakini, ilanda yazılan kalıptakini ezer.

## 6. Türetilen bilgiler (5. katman)

Elle yazılmaz, her açılışta hesaplanır (`app.js`):

- **Birleştirilmiş pozisyon:** kurum, kalıp ve ilan bilgisiyle düz bir kayıt; filtreler ve alarmlar bunun üzerinde çalışır.
- **Başvuru durumu:** bugünün tarihine göre `yakinda`, `acik`, `son-gunler` (son 3 gün), `bitti`, `bilinmiyor`.
- **Etiketler:** "KPSS şartı yok", "KPSS'siz de başvurulabilir", "Yaş sınırı 35", "Kadın kadrosu", "Şehit, gazi ve vazife malulü yakını", "Ücretli başvuru", "Tek başvuru hakkı".
- **Arama metni:** ünvan ve eş yazılışları, ilandaki ad, alan, birim, kurum, il, kadro kodu; ayrıca şartlardaki bölüm adları ve teknik maddeler. "Kubernetes" ya da "matematik" yazan, bu şartları taşıyan pozisyonları bulur.

## 7. Araçlar

| Komut | Ne yapar |
|---|---|
| `node araclar/dogrula.js` | Bütünlük denetimi: tekrar eden kimlikler, sözlükte olmayan ünvan/statü/il, olmayan kurum veya kalıba başvuru, geçersiz şart türü ya da koşul, tarih biçimi. Eksik bilgileri uyarı olarak listeler. Son kullanılan pozisyon numarasını söyler. |
| `node araclar/disa-aktar.js` | Veriyi `disari/` klasörüne Excel'de açılan tablolar olarak yazar: `kaliplar.csv`, `kurumlar.csv`, `ilanlar.csv`, `pozisyonlar.csv`, `sartlar.csv`. Pozisyon ve şart tablolarında miras çözülmüştür; `sartlar.csv`'deki `katman` sütunu şartın nereden geldiğini (kalip / ilan / pozisyon) gösterir. |

Her iki araç da `araclar/ortak.js`'teki birleştirme kurallarını kullanır. Bu kurallar `app.js`'teki ile aynıdır; biri değişirse öbürü de değiştirilmeli.

## 8. Yeni ilan ekleme

1. Kurum `veri/3-kurumlar.js`'de yoksa ekleyin.
2. İlan bir kalıba uyuyorsa (`veri/2-kaliplar.js`) `kalip` alanını yazın ve kalıptaki şartları tekrarlamayın. Uymuyorsa ortak bilgileri `varsayilan` ve `ortakSartlar` alanlarına yazın.
3. İlanı `veri/4-ilanlar.js` listesinin sonuna ekleyin. Pozisyon numaralarına `dogrula.js`'nin söylediği numaradan devam edin.
4. Bilinmeyen bilgiyi uydurmayın: yazmayın ya da `null` bırakın. Hesaplanan bir tarih varsa `bitisTahmini: true` ve bir not ekleyin.
5. `node araclar/dogrula.js` çalıştırın; hata kalmayana kadar düzeltin.

## 9. Gerçek bir veri tabanına geçiş

Katmanlar bire bir tablolara karşılık gelir:

```
sozluk_*        (id, ad, grup, ...)                       ← 1. katman, her liste bir tablo
kalip           (id, ad, dayanak, varsayilan_json, basvuru_json, secme_json)
kurum           (id, ad, tur → kurum_turu, il → il, bagli, web)
ilan            (id, kurum → kurum, kalip → kalip, baslik, tarihler, basvuru_json, secme_json, ...)
pozisyon        (id, ilan → ilan, kod, unvan → unvan, statu → statu, il, adet, cinsiyet, ...)
sart            (id, sahip_turu [kalip|ilan|pozisyon], sahip_id, tur → sart_turu, metin, sayısal alanlar, kosul_json, yerine_gecer)
```

`disa-aktar.js`'nin ürettiği CSV dosyaları bu tabloların ilk dökümü olarak kullanılabilir. Kullanıcı hesabı, e-posta ile alarm ya da ilanların otomatik toplanması gibi bir sunucu gerektiren adımlar bu geçişten sonra gelir.
