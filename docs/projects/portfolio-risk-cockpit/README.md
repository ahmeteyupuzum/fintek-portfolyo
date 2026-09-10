# Portföy Vaziyeti ve Risk Sinyal Kokpiti

V-RADAR 2.3; bireysel ve ticari kredi portföyünü, takip ve gecikme göstergelerini, risk sinyallerini ve aksiyon önceliklerini birlikte inceleyen tarayıcı uygulamasıdır.

[Uygulama dosyası](../../../Portföy%20vaziyeti%20ve%20risk%20sinyal%20kokpiti.html) · [Ana portföy](../../../README.md)

## Özellikler

- Bölge, şube ve segment bazlı filtreleme.
- Portföy, takip, gecikme ve ürün kırılımları.
- Risk matrisi, kritik sinyaller ve açıklamalı aksiyon sıralaması.
- Ayarlanabilir eşikler ve senaryo görünümleri.
- Excel veri yükleme ve veri kalitesi/mutabakat bulguları.
- Tarayıcıda dönem arşivi; JSON içe/dışa aktarma ve CSV raporları.
- Taşınabilir yönetici HTML raporu.

## Başlangıç ve demo

1. HTML dosyasını indirip güncel Edge veya Chrome'da açın.
2. Uygulama açılışta kodla üretilen **4 bölge / 12 şubelik demo verisini** gösterir. Ayrı veri dosyası indirmek gerekmez.
3. Bölge, şube ve segment filtrelerini değiştirerek göstergeleri inceleyin.
4. **Demo veriyi yenile** ile başlangıç görünümüne dönün; kendi dosyanız için Excel yükleme alanını kullanın.
5. Rapor veya dönem arşivi gerektiğinde ilgili dışa aktarma seçeneklerini kullanın.

Demo tutarları kod içinde üretilir; gerçek tahsilat veya portföy büyüklüğü iddiası taşımaz. Bu eklemede ayrı bir Excel örneği üretilmemiştir.

## Veri biçimi

Uygulama `.xlsx` kabul eder; dosya sınırı 30 MB'dir. `Anlık Veri` adlı sayfayı, yoksa ilk sayfayı okur. Şube kodu/adı ve bölge kodu/adı gereklidir. Portföy, takip ve gecikme tutarları segment/ürün başlıklarıyla eşleştirilir; bazı alanlarda eski şablonun sabit sütun konumları kullanılır.

Dönem arşivi için B2 veya açık bir **Rapor Tarihi** alanı beklenir. Bu nedenle herhangi bir dört sütunlu tablo, tahsilat projeksiyonu örneği veya V-İZLEME dosyası doğrudan uyumlu varsayılmamalıdır. Orijinal dosyanın işaret ettiği Excel şablonu bu pakette bulunmadığından bağlantısı bu kılavuza yönlendirilmiştir.

## Teknolojiler ve saklama

HTML, CSS ve JavaScript tek dosyadadır. Excel okuma için dosyanın kendi ZIP/XML okuyucusu ve tarayıcının `DecompressionStream` API'si kullanılır. Dönem arşivi IndexedDB'de, eşik/tema tercihleri localStorage'da tutulur. Ayrı sunucu veritabanı veya oturum açma servisi bulunmaz.

Arşiv ilgili tarayıcı ve site kökenine bağlıdır; tarayıcı verilerinin temizlenmesi arşivi kaldırabilir. Yönetici HTML çıktısı rapor verisini içine gömer. Eşikler ve öncelik puanları uygulamanın tanımlı kurallarıdır; onaylanmış bir kredi derecelendirme modeli olarak sunulmaz.

## Repository bilgisi

Önerilen ad: `portfolio-risk-cockpit`.

Description: Kredi portföyü, risk sinyalleri ve aksiyon önceliklerini birleştiren tarayıcı kokpiti.

Topics: `javascript`, `dashboard`, `indexeddb`, `risk-analysis`, `data-visualization`.

Başlangıçtaki bölge/şube adları, tutarlar ve varsayılan eşikler sentetiktir; kurum politikasını temsil etmez. Demo sürümünün tarayıcı saklama alanı önceki sürümden ayrılmıştır. JavaScript sözdizimi kontrol edilmiştir; kapsamlı uygulama testi yapılmamıştır. [Demo kapsamı](../../PUBLIC-DEMO-NOTES.md) · [Lisans durumu](../../../README.md#lisans).
