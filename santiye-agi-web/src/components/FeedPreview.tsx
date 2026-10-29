import Link from "next/link";
import { ArrowRight, MachineIcon, UiIcon } from "./Icons";
import { StatusBadge } from "./StatusBadge";
import type { CategorySlug } from "@/lib/machines";

interface Post {
  initials: string;
  who: string;
  kind: string;
  caption: string;
  machine: CategorySlug;
  action: string;
}

/** Örnek gönderi kartları (uygulama arayüzünü anlatır; gerçek kullanıcı içeriği değildir, görsel yerine silüet kullanılır). */
const POSTS: Post[] = [
  { initials: "EK", who: "Ekskavatör operatörü · Ankara", kind: "İş paylaşımı", caption: "Bugün temel kazısı tamamlandı. Sıradaki iş için müsaitim.", machine: "ekskavator", action: "Profili gör" },
  { initials: "YM", who: "Yapı firması · İzmir", kind: "Makine arıyorum", caption: "Önümüzdeki hafta için operatörlü manitou arıyoruz.", machine: "manitou", action: "İlana git" },
  { initials: "ÜŞ", who: "Şantiye şefi · Bursa", kind: "İhale", caption: "Fabrika sahası için forklift işi ihaleye açıldı.", machine: "forklift", action: "İhaleyi gör" },
];

export function FeedPreview() {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <StatusBadge kind="sample" />
        <p className="text-sm font-semibold text-ink-3">Örnek gönderiler: uygulamadaki Şantiye Akışı'nın görünümü. Gerçek kullanıcı içeriği değildir.</p>
      </div>

      <div className="mb-5 flex items-center gap-3 overflow-x-auto pb-2" aria-label="Hikâye çubuğu örneği" role="group">
        {["Hikâyen", "EK", "YM", "ÜŞ", "OP"].map((s, i) => (
          <span key={s} className="flex shrink-0 flex-col items-center gap-1">
            <span
              className={`grid h-14 w-14 place-items-center rounded-full border-[3px] text-sm font-black ${i === 0 ? "border-dashed border-ink bg-white" : "border-brand bg-ink text-white"}`}
            >
              {i === 0 ? "+" : s}
            </span>
            <span className="text-[11px] font-bold text-ink-3">{i === 0 ? "Hikâyen" : "24 saat"}</span>
          </span>
        ))}
      </div>

      <ul className="grid gap-4 md:grid-cols-3">
        {POSTS.map((p) => (
          <li key={p.caption} className="flex flex-col border-2 border-ink bg-white">
            <div className="flex items-center gap-3 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-black text-brand">{p.initials}</span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-extrabold">{p.who}</span>
                <span className="badge badge-brand mt-0.5 !px-1.5 !py-0 !text-[10px]">{p.kind}</span>
              </span>
            </div>
            <div className="grid aspect-[4/3] place-items-center border-y-2 border-ink bg-brand-soft text-ink">
              <MachineIcon slug={p.machine} className="h-24 w-24 opacity-90" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="font-semibold">{p.caption}</p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-sm font-extrabold">
                <span className="flex items-center gap-1.5"><UiIcon name="star" className="h-4 w-4" />Beğen</span>
                <span>Yorum</span>
                <span className="bg-ink px-2.5 py-1 text-brand">{p.action}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/sosyal-akis" className="link-arrow mt-5">
        Şantiye Akışı nedir? <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
