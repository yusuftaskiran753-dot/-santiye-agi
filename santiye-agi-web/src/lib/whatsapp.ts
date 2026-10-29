import { SITE } from "./site";

export type RentalTerm = "Günlük" | "Haftalık" | "Aylık" | "Belirsiz";
export type OperatorPref = "Operatörlü" | "Operatörsüz" | "Fark etmez";

export interface QuoteRequest {
  machine: string;
  city: string;
  /** ISO tarih (YYYY-MM-DD) veya boş */
  date?: string;
  term?: RentalTerm;
  operator?: OperatorPref;
}

const dateFormatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
  timeZone: "UTC",
});

export function formatDateTr(iso?: string): string | undefined {
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? undefined : dateFormatter.format(d);
}

/** Talep metni. Kopyalanabilir ve WhatsApp'a hazır doldurulur. */
export function buildQuoteMessage(q: QuoteRequest): string {
  const lines = [
    "Merhaba, Şantiye Ağı üzerinden kiralık makine arıyorum.",
    `• Makine: ${q.machine}`,
    `• İl: ${q.city}`,
  ];
  const date = formatDateTr(q.date);
  if (date) lines.push(`• Başlangıç tarihi: ${date}`);
  if (q.term && q.term !== "Belirsiz") lines.push(`• Kiralama süresi: ${q.term}`);
  if (q.operator && q.operator !== "Fark etmez") lines.push(`• Operatör: ${q.operator}`);
  lines.push(
    "Uygun makineniz var mı? Fiyatı (nakliye, yakıt ve operatör dahil/hariç), teslim saatini ve belgeleri (operatör belgesi, periyodik kontrol, sigorta) yazar mısınız?",
  );
  return lines.join("\n");
}

/**
 * WhatsApp bağlantısı. Numara tanımlıysa o numaraya, değilse "kişi seç" modunda (wa.me/?text=) açılır;
 * böylece kullanıcı mesajı istediği makine sahibine/gruba gönderebilir.
 */
export function whatsappUrl(text: string, number: string | undefined = SITE.whatsappNumber): string {
  const q = new URLSearchParams({ text }).toString();
  return number ? `https://wa.me/${number}?${q}` : `https://wa.me/?${q}`;
}

/** Sayfalardaki genel "WhatsApp ile yaz" bağlantısı. */
export function whatsappContactUrl(): string {
  return whatsappUrl("Merhaba, Şantiye Ağı hakkında bilgi almak istiyorum.");
}
