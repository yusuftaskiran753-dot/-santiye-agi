import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { getLegalDoc, type LegalSlug } from "@/lib/legal-meta";
import { legalUpdated, readLegalHtml } from "@/lib/legal";
import { breadcrumbSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";

/** Yasal belge sayfası: içerik `content/legal/*.html` dosyasından okunur (güvenilir, kendi içeriğimiz). */
export function LegalPage({ slug }: { slug: LegalSlug }) {
  const doc = getLegalDoc(slug);
  const html = readLegalHtml(slug);
  const updated = legalUpdated(html);
  const path = `/${slug}`;
  const crumbs: Crumb[] = [
    { name: "Ana Sayfa", path: "/" },
    { name: doc.title, path },
  ];
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path, name: `Şantiye Ağı ${doc.title}`, description: doc.description }),
          breadcrumbSchema(path, crumbs),
        )}
      />
      <section className="bg-ink text-white">
        <div className="container-page py-10 sm:py-12">
          <Breadcrumbs crumbs={crumbs} light />
          <h1 className="mt-5 text-4xl text-white sm:text-5xl">Şantiye Ağı {doc.title}</h1>
        </div>
        <div className="hazard h-3" aria-hidden />
      </section>
      <div className="container-page py-10 sm:py-14">
        <article className="mx-auto max-w-3xl">
          <div className="legal-doc text-lg" dangerouslySetInnerHTML={{ __html: html }} />
          {updated ? <p className="mt-10 border-t-2 border-ink pt-4 text-sm font-semibold text-ink-3">Belge tarihi: {updated}</p> : null}
        </article>
      </div>
    </>
  );
}
