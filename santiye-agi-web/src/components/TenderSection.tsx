import Link from "next/link";
import { getTenders, type TenderCard } from "@/lib/tenders";
import { ArrowRight, UiIcon } from "./Icons";
import { StatusBadge } from "./StatusBadge";

const STATUS_LABEL: Record<TenderCard["status"], string> = { open: "Teklif alıyor", closed: "Teklif süresi doldu", awarded: "Verildi" };

function closesText(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return `Son teklif: ${new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", timeZone: "Europe/Istanbul" }).format(d)}`;
}

/** İhale kartları. Gerçek akış tanımlı değilse kartlar açıkça "Örnek" etiketiyle gösterilir. */
export async function TenderCards({ limit = 4 }: { limit?: number }) {
  const { tenders, live } = await getTenders(limit);
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <StatusBadge kind={live ? "new" : "sample"} />
        <p className="text-sm font-semibold text-ink-3">
          {live
            ? "Güncel ihale akışı"
            : "Aşağıdaki kartlar uygulamadaki ihale kartının nasıl göründüğünü gösteren örneklerdir; gerçek ihale değildir."}
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {tenders.map((t) => (
          <li key={t.id} className="flex flex-col border-2 border-ink bg-white p-5">
            <div className="flex items-center justify-between gap-2">
              <span className={`badge ${t.status === "open" ? "badge-brand" : ""}`}>{STATUS_LABEL[t.status]}</span>
              <span className="flex items-center gap-1 text-sm font-bold text-ink-3">
                <UiIcon name="pin" className="h-4 w-4" />
                {t.city}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-extrabold leading-snug">{t.title}</h3>
            <p className="mt-2 text-sm text-ink-3">
              {[...t.sectors, closesText(t.closesAt), typeof t.bidCount === "number" ? `${t.bidCount} teklif` : null]
                .filter(Boolean)
                .join(" · ") || "Ayrıntılar uygulamada"}
            </p>
          </li>
        ))}
      </ul>
      <Link href="/ihaleler" className="link-arrow mt-5">
        İhale sistemi nasıl çalışır? <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
