import { FEATURE_STATUS } from "@/lib/site";
import { StatusBadge } from "./StatusBadge";

/** Özellik henüz "live" değilse dürüst bir durum notu gösterir. */
export function PreviewNotice({ feature }: { feature: keyof typeof FEATURE_STATUS }) {
  if (FEATURE_STATUS[feature] === "live") return null;
  return (
    <div className="flex flex-wrap items-start gap-3 border-2 border-ink bg-brand-soft p-4" role="note">
      <StatusBadge kind="preview" />
      <p className="min-w-0 flex-1 text-sm font-semibold sm:text-base">
        Bu özellik uygulamanın son sürümünde (2.1.2) yer alır; kullanıma açılış durumu mağaza yayınıyla birlikte duyurulacaktır. Bu sayfa özelliğin nasıl çalışacağını anlatır.
      </p>
    </div>
  );
}
