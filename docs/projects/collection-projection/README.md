# Tahsilat Projeksiyonu ve Hedef Simülasyonu

Aylık ticari ve bireysel tahsilatlardan günlük ortalama, yıl sonu projeksiyonu ve hedefe ulaşmak için gereken tahsilat hızını hesaplayan tarayıcı uygulaması.

[Uygulama dosyası](../../../tahsilat%20projeksiyonu.html) · [Ana portföy](../../../README.md)

## Özellikler

- Excel/CSV'nin ilk sayfasından aylık anapara ve faiz verisi okuma.
- Ticari ve bireysel segmentlerde gerçekleşen tahsilatları toplama.
- Günlük ortalama ve kalan dönem projeksiyonu.
- Kullanıcının girdiği hedef için günlük tahsilat ihtiyacı ve aylık dağılım.
- Segment sütunları ve toplam çizgisiyle grafik gösterimi.

## Hızlı başlangıç

1. [Örnek Excel dosyasını](../../../examples/collection-projection/tahsilat-demo.xlsx) indirin. Alternatif: [CSV](../../../examples/collection-projection/tahsilat-demo.csv).
2. Uygulama HTML dosyasını tarayıcıda açın; bağımlılıklar için internet bağlantısı gerekir.
3. **Excel Yükle** ile örnek dosyayı seçin.
4. Yönetim özetini inceleyin; hedef alanına örneğin `40000000000` yazıp **Hedefi Analiz Et** düğmesine basın.

Uygulamadaki **Örnek Excel İndir** bağlantısı, proje klasörünü bütünüyle indirdiğinizde veya uygulama repository'nin klasör yapısıyla sunulduğunda çalışır. Tek HTML dosyası indirdiyseniz örneği yukarıdaki bağlantıdan ayrıca indirin.

## Veri şeması

| Sütun | Tür | Örnek / anlam |
| --- | --- | --- |
| AY | Metin | `Ocak`, `Şubat`, …; Türkçe ay adı |
| SEGMENT | Metin | `Ticari` veya `Bireysel` |
| ANAPARA | Sayı | TL cinsinden anapara tahsilatı |
| FAİZ | Sayı | TL cinsinden faiz tahsilatı |

İlk satır başlık olmalıdır. Excel'de tutarları sayı olarak saklayın; CSV'de binlik ayırıcı kullanmayın. Aynı ay/segmentteki satırlar toplanır. Örnek dosyada 2026 Ocak–Haziran için 12 satır vardır; müşteri, firma veya kişisel bilgi içermez. Veriler tamamen sentetiktir. [Veri açıklaması](../../../examples/collection-projection/README.md).

## Hesaplama yaklaşımı ve sınırlar

Gerçekleşen tahsilat = anapara + faiz. Günlük ortalama, yıl başından son pozitif tahsilat ayına kadar kaynakta tanımlı iş günlerine bölünür. Kalan dönemin organik beklentisi bu ortalamayla kalan iş günlerinin çarpımıdır.

- Uygulama **2026'ya ait sabit iş günü dizisini** kullanır; otomatik tatil takvimi değildir.
- Yıl sonu özetine kaynakta sabit **9.400.000.000 TL** ek giriş eklenir. Bu uygulama varsayımıdır; örnek dosyanın içerdiği veya doğruladığı bir tahsilat değildir.
- Grafikte mevcut projeksiyon sütunu kalan ayların organik aylık ortalamasını gösterir; özet kartıyla aynı toplamı temsil etmez.
- Hedef hesabında gerçekleşen segment oranları korunur ve ek giriş ticari hedef içinden düşülür.
- Örnek veri Haziran'da biter. Kalan gün bulunmayan yıl sonu senaryosu bu demo kapsamına girmez.

## Teknolojiler ve mimari

HTML, CSS, JavaScript, Tailwind CSS, Chart.js, chartjs-plugin-datalabels ve SheetJS. Dosya okuma ve hesaplama tarayıcıda yapılır; ayrı API, sunucu veya veritabanı yoktur. Stil, yazı tipi ve kütüphaneler harici kaynaklardan yüklenir.

## Repository bilgisi

Önerilen ad: `collection-projection`.

Description: Aylık tahsilatlardan segment bazlı projeksiyon ve hedef simülasyonu.

Topics: `javascript`, `chartjs`, `sheetjs`, `dashboard`, `simulation`.

Bu ekleme otomatik uygulama test paketi içermez. Lisans henüz seçilmemiştir; [lisans durumu](../../../README.md#lisans).
