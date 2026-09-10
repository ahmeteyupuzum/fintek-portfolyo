# V-İZLEME Kredi Portföy Radarı

Kredi portföyünü dönem, bölge, şube ve segment bazında inceleyen; karşılaştırmalı grafikler, risk matrisi ve dışa aktarılabilir raporlar sunan tarayıcı uygulaması.

[Uygulama dosyası](../../../V-IZLEME_KREDI_PORTFOY_RADARI.html) · [Ana portföy](../../../README.md)

## Özellikler

- Excel'den çok dönemli portföy verisi okuma.
- Bölge, şube, dönem, portföy ve segment seçimi.
- Önceki dönem/referans karşılaştırmaları ve KPI kartları.
- Trend, oran, ürün dağılımı ve risk matrisi görünümleri.
- Veri kalitesi, eksik alan ve mükerrer kayıt bildirimleri.
- Excel ve taşınabilir HTML dışa aktarımı.
- Tema, sunum ve yazdırma görünümleri.

## Başlangıç

1. HTML dosyasını masaüstü tarayıcıda açın. CDN kütüphaneleri için internet gerekir.
2. Uygulama 4 hayali bölge, 12 hayali şube ve 3 dönemden oluşan 36 sentetik kayıtla açılır. **Sentetik Demo Yükle** düğmesi örneği yeniden yükler. İsterseniz şemaya uygun `.xlsx` veya `.xls` dosyasını seçin.
3. Dönem, bölge, şube ve segment seçimlerini yapın.
4. Veri kalitesi bildirimlerini ve karşılaştırmaları inceleyin.
5. İhtiyaca göre Excel veya HTML raporu alın.

## Beklenen Excel yapısı

Dosya **A:EG aralığında en az 137 sütun** ve **ilk üç satırda başlık hiyerarşisi** bekler. Veri kayıtları dördüncü satırdan başlar. Başlıklar bölge kodu, kredi bölge adı, şube kodu, şube adı ve dönem alanlarını içermelidir. Kalan sütunlar ürün/segment ve portföy/takip/gecikme göstergeleridir.

Birden fazla sayfa varsa uygulama ilk üç başlık satırında en geniş sütun yapısına sahip sayfayı seçer. Aynı bölge + şube + dönem anahtarının tekrarı veri kalitesi bildirimi üretir.

Bu paket için uyumlu bir örnek Excel dosyası sağlanmamıştır. Tahsilat projeksiyonunun dört sütunlu örneği bu uygulamaya uygun değildir. Bir başka raporu yalnızca sütun sayısını artırarak uyarlamak doğru alan eşleşmesini garanti etmez.

## Teknolojiler ve mimari

HTML, CSS, JavaScript, Chart.js 4.4.4, SheetJS 0.18.5 ve ExcelJS 4.4.0. Excel okuma, indeksleme, toplulaştırma ve grafikler tarayıcıda çalışır. Tema tercihi localStorage'da saklanır; ayrı sunucu/veritabanı uygulaması bulunmaz.

HTML raporu veriyi dosyaya gömer ve görüntüleme amacıyla paylaşılabilir. CDN kütüphaneleri kullanıldığından tüm kullanım akışı için çevrimdışı çalışma garantisi verilmez.

## Repository bilgisi

Önerilen ad: `credit-monitoring-radar`.

Description: Dönem, bölge ve şube bazında karşılaştırmalı kredi portföyü raporlaması.

Topics: `javascript`, `chartjs`, `exceljs`, `sheetjs`, `dashboard`.

Özel logolar kaldırılmıştır. Başlangıç verilerindeki bütün kimlikler ve tutarlar sentetiktir. JavaScript sözdizimi ve demo kayıtlarının toplamları kontrol edilmiştir; kapsamlı uygulama testi yapılmamıştır. [Demo kapsamı](../../PUBLIC-DEMO-NOTES.md) · [Lisans durumu](../../../README.md#lisans).
