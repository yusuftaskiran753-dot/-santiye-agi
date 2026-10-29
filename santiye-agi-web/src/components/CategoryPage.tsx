import Link from "next/link";
import { CITIES, citiesInRegion, inCity, inCityKi, type City } from "@/lib/cities";
import {
  GENERIC_CHECKLIST,
  GENERIC_PRICE_FACTORS,
  cityContext,
  cityFindSteps,
  cityH1,
  cityLead,
  genericFindSteps,
  otherMachinesInCity,
  sameMachineElsewhere,
  terms,
} from "@/lib/content";
import { MACHINES, getMachine, type CategoryView, type Faq } from "@/lib/machines";
import { SITE } from "@/lib/site";
import { categoryPath, cityPath } from "@/lib/slugs";
import { Breadcrumbs } from "./Breadcrumbs";
import { FaqList } from "./FaqList";
import { ArrowRight, Check, MachineIcon } from "./Icons";
import { MachineCards } from "./MachineCards";
import { QuoteForm } from "./QuoteForm";
import { StoreButtons } from "./StoreButtons";
import type { Crumb } from "@/lib/schema";

interface Props {
  category: CategoryView;
  city?: City;
  crumbs: Crumb[];
  faqs: Faq[];
}

/**
 * Programatik SEO sayfası gövdesi: /kiralik-{makine} ve /kiralik-{makine}-{sehir}.
 * Yapı: tek <h1>, cevap-önce giriş, formu yanında taşıyan makale, SSS, iç bağlantı ağı.
 */
