# Tahsilat Performans Panelleri

Bölgesel ve merkezi tahsilat verilerini hedeflerle karşılaştırmaya yönelik iki raporlama aracı.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Hedef ve gerçekleşme karşılaştırmaları
- Tablo ve grafiklerle performans görünümü
- Bölgesel ve merkezi rapor seçenekleri

## Teknolojiler ve yapı

JavaScript, Tailwind CSS, Chart.js, SheetJS.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [BOLGELER-KIST-HESAPLI-TAHSILAT-RAPOR-ADMIN.html](../../../BOLGELER-KIST-HESAPLI-TAHSILAT-RAPOR-ADMIN.html)
- [MÜDÜRLÜK KIRILIMSIZ MERKEZ TAHSİLAT RAPORU - Kümülatif Renk Güncellemesi.html](../../../M%C3%9CD%C3%9CRL%C3%9CK%20KIRILIMSIZ%20MERKEZ%20TAHS%C4%B0LAT%20RAPORU%20-%20K%C3%BCm%C3%BClatif%20Renk%20G%C3%BCncellemesi.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. İhtiyacınıza göre bölgesel veya merkezi HTML dosyasını açın.
2. Arayüzde belirtilen rapor dosyasını seçin.
3. Dönem ve filtreleri kontrol ederek ilgili tablo ve grafikleri inceleyin.

## Mevcut sınırlar

Döneme bağlı kurallar kaynakta bulunur. Dosyadaki tarih ve kıst parametreleri her yeni döneme otomatik uyarlanıyor varsayılmamalıdır.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

KPI sunumu, veri toplulaştırma, iş kurallarını arayüze aktarma. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `collection-performance-dashboard`.

Description: Bölgesel ve merkezi tahsilat verilerini hedeflerle karşılaştırmaya yönelik iki raporlama aracı.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
