/**
 * Site genelindeki sabitler ve ortam değişkenleri.
 *
 * Ortam değişkenleri `.env.example` dosyasında açıklanır. Hiçbiri zorunlu değildir:
 * eksikse site güvenli varsayılanlarla çalışır (ör. WhatsApp "kişi seç" modu, mağaza "Yakında" rozeti).
 */

const DEFAULT_URL = "https://santiyeagi.com.tr";

function cleanUrl(value: string | undefined, fallback: string): string {
  const v = (value ?? "").trim().replace(/\/+$/, "");
  return /^https?:\/\//.test(v) ? v : fallback;
}

function cleanStoreUrl(value: string | undefined): string | undefined {
  const v = (value ?? "").trim();
  return /^https:\/\//.test(v) ? v : undefined;
}

function cleanPhone(value: string | undefined): string | undefined {
  const digits = (value ?? "").replace(/\D/g, "");
  return digits.length >= 11 && digits.length <= 15 ? digits : undefined;
}

export const SITE = {
  name: "Şantiye Ağı",
  alternateNames: ["Santiye Agi", "Şantiye Ağı Uygulaması"],
  tagline: "Yük, iş makinesi, malzeme ve operatör ilanları tek uygulamada",
  url: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL, DEFAULT_URL),
  lang: "tr",
  locale: "tr_TR",
  themeColor: "#FFC400",

  /** İşletici (Kullanım Koşulları'ndaki "İşletici") ve iletişim */
  operator: {
    name: "Yusuf Taşkıran",
    addressLine: "Merkez, Sivas / Türkiye",
    locality: "Sivas",
    country: "TR",
  },
  email: "yusuftaskiran753@gmail.com",

  /** Ülke kodlu, yalnızca rakam. Yoksa form "kişi seç" modunda WhatsApp'ı açar. */
  whatsappNumber: cleanPhone(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),

  /** Uygulama yayınlanınca doldurulur; boşken tüm sayfalarda "Yakında" gösterilir. */
  stores: {
    android: cleanStoreUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL),
    ios: cleanStoreUrl(process.env.NEXT_PUBLIC_APP_STORE_URL),
  },

  googleVerification: (process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "").trim() || undefined,

  /** İçerik tarihi (sitemap lastmod, dateModified, "son güncelleme"). İçerik değiştikçe elle güncelleyin. */
  contentUpdated: "2026-10-29",
} as const;

/** Mobil uygulama kaynak sürümünden (pubspec.yaml / config.dart) doğrulanmış sayılar. */
export const APP_FACTS = {
  version: "2.1.2",
  cityCount: 81,
  machineTypeCount: 88,
  professionCount: 82,
  freeMonthlyContacts: 5,
  freeActiveListings: 5,
  creditPacks: [5, 15, 40],
  boostDayCost: 1,
  boostWeekCost: 5,
  storyHours: 24,
  minBidNoteLength: 15,
} as const;

export const appIsInStores = Boolean(SITE.stores.android || SITE.stores.ios);

/** Yol (/…) → tam adres. */
export function absoluteUrl(path = "/"): string {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Kurumsal ve yapay zekâ özetleri için tek yerde tutulan kısa tanım. */
export const SITE_SUMMARY =
  "Şantiye Ağı; yük, iş makinesi, inşaat malzemesi ve operatör/personel ilanlarını tek yerde toplayan, Türkiye'nin 81 ilinde ücretsiz kullanılan, komisyonsuz bir mobil ilan ve buluşma uygulamasıdır.";

/**
 * Özellik durumu. Şantiye Akışı ve İhale, uygulamanın 2.1.2 kaynak sürümünde bulunur ancak kullanıcılar arası
 * ortak sunucu uçları henüz tamamlanmamıştır (bkz. uygulama notları). Sunucu bağlandığında "preview" → "live" yapın;
 * "live" iken sitedeki "Önizleme" uyarıları kaybolur.
 */
export const FEATURE_STATUS: Record<"tenders" | "social", "preview" | "live"> = {
  tenders: "preview",
  social: "preview",
};
