import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "./nav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-4 border-brand bg-ink text-white">
      <a
        href="#icerik"
        className="absolute left-2 top-2 z-50 -translate-y-24 bg-brand px-4 py-2 font-extrabold text-ink focus:translate-y-0"
      >
        İçeriğe geç
      </a>
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Logo />
        <nav aria-label="Ana menü" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="px-3 py-2 text-sm font-extrabold uppercase tracking-wide text-white no-underline hover:bg-brand hover:text-ink"
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/#talep" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Talep gönder
          </Link>
          <MobileMenu items={NAV_ITEMS} />
        </div>
      </div>
    </header>
  );
}
