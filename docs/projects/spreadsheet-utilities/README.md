# Excel Yardımcı Araçları

Excel dosyalarını bölgelere ayıran ve ilk çalışma sayfasını JSON'a dönüştüren iki küçük araç.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- BÖLGE ADI sütununa göre gruplama
- Tek bölgeyi Excel, tüm bölgeleri ZIP indirme
- Excel → JSON dönüşümü ve ilk beş kayıt önizlemesi

## Teknolojiler ve yapı

JavaScript, SheetJS; bölge ayırıcıda JSZip.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [ayırıcı3.html](../../../ay%C4%B1r%C4%B1c%C4%B13.html)
- [EXCELLTOJSONCONVERTER.html](../../../EXCELLTOJSONCONVERTER.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Ayırıcıda BÖLGE ADI sütunu bulunan dosyayı yükleyin; çalışma sayfasını ve bölgeyi seçin.
2. Tek bölgeyi veya tüm bölgeleri indirin.
3. JSON aracında dosyayı seçin, Dönüştür düğmesine basın ve JSON çıktısını indirin.

## Mevcut sınırlar

JSON aracı yalnızca ilk sayfayı işler ve biçimlendirilmiş hücre değerlerini kullanır. Excel ayırma işlemi çalışma kitabının bütün biçim/formüllerini koruma garantisi vermez.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Dosya dönüştürme, Türkçe başlık eşleştirme, gruplama, ZIP üretimi. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `spreadsheet-utilities`.

Description: Excel dosyalarını bölgelere ayıran ve ilk çalışma sayfasını JSON'a dönüştüren iki küçük araç.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
