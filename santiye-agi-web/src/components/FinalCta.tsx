import Link from "next/link";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { StoreButtons } from "./StoreButtons";

export function FinalCta() {
  return (
    <section aria-labelledby="son-cta" className="bg-ink text-white">
      <div className="hazard h-3" aria-hidden />
      <div className="container-page grid gap-8 py-14 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow-light">Boş dönmeyin, boş beklemeyin</span>
          <h2 id="son-cta" className="mt-4 text-3xl text-white sm:text-5xl">
            Makineyi bulun, teklifi alın, işi kayda geçirin.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Şantiye Ağı ücretsizdir ve komisyon almaz. Talebinizi şimdi hazırlayın; mağaza yayını duyurulana kadar sorularınız için bize WhatsApp'tan yazabilirsiniz.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#talep" className="btn btn-primary">
              Talebini hazırla
            </Link>
            <a href={whatsappContactUrl()} target="_blank" rel="noopener noreferrer" className="btn border-white bg-transparent text-white hover:bg-white hover:text-ink">
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp ile yazın
            </a>
          </div>
        </div>
        <div className="border-2 border-white/30 p-6">
          <p className="text-sm font-extrabold uppercase tracking-widest text-brand">Uygulamayı edinin</p>
          <div className="mt-4">
            <StoreButtons dark />
          </div>
          <p className="mt-4 text-sm text-white/70">Android ve iOS. Mağaza bağlantıları yayın onayından sonra burada görünür.</p>
        </div>
      </div>
    </section>
  );
}
