# Yeni portföy uygulamalarının demo kapsamı

10 Eylül 2026 tarihli bu inceleme yalnızca **Portföy vaziyeti ve risk sinyal kokpiti** ve **V-İZLEME Kredi Portföy Radarı** dosyalarını kapsar.

- Kaynak incelemesinde açık API anahtarı veya gömülü gerçek müşteri listesi saptanmadı.
- V-İZLEME içindeki iki özel logo kaldırılıp DEMO etiketiyle değiştirildi.
- Kokpitteki coğrafi şube/bölge örnekleri hayali ad ve kodlarla değiştirildi. Varsayılan eşikler ve örnek tutarlar sentetik demo değerleriyle değiştirildi.
- V-İZLEME, 4 hayali bölge, 12 hayali şube ve 3 dönem için 36 sentetik kayıt üretir. Demo toplamlarında mutabakat bildirimi oluşmadığı kontrol edildi.
- Her iki uygulamada görünür demo açıklaması vardır. Önceki sürümün tarayıcı ayarları/arşivi yeni demo tarafından otomatik okunmaz; eski tarayıcı verileri silinmez.
- Dosyaların JavaScript sözdizimi kontrol edildi. Tam tarayıcı, finansal model veya güvenlik testi yapılmadı.

Excel alan adları ve genel portföy hesaplama işlevleri korunmuştur. Kullanıcının sonradan yüklediği veriler ve oluşturduğu HTML raporları bu sentetik başlangıç verisinden ayrıdır. Özel yedekler repository'ye dahil edilmez. Bu işlem önceki Git geçmişini veya daha önce yayımlanan diğer uygulamaları temizlemez.

## KATIP ek incelemesi

10 Eylül 2026: `KATIP_ADMIN_MOD.html` ve `KATIP_IZLEME_MOD.html` ayrıca temizlendi. İzleme paketinin 96 eski belge gövdesi, içlerindeki görsel/ekler dahil çıkarıldı; genel başlıklar ve 17 kategori korunarak sentetik örnekler oluşturuldu. Admin de aynı demo içerikle başlar. Kaynakta bulunan 6 adet 11 haneli sayı kaldırıldı; bunların gerçek kimlik numarası olup olmadığı doğrulanmadı. Gerçek kişi/kurum/şube/adres ve işlem bilgilerini taşımamak için eski gövdelerden metin aktarılmadı. Uygulama arayüzündeki logolar aynen korundu.

İki dosyanın sözdizimi, başlangıç verisi, kategori ilişkileri, taşınabilir JSON dönüşümü ve logo eşitliği kontrol edildi. Logo dışı kaynakta 11 haneli sayı ve e-posta bulunmadığı doğrulandı. Eski tarayıcı saklama anahtarı kullanılmaz. Kapsamlı tarayıcı testi veya eski Git geçmişinin silinmesi yapılmadı.

## Tahsilat Hedefleme ve Senaryo Platformu

19 Ekim 2026: `TAHSILAT-HEDEFLEME-DEMO.html` ayrı bir kamuya açık demo olarak eklendi. Bu yeni dosya için:

- 12 hayali şube, 4 il, 4 Bölge ve 2 Merkez birimi ile deterministik veriler sıfırdan üretilir; gerçek JSON yedeğinden veri aktarılmamıştır.
- Kurum birimi yazıları kaldırıldı; gerçek birim/sicil kodları kullanılmadı. İndirilebilir atama şablonundaki eski personel ve şube kayıtları çıkarıldı; başlangıç dizileri boştur.
- Demo tarayıcı kayıt anahtarları ayrıldı; önceki uygulamanın kaydı otomatik okunmaz veya silinmez.
- SQL örnekleri kullanıcı talebiyle korundu; şema, tablo, kaynak ve ara hesaplama sütunları hayali adlarla değiştirildi. Gerçek adlarla eşleştirme sözlüğü yayımlanmadı. Son SELECT'teki Türkçe alanlar yalnızca genel HTML içe aktarma takma adlarıdır.
- HTML içinden indirilen SQL ZIP'i, `sql/collection-targeting/` içindeki incelenmiş dosyalarla birebir karşılaştırılır; eski SQL paketi/kurum notları gömülmez.
- 23 model, 14 işlevsel DOM/Excel/JSON/CSV, 6 içerik/SQL-paket ve 7 sentetik SQL kontrolü çalıştırıldı. DOM kontrolleri görsel tarayıcı testi değildir; SQL testleri bellekte SQLite uyarlaması kullanır, canlı Oracle doğrulaması değildir.

Kaynak SQL ve küçük SQL test kümesi yalnızca hayali deneme şeması içindir. Gerçek veri yükleme yetkisi veya üretim kullanımı için onay verilmez. Bu ekleme repository'nin diğer dosyalarını veya eski Git geçmişini temizlemez. [Proje açıklaması](projects/collection-targeting/README.md).

