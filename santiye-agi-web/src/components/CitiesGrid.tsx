import Link from "next/link";
import { CITIES, PRIORITY_CITIES, type Region } from "@/lib/cities";
import { terms } from "@/lib/content";
import { MACHINES } from "@/lib/machines";
import { cityPath } from "@/lib/slugs";

const REGIONS: Region[] = ["Marmara", "Ege", "Akdeniz", "İç Anadolu", "Karadeniz", "Doğu Anadolu", "Güneydoğu Anadolu"];

/**
 * Şehir ağı: öncelikli 5 şehir (5 makine bağlantısıyla) + 81 ilin tamamı (bölgelere göre).
 * Tüm şehir-makine sayfalarına ana sayfadan en çok 3 tıkla ulaşılır (iç bağlantı ağı).
 */
export function CitiesGrid() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PRIORITY_CITIES.map((c) => (
          <div key={c.slug} className="border-2 border-ink bg-white p-5">
            <h3 className="text-2xl font-black">
              <Link href={cityPath("is-makinesi", c)} className="inline-block py-0.5 no-underline hover:bg-brand">
                {c.name}
              </Link>
            </h3>
            <p className="text-sm font-semibold text-ink-3">
              Plaka {c.plate} · {c.region}
            </p>
            <ul className="mt-3 space-y-0.5">
              {MACHINES.map((m) => (
                <li key={m.slug}>
                  <Link href={cityPath(m.slug, c)} className="inline-block py-0.5 font-bold text-ink underline decoration-brand decoration-4 underline-offset-4 hover:bg-brand">
                    {c.name} {terms(m.slug).kiralama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col justify-center border-2 border-dashed border-ink bg-brand-soft p-5">
          <p className="text-2xl font-black">{CITIES.length} ilin tamamı</p>
          <p className="mt-1 text-ink-3">Aşağıdan ilinizi seçin; her ilin kendi iş makinesi kiralama sayfası ve beş makine türü için sayfaları vardır.</p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {REGIONS.map((region) => (
          <section key={region} aria-label={`${region} Bölgesi illeri`}>
            <h3 className="mb-3 border-b-2 border-ink pb-1 text-sm font-extrabold uppercase tracking-widest">{region}</h3>
            <div className="flex flex-wrap gap-2">
              {CITIES.filter((c) => c.region === region).map((c) => (
                <Link
                  key={c.slug}
                  href={cityPath("is-makinesi", c)}
                  title={`${c.name} iş makinesi kiralama`}
                  className="inline-block border-2 border-ink bg-white px-2.5 py-1 text-sm font-bold no-underline hover:bg-brand"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
