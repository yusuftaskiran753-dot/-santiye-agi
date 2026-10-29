"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { MenuIcon } from "./Icons";

/** Açılır menü: <details> ile JavaScript'siz çalışır; sayfa değişince kendiliğinden kapanır. */
export function MobileMenu({ items }: { items: ReadonlyArray<{ href: string; label: string }> }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  return (
    <details ref={ref} className="lg:hidden">
      <summary className="btn btn-primary btn-sm cursor-pointer select-none" aria-label="Menüyü aç veya kapat">
        <MenuIcon className="h-5 w-5" />
        Menü
      </summary>
      <nav aria-label="Mobil menü" className="absolute inset-x-0 top-full border-b-4 border-brand bg-ink px-4 pb-5 pt-2 shadow-xl">
        <ul className="mx-auto max-w-page divide-y divide-white/15">
          {items.map((it) => (
            <li key={it.href}>
              <Link href={it.href} className="block py-3.5 text-lg font-extrabold text-white no-underline hover:text-brand">
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
