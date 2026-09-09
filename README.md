# Finansal Operasyon ve Veri Araçları

Excel tabanlı operasyonları, raporlamayı ve belge hazırlamayı tarayıcı üzerinden destekleyen 19 HTML uygulamasından oluşan portföy.

## Genel bakış

Uygulamalar; tahsilat ve aksiyon raporları, portföy dağıtımı, ödeme planları, belge şablonları ve veri dönüştürme gibi iş akışlarına odaklanır. Mevcut sürümler HTML, CSS ve JavaScript'i aynı dosyada barındırır. KATIP admin/izleme dosyaları aynı ürünün iki modudur; V-RADAR dosyaları farklı sürümlerdir.

## Uygulamalar

Her grubun özellikleri, giriş dosyaları ve kullanım adımları için [proje tanıtım sayfalarını](docs/projects/README.md) inceleyin.

| Uygulama / giriş dosyası | Amaç |
| --- | --- |
| [Bölge bazlı Excel ayırıcı](ayırıcı3.html) | Çalışma sayfasını bölgelere ayırıp Excel ve ZIP çıktısı oluşturma |
| [Excel → JSON](EXCELLTOJSONCONVERTER.html) | İlk çalışma sayfasını JSON'a dönüştürme ve önizleme |
| [Şube ve bölge haritası](harita%20oluştur.html) | Excel koordinatlarını haritada gösterme, HTML çıktısı alma |
| [Mesafe hesaplayıcı](mesafehesaplamaaracı.html) | Koordinat çiftleri arasındaki sürüş mesafesini OSRM üzerinden sorgulama |
| [Bölgesel tahsilat](BOLGELER-KIST-HESAPLI-TAHSILAT-RAPOR-ADMIN.html) | Bölge bazında tahsilat ve hedef performansını raporlama |
| [Merkez tahsilat](MÜDÜRLÜK%20KIRILIMSIZ%20MERKEZ%20TAHSİLAT%20RAPORU%20-%20Kümülatif%20Renk%20Güncellemesi.html) | Merkezi tahsilat performansını grafik ve tablolarla inceleme |
| [Çağrı analizi](ÇAĞRI%20İSTATİSTİK%20GÜNCEL%20-%20Kopya.html) | Çağrı verilerinden KPI ve performans raporu oluşturma |
| [Aksiyon analizi](V-ACTIONv19.html) | Atanan/tamamlanan aksiyonları, personel ve birim performansını inceleme |
| [V-RADAR güncel](VRADAR%20GÜNCEL.html) | Kredi portföyü ve takip verilerini inceleme; HTML ve Excel raporları üretme |
| [V-RADAR aylık görüntüleyici](V-RADAR-BANKA-GENELI-AYLIK-TAKIP-PANELI.html) | Dosyaya gömülmüş aylık raporu görüntüleme |
| [Portföy atama](TAKIP-PORTFOY-ATAMA-UYGULAMASI.html) | Takip portföyü ve şube dağıtımını destekleme |
| [Ödeme planı parametreleri](TAKIP-ODEME-PLANI-PARAMETRE-TANIM-UYG.html) | Ödeme planı parametrelerini tanımlama |
| [KGF ödeme planı](KGF-TAZMIN-SONRASI-ODEME-PLANI-ARACI.html) | Tazmin sonrası ödeme planı senaryoları oluşturma |
| [Kampanya ve prim](KAMPANYA-KLAVUZ-VE-PRIM-HESAPLAMA-ARACI.html) | Dosyadaki kampanya kurallarını açıklama ve prim hesabı yapma |
| [KATIP admin](KATIP_ADMIN_MOD.html) | Zengin metin düzenleyicisiyle belge ve şablon yönetimi |
| [KATIP izleme](KATIP_IZLEME_MOD.html) | Taşınabilir şablon paketini görüntüleme ve kullanma |
| [Müşteri föyü](Takipli-musteri-foyu.HTML) | Kurumsal müşteri bilgilerini yapılandırılmış formda hazırlama |
| [Özgeçmiş hazırlama](ÖZGEÇMİŞ%20OLUŞTURMA%20ARACI.html) | Form üzerinden özgeçmiş oluşturma ve PDF çıktısı alma |
| [Tahsilat projeksiyonu](tahsilat%20projeksiyonu.html) | Aylık tahsilatlardan yıl sonu projeksiyonu ve hedef simülasyonu; [README ve örnek veri](docs/projects/collection-projection/README.md) |

