# Sentetik SQL veri hazırlama paketi

Bu paket, tahsilat hedefleme uygulamasının veri hazırlama mantığını **hayali şema, tablo, kaynak sütunu ve kayıtlarla** gösterir. Gerçek kurum şeması, tablo/sütun sözlüğü, kullanıcı bilgisi, bağlantı adresi veya gerçek sorgu sonucu içermez. Eski adlarla yeni adların eşleştirme listesi yayımlanmaz.

## İçerik

| Dosya | İşlev |
| --- | --- |
| `00_demo_schema.sql` | İzole bir Oracle deneme şemasında üç hayali tablo |
| `01_region_portfolio.sql` | A: Şube ve EYO bazında stok ve dönem tahsilatı |
| `02_center_portfolio.sql` | B: Merkez, şube, risk bandı ve EYO bazında stok ve tahsilat |
| `03_daily_collections.sql` | C: Referans envantere eşleşen/eşleşmeyen günlük tahsilat |
| `04_daily_reconciliation.sql` | D: Günlük alternatif kaynak ve mutabakat çıktısı |
| `05_synthetic_seed.sql` | Altı portföy kaydı ve bir eşleşmeyen tahsilat dahil sıfırdan üretilmiş test verisi |

Kaynak tabloları `DEMO_FINANCE.demo_snapshot`, `demo_cases` ve `demo_events` adındadır. Kaynak sütunları `customer_key`, `account_key`, `branch_key`, `balance_amount`, `posted_date` gibi hayali adlarla tanımlıdır. `DEMO-*` kayıt anahtarları gerçek kişi, hesap veya birim numarası değildir.

## Çıktı alanları neden Türkçe?

Sorgunun dış SELECT katmanındaki `SUBEKODU`, `STOK`, `TAHSILAT` gibi takma adlar, HTML uygulamasının genel veri içe aktarma sözleşmesidir; **veritabanındaki kaynak sütun adları değildir**. Sorgunun içindeki kaynak ve ara hesaplama sütunları hayali İngilizce adlar kullanır. EYO etiketleri de uygulamanın örnek segment sözlüğüne uyar.

## Mantık ve sınırlar

- Envanter tek referans güne; tahsilat başlangıç/son gün aralığına göre seçilir. Son gün dahildir.
- Müşteri riski, birim filtresinden önce ortak envanter üzerinden hesaplanır.
- Mükerrer hesap, eksik tutar, null bileşen ve eşleşmeyen tahsilat ayrı görünür.
- Anapara, masraf ve faiz bileşenleri toplanır; günlük kayıtlar portföy tahsilatına ikinci kez eklenmez.
- Örnek risk bantları, hareket kodları ve teminat etiketleri yalnızca demonstrasyondur; güncel bir kurum politikası değildir. Örnek teminat son ekleri `77` / `88` olarak seçilmiştir.

Oracle örneğinde önce **yalnızca izole deneme şemasında** `00_demo_schema.sql`, ardından `05_synthetic_seed.sql` çalıştırılır. Şema oluşturma/yetki verme komutu verilmez. Rapor SELECT'lerinde parametreler `inventory_date=30.09.2026`, `period_start=01.10.2026`, `period_end=31.12.2026` seçilebilir. Tarih koşulu: envanter ≤ başlangıç ≤ bitiş.

```bash
python tests/collection-targeting/sql_test.py
```

Test, Python standart kütüphanesiyle bellekte SQLite kullanır; Oracle tarih işlevleri için sınırlı bir test uyarlaması uygular. Bu bir canlı Oracle derleme, bağlantı, performans veya üretim uygunluk testi değildir. Uygulama hiçbir veritabanına bağlanmaz; paketi yalnızca indirir.
