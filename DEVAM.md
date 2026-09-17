# DEVAM - 50 Salon Reels Yayını

**Son güncelleme:** 2026-09-17 09:55 · Ajan: `sosyal-medya`

---

## ✅ YAYINDA - açık madde yok

Gönderim 2026-09-17 09:52'de tamamlandı (`894d665`). Hat çalışıyor, bilgisayarın açık
olması gerekmiyor - GitHub tarafında 15 dakikada bir bakılıyor.

| | |
|---|---|
| İlk video | **17 Eylül 18:30** - `salon-01` *"Salonun içi bambaşka, internetteki hâli bambaşka."* |
| Son video | 5 Ekim 20:00 - `salon-50` |
| Tempo | Hafta içi 3 (18:30 / 20:00 / 21:30) · hafta sonu 2 (19:00 / 21:00) |
| Kayıt numaraları | `301` - `350` |
| Yayın penceresi | 18:07-22:52 TR (`cron: 7,22,37,52 15-19 * * *` UTC) |

## Gönderim sonrası doğrulama - 2026-09-17 09:54

| Ölçüm | Sonuç |
|---|---|
| `videolar/salon-01.mp4` | 200 · 2.608.135 bayt |
| `videolar/salon-11.mp4` | 200 · 2.975.066 bayt |
| `videolar/salon-21.mp4` | 200 · 2.986.624 bayt |
| `videolar/salon-50.mp4` | 200 · 3.045.080 bayt |
| `metinler/salon-01.txt` | 200 · `text/plain; charset=utf-8` · 302 bayt |
| Uzaktaki çizelge | 50 bekleyen · 5 yayımlanmış · **geciken kayıt 0** |

Boyutlar gerçekçi (`MEMORY.md`: video 1,5 MB üstü olmalı). `content_type` mp4 için
`application/octet-stream` dönüyor - GitHub raw böyle veriyor ve **bu yol 2026-09-12'de
uçtan uca kanıtlandı** (kuaför Reels'i aynı klasörden yayımlandı, kimlik `18150948436535686`).

## İlk yayından sonra bakılacak

18:30'daki ilk video çıktıktan sonra çizelgede `durum: yayimlandi` ve `gonderiKimligi`
görünmeli. Görünmüyorsa iş akışı günlüğüne bakılır. **Tek olumsuz okumadan hüküm kurulmaz** -
`deneme` sayacı 3'e kadar tekrar dener.

## Emrullah KARA'ya sorulmuş - İKİSİ DE CEVAPLANDI (2026-09-17)

**1. Tempo kuralı → değişmedi.** Emrullah KARA: *"şimdilik 5 kalsın"*. `RULES.md` madde 44
(*"günde en az 5 gönderi, tüm platformlar toplamı"*) **olduğu gibi duruyor, dokunulmadı.**
Bu hattın verdiği 2-3 gönderi yalnız Instagram'dır; kural tüm platformların toplamını sayar.
Aradaki fark bilinçlidir, çelişki değildir.

**2. Fiyat → çelişki yoktu, ölçüm eksikti.** Emrullah KARA üç kademeyi ayırdı: *"tanıtım sitesi
4999 ama bağlantılı entegreli site 29999 satış sitesi ise 49999"*. Üçü de sitede yazılı
(ölçüldü). Dün *"çelişki var"* diye bildirilmişti - **yanlıştı**, sayfanın yalnız bir bölümü
okunmuştu. `YAYIN_PLANI.md` 4.999 TL'yi doğru söylüyor, o en alt kademe.

Tam kayıt ve kademe tablosu: `../../satis/MEMORY.md` → "Fiyat Kademeleri".

> **🔴 Oradan çıkan açık risk:** sitedeki 29.999 TL paketi *"randevu ve hatırlatma düzeni"*
> içeriyor, `orchestrator/HIZMET_KATALOGU.md` ise hatırlatmayı **teslim edilemez** gösteriyor
> (WhatsApp Business hesabı açılmadı; 2026-09-17'de yeniden ölçüldü, `WHATSAPP_PHONE` boş).
> **Bu yayın hattını etkilemez** - 50 videonun hiçbirinde fiyat ve hatırlatma vaadi geçmiyor.
> Kademe 2 için teklif hazırlanacağı gün `satis` ajanı bunu Emrullah KARA'ya sorar.

## Setin bilinen eksiği

50 videonun hiçbiri **randevu hatırlatma** konusunu işlemiyor. `MEMORY.md` bunu
*"kuaför sektörünün en net evet'i"* diye kaydediyor. Yeni set gerekirse buradan başlanır.

## Ayrıntılı kayıt

`journal/entries/2026-09-17_0254_sosyal-medya.md`
