/*
  yayinla.mjs - BULUT YAYIN. Emrullah KARA'nin bilgisayari KAPALIYKEN de calisir.

  Nerede calisir: GitHub Actions, 15 dakikada bir (.github/workflows/yayin.yml).
  Gorsel nerede durur: bu deponun gorseller/ klasoru. Instagram gorseli
  "yayin denemesi aninda" acik bir adresten cektigi icin raw.githubusercontent.com
  adresi yeterlidir. Site kullanilmaz (P-21), Netlify kullanilmaz (kredi).

  Sir: INSTAGRAM_ACCESS_TOKEN yalnizca depo gizli degiskeninde durur.
*/
import fs from "node:fs";

const CIZELGE = "cizelge.json";
const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const DEPO = process.env.GITHUB_REPOSITORY || "";
const DAL = process.env.GITHUB_REF_NAME || "main";
const KURU = process.argv.includes("--kuru");

if (!TOKEN) { console.error("INSTAGRAM_ACCESS_TOKEN yok"); process.exit(1); }

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));
const hamAdres = (klasor, ad) => `https://raw.githubusercontent.com/${DEPO}/${DAL}/${klasor}/${ad}`;
const gorselAdresi = (ad) => hamAdres("gorseller", ad);
const videoAdresi = (ad) => hamAdres("videolar", ad);

async function graph(yol, alanlar) {
  const y = await fetch("https://graph.instagram.com/v23.0/" + yol, {
    method: "POST", body: new URLSearchParams(alanlar),
  });
  const j = await y.json();
  if (!y.ok || j.error) throw new Error(yol + " -> " + JSON.stringify(j.error || j));
  return j;
}

async function graphOku(yol, alanlar) {
  const y = await fetch("https://graph.instagram.com/v23.0/" + yol + "?" + new URLSearchParams(alanlar));
  const j = await y.json();
  if (!y.ok || j.error) throw new Error(yol + " -> " + JSON.stringify(j.error || j));
  return j;
}

/*
  Video (Reels) kabi HEMEN hazir olmaz - Instagram once videoyu isler.
  Resmi belge (developers.facebook.com/docs/instagram-platform/content-publishing):
  "querying a container's status once per minute, for no more than 5 minutes."
  Biz 10 saniyede bir soruyoruz, en fazla 5 dakika. Bekleme olmadan yayimlamak
  "Media ID is not available" hatasi verir.
*/
async function kabiBekle(kapId) {
  const SINIR = 30;            // 30 x 10 sn = 5 dakika
  for (let i = 1; i <= SINIR; i++) {
    await bekle(10000);
    const d = await graphOku(kapId, { fields: "status_code,status", access_token: TOKEN });
    if (d.status_code === "FINISHED") { console.log(`  kap hazir (${i * 10} sn)`); return; }
    if (d.status_code === "ERROR" || d.status_code === "EXPIRED") {
      throw new Error("kap basarisiz: " + d.status_code + " " + (d.status || ""));
    }
    if (i % 6 === 0) console.log(`  kap hala isleniyor (${i * 10} sn)`);
  }
  throw new Error("kap 5 dakikada hazir olmadi");
}

const cizelge = JSON.parse(fs.readFileSync(CIZELGE, "utf8"));
const simdi = new Date();
const sirasiGelen = cizelge.gonderiler.filter(
  (g) => g.durum === "bekliyor" && new Date(g.zaman) <= simdi
);

if (!sirasiGelen.length) {
  const kalan = cizelge.gonderiler.filter((g) => g.durum === "bekliyor").length;
  console.log(`sirasi gelen yok (bekleyen: ${kalan})`);
  process.exit(0);
}

let degisti = false;
for (const g of sirasiGelen) {
  // Satirda "video" alani varsa Reels, yoksa eskisi gibi gorsel. Eski satirlar aynen calisir.
  const reels = Boolean(g.video);
  const adres = reels ? videoAdresi(g.video) : gorselAdresi(g.gorsel);
  const metin = fs.readFileSync("metinler/" + g.metin, "utf8").trim();
  console.log(`sira: #${g.no} ${reels ? "REELS " + g.video : g.gorsel} (${metin.length} karakter)`);

  if (KURU) { console.log("  KURU - yayimlanmadi"); continue; }

  try {
    // Dosya gercekten disaridan cekilebiliyor mu - varsayilmaz, olculur.
    const kontrol = await fetch(adres, { method: "HEAD" });
    if (!kontrol.ok) throw new Error("adres acilmadi: HTTP " + kontrol.status);

    let kap;
    if (reels) {
      kap = await graph("me/media", {
        media_type: "REELS", video_url: adres, caption: metin, access_token: TOKEN,
      });
      await kabiBekle(kap.id);          // video islenene kadar beklenir
    } else {
      kap = await graph("me/media", { image_url: adres, caption: metin, access_token: TOKEN });
      await bekle(5000);
    }
    const son = await graph("me/media_publish", { creation_id: kap.id, access_token: TOKEN });
    g.durum = "yayimlandi";
    g.yayinZamani = new Date().toISOString();
    g.gonderiKimligi = son.id;
    console.log(`  YAYIMLANDI: ${son.id}`);
  } catch (e) {
    g.deneme = (g.deneme || 0) + 1;
    g.not = String(e.message).slice(0, 300);
    g.durum = g.deneme < 3 ? "bekliyor" : "hata";
    console.error(`  HATA (${g.deneme}. deneme): ${g.not}`);
  }
  degisti = true;
  fs.writeFileSync(CIZELGE, JSON.stringify(cizelge, null, 2));
  await bekle(8000);
}

if (degisti) console.log("cizelge guncellendi");
