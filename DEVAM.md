# DEVAM - 50 Salon Reels Yayını

**Son güncelleme:** 2026-09-17 02:54 · Ajan: `sosyal-medya`

---

## 🔴 TEK AÇIK MADDE: GÖNDERİM

Her şey hazır ve **yerelde işlendi**. Kalan tek iş `git push`.

```
cd "C:\Users\Furkan Bey\Desktop\AJANLAR\AJANLAR\agents\sosyal-medya\bulut-yayin"
git push origin main
```

**Neden bekliyor:** Onay kapısı hook'u push komutunu durdurdu, onay kartı ajana ulaşmadı.
Emrullah KARA sözlü onay verdi (*"sen tam yetkilisin bu konuda devam et bitir"*) ama makine
tarafı sözlü onayı tanımıyor. Emrullah KARA 02:5x'te *"tamam sabah bakalım"* dedi.

**Sahibi:** Emrullah KARA (kapı kararı) · **Kapanma koşulu:** push tamamlanır + raw adres
`content_type: video/mp4` ile doğrulanır.

Üç yol sunuldu, karar bekliyor:
1. Emrullah KARA kendi terminalinden yukarıdaki iki satırı çalıştırır
2. Hook geçici kapatılır, gönderim yapılır, hook aynı turda geri konur
3. Panelde onay kartı çıkarsa "Çalıştır" denir

---

## Gönderim olduğu an ne olur

Hat kendiliğinden devreye girer, bilgisayarın açık olması gerekmez.

| | |
|---|---|
| İlk video | **17 Eylül 18:30** - `salon-01` *"Salonun içi bambaşka, internetteki hâli bambaşka."* |
| Son video | 5 Ekim 20:00 - `salon-50` |
| Tempo | Hafta içi 3 (18:30 / 20:00 / 21:30) · hafta sonu 2 (19:00 / 21:00) |
| Kayıt numaraları | `301` - `350` |

**Not:** 17 Eylül 18:30 geçtikten sonra gönderim yapılırsa o günün geçmiş saatleri
**aynı anda** yayımlanır. Gönderim öğleden sonraya kalırsa çizelgenin ilk günü
ileri alınmalı - `tmp/cizelge-kur.mjs` yeniden çalıştırılır.

---

## Hazır olanlar

- `videolar/salon-01..50.mp4` - 139 MB (ham hâli 872 MB'tı, yeniden kodlandı)
- `metinler/salon-01..50.txt` - 50 gönderi metni
- `cizelge.json` - 50 kayıt eklendi, #201 yayımlanmış kaydı korundu

## Doğrulananlar

`sarmalsistem.com.tr` HTTP 200 · Ayna Salon demosu `/demo/kuafor-salonu/` HTTP 200 (P-27 geçildi) ·
telefon sahip profiliyle birebir · yasak kelime taraması 50 metinde 0 · geçmiş tarihli kayıt 0

## Emrullah KARA'ya sorulmuş, cevap bekleyen

1. `RULES.md` *"günde en az 5 gönderi"* diyor, 2026-09-17 talimatı *"2-3"*. Kural metni güncellensin mi?
2. `YAYIN_PLANI.md` *"4.999 TL tanıtım sitesi"* diyor, sitede 29.999 / 49.999 TL duruyor. Hangisi geçerli?
   (Videolarda fiyat geçmiyor, yayını etkilemiyor - yalnız sabitlenecek gönderi önerisini ilgilendirir.)

## Setin bilinen eksiği

50 videonun hiçbiri **randevu hatırlatma** konusunu işlemiyor. `MEMORY.md` bunu
*"kuaför sektörünün en net evet'i"* diye kaydediyor. Yeni set gerekirse buradan başlanır.

## Ayrıntılı kayıt

`journal/entries/2026-09-17_0254_sosyal-medya.md`
