import Link from "next/link";
import { PRIORITY_CITIES } from "@/lib/cities";
import { LEGAL_DOCS } from "@/lib/legal-meta";
import { MACHINES } from "@/lib/machines";
import { SITE } from "@/lib/site";
import { categoryPath, cityPath } from "@/lib/slugs";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./Icons";
import { LogoMark } from "./Logo";
import { NAV_ITEMS } from "./nav";
import { StoreButtons } from "./StoreButtons";

/** inline-block + dikey boşluk: dokunma hedefi en az 24px (WCAG 2.2 AA) */
const linkCls = "inline-block py-1 text-white/85 no-underline hover:text-brand hover:underline";

export function Footer() {
  return (
    <footer className="border-t-4 border-brand bg-ink text-white">
      <div className="hazard h-3" aria-hidden />
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <LogoMark className="h-10 w-10" />
            <span className="text-xl font-black uppercase tracking-tight">
              Şantiye <span className="text-brand">Ağı</span>
              <span className="block text-xs font-medium normal-case tracking-normal">by Lunavisore</span>
            </span>
          </div>
          <p className="mt-4 max-w-md text-white/80">
            Yük, iş makinesi, malzeme ve operatör ilanları tek uygulamada. Türkiye'nin 81 ilinde ücretsiz, aracısız ve komisyonsuz.
          </p>
          <a
            href={whatsappContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-5"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp ile yazın
          </a>
          <div className="mt-6">
            <StoreButtons dark />
          </div>
        </div>

        <nav aria-label="Makineler">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-brand">Makineler</h2>
          <ul className="mt-3 space-y-0.5">
            {MACHINES.map((m) => (
              <li key={m.slug}>
                <Link href={categoryPath(m.slug)} className={linkCls}>
                  Kiralık {m.short}
                </Link>
              </li>
            ))}
            <li>
              <Link href={categoryPath("is-makinesi")} className={linkCls}>
                İş makinesi kiralama
              </Link>
            </li>
          </ul>
          <h2 className="mt-7 text-sm font-extrabold uppercase tracking-widest text-brand">Şehirler</h2>
          <ul className="mt-3 space-y-0.5">
            {PRIORITY_CITIES.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath("is-makinesi", c)} className={linkCls}>
                  {c.name} iş makinesi kiralama
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#sehirler" className={linkCls}>
                Tüm 81 il
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Kurumsal">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-brand">Şantiye Ağı</h2>
          <ul className="mt-3 space-y-0.5">
            {NAV_ITEMS.map((it) => (
              <li key={it.href}>
                <Link href={it.href} className={linkCls}>
                  {it.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/sss" className={linkCls}>
                Sık sorulan sorular
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Yasal">
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-brand">Yasal</h2>
          <ul className="mt-3 space-y-0.5">
            {LEGAL_DOCS.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className={linkCls}>
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-7 text-sm font-extrabold uppercase tracking-widest text-brand">Yapay zekâ için</h2>
          <ul className="mt-3 space-y-0.5">
            <li>
              <a href="/llms.txt" className={linkCls}>
                llms.txt
              </a>
            </li>
            <li>
              <a href="/llms-full.txt" className={linkCls}>
                llms-full.txt
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="container-page flex flex-col gap-2 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name} · {SITE.operator.name}, {SITE.operator.addressLine} ·{" "}
            <a href={`mailto:${SITE.email}`} className="underline decoration-brand">
              {SITE.email}
            </a>
          </p>
          <p className="max-w-xl sm:text-right">
            Şantiye Ağı bir ilan ve buluşma platformudur; kiralama, taşıma ve satış işlerinin ve ödemelerin tarafı değildir.
            <span className="mt-2 block">Lunavisore® Türk Patent ve Marka Kurumu nezdinde tescilli markadır. Başvuru No: 2023/145155. Şantiye Ağı, bu markanın bir projesidir.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
