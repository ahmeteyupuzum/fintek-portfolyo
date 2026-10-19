# Sentetik hedefleme projesi

`demo-project.json`, HTML uygulamasının kendi deterministik demo üreticisinden oluşturulmuştur. Gerçek verinin maskelenmiş/küçültülmüş hali değildir.

- 12 hayali şube, 4 hayali il, 4 Bölge ve 2 Merkez birimi.
- 2026-Q1 / Q2 / Q3 geçmişi, Q4 başlangıç portföyü.
- 12 Bölge EYO segmenti; Merkez ticari segmentleri ve üç risk bandı.
- Geçmiş hedefler ve alternatif günlük kaynak örnekleri.
- Bir eşleşmeyen günlük kayıt ve alternatif kaynak farkı, veri kalite ekranını göstermek için bilinçli bırakılmıştır.
- Senaryolar ve işlem geçmişi boştur; gerçek veri/metodoloji onayları kapalıdır.

Uygulama bu veriyi ilk açılışta zaten üretir. Dosyayı tekrar denemek için **Raporlar → Yedekten geri yükle** adımında seçin. Demo etiketi ve onay engelleri, örnek tutarların gerçek/nihai hedef sanılmasını önler.

Yeniden üretme:

```bash
node tools/collection-targeting/generate-demo.cjs
```

Gerçek müşteri, çalışan, kurum, şube veya hesap kayıtlarını bu klasöre eklemeyin. SQL paketi ayrı, küçük bir test veri kümesi kullanır; JSON ile aynı tutarları üretmesi beklenmez.
