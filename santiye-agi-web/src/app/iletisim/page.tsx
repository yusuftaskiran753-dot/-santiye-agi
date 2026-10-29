import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { UiIcon, WhatsAppIcon } from "@/components/Icons";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbSchema, graph, webPageSchema, IDS, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappContactUrl } from "@/lib/whatsapp";

const PATH = "/iletisim";
const TITLE = "İletişim: Şantiye Ağı Destek ve Talep";
const DESCRIPTION = "Şantiye Ağı ile iletişime geçin: e-posta, WhatsApp, hesap silme ve KVKK başvurusu. Makine talebinizi hazır mesajla WhatsApp'tan iletin.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "İletişim", path: PATH },
];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["şantiye ağı iletişim", "şantiye ağı destek", "iş makinesi kiralama iletişim"],
});

export default function IletisimPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION, type: "ContactPage", about: { "@id": IDS.org() } }),
          breadcrumbSchema(PATH, CRUMBS),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="İletişim"
        title="Bize ulaşın"
        lead="Soru, öneri, şikâyet ve işbirliği için e-posta ya da WhatsApp ile yazabilirsiniz. Makine talebiniz için sağdaki formu kullanın."
      />
      <div className="container-page grid gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6">
          <ul className="space-y-4">
            <li className="flex gap-4 border-2 border-ink bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand">
                <UiIcon name="file" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-extrabold uppercase tracking-widest text-ink-3">E-posta</span>
                <a href={`mailto:${SITE.email}`} className="text-xl font-black underline decoration-brand decoration-4 underline-offset-4">
                  {SITE.email}
                </a>
              </span>
            </li>
            <li className="flex gap-4 border-2 border-ink bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-extrabold uppercase tracking-widest text-ink-3">WhatsApp</span>
                <a href={whatsappContactUrl()} target="_blank" rel="noopener noreferrer" className="text-xl font-black underline decoration-brand decoration-4 underline-offset-4">
                  WhatsApp ile yazın
                </a>
              </span>
            </li>
            <li className="flex gap-4 border-2 border-ink bg-white p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center bg-brand">
                <UiIcon name="pin" className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-sm font-extrabold uppercase tracking-widest text-ink-3">Adres</span>
                <span className="text-xl font-black">{SITE.operator.name}</span>
                <span className="block font-semibold text-ink-3">{SITE.operator.addressLine}</span>
              </span>
            </li>
          </ul>

          <section aria-labelledby="konular" className="border-2 border-ink bg-steel-50 p-5">
            <h2 id="konular" className="text-xl font-black">
              Sık başvuru konuları
            </h2>
            <ul className="mt-3 space-y-2 font-semibold">
              <li>
                <Link href="/hesap-silme" className="underline decoration-brand decoration-2">
                  Hesabımı nasıl silerim?
                </Link>{" "}
                (uygulamada Profil → Hesabımı sil)
              </li>
              <li>
                <Link href="/kvkk" className="underline decoration-brand decoration-2">
                  KVKK başvurusu
                </Link>{" "}
                (en geç 30 gün içinde yanıtlanır)
              </li>
              <li>Şüpheli ilan veya kullanıcı: uygulamada ilan menüsünden “Şikâyet et”</li>
              <li>
                <Link href="/sss" className="underline decoration-brand decoration-2">
                  Sık sorulan sorular
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <QuoteForm id="talep" title="Makine talebi" />
      </div>
    </>
  );
}
