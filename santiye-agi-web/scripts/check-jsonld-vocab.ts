import { readFileSync } from "node:fs";
/**
 * JSON-LD sözlük denetimi: sitenin ürettiği tüm şema düğümlerindeki her özelliğin schema.org'da o tür için
 * tanımlı olduğunu `schema-dts` paketindeki resmi sözlükten doğrular. Çalıştırma: `npm run verify:schema`.
 */
const dts = readFileSync(process.argv[2] ?? "node_modules/schema-dts/dist/schema.d.ts", "utf8");

// schema-dts: interface XBase extends YBase { "prop"?: ...; }  ve  interface XLeaf extends XBase { "@type": "X" }
const ifaces = new Map<string, { ext: string[]; props: Set<string> }>();
const re = /(?:export )?interface (\w+) extends ([^{]+)\{([\s\S]*?)\n\}/g;
for (const m of dts.matchAll(re)) {
  const props = new Set([...m[3]!.matchAll(/^\s+"([^"]+)"\??:/gm)].map((x) => x[1]!));
  ifaces.set(m[1]!, { ext: m[2]!.split(",").map((s) => s.trim()), props });
}
const allProps = (name: string, seen = new Set<string>()): Set<string> => {
  const out = new Set<string>();
  if (seen.has(name)) return out;
  seen.add(name);
  const i = ifaces.get(name);
  if (!i) return out;
  i.props.forEach((p) => out.add(p));
  for (const e of i.ext) allProps(e, seen).forEach((p) => out.add(p));
  return out;
};
const known = (type: string) => ifaces.has(`${type}Leaf`) || ifaces.has(`${type}Base`);
const propsOf = (type: string) => allProps(ifaces.has(`${type}Base`) ? `${type}Base` : `${type}Leaf`);

(async () => {
  const S = await import("../src/lib/schema");
  const C = await import("../src/lib/content");
  const { CITIES } = await import("../src/lib/cities");
  const M = await import("../src/lib/machines");
  const F = await import("../src/lib/faq");
  const SL = await import("../src/lib/slugs");
  const city = CITIES.find((c) => c.slug === "izmir")!;
  const cat = M.getCategory("manitou")!;
  const path = SL.cityPath("manitou", city);
  const nodes: any[] = [
    ...(S.siteGraph() as any)["@graph"],
    S.webPageSchema({ path, name: "x", description: "y", type: "CollectionPage" }),
    S.webPageSchema({ path: "/hakkimizda", name: "x", description: "y", type: "AboutPage" }),
    S.webPageSchema({ path: "/iletisim", name: "x", description: "y", type: "ContactPage" }),
    S.breadcrumbSchema(path, [{ name: "a", path: "/" }]),
    S.serviceSchema({ path, category: cat, city, name: "n", description: "d" }),
    S.itemListSchema({ path, name: "n", items: [{ name: "a", path: "/" }] }),
    S.faqSchema(path, F.HOME_FAQS),
    S.howToSchema({ path: "/", name: "n", description: "d", steps: [{ name: "a", text: "b" }] }),
  ];
  let bad = 0, checked = 0;
  const visit = (o: any, ctx: string) => {
    if (Array.isArray(o)) return o.forEach((x) => visit(x, ctx));
    if (!o || typeof o !== "object") return;
    const t = o["@type"];
    if (typeof t === "string") {
      if (!known(t)) { console.log(`✗ bilinmeyen tür ${t} (${ctx})`); bad++; return; }
      const ok = propsOf(t);
      for (const k of Object.keys(o)) {
        if (k.startsWith("@")) continue;
        checked++;
        if (!ok.has(k)) { console.log(`✗ ${t}.${k} schema.org'da tanımlı değil (${ctx})`); bad++; }
      }
    }
    for (const [k, v] of Object.entries(o)) if (!k.startsWith("@")) visit(v, `${ctx}.${k}`);
  };
  nodes.forEach((n) => visit(n, n["@type"]));
  console.log(`denetlenen özellik: ${checked}, hata: ${bad}`);
  process.exit(bad ? 1 : 0);
})();
