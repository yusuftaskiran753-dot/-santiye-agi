import type { MetadataRoute } from "next";
import { CITIES } from "@/lib/cities";
import { CATEGORY_SLUGS } from "@/lib/machines";
import { LEGAL_DOCS } from "@/lib/legal-meta";
import { SITE, absoluteUrl } from "@/lib/site";
import { INDEX_ALL_CITY_PAGES, categoryPath, cityPath } from "@/lib/slugs";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/**
 * XML site haritası: ~500 sayfa. `lastModified` içerik tarihidir (SITE.contentUpdated); içerik değiştikçe güncelleyin.
 * Öncelikli 5 şehir daha yüksek öncelik alır. INDEX_ALL_CITY_PAGES=false ise yalnızca onlar listelenir.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.contentUpdated);
  const entry = (path: string, priority: number, changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  const core: Entry[] = [
    entry("/", 1, "weekly"),
    entry("/makineler", 0.8, "weekly"),
    entry("/ihaleler", 0.7, "weekly"),
    entry("/sosyal-akis", 0.6),
    entry("/sss", 0.6),
    entry("/hakkimizda", 0.5),
    entry("/iletisim", 0.5),
    ...LEGAL_DOCS.map((d) => entry(`/${d.slug}`, 0.3, "yearly")),
  ];

  const national: Entry[] = CATEGORY_SLUGS.map((c) => entry(categoryPath(c), c === "is-makinesi" ? 0.8 : 0.9, "weekly"));

  const cityPages: Entry[] = [];
  for (const category of CATEGORY_SLUGS) {
    for (const city of CITIES) {
      if (!INDEX_ALL_CITY_PAGES && !city.priority) continue;
      const hub = category === "is-makinesi";
      const priority = city.priority ? (hub ? 0.7 : 0.8) : hub ? 0.5 : 0.4;
      cityPages.push(entry(cityPath(category, city), priority));
    }
  }

  return [...core, ...national, ...cityPages];
}
