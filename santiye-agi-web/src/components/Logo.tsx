import Link from "next/link";

/** Marka işareti: uygulama simgesinin (baret + ağ düğümleri) siyah-sarı uyarlaması. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable={false}>
      <rect width="64" height="64" fill="#FFC400" />
      <rect x="1.5" y="1.5" width="61" height="61" fill="none" stroke="#111111" strokeWidth="3" />
      <g fill="none" stroke="#111111" strokeWidth="2.4" strokeLinecap="round" opacity=".55">
        <path d="M14 18 32 12 50 18" />
      </g>
      <g fill="#111111">
        <circle cx="14" cy="18" r="3.6" />
        <circle cx="32" cy="12" r="3.6" />
        <circle cx="50" cy="18" r="3.6" />
        <path d="M16 42c0-9 6-16 16-16.5C42 26 48 33 48 42z" />
        <rect x="11" y="41" width="42" height="7" />
        <rect x="11" y="51" width="42" height="4" />
      </g>
      <rect x="29" y="27" width="6" height="14" fill="#FFC400" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 no-underline ${light ? "text-white" : "text-ink"}`} aria-label="Şantiye Ağı ana sayfa">
      <LogoMark />
      <span className="text-lg font-black uppercase tracking-tight sm:text-xl">
        Şantiye <span className={light ? "text-brand" : "bg-brand px-1"}>Ağı</span>
        <span className="block text-[10px] font-medium normal-case tracking-normal">by Lunavisore</span>
      </span>
    </Link>
  );
}
