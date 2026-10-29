import "server-only";

/**
 * İhale kartları.
 *
 * Uygulamanın ihale özelliği mevcut kaynak sürümünde (2.1.2) cihaz içinde çalışır; kullanıcılar arası
 * ortak bir ihale API'si henüz yoktur. Bu yüzden site gerçek ihale uydurmaz:
 *  - TENDERS_FEED_URL tanımlıysa o JSON akışı okunur (5 dk önbellek, doğrulama ve temizleme ile).
 *  - Tanımlı değilse veya akış hata verirse, AÇIKÇA "Örnek" etiketli arayüz kartları gösterilir.
 *
 * Beklenen akış biçimi (dizi ya da { tenders: [...] }):
 *   { "id": "t-1", "title": "…", "city": "Ankara", "sectors": ["Hafriyat"],
 *     "status": "open" | "closed" | "awarded", "closesAt": "2026-11-20T17:00:00+03:00", "bidCount": 4 }
 */
export type TenderStatus = "open" | "closed" | "awarded";

export interface TenderCard {
  id: string;
  title: string;
  city: string;
  sectors: string[];
  status: TenderStatus;
  closesAt?: string;
  bidCount?: number;
}

export interface TenderFeed {
  tenders: TenderCard[];
  /** true: gerçek akıştan; false: örnek arayüz kartları */
  live: boolean;
}

const SAMPLE_TENDERS: TenderCard[] = [
  { id: "ornek-1", title: "Konut projesi için hafriyat ve dolgu işi", city: "Ankara", sectors: ["Hafriyat", "İnşaat"], status: "open" },
  { id: "ornek-2", title: "Fabrika sahası için aylık forklift kiralama", city: "Bursa", sectors: ["İnşaat"], status: "open" },
  { id: "ornek-3", title: "Cephe boya işi için sepetli araç ve operatör", city: "İzmir", sectors: ["İnşaat"], status: "open" },
  { id: "ornek-4", title: "Yol altyapısı için greyder ve silindir", city: "Antalya", sectors: ["Altyapı"], status: "awarded" },
];

const STATUSES: readonly TenderStatus[] = ["open", "closed", "awarded"];

function text(v: unknown, max: number): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.replace(/\s+/g, " ").trim().slice(0, max);
  return t || undefined;
}

function parseCard(raw: unknown): TenderCard | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const id = text(r.id, 64);
  const title = text(r.title, 140);
  const city = text(r.city, 40);
  const status = STATUSES.find((s) => s === r.status);
  if (!id || !title || !city || !status) return null;
  const sectors = Array.isArray(r.sectors)
    ? r.sectors.map((s) => text(s, 30)).filter((s): s is string => Boolean(s)).slice(0, 3)
    : [];
  const closesAt = typeof r.closesAt === "string" && !Number.isNaN(Date.parse(r.closesAt)) ? r.closesAt : undefined;
  const bidCount = typeof r.bidCount === "number" && Number.isFinite(r.bidCount) && r.bidCount >= 0 ? Math.floor(r.bidCount) : undefined;
  return { id, title, city, sectors, status, closesAt, bidCount };
}

export async function getTenders(limit = 4): Promise<TenderFeed> {
  const url = (process.env.TENDERS_FEED_URL ?? "").trim();
  if (url.startsWith("https://")) {
    try {
      const res = await fetch(url, {
        headers: { accept: "application/json" },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data: unknown = await res.json();
        const list = Array.isArray(data) ? data : (data as { tenders?: unknown })?.tenders;
        if (Array.isArray(list)) {
          const tenders = list.map(parseCard).filter((t): t is TenderCard => t !== null).slice(0, limit);
          if (tenders.length) return { tenders, live: true };
        }
      }
    } catch {
      // Akış erişilemezse sayfa bozulmaz; örnek kartlara düşülür.
    }
  }
  return { tenders: SAMPLE_TENDERS.slice(0, limit), live: false };
}
