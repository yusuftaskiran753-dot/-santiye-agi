import Link from "next/link";
import { MACHINES } from "@/lib/machines";
import { categoryPath } from "@/lib/slugs";
import { terms } from "@/lib/content";
import { ArrowRight, MachineIcon } from "./Icons";

/** 5 ana makine türü kartı: her kart, o türün ulusal kiralama sayfasına gider. */
export function MachineCards({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {MACHINES.map((m) => (
        <li key={m.slug} className="group border-2 border-ink bg-white transition hover:shadow-block">
          <Link href={categoryPath(m.slug)} className="flex h-full flex-col p-5 no-underline">
            <span className="flex items-start justify-between gap-3">
              <span className="grid h-16 w-16 place-items-center border-2 border-ink bg-brand text-ink">
                <MachineIcon slug={m.slug} className="h-11 w-11" />
              </span>
              <ArrowRight className="h-6 w-6 text-ink opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
            </span>
            <H className="mt-4 text-2xl font-black">{terms(m.slug).kiralik}</H>
            <span className="mt-1 text-base font-semibold text-ink-3">{m.tagline}</span>
            <span className="mt-3 text-sm text-ink-3">
              Uygulamada: <strong className="text-ink">{m.appLabels[0]}</strong>
              {m.appLabels.length > 1 ? ` ve ${m.appLabels.length - 1} ilgili kategori` : ""}
            </span>
          </Link>
        </li>
      ))}
      <li className="border-2 border-dashed border-ink bg-brand-soft">
        <Link href="/makineler" className="flex h-full flex-col justify-between p-5 no-underline">
          <span>
            <span className="eyebrow">88 makine türü</span>
            <H className="mt-4 text-2xl font-black">Diğer iş makineleri</H>
            <span className="mt-1 block text-base font-semibold text-ink-3">
              Silindir, greyder, finişer, loder, dozer, kamyon, beton pompası ve daha fazlası.
            </span>
          </span>
          <span className="link-arrow mt-4 self-start">
            Tüm makineleri gör <ArrowRight className="h-5 w-5" />
          </span>
        </Link>
      </li>
    </ul>
  );
}
