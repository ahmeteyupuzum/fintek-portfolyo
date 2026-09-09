# Ödeme Planı Araçları

KGF tazmin sonrası ödeme planı senaryoları ve takip ödeme planı parametreleri için iki tarayıcı aracı.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Ödeme planı senaryosu oluşturma
- Plan parametrelerini tanımlama
- Tablolu çıktı hazırlama

## Teknolojiler ve yapı

JavaScript, SheetJS; parametre aracında Tailwind CSS.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [KGF-TAZMIN-SONRASI-ODEME-PLANI-ARACI.html](../../../KGF-TAZMIN-SONRASI-ODEME-PLANI-ARACI.html)
- [TAKIP-ODEME-PLANI-PARAMETRE-TANIM-UYG.html](../../../TAKIP-ODEME-PLANI-PARAMETRE-TANIM-UYG.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Yapacağınız işleme uygun giriş dosyasını açın.
2. Tutar, tarih ve plan parametrelerini ilgili form alanlarına girin.
3. Oluşturulan planı veya parametre tablosunu inceleyin.

## Mevcut sınırlar

Hesaplama doğrulaması tamamlanmamıştır. Ön incelemede aynı gün işlemleri ve sayı biçimleriyle ilgili bulgular görülmüştür; bu aşamada hesaplama kodu değiştirilmemiştir.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Finansal iş akışlarının modellenmesi, tarih/tutar girdileri, tablo üretimi. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `payment-plan-tools`.

Description: KGF tazmin sonrası ödeme planı senaryoları ve takip ödeme planı parametreleri için iki tarayıcı aracı.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
