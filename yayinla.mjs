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
const gorselAdresi = (ad) => `https://raw.githubusercontent.com/${DEPO}/${DAL}/gorseller/${ad}`;

async function graph(yol, alanlar) {
  const y = await fetch("https://graph.instagram.com/v23.0/" + yol, {
    method: "POST", body: new URLSearchParams(alanlar),
  });
  const j = await y.json();
  if (!y.ok || j.error) throw new Error(yol + " -> " + JSON.stringify(j.error || j));
  return j;
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
  const adres = gorselAdresi(g.gorsel);
  const metin = fs.readFileSync("metinler/" + g.metin, "utf8").trim();
  console.log(`sira: #${g.no} ${g.gorsel} (${metin.length} karakter)`);

  if (KURU) { console.log("  KURU - yayimlanmadi"); continue; }

  try {
    // Gorsel gercekten disaridan cekilebiliyor mu - varsayilmaz, olculur.
    const kontrol = await fetch(adres);
    if (!kontrol.ok) throw new Error("gorsel adresi acilmadi: HTTP " + kontrol.status);

    const kap = await graph("me/media", { image_url: adres, caption: metin, access_token: TOKEN });
    await bekle(5000);
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
