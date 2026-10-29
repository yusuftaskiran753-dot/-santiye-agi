import { CITIES, getCity, type City } from "./cities";
import { CATEGORY_SLUGS, type CategorySlug } from "./machines";

/**
 * Programatik SEO adresleri: /kiralik-{makine}  ve  /kiralik-{makine}-{sehir}
 * (örn. /kiralik-manitou, /kiralik-manitou-izmir, /kiralik-sepetli-vinc-kahramanmaras).
 *
 * Next.js App Router, tek bir klasör adında sabit metin ile dinamik parçayı birleştirmeyi
 * ("kiralik-[makine]-[sehir]") desteklemez; bu yüzden tek bir `[slug]` rotası bu kalıbı çözümler.
 */
export const SLUG_PREFIX = "kiralik-";

export type ParsedSlug =
  | { kind: "category"; category: CategorySlug }
  | { kind: "city"; category: CategorySlug; city: City };

// "sepetli-vinc" gibi tireli adların "kiralik-sepetli-vinc-izmir" içinde doğru ayrışması için uzundan kısaya dene.
const CATEGORIES_LONGEST_FIRST = [...CATEGORY_SLUGS].sort((a, b) => b.length - a.length);

export function parsePageSlug(slug: string): ParsedSlug | null {
  if (!slug.startsWith(SLUG_PREFIX)) return null;
  const rest = slug.slice(SLUG_PREFIX.length);
  for (const category of CATEGORIES_LONGEST_FIRST) {
    if (rest === category) return { kind: "category", category };
    if (rest.startsWith(`${category}-`)) {
      const city = getCity(rest.slice(category.length + 1));
      if (city) return { kind: "city", category, city };
    }
  }
  return null;
}

export const categoryPath = (category: CategorySlug) => `/${SLUG_PREFIX}${category}`;
export const cityPath = (category: CategorySlug, city: City | string) =>
  `/${SLUG_PREFIX}${category}-${typeof city === "string" ? city : city.slug}`;

/** generateStaticParams için: 6 ulusal sayfa + 6 × 81 şehir sayfası = 492 sayfa. */
export function allPageSlugs(): string[] {
  const slugs: string[] = [];
  for (const category of CATEGORY_SLUGS) {
    slugs.push(`${SLUG_PREFIX}${category}`);
    for (const city of CITIES) slugs.push(`${SLUG_PREFIX}${category}-${city.slug}`);
  }
  return slugs;
}

/**
 * İnce içerik (thin content) riskini yönetmek için tek anahtar.
 * false yapılırsa yalnızca öncelikli 5 şehrin sayfaları indekslenir ve sitemap'e girer;
 * diğer iller `noindex, follow` olur (gerçek ilan/özgün içerik eklenene kadar güvenli seçenek).
 */
export const INDEX_ALL_CITY_PAGES = true;

export function isIndexable(parsed: ParsedSlug): boolean {
  return parsed.kind === "category" || INDEX_ALL_CITY_PAGES || parsed.city.priority;
}
