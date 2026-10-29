import type { Faq } from "@/lib/machines";

/**
 * SSS: <details> ile JavaScript'siz çalışır; cevap metni her zaman DOM'dadır (tarayıcılar ve yapay zekâ için okunabilir).
 * Aynı `faqs` dizisi FAQPage JSON-LD'ye de verilmelidir; görünür içerik ile şema birebir aynı kalır.
 */
export function FaqList({ faqs, openFirst = true }: { faqs: Faq[]; openFirst?: boolean }) {
  return (
    <div className="border-t-2 border-ink">
      {faqs.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0} className="group border-b-2 border-ink">
          <summary className="flex cursor-pointer items-start justify-between gap-4 py-5 pr-1">
            <h3 className="text-lg font-extrabold leading-snug sm:text-xl">{f.q}</h3>
            <span
              aria-hidden
              className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border-2 border-ink bg-brand text-xl font-black leading-none group-open:bg-ink group-open:text-brand"
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:inline">–</span>
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-10 text-ink-3">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
