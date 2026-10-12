// data.js
// Sitedeki tüm ilanlar burada tutulur. Harita, il filtresi, kurum ve ünvan listeleri
// ve ilan alarmları bu veriden otomatik oluşur.
//
// Yeni ilan eklerken:
// - Satırı listenin sonuna ekleyin ve bir sonraki id numarasını verin. İlan alarmları
//   yeni ilanları bu numarayla tanır; silinen bir ilanın numarasını tekrar kullanmayın.
// - plaka: ilin plaka kodu (haritadaki TR-xx kimliğiyle eşleşir).
// - tur: Üniversite, Belediye, Bakanlık, Hastane veya Diğer.
window.ILANLAR = [
    { id: 1, kurum: "Malatya Turgut Özal Üniversitesi", tur: "Üniversite", unvan: "Büro Personeli", il: "Malatya", plaka: "44" },
    { id: 2, kurum: "Malatya Turgut Özal Üniversitesi", tur: "Üniversite", unvan: "Büro Personeli", il: "Malatya", plaka: "44" },
    { id: 3, kurum: "Mersin Büyükşehir Belediyesi", tur: "Belediye", unvan: "İtfaiye Eri", il: "Mersin", plaka: "33" },
    { id: 4, kurum: "Karamanoğlu Mehmetbey Üniversitesi", tur: "Üniversite", unvan: "Öğretim Görevlisi", alan: "İlk ve Acil Yardım", il: "Karaman", plaka: "70" },
    { id: 5, kurum: "Karamanoğlu Mehmetbey Üniversitesi", tur: "Üniversite", unvan: "Öğretim Görevlisi", alan: "Optisyenlik", il: "Karaman", plaka: "70" },
    { id: 6, kurum: "Karamanoğlu Mehmetbey Üniversitesi", tur: "Üniversite", unvan: "Öğretim Görevlisi", alan: "Tıbbi Görüntüleme", il: "Karaman", plaka: "70" },
    { id: 7, kurum: "Karamanoğlu Mehmetbey Üniversitesi", tur: "Üniversite", unvan: "Öğretim Görevlisi", alan: "Elektrik", il: "Karaman", plaka: "70" },
    { id: 8, kurum: "Karamanoğlu Mehmetbey Üniversitesi", tur: "Üniversite", unvan: "Öğretim Görevlisi", alan: "Bilgi İşlem", il: "Karaman", plaka: "70" }
];
