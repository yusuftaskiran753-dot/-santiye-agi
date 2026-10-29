import type { Metadata } from "next";
import { CitiesGrid } from "@/components/CitiesGrid";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { MachineCards } from "@/components/MachineCards";
import { PageHero } from "@/components/PageHero";
import { FAQS } from "@/lib/faq";
import { MACHINE_GROUPS, MACHINE_TYPE_COUNT } from "@/lib/machine-catalog";
import { MACHINES } from "@/lib/machines";
import { breadcrumbSchema, faqSchema, graph, itemListSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { terms } from "@/lib/content";
import { categoryPath } from "@/lib/slugs";

const PATH = "/makineler";
const TITLE = "Kiralık İş Makineleri: Manitou, Forklift, Vinç";
const DESCRIPTION =
  "Kiralık iş makineleri: manitou, forklift, sepetli vinç, ekskavatör, mobil vinç ve 88 makine türü. İlanları fiyat ve konuma göre karşılaştırın; ücretsiz, komisyonsuz.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Makineler", path: PATH },
];
const FAQ_LIST = [FAQS.hangiMakineler!, FAQS.nasilKiralanir!, FAQS.forkliftFiyat!, FAQS.belgeler!];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["iş makinesi kiralama", "kiralık iş makinesi", "kiralık manitou", "kiralık forklift", "kiralık vinç", "kiralık ekskavatör"],
});

export default function MakinelerPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION, type: "CollectionPage" }),
          breadcrumbSchema(PATH, CRUMBS),
          itemListSchema({
            path: PATH,
            name: "Kiralık makine türleri",
            items: MACHINES.map((m) => ({ name: terms(m.slug).kiralik, path: categoryPath(m.slug) })),
          }),
          faqSchema(PATH, FAQ_LIST),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow={`${MACHINE_TYPE_COUNT} makine türü`}
        title="Kiralık iş makineleri"
        lead="Şantiye Ağı'nda makine sahipleri ilan verir, siz fiyat ve konuma göre karşılaştırıp doğrudan iletişime geçersiniz. Aşağıda en çok aranan beş makine türünü ve uygulamadaki tüm makine gruplarını bulursunuz."
      />

      <section aria-labelledby="ana-makineler" className="section">
        <div className="container-page">
          <h2 id="ana-makineler" className="mb-6 text-3xl sm:text-4xl">
            En çok aranan 5 makine
          </h2>
          <MachineCards />
        </div>
      </section>

      <section aria-labelledby="model" className="section bg-steel-50">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="model" className="text-3xl sm:text-4xl">
              Kiralama modeli
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              Makine ilanlarında <strong>saatlik</strong> ve <strong>günlük</strong> fiyat yazılır; operatörlü veya operatörsüz olduğu belirtilir. Haftalık ve aylık
              kiralamada fiyat ve koşulları ilan sahibiyle teklifleşerek belirlersiniz. İlanları liste ya da harita üzerinde en yakın, en ucuz veya en yüksek puanlı sıralamasıyla görürsünüz.
            </p>
          </div>
          <ul className="space-y-3 text-lg">
            {[
              "Fiyatı ilan sahibi belirler; Şantiye Ağı komisyon almaz",
              "Teslim süresi ve nakliye ücreti ilan sahibiyle netleştirilir; teslimat taahhüdü verilmez",
              "Operatör belgesi, periyodik kontrol ve sigorta kontrolü taraflara aittir",
              "Kabul edilen teklif dijital anlaşma kaydına dönüşür; ödeme doğrudan yapılır",
            ].map((t) => (
              <li key={t} className="border-l-8 border-brand bg-white p-4 font-semibold">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="katalog" className="section">
        <div className="container-page">
          <h2 id="katalog" className="text-3xl sm:text-4xl">
            Uygulamadaki tüm makine türleri ({MACHINE_TYPE_COUNT})
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-ink-3">Makine ilanı verirken ve ararken kullanılan gruplar ve türler:</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MACHINE_GROUPS.map((g) => (
              <section key={g.group} aria-label={g.group} className="border-2 border-ink bg-white p-5">
                <h3 className="flex items-baseline justify-between gap-2 text-xl font-black">
                  {g.group}
                  <span className="text-sm font-extrabold text-ink-3">{g.machines.length}</span>
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {g.machines.map((m) => (
                    <li key={m} className="border border-ink bg-steel-50 px-2 py-0.5 text-sm font-semibold">
                      {m}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section id="sehirler" aria-labelledby="sehirler-baslik" className="section bg-steel-50">
        <div className="container-page">
          <h2 id="sehirler-baslik" className="mb-8 text-3xl sm:text-4xl">
            İlinizi seçin
          </h2>
          <CitiesGrid />
        </div>
      </section>

      <section aria-labelledby="sss-baslik" className="section">
        <div className="container-page max-w-4xl">
          <h2 id="sss-baslik" className="mb-6 text-3xl sm:text-4xl">
            Sık sorulan sorular
          </h2>
          <FaqList faqs={FAQ_LIST} />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
