/*
  yenile.mjs - Instagram erisim anahtarini uzatir.
  60 gunluk anahtar, 24 saatten eskiyse yenilenebiliyor ve 60 gun daha uzuyor.
  Ayda bir calisir; boylece Emrullah KARA'dan bir daha parola istenmez.
  Yeni anahtari depo gizli degiskenine yazmak icin GH_PAT gerekir.
*/
import fs from "node:fs";
import crypto from "node:crypto";

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const PAT = process.env.GH_PAT;
const DEPO = process.env.GITHUB_REPOSITORY;

const y = await fetch("https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=" + encodeURIComponent(TOKEN));
const j = await y.json();
if (!j.access_token) { console.error("yenilenemedi:", JSON.stringify(j.error || j)); process.exit(1); }
const gun = Math.round(j.expires_in / 86400);
console.log("anahtar yenilendi, gecerlilik:", gun, "gun");

if (!PAT) { console.log("GH_PAT yok - yeni anahtar depoya yazilamadi, elle guncellenmeli"); process.exit(0); }

// Depo gizli degiskenini guncelle (libsodium yerine Node'un kendi kutuphanesi)
const ak = await (await fetch(`https://api.github.com/repos/${DEPO}/actions/secrets/public-key`, {
  headers: { Authorization: "Bearer " + PAT, Accept: "application/vnd.github+json" },
})).json();

const sodium = await import("libsodium-wrappers");
await sodium.default.ready;
const sifreli = sodium.default.crypto_box_seal(
  sodium.default.from_string(j.access_token),
  sodium.default.from_base64(ak.key, sodium.default.base64_variants.ORIGINAL)
);
const govde = { encrypted_value: sodium.default.to_base64(sifreli, sodium.default.base64_variants.ORIGINAL), key_id: ak.key_id };
const c = await fetch(`https://api.github.com/repos/${DEPO}/actions/secrets/INSTAGRAM_ACCESS_TOKEN`, {
  method: "PUT",
  headers: { Authorization: "Bearer " + PAT, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
  body: JSON.stringify(govde),
});
console.log("gizli degisken guncellendi:", c.status);
