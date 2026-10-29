import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/schema";

/** İç sayfalar için siyah başlık bandı: ekmek kırıntısı + tek <h1> + özet. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="container-page py-10 sm:py-14">
        <Breadcrumbs crumbs={crumbs} light />
        {eyebrow && <p className="eyebrow-light mt-5">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <div className="mt-5 max-w-3xl text-lg text-white/85 sm:text-xl">{lead}</div>}
        {children}
      </div>
      <div className="hazard h-3" aria-hidden />
    </section>
  );
}
