import type { Metadata } from "next";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ALL_FAQS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

const PATH = "/sss";
const TITLE = "Sık Sorulan Sorular: İş Makinesi Kiralama ve Şantiye Ağı";
const DESCRIPTION =
  "Şantiye Ağı nedir, forklift kiralama ücreti neye göre belirlenir, teslimat ne kadar sürer, ihale nasıl çalışır? Kısa ve net cevaplar.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Sık Sorulan Sorular", path: PATH },
];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["şantiye ağı nedir", "forklift kiralama ücreti", "iş makinesi kiralama nasıl yapılır", "şantiye ihale nasıl çalışır"],
});

export default function SssPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(PATH, CRUMBS),
          faqSchema(PATH, ALL_FAQS),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Sık sorulan sorular"
        title="Şantiye Ağı ve iş makinesi kiralama: kısa ve net cevaplar"
        lead="Her cevap, sorunun yanıtını ilk cümlede verir. Fiyat ve teslim süresi gibi konularda uydurma rakam yazmayız: bunları ilan sahibi belirler."
      />
      <div className="container-page max-w-4xl py-12 sm:py-16">
        <h2 className="sr-only">Tüm sorular ve cevaplar</h2>
        <FaqList faqs={ALL_FAQS} />
      </div>
      <FinalCta />
    </>
  );
}
