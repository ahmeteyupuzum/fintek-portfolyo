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

Her iki dosya ilk açılışta 17 kategori ve 96 sentetik belge örneği sunar. Genel belge başlıkları korunmuş, eski belge gövdeleri tamamen demo içerikle değiştirilmiştir. Örnekler asıl hukuki/kurumsal şablon metinlerinin yerine kullanılamaz. Mod ayrımı tarayıcı arayüzündedir; bir sunucu kimlik doğrulama sistemi olarak sunulmaz.

Uygulama logoları aynen korunmuştur. Kişi, kurum, şube, bölge, adres, dosya referansı ve tutarlar sentetiktir. T.C. kimlik ve iletişim bilgileri kaldırılmıştır. Eski belge gövdelerindeki görsel/ekler demo paketine alınmamıştır.

Demo `katip_public_demo_v1` saklama anahtarını kullanır; eski tarayıcı kayıtlarını otomatik yüklemez veya silmez. Sonradan içe aktarılan dosyalar otomatik anonimleştirilmez.

Sınırlı kontroller: JavaScript sözdizimi, iki modun başlangıç verisi, 17 kategori / 96 belge bağlantıları, taşınabilir JSON dönüşümü ve uygulama logolarının değişmediği doğrulandı. Logo dışındaki kaynakta 11 haneli sayı veya e-posta kalmadığı kontrol edildi. Tam tarayıcı/editör/çıktı testi ve CI kurulumu yapılmadı.

Bu güncelleme Git geçmişindeki eski dosyaları kaldırmaz. [Demo inceleme notları](../../PUBLIC-DEMO-NOTES.md).

## Portföyde gösterdiği çalışmalar

Editör entegrasyonu, belge düzeni, tarayıcıda durum saklama. Bu başlıklar uygulamanın kullandığı teknikleri anlatır; üretim ölçeği veya ölçülmüş performans iddiası değildir.

## Repository bilgisi

Önerilen ad: `document-template-studio`.

Description: Zengin metin düzenleme ve taşınabilir belge şablonlarıyla belge hazırlamayı destekleyen uygulama.

Topics ve gruplama: [repository planı](../../REPOSITORY-PLAN.md).

## Lisans

Açık kaynak lisansı henüz seçilmemiştir. Ayrıntılar [ana README](../../../README.md#lisans) içindedir.
