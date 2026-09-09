# KATIP Belge ve Şablon Aracı

Zengin metin düzenleme ve taşınabilir belge şablonlarıyla belge hazırlamayı destekleyen uygulama.

[Portföye dön](../../../README.md) · [Tüm proje sayfaları](../README.md)

## Özellikler

- Zengin metin ve tablo düzenleme
- Sayfa ölçüsü ve cetvel kontrolleri
- Admin ve taşınabilir izleme modları

## Teknolojiler ve yapı

JavaScript, TinyMCE, localStorage.

HTML, stil ve JavaScript aynı giriş dosyasında bulunur. İşlemler tarayıcı üzerinde yürür; bu proje grubunda ayrı bir sunucu/veritabanı uygulaması bulunmaz.

### Giriş dosyaları

- [KATIP_ADMIN_MOD.html](../../../KATIP_ADMIN_MOD.html)
- [KATIP_IZLEME_MOD.html](../../../KATIP_IZLEME_MOD.html)

## Başlangıç ve kullanım

Giriş dosyasını indirip masaüstü tarayıcıda açın. CDN kullanan dosyalar internet bağlantısı gerektirir; paket kurulumu veya ortam değişkeni ayarı bulunmaz.

1. Şablon düzenleme için admin dosyasını açın.
2. Mevcut taşınabilir paketi kullanmak için izleme dosyasını açın.
3. İlgili şablonu seçip düzenleyici üzerinden belgeyi hazırlayın.

## Mevcut sınırlar

İzleme dosyasında 17 kategori ve 96 içerik şablonu bulunur. Mod ayrımı tarayıcı arayüzündedir; bir sunucu kimlik doğrulama sistemi olarak sunulmaz.

Otomatik test ve CI kurulumu bu aşamanın kapsamı dışındadır. Bu sayfa testlerin geçtiği veya yeni bir demo yayımlandığı iddiasını içermez.

## Portföyde gösterdiği çalışmalar

Editör entegrasyonu, belge düzeni, tarayıcıda durum saklama. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `document-template-studio`.

Description: Zengin metin düzenleme ve taşınabilir belge şablonlarıyla belge hazırlamayı destekleyen uygulama.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