## Teknolojiler

- HTML, CSS ve tarayıcı JavaScript'i.
- Uygulamaya göre SheetJS, ExcelJS, JSZip, PapaParse, Chart.js, Tailwind CSS, Leaflet, TinyMCE ve html2pdf.js.
- Mesafe aracı için OSRM; harita için CARTO harita karoları.

Her uygulama bu bağımlılıkların yalnızca ihtiyaç duyduğu bölümünü kullanır. Bu klasörde sunucu uygulaması, veritabanı şeması veya paket kurulum dosyası bulunmaz.

## Mimari

Genel akış: kullanıcı formu veya dosya seçimi → tarayıcıda işleme → tablo, grafik veya belge → dosya indirme/yazdırma.

Bazı uygulamalar görüntüleme tercihlerini veya şablonlarını `localStorage` içinde tutar. Bazı HTML rapor çıktıları veriyi doğrudan dosyaya gömer. Mesafe aracı koordinatları OSRM'ye gönderir; harita ve CDN bağımlılıkları da ağ erişimi kullanır. Bu nedenle koleksiyonun tamamı için “tamamen çevrimdışı” ifadesi kullanılmaz.

## Kurulum ve kullanım

1. İlgili HTML dosyasını indirin ve güncel bir masaüstü tarayıcıda açın.
2. CDN kullanan uygulamalarda internet bağlantısı sağlayın.
3. Arayüzde belirtilen sütunlara uygun dosyayı seçin veya formu doldurun.
4. İlgili uygulamanın sunduğu hesaplama, görüntüleme veya dışa aktarma işlemini kullanın.

Örnek: Excel → JSON aracı `.xlsx`, `.xls` ve `.csv` dosyası kabul eder; ilk sayfayı okur, ilk beş kaydı önizler ve JSON indirir. Bölge ayırıcıda `BÖLGE ADI` sütunu kullanılır. Harita aracının beklediği sütunlar `SubeAdi`, `SubeLat`, `SubeLong`, `BolgeAdi`, `BolgeLat`, `BolgeLong` ve `Mesafe` şeklindedir.

Mevcut kaynaklarda environment variable üzerinden yapılandırma altyapısı yoktur; bu nedenle `.env.example` eklenmemiştir. Finansal parametreler ve dönem kuralları ilgili dosyadan kontrol edilmelidir; burada güncel kurum politikalarıyla uyumluluk iddia edilmez.

## Klasör yapısı

```text
README.md                 Portföy girişi ve uygulama listesi
.gitignore                Yerel/üretilmiş dosya hariç tutma kuralları
docs/REPOSITORY-PLAN.md    Repository adları ve düzenleme planı
docs/projects/            Proje gruplarının ayrıntılı tanıtım ve kullanımı
*.html / *.HTML           Mevcut uygulama girişleri
```

## Doğrulama ve mevcut sınırlar

Bu düzenleme dokümantasyon ve repository hazırlığı kapsamındadır. Kullanıcı tercihi doğrultusunda kod kalitesi analizi ve test geliştirme aşaması durdurulmuştur. Uygulamaların uçtan uca doğrulandığı veya finansal hesapların onaylandığı iddia edilmez. Mevcut koleksiyonda otomatik test/CI altyapısı bulunmaz.

CDN erişimi, giriş dosyasının sütunları ve uygulamaya gömülü dönem parametreleri çalışmayı etkiler. Gömülü rapor verilerinin sentetik olduğu doğrulanmamıştır. Kurum içi kullanım ile herkese açık demo içeriği ayrı değerlendirilmelidir.

## Yol haritası

- Öne çıkan uygulamaları ayrı, açıklayıcı repository adlarıyla sunmak.
- Her bağımsız repository için sütun sözlüğü ve tamamen sentetik örnekler hazırlamak.
- Uygulama bazında kısa kullanım örnekleri ve uygun ekran görüntüleri eklemek.
- Talep edildiğinde hesaplama doğrulaması ve otomatik testlere dönmek.

## Lisans

Henüz bir açık kaynak lisansı seçilmemiştir. Bu dosya bir lisans vermez; kaynak kod, üçüncü taraf bileşenler, kurum işaretleri ve gömülü içerik için kullanım/paylaşım hakları ayrıca değerlendirilmelidir.