export function CategoryPage({ category, city, crumbs, faqs }: Props) {
  const machine = getMachine(category.slug);
  const isAll = !machine;
  const t = terms(category.slug);
  const h1 = city ? cityH1(category, city) : `${t.kiralik} ve ${t.kiralama}`;
  const lead = city ? cityLead(category, city) : category.definition;
  const steps = city ? (machine ? cityFindSteps(category, city) : genericFindSteps(city.name)) : genericFindSteps();
  const checklist = machine ? machine.checklist : GENERIC_CHECKLIST;
  const priceFactors = machine ? machine.priceFactors : GENERIC_PRICE_FACTORS;

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-page py-10 sm:py-14">
          <Breadcrumbs crumbs={crumbs} light />
          <div className="mt-5 flex items-start gap-4">
            <span className="hidden h-20 w-20 shrink-0 place-items-center border-2 border-white bg-brand text-ink sm:grid">
              <MachineIcon slug={category.slug} className="h-14 w-14" />
            </span>
            <div>
              <p className="eyebrow-light">{city ? `${city.name} · ${city.region}` : "81 ilde ilanlar"}</p>
              <h1 className="mt-3 max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">{h1}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-lg text-white/90 sm:text-xl" data-answer>
            {lead}
          </p>
          {city && machine && (
            <p className="mt-3 max-w-3xl text-base text-white/70">
              Arama terimleri: {category.aliases.slice(0, 3).join(", ")}.
            </p>
          )}
        </div>
        <div className="hazard h-3" aria-hidden />
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_24rem] lg:gap-12 lg:py-16">
        <article className="min-w-0 space-y-12">
          {city && (
            <section aria-labelledby="yerel">
              <h2 id="yerel" className="text-2xl sm:text-3xl">
                {inCity(city.name)} {category.short.toLocaleLowerCase("tr-TR")} kiralarken bilmeniz gerekenler
              </h2>
              <p className="mt-3 text-lg text-ink-3">{cityContext(city)}</p>
              <p className="mt-3 text-lg text-ink-3">
                Bu sayfa bir ilan listesi değildir: {city.name} için yayımlanan güncel makine ilanlarını Şantiye Ağı uygulamasında görürsünüz. Burada kiralama sürecini, kontrol listesini ve fiyatı etkileyen etkenleri
                bulursunuz.
              </p>
            </section>
          )}

          {isAll ? (
            <section aria-labelledby="turler">
              <h2 id="turler" className="text-2xl sm:text-3xl">
                {city ? `${city.name} için kiralık makine türleri` : "En çok aranan makine türleri"}
              </h2>
              {city ? (
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {MACHINES.map((m) => (
                    <li key={m.slug} className="border-2 border-ink bg-white">
                      <Link href={cityPath(m.slug, city)} className="flex gap-4 p-4 no-underline hover:bg-brand-soft">
                        <span className="grid h-14 w-14 shrink-0 place-items-center border-2 border-ink bg-brand">
                          <MachineIcon slug={m.slug} className="h-9 w-9" />
                        </span>
                        <span>
                          <span className="block text-lg font-black">{city.name} {terms(m.slug).kiralik}</span>
                          <span className="block text-sm font-semibold text-ink-3">{m.tagline}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-5">
                  <MachineCards />
                </div>
              )}
            </section>
          ) : (
            <>
              <section aria-labelledby="kullanim">
                <h2 id="kullanim" className="text-2xl sm:text-3xl">
                  {machine.short} ne işe yarar?
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {machine.uses.map((u) => (
                    <li key={u} className="flex gap-2.5 border-2 border-ink bg-white p-3.5 font-semibold">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-ok" />
                      {u}
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="ozellik">
                <h2 id="ozellik" className="text-2xl sm:text-3xl">
                  {machine.short} kiralamada genel özellikler
                </h2>
                <div className="mt-4 overflow-x-auto border-2 border-ink">
                  <table className="w-full min-w-[28rem] border-collapse text-left">
                    <caption className="sr-only">{machine.name} genel teknik özellikleri</caption>
                    <tbody>
                      {machine.specs.map(([k, v]) => (
                        <tr key={k} className="border-b border-steel-300 last:border-b-0">
                          <th scope="row" className="w-2/5 bg-steel-50 px-4 py-3 align-top text-sm font-extrabold">
                            {k}
                          </th>
                          <td className="px-4 py-3 text-ink-3">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-sm text-ink-3">Değerler genel aralıklardır; bağlayıcı olan, ilanda yazılan model ve kapasite bilgisidir.</p>
              </section>
            </>
          )}

          <section aria-labelledby="kontrol">
            <h2 id="kontrol" className="text-2xl sm:text-3xl">
              Kiralamadan önce kontrol listesi
            </h2>
            <ol className="mt-4 space-y-2.5">
              {checklist.map((c, i) => (
                <li key={c} className="flex gap-3 border-2 border-ink bg-white p-3.5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center bg-ink text-sm font-black text-brand" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="font-semibold">{c}</span>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="fiyat">
            <h2 id="fiyat" className="text-2xl sm:text-3xl">
              {city ? `${inCity(city.name)} ` : ""}
              {category.short.toLocaleLowerCase("tr-TR")} kiralama fiyatını ne belirler?
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              Kira bedelini ilan sahibi belirler; Şantiye Ağı fiyat listesi yayımlamaz, aracı değildir ve komisyon almaz. Fiyat başlıca şu etkenlere göre değişir:
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {priceFactors.map((f) => (
                <li key={f} className="flex gap-2.5 font-semibold">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ok" />
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="bulma">
            <h2 id="bulma" className="text-2xl sm:text-3xl">
              Şantiye Ağı'nda nasıl bulursunuz?
            </h2>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-brand font-black" aria-hidden>
                    {i + 1}
                  </span>
                  <p className="pt-1 text-lg text-ink-3">{s}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5">
              <StoreButtons />
            </div>
          </section>

          <section aria-labelledby="sss-k">
            <h2 id="sss-k" className="mb-4 text-2xl sm:text-3xl">
              Sık sorulan sorular
            </h2>
            <FaqList faqs={faqs} />
          </section>

          {/* İç bağlantı ağı */}
          {city ? <CityLinks category={category} city={city} /> : <NationalCityLinks category={category} />}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start" aria-label="Talep formu">
          <QuoteForm
            id="talep"
            compact
            title={city ? `${city.name} talep formu` : "Hızlı talep formu"}
            defaultCity={city?.name ?? ""}
            defaultMachine={category.slug}
          />
          <div className="mt-5 border-2 border-ink bg-brand-soft p-4 text-sm font-semibold">
            <p>
              Şantiye Ağı bir ilan ve buluşma platformudur: makine kiralamaz, taşımaz, ödeme toplamaz. Sözleşme ve ödeme yalnızca ilan sahibiyle sizin aranızdadır.
              İletişim: <a className="underline decoration-ink" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function CityLinks({ category, city }: { category: CategoryView; city: City }) {
  const others = category.slug === "is-makinesi" ? [] : otherMachinesInCity(category.slug, city);
  const elsewhere = category.slug === "is-makinesi" ? [] : sameMachineElsewhere(category.slug, city);
  const regionPeers = category.slug === "is-makinesi" ? citiesInRegion(city.region, city.slug) : [];
  return (
    <section aria-labelledby="iliskili" className="space-y-8">
      {others.length > 0 && (
        <div>
          <h2 id="iliskili" className="text-2xl sm:text-3xl">
            {inCityKi(city.name)} diğer kiralık makineler
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center gap-1.5 border-2 border-ink bg-white px-3 py-2 font-bold no-underline hover:bg-brand">
                  {l.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
            <li>
              <Link href={cityPath("is-makinesi", city)} className="inline-flex items-center gap-1.5 border-2 border-ink bg-ink px-3 py-2 font-bold text-white no-underline hover:bg-ink-2">
                {city.name} iş makinesi kiralama <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
      {elsewhere.length > 0 && (
        <div>
          <h2 className="text-2xl sm:text-3xl">Diğer şehirlerde {category.short.toLocaleLowerCase("tr-TR")} kiralama</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {elsewhere.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold no-underline hover:bg-brand">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={categoryPath(category.slug)} className="inline-block border-2 border-ink bg-ink px-3 py-1.5 text-sm font-bold text-white no-underline hover:bg-ink-2">
                Tüm 81 il
              </Link>
            </li>
          </ul>
        </div>
      )}
      {regionPeers.length > 0 && (
        <div>
          <h2 id="iliskili" className="text-2xl sm:text-3xl">
            {city.region} Bölgesi'ndeki diğer iller
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {regionPeers.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath("is-makinesi", c)} className="inline-block border-2 border-ink bg-white px-3 py-1.5 text-sm font-bold no-underline hover:bg-brand">
                  {c.name} iş makinesi kiralama
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function NationalCityLinks({ category }: { category: CategoryView }) {
  return (
    <section aria-labelledby="iller">
      <h2 id="iller" className="text-2xl sm:text-3xl">
        81 ilde {terms(category.slug).kiralik.toLocaleLowerCase("tr-TR")}
      </h2>
      <p className="mt-3 text-ink-3">İlinizi seçerek o ile özel sayfaya gidin.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {CITIES.map((c) => (
          <Link
            key={c.slug}
            href={cityPath(category.slug, c)}
            title={`${c.name} ${terms(category.slug).kiralama}`}
            className="inline-block border-2 border-ink bg-white px-2.5 py-1 text-sm font-bold no-underline hover:bg-brand"
          >
            {c.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
