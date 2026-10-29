import type { Metadata } from "next";
import Link from "next/link";
import { CitiesGrid } from "@/components/CitiesGrid";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FaqList } from "@/components/FaqList";
import { FeedPreview } from "@/components/FeedPreview";
import { FinalCta } from "@/components/FinalCta";
import { HOW_STEPS, HowItWorks } from "@/components/HowItWorks";
import { Check } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { LegalHashRedirect } from "@/components/LegalHashRedirect";
import { MachineCards } from "@/components/MachineCards";
import { QuoteForm } from "@/components/QuoteForm";
import { TenderCards } from "@/components/TenderSection";
import { TrustStrip } from "@/components/TrustStrip";
import { PRIORITY_CITIES } from "@/lib/cities";
import { terms } from "@/lib/content";
import { HOME_FAQS } from "@/lib/faq";
import { MACHINES } from "@/lib/machines";
import { faqSchema, graph, howToSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { fitDescription, pageMetadata } from "@/lib/seo";
import { SITE_SUMMARY } from "@/lib/site";
import { categoryPath, cityPath } from "@/lib/slugs";

/** Ana sayfa 5 dakikada bir yeniden üretilir (ihale kartları için). */
export const revalidate = 300;

const PATH = "/";
const TITLE = "Şantiye Ağı | Kiralık İş Makinesi, Manitou, Forklift, Vinç";
const DESCRIPTION = fitDescription(
  "Kiralık manitou, forklift, sepetli vinç, ekskavatör ve mobil vinç ilanları; ihale, boş dönüş yükü ve operatör ilanları tek uygulamada. Ücretsiz, komisyonsuz, 81 ilde.",
);

export const metadata: Metadata = pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    absolute: true,
    keywords: [
      "kiralık manitou",
      "manitou kiralama",
      "forklift kiralama",
      "kiralık forklift",
      "sepetli vinç kiralama",
      "kiralık vinç",
      "iş makinesi kiralama",
      "izmir manitou kiralama",
      "istanbul forklift kiralama",
      "şantiye ihale",
      "boş dönüş yükü",
    ],
  });

const BENEFITS = [
  { title: "Aracısız ve komisyonsuz", text: "Kira bedelini ilan sahibiyle belirler, doğrudan ona ödersiniz. Şantiye Ağı paraya dokunmaz." },
  { title: "Fiyat ve konum karşılaştırma", text: "Saatlik/günlük fiyat, operatör durumu ve konuma göre en yakın, en ucuz veya en yüksek puanlı makineyi seçin." },
  { title: "İhale ile çoklu teklif", text: "İşi ihaleye açın; uygun firmalardan açıklamalı teklif toplayın, en iyisini seçin." },
  { title: "Kayıt altında iş", text: "Kabul edilen teklif dijital anlaşma kaydına dönüşür; ödeme planı, teslim ve puan tek yerde." },
];

