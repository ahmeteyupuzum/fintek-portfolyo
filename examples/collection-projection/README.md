# Tahsilat projeksiyonu örnek verisi

[Excel indir](tahsilat-demo.xlsx) · [CSV indir](tahsilat-demo.csv) · [Uygulama kılavuzu](../../docs/projects/collection-projection/README.md)

İki dosya aynı tamamen sentetik veri kümesini içerir: 2026 Ocak–Haziran, her ay bir ticari ve bir bireysel kayıt, toplam 12 satır. Gerçek müşteri, firma, hesap veya kurum verisi kullanılmamıştır. Aylar tamamlanmış ayları temsil eder.

Başlıklar: `AY`, `SEGMENT`, `ANAPARA`, `FAİZ`. Tutarlar TL'dir. Excel'in ilk sayfası doğrudan yüklemeye uygundur. CSV UTF-8 BOM kodlamalı, virgülle ayrılmış ve binlik ayırıcısızdır.

Veri toplamları:

- Ticari: **7.500.000.000 TL**.
- Bireysel: **3.150.000.000 TL**.
- Genel toplam: **10.650.000.000 TL**.

Uygulamada **Excel Yükle** ile dosyalardan birini seçin. Hedef simülasyonu için `40000000000` örnek hedefini kullanabilirsiniz. Kaynaktaki 9,4 milyar TL ek giriş varsayımı bu veri dosyasına ayrıca eklenmemiştir.

Yeni veri hazırlarken ilk satırdaki başlıkları koruyun; toplam satırı veya gelecekteki aylar için dolgu satırları eklemeyin. Uygulama otomatik testleri bu veri paketinin parçası değildir.
