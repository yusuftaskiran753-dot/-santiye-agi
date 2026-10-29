import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Check, Cross } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, graph, webPageSchema, IDS, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { APP_FACTS, SITE } from "@/lib/site";

const PATH = "/hakkimizda";
const TITLE = "Hakkımızda: Şantiye Ağı Nedir, Kim İşletiyor?";
const DESCRIPTION =
  "Şantiye Ağı, sahadaki insanları aracısız buluşturan ilan uygulamasıdır. Sivas'ta Yusuf Taşkıran geliştirir; ilkeleri, ne yaptığı ve ne yapmadığı.";
const CRUMBS: Crumb[] = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Hakkımızda", path: PATH },
];

const DOES = [
  "Yük, iş makinesi, malzeme ve personel ilanlarını tek yerde toplar",
  "Boş dönüş yükü eşleştirir; malzeme fiyatlarını teslim dahil tahmini fiyatla karşılaştırır",
  "Teklif, ihale ve dijital anlaşma kaydı sunar; puanlamayı yalnızca tamamlanan işe bağlar",
  "Telefon numaralarını gizler; şikâyet, engelleme ve içerik süzgeci uygular",
  "İnternetsiz çalışır; işlemleri bağlantı gelince gönderir",
];
const DOESNT = [
  "Makine kiralamaz, yük taşımaz, malzeme satmaz",
  "Ödemeye aracılık etmez, para tahsil etmez veya saklamaz; komisyon almaz",
  "İlandaki makinenin, fiyatın, teslimin veya belgelerin doğruluğunu garanti etmez",
  "Operatör belgesi, periyodik kontrol ve sigortayı doğrulamaz; bunlar taraflara aittir",
  "Teslimat süresi taahhüt etmez; mesafe ve fiyat hesapları tahminidir",
];

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ["şantiye ağı hakkında", "yusuf taşkıran", "şantiye uygulaması", "iş makinesi ilan platformu"],
});

export default function HakkimizdaPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({ path: PATH, name: TITLE, description: DESCRIPTION, type: "AboutPage", about: { "@id": IDS.org() } }),
          breadcrumbSchema(PATH, CRUMBS),
        )}
      />
      <PageHero
        crumbs={CRUMBS}
        eyebrow="Hakkımızda"
        title="Boş dönmesin, boş beklemesin: sahadaki insanları buluşturuyoruz"
        lead="Şantiye Ağı; nakliyeciyi yük sahibiyle, makine sahibini müteahhitle, tedarikçiyi şantiyeyle ve operatörü işverenle aracısız buluşturan bir mobil uygulamadır."
      />

      <div className="container-page space-y-14 py-12 sm:py-16">
        <section aria-labelledby="misyon" className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 id="misyon" className="text-3xl sm:text-4xl">
              Neden varız?
            </h2>
            <p className="mt-4 text-lg text-ink-3">
              Şantiyede iş makinesi bulmak, boş dönen bir aracın dönüş yükünü bulmak ya da güvenilir bir operatöre ulaşmak çoğu zaman telefon trafiğine ve tanıdık referansına bağlıdır.
              Şantiye Ağı bu aramayı tek uygulamada toplar: ilanları karşılaştırırsınız, doğrudan iletişime geçersiniz, anlaştığınız işi kayda alırsınız.
            </p>
            <p className="mt-3 text-lg text-ink-3">
              Uygulama ücretsizdir ve komisyon almaz. Gelir; isteğe bağlı Premium abonelik ve kredi paketlerinden gelir. Bunlar yalnızca Google Play ve App Store üzerinden satılır.
            </p>
          </div>
          <dl className="grid gap-px border-2 border-ink bg-ink sm:grid-cols-2">
            {[
              ["81", "il"],
              [String(APP_FACTS.machineTypeCount), "makine türü"],
              [String(APP_FACTS.professionCount), "meslek"],
              ["0 ₺", "komisyon"],
            ].map(([n, l]) => (
              <div key={l} className="bg-white p-5">
                <dt className="text-sm font-extrabold uppercase tracking-widest text-ink-3">{l}</dt>
                <dd className="mt-1 text-4xl font-black">{n}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="yapar" className="grid gap-6 md:grid-cols-2">
          <div className="border-2 border-ink bg-white p-6">
            <h2 id="yapar" className="text-2xl font-black">
              Ne yapar?
            </h2>
            <ul className="mt-4 space-y-3">
              {DOES.map((t) => (
                <li key={t} className="flex gap-3 font-semibold">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-ok" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-2 border-ink bg-steel-50 p-6">
            <h2 className="text-2xl font-black">Ne yapmaz?</h2>
            <ul className="mt-4 space-y-3">
              {DOESNT.map((t) => (
                <li key={t} className="flex gap-3 font-semibold">
                  <Cross className="mt-1 h-5 w-5 shrink-0 text-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="isletici" className="border-l-8 border-brand bg-steel-50 p-6 sm:p-8">
          <h2 id="isletici" className="text-2xl sm:text-3xl">
            Kim geliştiriyor ve işletiyor?
          </h2>
          <p className="mt-3 max-w-3xl text-lg">
            Şantiye Ağı, <strong>{SITE.operator.name}</strong> tarafından Sivas'ta geliştirilir ve işletilir ({SITE.operator.addressLine}). Soru, şikâyet ve işbirliği için{" "}
            <a href={`mailto:${SITE.email}`} className="font-bold underline decoration-brand decoration-2">
              {SITE.email}
            </a>{" "}
            adresine yazabilirsiniz. Aynı geliştiricinin diğer uygulaması, asfalt ve yol yapım şantiyeleri için saha yönetim uygulaması{" "}
            <a href="https://yusuftaskiran753-dot.github.io/" rel="noopener" className="font-bold underline decoration-brand decoration-2">
              Asfaltik
            </a>
            'tir.
          </p>
          <p className="mt-3 max-w-3xl text-ink-3">
            Uygulama sürümü {APP_FACTS.version}. Android ve iOS için hazırlanmıştır; mağaza yayını yakındır. Yasal metinler:{" "}
            <Link href="/kullanim-kosullari" className="font-bold underline decoration-brand decoration-2">Kullanım Koşulları</Link>,{" "}
            <Link href="/gizlilik" className="font-bold underline decoration-brand decoration-2">Gizlilik Politikası</Link>,{" "}
            <Link href="/kvkk" className="font-bold underline decoration-brand decoration-2">KVKK Aydınlatma Metni</Link>.
          </p>
        </section>
      </div>
      <FinalCta />
    </>
  );
}
