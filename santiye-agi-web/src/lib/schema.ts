/**
 * Schema.org JSON-LD üreticileri.
 *
 * Bilinçli tercihler (Google "structured data" ilkeleri ve doğruluk gereği):
 *  - AggregateRating / Review YOK: gerçek kullanıcı puanı verisi olmadan eklenemez, uydurulması yönerge ihlalidir.
 *  - priceRange YOK: fiyatları ilan sahipleri belirler, Şantiye Ağı fiyat listesi sunmaz.
 *  - LocalBusiness YOK: fiziksel müşteri kabul eden bir işyeri yoktur. Organization + MobileApplication + Service kullanılır.
 *  - Makine türleri için Product yerine Service: sunulan şey ürün değil, ilan ve buluşma hizmetidir.
 *  - Tüm düğümler @id ile birbirine bağlanır (tek bir bilgi grafiği).
 */
import type { City } from "./cities";
import type { CategoryView, Faq } from "./machines";
import { APP_FACTS, SITE, SITE_SUMMARY, absoluteUrl } from "./site";

export type Json = Record<string, unknown>;

export const IDS = {
  org: () => `${SITE.url}/#organization`,
  person: () => `${SITE.url}/#operator`,
  website: () => `${SITE.url}/#website`,
  app: () => `${SITE.url}/#app`,
  page: (path: string) => `${absoluteUrl(path)}#webpage`,
  crumbs: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
  faq: (path: string) => `${absoluteUrl(path)}#faq`,
  service: (path: string) => `${absoluteUrl(path)}#service`,
  list: (path: string) => `${absoluteUrl(path)}#list`,
  howto: (path: string) => `${absoluteUrl(path)}#howto`,
};

const country = { "@type": "Country", name: "Türkiye" };

export function graph(...nodes: Json[]): Json {
  return { "@context": "https://schema.org", "@graph": nodes };
}

// ───────────────────────── Site geneli (layout) ─────────────────────────

export function organizationSchema(): Json {
  return {
    "@type": "Organization",
    "@id": IDS.org(),
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/icons/icon-512.png"), width: 512, height: 512 },
    image: absoluteUrl("/og.png"),
    description: SITE_SUMMARY,
    slogan: SITE.tagline,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.operator.locality,
      addressCountry: SITE.operator.country,
    },
    areaServed: country,
    founder: { "@id": IDS.person() },
    knowsAbout: [
      "İş makinesi kiralama",
      "Manitou (teleskopik yükleyici) kiralama",
      "Forklift kiralama",
      "Sepetli vinç ve manlift kiralama",
      "Ekskavatör kiralama",
      "Mobil vinç kiralama",
      "Boş dönüş yükü eşleştirme",
      "İnşaat malzemesi fiyat karşılaştırma",
      "Şantiye ihale ve teklif toplama",
      "Hafriyat planlama",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE.email,
      availableLanguage: "Turkish",
      areaServed: "TR",
    },
  };
}

export function personSchema(): Json {
  return {
    "@type": "Person",
    "@id": IDS.person(),
    name: SITE.operator.name,
    email: `mailto:${SITE.email}`,
    address: { "@type": "PostalAddress", addressLocality: SITE.operator.locality, addressCountry: SITE.operator.country },
    worksFor: { "@id": IDS.org() },
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": IDS.website(),
    url: SITE.url,
    name: SITE.name,
    alternateName: SITE.alternateNames,
    description: SITE_SUMMARY,
    inLanguage: "tr-TR",
    publisher: { "@id": IDS.org() },
  };
}

