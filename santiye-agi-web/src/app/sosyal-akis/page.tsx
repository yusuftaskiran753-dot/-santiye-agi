import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { FeedPreview } from "@/components/FeedPreview";
import { FinalCta } from "@/components/FinalCta";
import { UiIcon, type UiIconName } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { PreviewNotice } from "@/components/PreviewNotice";
import { FAQS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph, webPageSchema, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { APP_FACTS } from "@/lib/site";

const PATH = "/sosyal-akis";
const TITLE = "Şantiye Akışı: Operatörler ve Firmalar İçin Sosyal Akış";
const DESCRIPTION =
  "Şantiye Akışı: operatörler ve firmalar yaptığı işi fotoğraf ve 24 saatlik hikâyelerle paylaşır; takip, beğeni ve yorumla güven oluşur.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Şantiye Akışı", path: PATH },
];

const KINDS = [
  { name: "İş paylaşımı", text: "Yaptığınız işin fotoğrafı ve kısa açıklaması" },
  { name: "İş arıyorum", text: "Operatör, şoför veya usta olarak iş arayışınız" },
  { name: "Makine arıyorum", text: "Kiralamak istediğiniz makine için duyuru" },
  { name: "İlan", text: "Mevcut bir ilanınızı akışta öne çıkarın" },
  { name: "İhale", text: "Açtığınız ihaleyi akıştan duyurun" },
];

const FEATURES: Array<{ icon: UiIconName; title: string; text: string }> = [
  { icon: "camera", title: "Fotoğraf ve hikâye", text: `Gönderi ve hikâyeye kamera ya da galeriden fotoğraf eklersiniz. Hikâyeler ${APP_FACTS.storyHours} saat sonra otomatik silinir.` },
  { icon: "users", title: "Takip, beğeni, yorum", text: "Kullanıcıları takip eder, gönderiye çift dokunarak beğenir, yorum yazarsınız. Profilde kapak fotoğrafı, takipçi sayısı ve gönderi ızgarası bulunur." },
  { icon: "shield", title: "Güvenli yorum", text: "Yorumda “Bu kişiyle çalıştınız mı?” sorusu yanıtlanır; çalışmadıysanız kanıt (fotoğraf veya açıklama) gerekir. Kanıtsız olumsuz yorum yayına çıkmaz, incelemede bekler." },
  { icon: "file", title: "Küfür süzgeci ve engelleme", text: "Küfürlü içerik otomatik engellenmeye çalışılır. Birini engellemek için sebep seçilir ve kanıt fotoğrafı eklenir; kanıt karşı tarafa gösterilmez." },
  { icon: "route", title: "İlana ve ihaleye geçiş", text: "Akıştaki bir ilan veya ihale gönderisinden doğrudan ilan ya da ihale ayrıntısına geçip iletişime başlayabilirsiniz." },
  { icon: "phone", title: "WhatsApp'ta paylaş", text: "Gönderi metnini tek dokunuşla WhatsApp'ta paylaşabilir ya da kopyalayabilirsiniz (fotoğraf bu yolla gönderilmez)." },
];

const FAQ_LIST = [FAQS.sosyalAkis!, FAQS.telefonGizli!, FAQS.kimin!];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["şantiye sosyal ağı", "operatör iş paylaşımı", "inşaat sosyal medya", "operatör iş arıyorum", "makine arıyorum"],
});

export default function SosyalAkisPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION }),
          breadcrumbSchema(PATH, CRUMBS),
          faqSchema(PATH, FAQ_LIST),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Şantiye Akışı"
        title="Yaptığınız işi gösterin, güvenle iş bulun"
        lead="Şantiye Akışı, uygulamadaki fotoğraf ve hikâye tabanlı sosyal akıştır. Operatörler, ustalar ve firmalar yaptıkları işi paylaşır; takip, beğeni ve doğrulamalı yorumlarla güven oluşur."
      />

      <div className="container-page space-y-14 py-12 sm:py-16">
        <PreviewNotice feature="social" />

        <section aria-labelledby="turler">
          <h2 id="turler" className="text-3xl sm:text-4xl">
            Beş gönderi türü
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {KINDS.map((k) => (
              <li key={k.name} className="border-2 border-ink bg-white p-4">
                <span className="badge badge-brand">{k.name}</span>
                <p className="mt-3 text-sm font-semibold text-ink-3">{k.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ozellikler">
          <h2 id="ozellikler" className="text-3xl sm:text-4xl">
            Neler yapabilirsiniz?
          </h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <li key={f.title} className="border-2 border-ink bg-white p-5">
                <span className="grid h-11 w-11 place-items-center bg-brand">
                  <UiIcon name={f.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-3 text-xl font-black">{f.title}</h3>
                <p className="mt-1 text-ink-3">{f.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="gorunum">
          <h2 id="gorunum" className="mb-5 text-3xl sm:text-4xl">
            Akış nasıl görünür?
          </h2>
          <FeedPreview />
        </section>

        <section aria-labelledby="sss-baslik">
          <h2 id="sss-baslik" className="mb-5 text-3xl sm:text-4xl">
            Sık sorulanlar
          </h2>
          <FaqList faqs={FAQ_LIST} />
          <p className="mt-6 text-ink-3">
            Paylaşım ve yorum kuralları için <Link href="/kullanim-kosullari" className="font-bold underline decoration-brand decoration-2">Kullanım Koşulları</Link>{" "}
            ve <Link href="/gizlilik" className="font-bold underline decoration-brand decoration-2">Gizlilik Politikası</Link> sayfalarına bakın.
          </p>
        </section>
      </div>
      <FinalCta />
    </>
  );
}
