"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { CITIES } from "@/lib/cities";
import { MACHINES, CATEGORY_ALL } from "@/lib/machines";
import { SITE } from "@/lib/site";
import { buildQuoteMessage, whatsappUrl, type OperatorPref, type RentalTerm } from "@/lib/whatsapp";
import { Check, WhatsAppIcon } from "./Icons";

interface Props {
  /** Şehir adı (ör. "İzmir"); şehir sayfalarında önceden seçili gelir */
  defaultCity?: string;
  /** Makine slug'ı (ör. "manitou"); makine sayfalarında önceden seçili gelir */
  defaultMachine?: string;
  /** Sayfada birden fazla form varsa kimlik çakışmasını önler */
  id?: string;
  title?: string;
  /** Dar yan panel: tüm alanlar tek sütunda */
  compact?: boolean;
}

const SORTED_CITIES = [...CITIES].sort((a, b) => a.name.localeCompare(b.name, "tr"));
const MACHINE_OPTIONS = [
  ...MACHINES.map((m) => ({ value: m.slug as string, label: m.name })),
  { value: CATEGORY_ALL.slug as string, label: "Diğer iş makinesi" },
];
const TERMS: RentalTerm[] = ["Günlük", "Haftalık", "Aylık", "Belirsiz"];
const OPERATORS: OperatorPref[] = ["Fark etmez", "Operatörlü", "Operatörsüz"];

/**
 * Hızlı talep formu: İl + Makine + Tarih (+ süre, operatör) → hazır doldurulmuş WhatsApp mesajı.
 * Sunucuya veri göndermez ve saklamaz (KVKK açısından yalnızca tarayıcıda çalışır).
 * Bağlantı gerçek bir <a> olduğu için pop-up engelleyicilere takılmaz.
 */
export function QuoteForm({ defaultCity = "", defaultMachine = "", id = "talep", title = "Hızlı talep formu", compact = false }: Props) {
  const uid = useId();
  const [city, setCity] = useState(defaultCity);
  const [machine, setMachine] = useState(defaultMachine);
  const [date, setDate] = useState("");
  const [term, setTerm] = useState<RentalTerm>("Belirsiz");
  const [operator, setOperator] = useState<OperatorPref>("Fark etmez");
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [today, setToday] = useState<string | undefined>(undefined);

  // Tarih alt sınırı yalnızca istemcide hesaplanır (sunucu/istemci uyuşmazlığı olmasın).
  useEffect(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    setToday(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
  }, []);

  const machineLabel = MACHINE_OPTIONS.find((m) => m.value === machine)?.label ?? "";
  const valid = Boolean(city && machine);

  const message = useMemo(
    () => buildQuoteMessage({ machine: machineLabel || "İş makinesi", city: city || "—", date, term, operator }),
    [machineLabel, city, date, term, operator],
  );
  const href = whatsappUrl(message);

  async function copy() {
    setTouched(true);
    if (!valid) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <form
      id={id}
      className="border-2 border-ink bg-white text-ink shadow-block"
      aria-labelledby={`${uid}-title`}
      onSubmit={(e) => e.preventDefault()}
      noValidate
    >
      <div className="flex items-center justify-between gap-3 border-b-2 border-ink bg-brand px-5 py-3">
        <h2 id={`${uid}-title`} className="text-lg font-black uppercase tracking-tight">
          {title}
        </h2>
        <span className="hidden text-xs font-extrabold uppercase tracking-wider sm:inline">30 saniye</span>
      </div>

      <div className={`grid gap-4 p-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${uid}-city`} className="field-label">
            İl
          </label>
          <select id={`${uid}-city`} className="field" value={city} onChange={(e) => setCity(e.target.value)} aria-invalid={touched && !city}>
            <option value="">İl seçin</option>
            {SORTED_CITIES.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-machine`} className="field-label">
            Makine türü
          </label>
          <select
            id={`${uid}-machine`}
            className="field"
            value={machine}
            onChange={(e) => setMachine(e.target.value)}
            aria-invalid={touched && !machine}
          >
            <option value="">Makine seçin</option>
            {MACHINE_OPTIONS.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${uid}-date`} className="field-label">
            Başlangıç tarihi
          </label>
          <input id={`${uid}-date`} type="date" className="field" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor={`${uid}-term`} className="field-label">
            Kiralama süresi
          </label>
          <select id={`${uid}-term`} className="field" value={term} onChange={(e) => setTerm(e.target.value as RentalTerm)}>
            {TERMS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${uid}-op`} className="field-label">
            Operatör
          </label>
          <select id={`${uid}-op`} className="field" value={operator} onChange={(e) => setOperator(e.target.value as OperatorPref)}>
            {OPERATORS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3 border-t-2 border-ink bg-steel-50 p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={valid ? href : "#" + id}
            target={valid ? "_blank" : undefined}
            rel={valid ? "noopener noreferrer" : undefined}
            aria-disabled={!valid}
            onClick={(e) => {
              if (!valid) {
                e.preventDefault();
                setTouched(true);
              }
            }}
            className={`btn btn-primary flex-1 ${valid ? "" : "opacity-60"}`}
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp'ta talep gönder
          </a>
          <button type="button" onClick={copy} className="btn btn-outline" aria-disabled={!valid}>
            {copied ? (
              <>
                <Check className="h-5 w-5" /> Kopyalandı
              </>
            ) : (
              "Mesajı kopyala"
            )}
          </button>
        </div>
        <p className="text-sm font-semibold text-ink-3" role="status" aria-live="polite">
          {touched && !valid
            ? "Devam etmek için il ve makine türünü seçin."
            : SITE.whatsappNumber
              ? "Mesaj hazır doldurulur ve Şantiye Ağı WhatsApp hattına gider. Veriniz sitede saklanmaz."
              : "Mesaj hazır doldurulur; WhatsApp'ta göndereceğiniz kişiyi siz seçersiniz. Veriniz sitede saklanmaz."}
        </p>
      </div>
    </form>
  );
}
