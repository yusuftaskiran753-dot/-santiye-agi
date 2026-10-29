import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Görünür ekmek kırıntısı. Aynı yol BreadcrumbList JSON-LD ile de verilir. */
export function Breadcrumbs({ crumbs, light = false }: { crumbs: Crumb[]; light?: boolean }) {
  return (
    <nav aria-label="Sayfa yolu" className={`text-sm font-semibold ${light ? "text-white/80" : "text-ink-3"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? "text-white" : "text-ink"}>
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="underline decoration-brand decoration-2">
                  {c.name}
                </Link>
              )}
              {!last && <span aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
