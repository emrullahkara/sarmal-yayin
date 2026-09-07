# Sarmal Dönüşüm - Bulut Yayın

Bu depo, Instagram gönderilerini **bilgisayar kapalıyken** yayımlar.

## Nasıl çalışır

1. `cizelge.json` hangi gönderinin ne zaman çıkacağını tutar.
2. GitHub 15 dakikada bir bakar (`.github/workflows/yayin.yml`).
3. Sırası gelen varsa görseli `gorseller/` klasöründen alır, metni `metinler/` klasöründen okur ve Instagram'a yayımlar.
4. Sonucu `cizelge.json` içine yazar.

Görsel Instagram'a `raw.githubusercontent.com` adresinden verilir. Instagram görseli yalnızca yayın anında çeker, kalıcı barındırma gerekmez.

## Kurallar

- **Site kullanılmaz.** `sarmaldonusum.com.tr` paylaşım yeri değildir.
- **Netlify kullanılmaz.** Yayın kredisi sınırlıdır.
- **Instagram yalnızca JPEG kabul eder.**
- Erişim anahtarı yalnızca depo gizli değişkeninde durur, hiçbir dosyada yazmaz.

## Gizli değişkenler

| Ad | Ne için |
|----|---------|
| `INSTAGRAM_ACCESS_TOKEN` | Yayın için. 60 günlük, ayda bir kendini yeniler |
| `GH_PAT` | Yenilenen anahtarı depoya yazmak için (isteğe bağlı) |

## Elle çalıştırma

Actions sekmesinden "Yayin" iş akışı elle tetiklenebilir.