export function mobileAppSchema(): Json {
  const stores = [SITE.stores.android, SITE.stores.ios].filter((u): u is string => Boolean(u));
  return {
    "@type": "MobileApplication",
    "@id": IDS.app(),
    name: SITE.name,
    alternateName: SITE.alternateNames,
    url: SITE.url,
    description:
      "Şantiye ve lojistik işleri için ilan ve buluşma uygulaması: yük, iş makinesi (manitou, forklift, sepetli vinç, ekskavatör, mobil vinç ve 88 makine türü), malzeme ve operatör/personel ilanları; boş dönüş yükü eşleştirme, malzeme fiyat karşılaştırma, ihale ve teklif toplama, dijital anlaşma kaydı, süreli canlı konum paylaşımı, Şantiye Akışı ve isteğe bağlı yapay zekâ asistanı. Taraflar ödemeyi doğrudan birbirine yapar; uygulama komisyon almaz.",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "İnşaat ve Lojistik",
    operatingSystem: "Android, iOS",
    softwareVersion: APP_FACTS.version,
    inLanguage: "tr-TR",
    countriesSupported: "TR",
    typicalAgeRange: "18-",
    isAccessibleForFree: true,
    permissions: "İsteğe bağlı: konum (yalnızca süreli canlı konum paylaşımı için), bildirim, seçilen fotoğraflar ve kamera",
    image: absoluteUrl("/icons/icon-512.png"),
    ...(stores.length ? { installUrl: stores[0], downloadUrl: stores } : {}),
    author: { "@id": IDS.org() },
    publisher: { "@id": IDS.org() },
    audience: {
      "@type": "Audience",
      audienceType:
        "Nakliyeciler, yük sahipleri, iş makinesi sahipleri, müteahhitler ve şantiye şefleri, malzeme tedarikçileri, operatörler ve şoförler",
      geographicArea: country,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
      category: "free",
      description:
        "Uygulama ücretsizdir ve işten komisyon alınmaz. İsteğe bağlı Premium abonelik ve kredi paketleri yalnızca Google Play ve App Store üzerinden satılır.",
    },
    featureList: [
      "Yük ilanları ve boş dönüş yükü eşleştirme (uygunluk puanı)",
      "İş makinesi kiralama ilanları: manitou (teleskopik yükleyici), forklift, sepetli vinç/manlift, ekskavatör, mobil vinç ve 88 makine türü; operatörlü/operatörsüz, saatlik/günlük fiyat; liste ve harita",
      "Hazır beton, agrega, stabilize ve asfalt fiyat karşılaştırma; teslim dahil tahmini fiyat",
      "Operatör ve şoför iş ilanları, operatör sicil kartı",
      "İhale: iş duyurusu, açıklamalı teklif toplama, en iyi teklifi seçme",
      "Şantiye Akışı: fotoğraf ve 24 saatlik hikâye paylaşımı, takip, beğeni, yorum",
      "Teklif, talep ve dijital anlaşma kaydı; ödeme planı takibi",
      "Yalnızca tamamlanan işten sonra verilen puanlar; telefon doğrulandı ve onaylı firma rozetleri",
      "WhatsApp'tan hazır mesajla iletişim",
      "Hafriyat planlama: en düşük maliyetli kazı-döküm dağıtımı (Premium)",
      "Süreli canlı konum paylaşımı (yalnızca anlaşmanın diğer tarafı görür)",
      "İsteğe bağlı yapay zekâ asistanı",
      "İnternetsiz çalışma ve anlık bildirim",
      "Uygulamadan anında hesap silme",
      "Türkiye'nin 81 ili",
    ],
  };
}

/** Layout'ta her sayfaya gömülen sabit bilgi grafiği. */
export function siteGraph(): Json {
  return graph(organizationSchema(), personSchema(), websiteSchema(), mobileAppSchema());
}

// ───────────────────────── Sayfa düzeyi ─────────────────────────

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(path: string, crumbs: Crumb[]): Json {
  return {
    "@type": "BreadcrumbList",
    "@id": IDS.crumbs(path),
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function webPageSchema(opts: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  about?: Json;
  mainEntity?: Json;
  hasBreadcrumb?: boolean;
}): Json {
  return {
    "@type": opts.type ?? "WebPage",
    "@id": IDS.page(opts.path),
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "tr-TR",
    isPartOf: { "@id": IDS.website() },
    about: opts.about ?? { "@id": IDS.app() },
    ...(opts.mainEntity ? { mainEntity: opts.mainEntity } : {}),
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl("/og.png"), width: 1200, height: 630 },
    dateModified: SITE.contentUpdated,
    ...(opts.hasBreadcrumb === false ? {} : { breadcrumb: { "@id": IDS.crumbs(opts.path) } }),
  };
}

export function faqSchema(path: string, faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    "@id": IDS.faq(path),
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function itemListSchema(opts: { path: string; name: string; items: Array<{ name: string; path: string }> }): Json {
  return {
    "@type": "ItemList",
    "@id": IDS.list(opts.path),
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}

/**
 * Makine kiralama ilan hizmeti. Şantiye Ağı makine kiralamaz: ilan ve buluşma hizmeti sunar,
 * bu yüzden `offers` ücretsiz hizmeti anlatır; kira bedeli ilan sahibine aittir.
 */
export function serviceSchema(opts: { path: string; category: CategoryView; city?: City; name: string; description: string }): Json {
  const area = opts.city
    ? { "@type": "City", name: opts.city.name, containedInPlace: country }
    : country;
  return {
    "@type": "Service",
    "@id": IDS.service(opts.path),
    name: opts.name,
    serviceType: `${opts.category.name} kiralama ilanı ve talep eşleştirme`,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": IDS.org() },
    areaServed: area,
    audience: {
      "@type": "Audience",
      audienceType: "Müteahhitler, şantiye şefleri, fabrika ve depo yöneticileri, makine sahipleri",
    },
    termsOfService: absoluteUrl("/kullanim-kosullari"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "TRY",
      description:
        "İlan arama, ilan verme ve teklif alma ücretsizdir. Kira bedelini ilan sahibi belirler ve ödeme taraflar arasında doğrudan yapılır; Şantiye Ağı komisyon almaz.",
    },
  };
}

export function howToSchema(opts: { path: string; name: string; description: string; steps: Array<{ name: string; text: string }> }): Json {
  return {
    "@type": "HowTo",
    "@id": IDS.howto(opts.path),
    name: opts.name,
    description: opts.description,
    inLanguage: "tr-TR",
    step: opts.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
  };
}

/** `<script>` içine güvenle gömülebilsin diye "<" ve satır ayırıcı karakterleri kaçırır. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(new RegExp(String.fromCharCode(0x2028), "g"), "\\u2028")
    .replace(new RegExp(String.fromCharCode(0x2029), "g"), "\\u2029");
}
