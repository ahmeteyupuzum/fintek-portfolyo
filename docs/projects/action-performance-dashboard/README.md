# Aksiyon Performans Analizi

Atanan, tamamlanan ve iptal edilen aksiyonları birim ve personel düzeyinde raporlayan uygulama.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Aksiyon durumu ve tamamlanma oranları
- Birim/personel karşılaştırmaları
- Tahsilat ve süre göstergeleri
- Taşınabilir HTML raporu

## Teknolojiler ve yapı

JavaScript, Tailwind CSS, Chart.js, SheetJS, PapaParse.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [V-ACTIONv19.html](../../../V-ACTIONv19.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Excel veya CSV dosyasını yükleyin.
2. Aksiyon türü, birim ve personel seçimleriyle görünümü daraltın.
3. Gerekirse HTML raporu indirin.

## Mevcut sınırlar

Sütun adları tanınan başlıklarla eşleşmelidir. Rapor çıktısı ham veriyi içerir; sayı ve tarih biçimleri için doğrulanmış bir veri sözleşmesi henüz yayımlanmamıştır.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Dosya içe aktarma, filtreleme, KPI hesaplama, görselleştirme. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `action-performance-dashboard`.

Description: Atanan, tamamlanan ve iptal edilen aksiyonları birim ve personel düzeyinde raporlayan uygulama.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
