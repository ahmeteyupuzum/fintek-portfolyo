# Şube Haritası ve Mesafe Araçları

Excel koordinatlarını haritaya taşıyan ve koordinat çiftleri için sürüş mesafesi sorgulayan araçlar.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Bölge ve şube konumlarını gösterme
- Haritayı verisiyle HTML olarak indirme
- OSRM üzerinden sürüş mesafesi sorgulama
- Mesafe sonuçlarını Excel olarak indirme

## Teknolojiler ve yapı

JavaScript, SheetJS, Leaflet, OSRM, CARTO harita karoları.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [harita oluştur.html](../../../harita%20olu%C5%9Ftur.html)
- [mesafehesaplamaaracı.html](../../../mesafehesaplamaarac%C4%B1.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Girdide SubeAdi, SubeLat, SubeLong, BolgeAdi, BolgeLat ve BolgeLong sütunlarını hazırlayın; haritada Mesafe alanı da kullanılır.
2. Mesafe aracına dosyayı yükleyip hesaplamayı başlatın.
3. Harita aracına koordinat dosyasını yükleyip konumları inceleyin.

## Mevcut sınırlar

Mesafe aracı koordinatları harici OSRM servisine gönderir. Haritadaki bağlantı çizgileri yol güzergâhı değildir; noktalar arasındaki görsel bağlantılardır. Ağ erişimi gereklidir.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Harita entegrasyonu, harici API tüketimi, dosya tabanlı iş akışı. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `branch-route-tools`.

Description: Excel koordinatlarını haritaya taşıyan ve koordinat çiftleri için sürüş mesafesi sorgulayan araçlar.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
