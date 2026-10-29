import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FinalCta } from "@/components/FinalCta";
import { Check } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PreviewNotice } from "@/components/PreviewNotice";
import { TenderCards } from "@/components/TenderSection";
import { FAQS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph, howToSchema, webPageSchema, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { APP_FACTS } from "@/lib/site";

export const revalidate = 300;

const PATH = "/ihaleler";
const TITLE = "Şantiye İhale Sistemi: İş Duyurusu ve Teklif Toplama";
const DESCRIPTION =
  "Şantiye Ağı ihale sistemi: işi ihaleye açın, uygun meslekler açıklamalı teklif versin, en iyisini seçin. Telefon numaraları onaya kadar gizli kalır.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "İhaleler", path: PATH },
];

const STEPS = [
  {
    name: "İhaleyi açın",
    text: "Müteahhit veya şantiye şefi işin başlığını, ayrıntısını, ilini ve sektörünü yazar; teklif verebilecek meslekleri ve son teklif tarihini belirler (varsayılan süre 7 gündür).",
  },
  {
    name: "Teklifler gelsin",
    text: `Uygun meslekten kişiler tutar ve en az ${APP_FACTS.minBidNoteLength} karakterlik bir açıklamayla (fiyata neyin dahil olduğunu) teklif verir. Bir kişi bir ihaleye bir kez teklif verebilir.`,
  },
  {
    name: "Tekliflerinizi değerlendirin",
    text: "Tüm teklifleri yalnızca ihaleyi açan görür. Süre dolunca ya da “Teklif almayı bitir” denince teklifler en düşükten yükseğe sıralanır ve en düşük teklif önerilir.",
  },
  {
    name: "Kazananı seçin",
    text: "İhaleyi açan kazananı seçer; ihale “Verildi” olur, kazananla telefon paylaşımı otomatik onaylanır, diğer teklifler “Seçilmedi” işaretlenir. En düşük teklifi seçmek zorunlu değildir.",
  },
] as const;

const FAQ_LIST = [FAQS.ihale!, FAQS.telefonGizli!, FAQS.komisyon!, FAQS.belgeler!];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["şantiye ihale", "inşaat ihale teklif", "ihale teklif toplama", "müteahhit ihale", "iş makinesi ihale"],
});

export default function IhalelerPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(PATH, CRUMBS),
          howToSchema({
            path: PATH,
            name: "Şantiye Ağı'nda ihale nasıl açılır ve teklif nasıl seçilir?",
            description: "İhale açma, teklif toplama, değerlendirme ve kazananı seçme adımları.",
            steps: [...STEPS],
          }),
          faqSchema(PATH, FAQ_LIST),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="İhale sistemi"
        title="İşi ihaleye açın, açıklamalı teklifleri toplayın"
        lead="Şantiye Ağı'nda ihale; bir işi duyurmak ve birden çok firmadan veya ustadan fiyat teklifi toplamak içindir. İhaleyi müteahhitler ve şantiye şefleri açar; teklifleri yalnızca ihaleyi açan kişi görür."
      />

      <div className="container-page space-y-14 py-12 sm:py-16">
        <PreviewNotice feature="tenders" />

        <section aria-labelledby="adimlar">
          <h2 id="adimlar" className="text-3xl sm:text-4xl">
            İhale 4 adımda nasıl çalışır?
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {STEPS.map((s, i) => (
              <li key={s.name} className="relative border-2 border-ink bg-white p-6 pt-9 shadow-block-sm">
                <span aria-hidden className="absolute -top-5 left-5 grid h-12 w-12 place-items-center border-2 border-ink bg-brand text-2xl font-black">
                  {i + 1}
                </span>
                <h3 className="text-xl font-black">{s.name}</h3>
                <p className="mt-2 text-ink-3">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="kurallar" className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="kurallar" className="text-3xl sm:text-4xl">
              Gizlilik ve adil teklif kuralları
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                "Teklif verenin telefonu, ihaleyi açan “Telefon paylaşımını onayla” diyene kadar iki tarafa da gösterilmez.",
                "Teklif verenler yalnızca kendi teklifini görür; diğer tekliflerin tutarını göremez.",
                `Teklifte açıklama zorunludur (en az ${APP_FACTS.minBidNoteLength} karakter, küfür içeremez); açıklamasız teklif kaydedilmez.`,
                "Teklif süresi dolunca ya da ihaleyi açan teklif almayı bitirince ihale yeni teklif almaz.",
                "Şantiye Ağı ihale sözleşmesinin tarafı değildir ve ödemeye aracılık etmez; ihale duyuru ve teklif toplama içindir.",
              ].map((t) => (
                <li key={t} className="flex gap-3 font-semibold">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ok" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-ink bg-brand-soft p-6">
            <h3 className="text-xl font-black">Kim ihale açar, kim teklif verir?</h3>
            <p className="mt-2 text-ink-3">
              İhale açma yetkisi <strong>müteahhit</strong> ve <strong>şantiye şefi</strong> mesleğindeki kullanıcılardadır. Teklif verebilecek meslekleri ihaleyi açan seçer
              (varsayılan seçenekler taşeron, formen ve ustabaşıdır). Kendi ihalenize teklif veremezsiniz.
            </p>
            <p className="mt-3 text-ink-3">Ödeme, sözleşme ve iş yapımı yalnızca ihaleyi açan ile kazanan arasında yürür.</p>
          </div>
        </section>

        <section aria-labelledby="akis-baslik">
          <h2 id="akis-baslik" className="mb-5 text-3xl sm:text-4xl">
            İhale kartı nasıl görünür?
          </h2>
          <TenderCards limit={4} />
        </section>

        <section aria-labelledby="sss-baslik">
          <h2 id="sss-baslik" className="mb-5 text-3xl sm:text-4xl">
            İhale hakkında sık sorulanlar
          </h2>
          <FaqList faqs={FAQ_LIST} />
          <p className="mt-6">
            <Link href="/sss" className="link-arrow">
              Tüm soruları gör
            </Link>
          </p>
        </section>
      </div>
      <FinalCta />
    </>
  );
}
