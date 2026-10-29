import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/CategoryPage";
import { JsonLd } from "@/components/JsonLd";
import { CITIES, type City } from "@/lib/cities";
import {
  cityDescription,
  cityFaqs,
  cityKeywords,
  cityTitle,
  genericFaqs,
  nationalDescription,
  nationalTitle,
  terms,
} from "@/lib/content";
import { MACHINES, getCategory, getMachine, type CategoryView, type Faq } from "@/lib/machines";
import {
  IDS,
  breadcrumbSchema,
  faqSchema,
  graph,
  itemListSchema,
  serviceSchema,
  webPageSchema,
  type Crumb,
} from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { allPageSlugs, categoryPath, cityPath, isIndexable, parsePageSlug, type ParsedSlug } from "@/lib/slugs";

/**
 * Programatik SEO rotası: /kiralik-{makine} ve /kiralik-{makine}-{sehir}.
 * Derleme sırasında 6 ulusal + 6×81 şehir = 492 sayfa statik üretilir; bilinmeyen adresler 404 döner.
 */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPageSlugs().map((slug) => ({ slug }));
}

function resolve(slug: string): { parsed: ParsedSlug; category: CategoryView } | null {
  const parsed = parsePageSlug(slug);
  if (!parsed) return null;
  const category = getCategory(parsed.category);
  return category ? { parsed, category } : null;
}

function pathOf(parsed: ParsedSlug): string {
  return parsed.kind === "city" ? cityPath(parsed.category, parsed.city) : categoryPath(parsed.category);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) return {};
  const { parsed, category } = r;
  if (parsed.kind === "city") {
    return pageMetadata({
      title: cityTitle(category.slug, parsed.city),
      description: cityDescription(category, parsed.city),
      path: pathOf(parsed),
      keywords: cityKeywords(category, parsed.city),
      noindex: !isIndexable(parsed),
    });
  }
  return pageMetadata({
    title: nationalTitle(category.slug),
    description: nationalDescription(category),
    path: pathOf(parsed),
    keywords: [...category.aliases],
  });
}

function crumbsFor(parsed: ParsedSlug, category: CategoryView): Crumb[] {
  const base: Crumb[] = [
    { name: "Ana Sayfa", path: "/" },
    { name: "Makineler", path: "/makineler" },
    { name: terms(category.slug).kiralik, path: categoryPath(category.slug) },
  ];
  if (parsed.kind === "city") {
    base.push({ name: `${parsed.city.name} ${terms(category.slug).kiralik}`, path: pathOf(parsed) });
  }
  return base;
}

function faqsFor(parsed: ParsedSlug, category: CategoryView): Faq[] {
  if (parsed.kind === "city") {
    return getMachine(category.slug) ? cityFaqs(category, parsed.city) : genericFaqs(parsed.city.name);
  }
  const machine = getMachine(category.slug);
  return machine ? [...machine.faqs, ...genericFaqs().slice(1)] : genericFaqs();
}

/** Sayfaya özgü ItemList: şehir sayfasında 5 makine türü, ulusal sayfada 81 il / 5 makine. */
function listFor(parsed: ParsedSlug, category: CategoryView) {
  const path = pathOf(parsed);
  if (parsed.kind === "city") {
    return itemListSchema({
      path,
      name: `${parsed.city.name} kiralık makine türleri`,
      items: MACHINES.map((m) => ({ name: `${parsed.city.name} ${terms(m.slug).kiralik}`, path: cityPath(m.slug, parsed.city) })),
    });
  }
  if (category.slug === "is-makinesi") {
    return itemListSchema({
      path,
      name: "Kiralık makine türleri",
      items: MACHINES.map((m) => ({ name: terms(m.slug).kiralik, path: categoryPath(m.slug) })),
    });
  }
  return itemListSchema({
    path,
    name: `81 ilde ${terms(category.slug).kiralik.toLocaleLowerCase("tr-TR")}`,
    items: CITIES.map((c: City) => ({ name: `${c.name} ${terms(category.slug).kiralik}`, path: cityPath(category.slug, c) })),
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const r = resolve(slug);
  if (!r) notFound();
  const { parsed, category } = r;

  const path = pathOf(parsed);
  const city = parsed.kind === "city" ? parsed.city : undefined;
  const crumbs = crumbsFor(parsed, category);
  const faqs = faqsFor(parsed, category);
  const name = city ? `${city.name} ${terms(category.slug).kiralik}` : terms(category.slug).kiralik;
  const description = city ? cityDescription(category, city) : nationalDescription(category);

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name, description, type: "CollectionPage", mainEntity: { "@id": IDS.service(path) } }),
          breadcrumbSchema(path, crumbs),
          serviceSchema({ path, category, city, name, description }),
          listFor(parsed, category),
          faqSchema(path, faqs),
        )}
      />
      <CategoryPage category={category} city={city} crumbs={crumbs} faqs={faqs} />
    </>
  );
}