export default function HomePage() {
  const path = PATH;
  return (
    <>
      <LegalHashRedirect />
      <JsonLd
        data={graph(
          webPageSchema({ path, name: TITLE, description: DESCRIPTION, hasBreadcrumb: false }),
          faqSchema(path, HOME_FAQS),
          howToSchema({
            path,
            name: "Şantiye Ağı ile iş makinesi nasıl kiralanır?",
            description: "Üç adımda ilan bulun veya verin, teklifleşin ve anlaşmayı kayıt altına alın.",
            steps: [...HOW_STEPS],
          }),
          itemListSchema({
            path,
            name: "Kiralık makine türleri",
            items: MACHINES.map((m) => ({ name: terms(m.slug).kiralik, path: categoryPath(m.slug) })),
          }),
        )}
      />

      {/* 1. HERO + HIZLI TALEP FORMU */}
      <section aria-labelledby="baslik" className="bg-ink text-white">
        <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow-light">Türkiye'nin 81 ilinde · Ücretsiz · Komisyonsuz</p>
            <h1 id="baslik" className="mt-5 text-4xl text-white sm:text-5xl lg:text-6xl">
              Kiralık iş makinesi bulun: <span className="text-brand">manitou, forklift, vinç, ekskavatör</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/85 sm:text-xl">{SITE_SUMMARY}</p>
            <ul className="mt-6 grid gap-2 text-base font-bold sm:grid-cols-2">
              {["Aracısız, komisyonsuz", "Telefon numaranız gizli", "Fiyat ve konuma göre karşılaştırın", "İnternetsiz çalışır"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-6 w-6 shrink-0 place-items-center bg-brand text-ink">
                    <Check className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/makineler" className="btn btn-primary">
                Makineleri incele
              </Link>
              <Link href="/ihaleler" className="btn border-white bg-transparent text-white hover:bg-white hover:text-ink">
                İhaleleri gör
              </Link>
            </div>
          </div>
          <QuoteForm id="talep" />
        </div>
        <div className="hazard h-3" aria-hidden />
      </section>

      <TrustStrip />

      {/* AEO: kısa ve alıntılanabilir tanım */}
      <section aria-labelledby="kisaca" className="section pb-0">
        <div className="container-page">
          <div className="border-l-8 border-brand bg-steel-50 p-6 sm:p-8">
            <h2 id="kisaca" className="text-2xl sm:text-3xl">
              Şantiye Ağı kısaca nedir?
            </h2>
            <p className="mt-3 max-w-4xl text-lg">
              Şantiye Ağı, iş makinesi sahipleriyle kiracıları; nakliyecilerle yük sahiplerini; tedarikçilerle şantiyeleri; operatörlerle işverenleri
              <strong> aracısız ve komisyonsuz</strong> buluşturan bir mobil uygulamadır. Makine kiralayan, taşıma yapan veya ödeme toplayan bir şirket değildir:
              ilanlar kullanıcılara aittir, sözleşme ve ödeme yalnızca taraflar arasında kurulur.
            </p>
          </div>
        </div>
      </section>

      {/* 3. MAKİNE KATEGORİLERİ */}
      <section aria-labelledby="kategoriler" className="section">
        <div className="container-page">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Kiralık makineler</p>
            <h2 id="kategoriler" className="mt-3 text-3xl sm:text-4xl">
              En çok aranan 5 makine türü
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              Her türün kendi sayfasında kullanım alanlarını, kiralamadan önce kontrol listesini ve fiyatı etkileyen etkenleri bulursunuz.
            </p>
          </div>
          <MachineCards />
        </div>
      </section>

      {/* 4. NASIL ÇALIŞIR */}
      <section aria-labelledby="nasil" className="section bg-steel-50">
        <div className="container-page">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow">Nasıl çalışır?</p>
            <h2 id="nasil" className="mt-3 text-3xl sm:text-4xl">
              3 adımda ilandan anlaşmaya
            </h2>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* 5. İHALELER */}
      <section id="ihaleler" aria-labelledby="ihale-baslik" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">İhale sistemi</p>
            <h2 id="ihale-baslik" className="mt-3 text-3xl sm:text-4xl">
              İşi ihaleye açın, teklifleri toplayın
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              Müteahhitler ve şantiye şefleri işi tanımlar; uygun meslekten kişiler açıklamalı fiyat teklifi verir. Teklifleri yalnızca ihaleyi açan görür, telefon numaraları onaya kadar gizli kalır.
            </p>
            <Link href="/ihaleler" className="btn btn-dark mt-6">
              İhale kurallarını incele
            </Link>
          </div>
          <TenderCards limit={4} />
        </div>
      </section>

      {/* 6. ŞANTİYE AKIŞI */}
      <section id="akis" aria-labelledby="akis-baslik" className="section bg-steel-50">
        <div className="container-page">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Şantiye Akışı</p>
            <h2 id="akis-baslik" className="mt-3 text-3xl sm:text-4xl">
              Yapılan işi paylaşın, güvenle iş bulun
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              Operatörler ve firmalar fotoğraf ve 24 saatlik hikâyelerle yaptıkları işi gösterir; takip, beğeni ve yorumlarla güven oluşur. Yorum yazarken “Bu kişiyle çalıştınız mı?” sorusu yanıtlanır.
            </p>
          </div>
          <FeedPreview />
        </div>
      </section>

      {/* 7. NEDEN ŞANTİYE AĞI */}
      <section id="neden" aria-labelledby="neden-baslik" className="section">
        <div className="container-page">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">Neden Şantiye Ağı?</p>
            <h2 id="neden-baslik" className="mt-3 text-3xl sm:text-4xl">
              Şantiye Ağı ile geleneksel kiralama karşılaştırması
            </h2>
          </div>
          <ul className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <li key={b.title} className="border-2 border-ink bg-brand p-5">
                <h3 className="text-lg font-black">{b.title}</h3>
                <p className="mt-1 text-sm font-semibold">{b.text}</p>
              </li>
            ))}
          </ul>
          <ComparisonTable />
        </div>
      </section>

      {/* 8. ŞEHİRLER */}
      <section id="sehirler" aria-labelledby="sehir-baslik" className="section bg-steel-50">
        <div className="container-page">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow">81 il</p>
            <h2 id="sehir-baslik" className="mt-3 text-3xl sm:text-4xl">
              Kiralık iş makinesi: hizmet verilen şehirler
            </h2>
            <p className="mt-3 text-lg text-ink-3">
              {PRIORITY_CITIES.map((c) => c.name).join(", ")} sayfalarımız ayrıntılıdır; diğer 76 il için de şehir sayfaları hazırdır.
              Şehirdeki ilan sayısı o ilde ilan veren kullanıcılara bağlıdır.
            </p>
          </div>
          <CitiesGrid />
          <p className="mt-6 text-sm text-ink-3">
            Örnek sayfalar:{" "}
            <Link href={cityPath("manitou", "izmir")} className="font-bold underline decoration-brand decoration-2">
              İzmir manitou kiralama
            </Link>
            ,{" "}
            <Link href={cityPath("forklift", "istanbul")} className="font-bold underline decoration-brand decoration-2">
              İstanbul forklift kiralama
            </Link>
            .
          </p>
        </div>
      </section>

      {/* 9. SSS */}
      <section id="sss" aria-labelledby="sss-baslik" className="section">
        <div className="container-page grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">Sık sorulan sorular</p>
            <h2 id="sss-baslik" className="mt-3 text-3xl sm:text-4xl">
              Kısa ve net cevaplar
            </h2>
            <p className="mt-3 text-lg text-ink-3">Başka sorunuz mu var? Tüm sorular için SSS sayfasına bakın ya da bize yazın.</p>
            <Link href="/sss" className="link-arrow mt-5">
              Tüm soruları gör
            </Link>
          </div>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      {/* 10. SON ÇAĞRI */}
      <FinalCta />
      <noscript>
        <p className="container-page py-4 text-sm">
          Yasal metinler: <Link href="/kullanim-kosullari">Kullanım Koşulları</Link>, <Link href="/gizlilik">Gizlilik Politikası</Link>, <Link href="/kvkk">KVKK Aydınlatma Metni</Link>,{" "}
          <Link href="/hesap-silme">Hesap ve Veri Silme</Link>.
        </p>
      </noscript>
    </>
  );
}
