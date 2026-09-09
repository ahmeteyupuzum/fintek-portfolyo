# Repository hazırlık planı

Bu aşamada kaynak dosyalar taşınmadı veya yeniden adlandırılmadı. Aşağıdaki adlar yeni repository önerileridir; oluşturulmuş repository veya yayına alınmış demo değildir.

## Önerilen gruplama

| Repository adı | Kapsam / kısa açıklama | Topics |
| --- | --- | --- |
| `credit-portfolio-dashboard` | V-RADAR: tarayıcıda kredi portföyü ve takip raporlaması; tek güncel sürüm seçilmeli | javascript, dashboard, chartjs, excel |
| `collection-performance-dashboard` | Bölge ve merkez tahsilat raporları | javascript, dashboard, data-visualization |
| `action-performance-dashboard` | Aksiyon tamamlama ve birim/personel performansı | javascript, chartjs, analytics |
| `call-performance-dashboard` | Çağrı verilerinden KPI ve performans analizi | javascript, chartjs, papaparse |
| `portfolio-allocation-tool` | Takip portföyü ve şube dağıtımı | javascript, excel, browser-app |
| `payment-plan-tools` | KGF ödeme planı ve parametre tanım araçları | javascript, finance, calculator |
| `campaign-incentive-calculator` | Kampanya kılavuzu ve prim hesabı | javascript, calculator |
| `document-template-studio` | KATIP admin ve izleme modları birlikte | javascript, tinymce, document-generation |
| `customer-profile-form` | Kurumsal müşteri föyü hazırlama | javascript, forms |
| `spreadsheet-utilities` | Bölge ayırıcı ve Excel → JSON | javascript, sheetjs, jszip |
| `branch-route-tools` | Excel koordinatlarından harita ve OSRM mesafe sorgulama | javascript, leaflet, osrm |
| `browser-resume-builder` | Form tabanlı özgeçmiş ve PDF çıktısı | javascript, html2pdf, resume-builder |

## Bağımsız repository için asgari düzen

```text
README.md
.gitignore
index.html
docs/usage.md       Yalnızca README'ye sığmayan kullanım bilgisi varsa
examples/          Yalnızca tamamen sentetik örnek veri varsa
```

KATIP gibi iki girişli uygulamalarda `admin.html` ve `viewer.html` kullanılabilir. CSS/JavaScript ayırma, framework dönüşümü veya yeni bağımlılık bu aşamanın kapsamı değildir. Test ve CI dosyaları çalıştırılacak gerçek kontroller olmadan eklenmez. Lisans seçilmeden `LICENSE`; ortam değişkeni kullanılmadan `.env.example`; içerik olmadan boş klasörler oluşturulmaz.

## Uygulama sırası

1. Bu portföy README'sini giriş noktası olarak kullanmak.
2. V-RADAR için güncel sürümü seçmek; iki varyantı ayrı ürün gibi sunmamak.
3. KATIP'ın iki modunu tek repository altında anlatmak.
4. Küçük Excel araçlarını tek yardımcı araçlar repository'sinde toplamak.
5. Her repository'ye yukarıdaki gerçek teknoloji ve kapsama uygun description/topics eklemek.
6. Yayın paketinde kullanılacak gömülü içerikleri ve ekran görüntülerini belirlemek; gerekiyorsa sentetik içerikle değiştirmek.

## Mevcut GitHub durumu

İlk incelemede [fintek-portfolyo](https://github.com/ahmeteyupuzum/fintek-portfolyo) herkese açıktı; `main` dalında 13 HTML dosyası vardı. Bu yayın paketi yerel 18 HTML uygulamasını, ana README'yi ve 12 proje grubunun kullanım sayfalarını içerir. Önceden yüklenen 10 eski dosya ve yönlendirme kaldırılmıştır; ana README yalnızca güncel 18 uygulama girişini listeler. Önceki kaynak sürümleri Git geçmişinde korunur.

Bu çalışma kaynak kod değişikliği veya yeni bir deployment yapılandırması içermez. Mevcut GitHub Pages ayarları yayından sonra otomatik çalışabilir. `.gitignore`, GitHub'da zaten izlenen dosyaları veya geçmiş commit'leri kaldırmaz.
