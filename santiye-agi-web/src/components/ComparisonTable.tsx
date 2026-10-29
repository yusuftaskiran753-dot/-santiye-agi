import { COMPARISON } from "@/lib/faq";
import { Check } from "./Icons";

/** Şantiye Ağı ile geleneksel kiralama karşılaştırması (adil: Şantiye Ağı'nın sınırları da yazılıdır). */
export function ComparisonTable() {
  return (
    <div className="overflow-x-auto border-2 border-ink bg-white shadow-block-sm" tabIndex={0} role="region" aria-label="Karşılaştırma tablosu">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <caption className="sr-only">Şantiye Ağı ile geleneksel makine kiralamanın karşılaştırması</caption>
        <thead>
          <tr className="bg-ink text-white">
            <th scope="col" className="w-1/4 px-4 py-3 text-sm font-extrabold uppercase tracking-wider">
              Konu
            </th>
            <th scope="col" className="w-[37.5%] bg-brand px-4 py-3 text-sm font-extrabold uppercase tracking-wider text-ink">
              Şantiye Ağı
            </th>
            <th scope="col" className="w-[37.5%] px-4 py-3 text-sm font-extrabold uppercase tracking-wider">
              Geleneksel kiralama
            </th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.topic} className="border-t-2 border-ink align-top">
              <th scope="row" className="bg-steel-50 px-4 py-4 text-base font-extrabold">
                {row.topic}
              </th>
              <td className="bg-brand-soft px-4 py-4 text-base font-semibold">
                <span className="flex gap-2">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-ok" />
                  <span>{row.santiye}</span>
                </span>
              </td>
              <td className="px-4 py-4 text-base text-ink-3">{row.classic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
