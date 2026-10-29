import { SITE } from "@/lib/site";

/**
 * Mağaza düğmeleri. Mağaza adresi tanımlıysa gerçek bağlantı, değilse "Yakında" etiketi gösterilir
 * (olmayan bir bağlantıya yönlendirme yapılmaz).
 */
export function StoreButtons({ dark = false }: { dark?: boolean }) {
  const items = [
    { name: "Google Play", url: SITE.stores.android, sub: "Android" },
    { name: "App Store", url: SITE.stores.ios, sub: "iPhone" },
  ];
  const base = "flex min-w-[11rem] items-center gap-3 border-2 px-4 py-2.5 text-left no-underline";
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Uygulama mağazaları">
      {items.map((s) => (
        <li key={s.name}>
          {s.url ? (
            <a
              href={s.url}
              rel="noopener"
              className={`${base} ${dark ? "border-white bg-white text-ink hover:bg-brand" : "border-ink bg-ink text-white hover:bg-ink-2"}`}
            >
              <span>
                <span className="block text-[11px] font-bold uppercase tracking-wider opacity-70">{s.sub} için</span>
                <span className="block text-lg font-black leading-tight">{s.name}</span>
              </span>
            </a>
          ) : (
            <span
              className={`${base} cursor-default ${dark ? "border-white/40 bg-white/10 text-white" : "border-ink/30 bg-steel-100 text-ink"}`}
              aria-label={`${s.name}: yakında`}
            >
              <span>
                <span className={`block text-[11px] font-extrabold uppercase tracking-wider ${dark ? "text-brand" : "text-ink-3"}`}>Yakında</span>
                <span className="block text-lg font-black leading-tight">{s.name}</span>
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
