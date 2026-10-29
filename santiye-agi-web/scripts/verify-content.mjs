#!/usr/bin/env node
/**
 * Derleme sonrası içerik doğrulaması (`npm run build && npm run verify`).
 * Üretilen statik HTML'i okuyup şunları denetler:
 *  - 81 il verisi (benzersiz slug/plaka, bölge dağılımı)
 *  - Her sayfada tek <h1>, makul <title> ve meta description uzunluğu, canonical adresi
 *  - Tüm JSON-LD blokları geçerli JSON mu, @id'ler çakışıyor mu
 *  - FAQPage JSON-LD soru ve cevapları görünür metinle birebir aynı mı
 *  - İç bağlantıların hepsi var olan bir sayfaya gidiyor mu (kırık link yok)
 *  - Başlık sırası atlamıyor mu (h1 → h2 → h3), içerik "hidden" akış bloklarına çıkarılmamış mı
 *  - Sitemap'teki her adres var olan bir sayfa mı ve noindex mi
 * Hata varsa çıkış kodu 1 olur.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, ".next", "server", "app");
if (!existsSync(appDir)) {
  console.error("Önce `npm run build` çalıştırın (.next/server/app bulunamadı).");
  process.exit(1);
}

const errors = [];
const warnings = [];
const fail = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

// ───────── Yardımcılar ─────────
const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#x27;": "'", "&#39;": "'", "&apos;": "'", "&nbsp;": " " };
const decode = (s) => s.replace(/&(amp|lt|gt|quot|apos|nbsp|#x27|#39);/g, (m) => ENT[m] ?? m);
const textOf = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

// ───────── 1) Şehir verisi (kaynak dosyadan) ─────────
{
  const src = readFileSync(path.join(root, "src/lib/cities.ts"), "utf8");
  const rows = [...src.matchAll(/\["(\d{2})", "([^"]+)", "([^"]+)"\]/g)].map((m) => ({ plate: m[1], name: m[2], region: m[3] }));
  if (rows.length !== 81) fail("cities", `81 il bekleniyordu, ${rows.length} bulundu`);
  const plates = new Set(rows.map((r) => r.plate));
  if (plates.size !== 81) fail("cities", "plaka kodları benzersiz değil");
  for (let i = 1; i <= 81; i++) if (!plates.has(String(i).padStart(2, "0"))) fail("cities", `plaka ${i} eksik`);
  const regions = {};
  for (const r of rows) regions[r.region] = (regions[r.region] ?? 0) + 1;
  const expected = { Marmara: 11, Ege: 8, Akdeniz: 8, "İç Anadolu": 13, Karadeniz: 18, "Doğu Anadolu": 14, "Güneydoğu Anadolu": 9 };
  for (const [k, v] of Object.entries(expected)) if (regions[k] !== v) fail("cities", `${k}: ${v} il bekleniyordu, ${regions[k]} bulundu`);
}

// ───────── Türkçe ek denetimi için yardımcılar ─────────
const lastVowel = (w) => (w.toLocaleLowerCase("tr-TR").match(/[aeıioöuüâîû]/g) || ["e"]).pop();
const expectedQuestion = (w) => ("aıâ".includes(lastVowel(w)) ? "mı" : "eiî".includes(lastVowel(w)) ? "mi" : "ouû".includes(lastVowel(w)) ? "mu" : "mü");
const expectedLocative = (name) => {
  const l = name.toLocaleLowerCase("tr-TR");
  const back = /[aıouâû]/.test(lastVowel(l));
  return `${/[çfhkpsşt]$/.test(l) ? "t" : "d"}${back ? "a" : "e"}`;
};
const CITY_NAMES = [...readFileSync(path.join(root, "src/lib/cities.ts"), "utf8").matchAll(/\["\d{2}", "([^"]+)", "[^"]+"\]/g)].map((m) => m[1]);

// ───────── 2) Sayfalar ─────────
const files = walk(appDir).filter((f) => !f.endsWith("_not-found.html") && !f.includes(`${path.sep}_`));
const routeOf = (f) => {
  let r = "/" + path.relative(appDir, f).replace(/\\/g, "/").replace(/\.html$/, "");
  if (r === "/index") r = "/";
  return r;
};
const pages = new Map();
for (const f of files) pages.set(routeOf(f), readFileSync(f, "utf8"));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://santiyeagi.com.tr").replace(/\/+$/, "");
// Statik dosya ve rota işleyicileri de geçerli iç bağlantı hedefidir.
const extraTargets = new Set(["/llms.txt", "/llms-full.txt", "/ai.txt", "/humans.txt", "/sitemap.xml", "/robots.txt", "/manifest.webmanifest", "/og.png"]);
const noindex = new Set();
let faqPagesChecked = 0;
let titleLong = 0;

for (const [route, html] of pages) {
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(route, `tek <h1> bekleniyordu, ${h1s} bulundu`);

  // Başlık sırası: aşağı inerken seviye atlanmamalı (erişilebilirlik ve yapay zekâ ayrıştırması için).
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      fail(route, `başlık sırası atlıyor: h${levels[i - 1]} → h${levels[i]}`);
      break;
    }
  }
  // İçerik Suspense ile "hidden" akış bloğuna çıkarılırsa JS'siz okuyucular ve basit tarayıcılar göremez.
  if (/<div hidden id="S:\d+"/.test(html)) fail(route, "içerik gizli akış bloğunda (Suspense): tüm içerik düz HTML olmalı");

  const title = decode(/<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? "");
  if (!title) fail(route, "başlık yok");
  else if (title.length > 70) {
    titleLong++;
    warn(route, `başlık ${title.length} karakter: ${title}`);
  }

  const desc = decode(/<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "");
  if (!desc) fail(route, "meta description yok");
  else if (desc.length < 70 || desc.length > 165) warn(route, `description ${desc.length} karakter`);

  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const expectedCanonical = siteUrl + (route === "/" ? "" : route);
  if (!canonical) fail(route, "canonical yok");
  else if (canonical.replace(/\/$/, "") !== expectedCanonical) fail(route, `canonical beklenen ${expectedCanonical}, bulunan ${canonical}`);

  if (/<meta name="robots" content="[^"]*noindex/.test(html)) noindex.add(route);
  if (!/<html lang="tr"/.test(html)) fail(route, "html lang=tr yok");
  if (!/<meta property="og:image" content="[^"]+/.test(html)) fail(route, "og:image yok");

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (blocks.length < 2) fail(route, `en az 2 JSON-LD bloğu bekleniyordu (site + sayfa), ${blocks.length} bulundu`);
  const ids = [];
  const faqNodes = [];
  for (const b of blocks) {
    let data;
    try {
      data = JSON.parse(b);
    } catch (e) {
      fail(route, `JSON-LD geçersiz: ${e.message}`);
      continue;
    }
    if (data["@context"] !== "https://schema.org") fail(route, "JSON-LD @context hatalı");
    for (const node of data["@graph"] ?? [data]) {
      if (node["@id"]) ids.push(node["@id"]);
      if (node["@type"] === "FAQPage") faqNodes.push(node);
      if (JSON.stringify(node).includes("aggregateRating")) fail(route, "aggregateRating bulunmamalı (gerçek veri yok)");
    }
  }
  const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
  if (dup.length) fail(route, `yinelenen @id: ${[...new Set(dup)].join(", ")}`);

  // FAQPage ↔ görünür metin
  const visible = textOf(html.replace(/<noscript[\s\S]*?<\/noscript>/g, " "));

  // Türkçe dil denetimi: görünür metin + başlık + meta açıklama (arama sonuçlarında da görünür)
  const checked = `${visible} ${title} ${desc}`;
  // Türkçe soru eki ünlü uyumu ("manitou mu", "forklift mi")
  for (const m of checked.matchAll(/([\p{L}]+) (mı|mi|mu|mü)(?=[ ?.,])/gu)) {
    if (["Hangi", "Ne", "Neden", "Nasıl"].includes(m[1])) continue;
    const exp = expectedQuestion(m[1]);
    if (exp !== m[2]) fail(route, `soru eki hatalı: "${m[1]} ${m[2]}" → "${m[1]} ${exp}"`);
  }
  // Şehir adı + bulunma eki ("İzmir'de", "Kars'ta", "Ankara'daki")
  for (const name of CITY_NAMES) {
    for (const m of checked.matchAll(new RegExp(`${name}'(d[ae]|t[ae])(ki)?(?![\\p{L}])`, "gu"))) {
      if (m[1] !== expectedLocative(name)) fail(route, `bulunma eki hatalı: "${name}'${m[1]}" → "${name}'${expectedLocative(name)}"`);
    }
  }
  for (const faq of faqNodes) {
    faqPagesChecked++;
    for (const q of faq.mainEntity ?? []) {
      const name = q.name.replace(/\s+/g, " ").trim();
      const ans = q.acceptedAnswer.text.replace(/\s+/g, " ").trim();
      if (!visible.includes(name)) fail(route, `FAQ sorusu sayfada görünmüyor: ${name}`);
      if (!visible.includes(ans)) fail(route, `FAQ cevabı sayfada birebir görünmüyor: ${name}`);
    }
  }
}

// ───────── 3) İç bağlantılar ─────────
const broken = new Map();
for (const [route, html] of pages) {
  for (const m of html.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    let href = decode(m[1]);
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      if (href.startsWith(siteUrl)) href = href.slice(siteUrl.length) || "/";
      else continue;
    }
    if (!href.startsWith("/")) continue; // sayfa içi #bağlantı
    const [pathname, hash] = href.split("#");
    const target = pathname === "" ? route : pathname.replace(/\/$/, "") || "/";
    if (!pages.has(target) && !extraTargets.has(target)) {
      broken.set(`${target}`, (broken.get(target) ?? 0) + 1);
    } else if (hash && pages.has(target) && !pages.get(target).includes(`id="${hash}"`)) {
      fail(route, `bağlantı hedefinde #${hash} yok: ${target}`);
    }
  }
}
for (const [t, n] of broken) fail("bağlantı", `${t} bulunamadı (${n} yerde)`);

// ───────── 4) Sitemap ─────────
{
  const smPath = path.join(appDir, "sitemap.xml.body");
  const alt = path.join(root, ".next", "server", "app", "sitemap.xml.body");
  const file = existsSync(smPath) ? smPath : alt;
  if (!existsSync(file)) {
    warn("sitemap", "sitemap.xml.body bulunamadı, atlandı");
  } else {
    const xml = readFileSync(file, "utf8");
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
    const set = new Set(locs);
    if (set.size !== locs.length) fail("sitemap", "yinelenen adres var");
    for (const loc of locs) {
      const r = loc.startsWith(siteUrl) ? loc.slice(siteUrl.length) || "/" : null;
      if (!r) fail("sitemap", `farklı alan adı: ${loc}`);
      else if (!pages.has(r)) fail("sitemap", `sayfa yok: ${r}`);
      else if (noindex.has(r)) fail("sitemap", `noindex sayfa sitemap'te: ${r}`);
    }
    for (const r of pages.keys()) {
      if (!noindex.has(r) && !set.has(siteUrl + (r === "/" ? "" : r)) && !set.has(siteUrl + r)) fail("sitemap", `indekslenebilir sayfa sitemap'te yok: ${r}`);
    }
    console.log(`sitemap: ${locs.length} adres`);
  }
}

console.log(`sayfa: ${pages.size} · FAQPage doğrulanan: ${faqPagesChecked} · noindex: ${noindex.size} · uzun başlık uyarısı: ${titleLong}`);
if (warnings.length) {
  console.log(`\nUYARILAR (${warnings.length}):`);
  for (const w of warnings.slice(0, 15)) console.log("  -", w);
  if (warnings.length > 15) console.log(`  … ${warnings.length - 15} uyarı daha`);
}
if (errors.length) {
  console.error(`\nHATALAR (${errors.length}):`);
  for (const e of errors.slice(0, 40)) console.error("  ✗", e);
  if (errors.length > 40) console.error(`  … ${errors.length - 40} hata daha`);
  process.exit(1);
}
console.log("\n✓ Tüm kontroller geçti.");
