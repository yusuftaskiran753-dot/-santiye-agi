import { UiIcon, type UiIconName } from "./Icons";

/**
 * Güven işaretleri. Yalnızca uygulamada gerçekten var olan mekanizmalar listelenir.
 * (Sigorta ve operatör belgesi uygulama tarafından doğrulanmaz; "kontrol edin" uyarısı aşağıda yazılıdır.)
 */
const ITEMS: Array<{ icon: UiIconName; title: string; text: string }> = [
  { icon: "phone", title: "Telefon doğrulandı rozeti", text: "Profilde telefon doğrulamasını gösterir." },
  { icon: "shield", title: "Onaylı firma rozeti", text: "Firmalar için ayrı güven işareti." },
  { icon: "star", title: "Puan: biten işten sonra", text: "Yalnızca tamamlanan anlaşmadan, her taraf bir kez." },
  { icon: "file", title: "Telefonunuz gizli", text: "Yalnızca yetkili kullanıcılara gösterilir." },
  { icon: "users", title: "Şikâyet ve engelleme", text: "Çok şikâyet alan ilan otomatik yayından kalkar." },
  { icon: "clock", title: "Komisyon yok", text: "Ödeme taraflar arasında doğrudan yapılır." },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="guven-baslik" className="border-y-2 border-ink bg-steel-50">
      <div className="container-page py-8 sm:py-10">
        <h2 id="guven-baslik" className="text-sm font-extrabold uppercase tracking-widest text-ink-3">
          Güven ve güvenlik
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <li key={it.title} className="flex items-start gap-3 border-2 border-ink bg-white p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-brand text-ink">
                <UiIcon name={it.icon} className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-extrabold leading-tight">{it.title}</span>
                <span className="block text-sm text-ink-3">{it.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold text-ink-3">
          Operatör belgesini, periyodik kontrol ve sigortayı kiralamadan önce karşı taraftan isteyin; Şantiye Ağı bu belgeleri doğrulamaz.
        </p>
      </div>
    </section>
  );
}
