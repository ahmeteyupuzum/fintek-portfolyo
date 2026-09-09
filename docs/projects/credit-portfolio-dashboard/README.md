# Kredi Portföyü ve Takip Paneli

Kredi portföyü ve takip verilerini grafikler, tablolar ve taşınabilir raporlarla incelemeyi sağlayan tarayıcı uygulaması.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Portföy ve takip göstergelerini inceleme
- Bölge ve şube kırılımları
- Güncel varyantta HTML ve Excel dışa aktarımı

## Teknolojiler ve yapı

JavaScript, Tailwind CSS, Chart.js, SheetJS; güncel varyantta ExcelJS ve JSZip.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [VRADAR GÜNCEL.html](../../../VRADAR%20G%C3%9CNCEL.html)
- [V-RADAR-BANKA-GENELI-AYLIK-TAKIP-PANELI.html](../../../V-RADAR-BANKA-GENELI-AYLIK-TAKIP-PANELI.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Yeni veriyle çalışmak için güncel varyantı açın ve arayüzdeki dosya yükleme alanlarını kullanın.
2. Aylık dosya önceden gömülmüş raporu görüntüler; boş başlangıç uygulaması değildir.
3. İlgili kırılımı seçip uygulamanın sunduğu rapor çıktısını alın.

## Mevcut sınırlar

İki dosya aynı ürün ailesinin farklı sürümleridir. Taşınabilir HTML çıktısı veri içerir; görüntüleme filtresi dosyadan veri silindiği anlamına gelmez.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Veri görselleştirme, dosya tabanlı raporlama, Excel çıktısı. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `credit-portfolio-dashboard`.

Description: Kredi portföyü ve takip verilerini grafikler, tablolar ve taşınabilir raporlarla incelemeyi sağlayan tarayıcı uygulaması.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
