import type { SVGProps } from "react";
import type { CategorySlug } from "@/lib/machines";

type P = SVGProps<SVGSVGElement>;

const line: P = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

/** Makine siluetleri (64×64, çizgi stili). Dekoratiftir; erişilebilir ad kartın başlığından gelir. */
export function MachineIcon({ slug, ...props }: { slug: CategorySlug } & P) {
  const common = { viewBox: "0 0 64 64", "aria-hidden": true, focusable: false, ...line, ...props } as P;
  switch (slug) {
    case "forklift":
      return (
        <svg {...common}>
          {/* direk ve çatal */}
          <path d="M46 8v42M52 8v42M52 46h9M52 38h9" />
          {/* kabin ve gövde */}
          <path d="M8 44h38M14 44V20h15v24M12 20h19M29 28l6 8v8" />
          <circle cx="16" cy="50" r="5" />
          <circle cx="37" cy="50" r="5" />
        </svg>
      );
    case "manitou":
      return (
        <svg {...common}>
          {/* şasi, kabin, tekerlekler */}
          <path d="M6 42h40v-6H22l-3-8H8z" />
          <path d="M12 28v-6h9l3 6" />
          <circle cx="15" cy="49" r="5" />
          <circle cx="39" cy="49" r="5" />
          {/* teleskopik bom ve çatal */}
          <path d="M30 36 54 12" />
          <path d="M34 38 58 14" />
          <path d="M54 8v14h8" />
        </svg>
      );
    case "sepetli-vinc":
      return (
        <svg {...common}>
          <path d="M5 44h38v-8H20l-4-8H5z" />
          <circle cx="14" cy="51" r="5" />
          <circle cx="35" cy="51" r="5" />
          {/* bom */}
          <path d="M30 36 50 18" />
          <path d="M34 38 52 22" />
          {/* sepet */}
          <path d="M46 6h14v14H46zM46 12h14" />
        </svg>
      );
    case "ekskavator":
      return (
        <svg {...common}>
          {/* palet */}
          <rect x="5" y="46" width="36" height="11" rx="5.5" />
          <path d="M14 52h18" />
          {/* gövde ve kabin */}
          <path d="M10 46V32h20v14M16 32v-8h10l4 8" />
          {/* bom, kol, kova */}
          <path d="M28 34 40 12 56 30" />
          <path d="M56 30l-7 8h11z" />
        </svg>
      );
    case "mobil-vinc":
      return (
        <svg {...common}>
          <path d="M4 46h46v-8H20l-4-8H4z" />
          <circle cx="12" cy="52" r="5" />
          <circle cx="28" cy="52" r="5" />
          <circle cx="43" cy="52" r="5" />
          {/* kafes bom */}
          <path d="M24 38 54 8M29 40 59 10" />
          <path d="M33 33l5 5M40 26l5 5M47 19l5 5" />
          {/* halat ve kanca */}
          <path d="M57 10v18" />
          <path d="M57 28a3.5 3.5 0 1 1-3.5 3.5" />
        </svg>
      );
    default:
      // is-makinesi: genel kategori için baret (marka logosuyla uyumlu)
      return (
        <svg {...common}>
          <path d="M12 42a20 20 0 0 1 40 0z" />
          <path d="M5 42h54v8H5z" />
          <path d="M28 23h8v19h-8z" />
        </svg>
      );
  }
}

export function ArrowRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} {...line} strokeWidth={2.5} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Check(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} {...line} strokeWidth={3} {...props}>
      <path d="M4 12.5 9.5 18 20 6" />
    </svg>
  );
}

export function Cross(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} {...line} strokeWidth={3} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MenuIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} {...line} strokeWidth={2.75} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

/** WhatsApp logosu (Simple Icons, CC0). */
export function WhatsAppIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable={false} fill="currentColor" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export type UiIconName = "shield" | "pin" | "gavel" | "camera" | "route" | "phone" | "file" | "wifi-off" | "users" | "star" | "clock";

/** Küçük arayüz ikonları (24×24). */
export function UiIcon({ name, ...props }: { name: UiIconName } & P) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...line, strokeWidth: 2.25, ...props } as P;
  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6z" />
          <path d="m9 12 2.2 2.2L15.5 10" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-6 7-11.5A7 7 0 0 0 5 9.5C5 15 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "gavel":
      return (
        <svg {...common}>
          <path d="m14 4 6 6M11 7l6 6M5.5 12.5l6 6M3 21h9M8.5 15.5 4 20" />
          <path d="m12 3 3.5 3.5-5 5L7 8z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case "route":
      return (
        <svg {...common}>
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M6 3h4l1.5 4.5-2.2 1.4a11 11 0 0 0 5.8 5.8l1.4-2.2L21 14v4a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 3H6v18h12V7z" />
          <path d="M14 3v4h4M9 12h6M9 16h6" />
        </svg>
      );
    case "wifi-off":
      return (
        <svg {...common}>
          <path d="M3 3l18 18M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 4-2.4M19 13a10 10 0 0 0-3.3-2.1M2 8.8A15 15 0 0 1 6 6M22 8.8A15 15 0 0 0 11 5" />
          <path d="M12 20h.01" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.8a3.5 3.5 0 0 1 0 6.4M17.5 14a6 6 0 0 1 4 6" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
  }
}
