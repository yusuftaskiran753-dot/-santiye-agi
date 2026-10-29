import { PRIORITY_CITIES, PRIORITY_NOTES, PRIORITY_SLUGS, REGION_NOTES, citiesInRegion, inCity, questionParticle, type City } from "./cities";
import { MACHINES, getMachine, type CategorySlug, type CategoryView, type Faq } from "./machines";
import { fitDescription, fitTitle } from "./seo";
import { cityPath } from "./slugs";

/** Kategori başına başlık kalıpları: "Kiralık X" ve "X Kiralama" (hedef anahtar kelimeler). */
const TERMS: Record<CategorySlug, { kiralik: string; kiralama: string }> = {
  manitou: { kiralik: "Kiralık Manitou", kiralama: "Manitou Kiralama" },
  forklift: { kiralik: "Kiralık Forklift", kiralama: "Forklift Kiralama" },
  "sepetli-vinc": { kiralik: "Kiralık Sepetli Vinç", kiralama: "Sepetli Vinç Kiralama" },
  ekskavator: { kiralik: "Kiralık Ekskavatör", kiralama: "Ekskavatör Kiralama" },
  "mobil-vinc": { kiralik: "Kiralık Mobil Vinç", kiralama: "Vinç Kiralama" },
  "is-makinesi": { kiralik: "Kiralık İş Makinesi", kiralama: "İş Makinesi Kiralama" },
};

const lower = (s: string) => s.toLocaleLowerCase("tr-TR");

/** Aynı şehir+makine için her derlemede aynı varyantı seçen basit sabit hash (rastgelelik yok). */
function pick<T>(items: readonly T[], seed: string): T {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return items[h % items.length] as T;
}

export function terms(category: CategorySlug) {
  return TERMS[category];
}

// ───────────────────────── Meta (başlık / açıklama) ─────────────────────────

export function nationalTitle(category: CategorySlug): string {
  const t = TERMS[category];
  return fitTitle([`${t.kiralik} | ${t.kiralama} – 81 İlde`, `${t.kiralik} | ${t.kiralama}`, t.kiralik]);
}

export function nationalDescription(c: CategoryView): string {
  const t = TERMS[c.slug];
  return fitDescription(
    `${t.kiralik} ve ${lower(t.kiralama)}: makine sahiplerinin ilanlarını fiyat, operatör ve konuma göre karşılaştırın, doğrudan iletişime geçin. Ücretsiz, komisyonsuz, 81 ilde.`,
  );
}

export function cityTitle(category: CategorySlug, city: City): string {
  const t = TERMS[category];
  return fitTitle([
    `${city.name} ${t.kiralik} | ${city.name} ${t.kiralama}`,
    `${city.name} ${t.kiralik} | ${t.kiralama}`,
    `${city.name} ${t.kiralik}`,
    `${city.name} ${t.kiralama}`,
  ]);
}

export function cityDescription(c: CategoryView, city: City): string {
  const t = TERMS[c.slug];
  return fitDescription(
    `${inCity(city.name)} ${lower(t.kiralik)} ${questionParticle(t.kiralik)} arıyorsunuz? Şantiye Ağı'nda ${lower(c.short)} ilanlarını fiyat, operatör ve konuma göre karşılaştırın. Ücretsiz, komisyonsuz, aracısız.`,
  );
}

export function cityKeywords(c: CategoryView, city: City): string[] {
  const t = TERMS[c.slug];
  const n = lower(city.name);
  return [
    `${n} ${lower(t.kiralama)}`,
    `${n} ${lower(t.kiralik)}`,
    `${lower(t.kiralik)} ${n}`,
    ...c.aliases.slice(0, 2).map((a) => `${n} ${a}`),
  ];
}

// ───────────────────────── Sayfa gövdesi ─────────────────────────

export function cityH1(c: CategoryView, city: City): string {
  return `${city.name} ${TERMS[c.slug].kiralik}`;
}

/** Cevap motorlarının doğrudan alıntılayabileceği ilk paragraf (şehre özgü, 3 varyant). */
export function cityLead(c: CategoryView, city: City): string {
  const seed = `${c.slug}:${city.slug}`;
  const where = inCity(city.name);
  const short = lower(c.short);
  return pick(
    [
      `${where} kiralık ${short} arıyorsanız Şantiye Ağı'nda makine sahiplerinin ilanlarını il, fiyat ve operatör durumuna göre karşılaştırabilir, ilan sahibiyle doğrudan iletişime geçebilirsiniz. Uygulama komisyon almaz; kira bedelini siz ve ilan sahibi belirler ve doğrudan ödersiniz.`,
      `${city.name} ${short} kiralama işini tek uygulamada çözün: ${where} ilan veren makine sahiplerini listeleyin, saatlik ve günlük fiyatları karşılaştırın, WhatsApp'tan hazır mesajla yazın. Şantiye Ağı aracı değildir ve komisyon kesmez.`,
      `${where} ${short} kiralamak için ilanları karşılaştırmak, makinenin belgelerini sormak ve bedeli doğrudan ödemek yeterlidir. Şantiye Ağı bu süreci ücretsiz ve komisyonsuz bir ilan ve buluşma uygulamasıyla kolaylaştırır.`,
    ],
    seed,
  );
}

/** Şehre özgü bağlam paragrafı: öncelikli şehirlerde elle yazılmış, diğerlerinde plaka+bölge temelli. */
export function cityContext(city: City): string {
  if (city.priority) {
    const note = PRIORITY_NOTES[city.slug as (typeof PRIORITY_SLUGS)[number]];
    if (note) return note;
  }
  return `${city.name} (plaka kodu ${city.plate}), ${city.region} Bölgesi'nde yer alır. ${REGION_NOTES[city.region]}`;
}

export function cityFindSteps(c: CategoryView, city: City): string[] {
  const label = getMachine(c.slug)?.appLabels.join(" / ") ?? "iş makinesi";
  return [
    `Uygulamada “Makine” bölümünü açın, tür olarak “${label}” seçin ve ilinizi ${city.name} yapın.`,
    "Liste veya harita görünümünde ilanları “en yakın”, “en ucuz” ya da “en yüksek puan” sırasıyla inceleyin; operatörlü/operatörsüz seçeneğini ve saatlik/günlük fiyatı karşılaştırın.",
    "Telefon numarası ilanda görünmez: iletişim hakkıyla arayın, hazır mesajla WhatsApp'tan yazın veya teklif/talep gönderin.",
    "Teklif kabul edilince anlaşma kaydı oluşur: ödeme planı, teslim ve puanlama aynı kayıtta tutulur. Ödemeyi ilan sahibine doğrudan yaparsınız.",
  ];
}

export function cityFaqs(c: CategoryView, city: City): Faq[] {
  const where = inCity(city.name);
  const short = lower(c.short);
  const machine = getMachine(c.slug);
  const factors = machine
    ? machine.priceFactors.slice(0, 4).map(lower).join(", ")
    : "makine türü, kapasite, süre, operatör ve nakliye mesafesi";
  const faqs: Faq[] = [
    {
      q: `${where} ${short} kiralama ücreti ne kadar?`,
      a: `${city.name} için sabit bir ${short} kiralama fiyatı yoktur; ücreti ilan sahibi belirler. Fiyat başlıca şunlara göre değişir: ${factors}. Şantiye Ağı fiyat belirlemez ve komisyon almaz; ilanlardaki saatlik ve günlük fiyatları “en ucuz” sıralamasıyla karşılaştırabilirsiniz. Nakliye, yakıt, operatör ve KDV'nin fiyata dahil olup olmadığını yazılı teyit edin.`,
    },
    {
      q: `${where} kiralık ${short} ne kadar sürede teslim edilir?`,
      a: `Teslim süresini ilan sahibi belirler; Şantiye Ağı teslimat taahhüdü vermez. ${city.name} içinde veya yakınında müsait makineleri “en yakın” sıralamasıyla bulabilir, aynı gün teslim gerekiyorsa ilan sahibine yazıp teslim saatini ve nakliye ücretini yazılı olarak netleştirebilirsiniz.`,
    },
  ];
  if (machine) faqs.push(...machine.faqs.slice(0, 2));
  faqs.push({
    q: `Şantiye Ağı ile ${short} kiralamak ücretli mi, komisyon var mı?`,
    a: "Uygulamaya göz atmak, ilan vermek ve ilan aramak ücretsizdir; işten komisyon alınmaz. Ücretsiz üyelikte ayda 5 iletişim/teklif hakkı vardır; sınırsız kullanım için isteğe bağlı Premium veya kredi paketi bulunur. Kira bedeli ilan sahibine doğrudan ödenir.",
  });
  return faqs;
}

export interface RelatedLink {
  href: string;
  label: string;
}

/** Aynı şehirdeki diğer makineler. */
export function otherMachinesInCity(category: CategorySlug, city: City): RelatedLink[] {
  return MACHINES.filter((m) => m.slug !== category).map((m) => ({
    href: cityPath(m.slug, city),
    label: `${city.name} ${TERMS[m.slug].kiralik}`,
  }));
}

/** Aynı makinenin öncelikli şehirlerdeki ve aynı bölgedeki sayfaları (iç bağlantı ağı, en çok 12). */
export function sameMachineElsewhere(category: CategorySlug, city: City): RelatedLink[] {
  const seen = new Set<string>([city.slug]);
  const out: RelatedLink[] = [];
  for (const c of [...PRIORITY_CITIES, ...citiesInRegion(city.region, city.slug).slice(0, 8)]) {
    if (seen.has(c.slug)) continue;
    seen.add(c.slug);
    out.push({ href: cityPath(category, c), label: `${c.name} ${TERMS[category].kiralik}` });
  }
  return out.slice(0, 12);
}

// ───────────────────────── "İş makinesi" genel sayfaları için ortak içerik ─────────────────────────

export const GENERIC_CHECKLIST: string[] = [
  "Makinenin kapasitesini, ton sınıfını veya erişim yüksekliğini işinize göre doğrulayın",
  "Operatörün yasal belgesini (ör. MYK Mesleki Yeterlilik Belgesi) ve makinenin periyodik kontrol belgesini isteyin",
  "Sigortanın ve ruhsat/kimlik bilgilerinin güncel olduğunu sorun",
  "Nakliye (lowbed/çekici), yakıt, operatör ve KDV'nin fiyata dahil olup olmadığını yazılı alın",
  "Asgari kiralama süresini, teslim–iade saatlerini ve gecikme koşulunu belirleyin",
  "Teslimde makinenin fotoğrafını çekin, saat sayacını kaydedin; fatura, irsaliye ve teslim tutanağı alın",
  "Tanımadığınız kişiye işin tamamı bitmeden peşin ödeme yapmayın; ödemeyi aşamalara bölün",
];

export const GENERIC_PRICE_FACTORS: string[] = [
  "Makine türü, kapasite ve ton sınıfı",
  "Kiralama süresi: saatlik, günlük, haftalık, aylık",
  "Operatörün ve yakıtın dahil olup olmadığı",
  "Nakliye mesafesi ve sahaya erişim",
  "Aparat ve ekipman ihtiyacı",
  "Mevsim, bölgedeki talep ve müsaitlik",
];

export function genericFindSteps(cityName?: string): string[] {
  return [
    `Uygulamada “Makine” bölümünü açın${cityName ? ` ve ilinizi ${cityName} yapın` : " ve ilinizi seçin"}; makine türünü filtreleyin.`,
    "Liste veya harita görünümünde ilanları “en yakın”, “en ucuz” ya da “en yüksek puan” sırasıyla inceleyin; operatörlü/operatörsüz seçeneğini karşılaştırın.",
    "Telefon numarası ilanda görünmez: iletişim hakkıyla arayın, hazır mesajla WhatsApp'tan yazın veya teklif/talep gönderin.",
    "Teklif kabul edilince anlaşma kaydı oluşur: ödeme planı, teslim ve puanlama aynı kayıtta tutulur; ödemeyi ilan sahibine doğrudan yaparsınız.",
  ];
}

export function genericFaqs(cityName?: string): Faq[] {
  const where = cityName ? inCity(cityName) : "Türkiye'de";
  return [
    {
      q: `${where} iş makinesi kiralama nasıl yapılır?`,
      a: `Şantiye Ağı'nda makine türünü ve ili seçip ilanları fiyat, operatör durumu ve konuma göre karşılaştırır, ilan sahibini arar veya hazır mesajla WhatsApp'tan yazar, teklifleşirsiniz. Kabul edilen teklif anlaşma kaydına dönüşür; kira bedelini ilan sahibine doğrudan ödersiniz. Şantiye Ağı aracı değildir ve komisyon almaz.`,
    },
    {
      q: `${where} iş makinesi kiralama fiyatları neye göre değişir?`,
      a: `Fiyatı ilan sahibi belirler ve makine türüne, kapasiteye, kiralama süresine, operatör ve yakıtın dahil olup olmadığına, nakliye mesafesine ve talebe göre değişir. Sabit bir liste fiyatı yoktur; ilanlardaki saatlik ve günlük fiyatları karşılaştırın ve neyin dahil olduğunu yazılı teyit edin.`,
    },
    {
      q: "Şantiye Ağı komisyon alıyor mu?",
      a: "Hayır. İlan vermek ve ilan aramak ücretsizdir, işten komisyon alınmaz ve ödeme doğrudan taraflar arasında yapılır. Ücretsiz üyelikte ayda 5 iletişim/teklif hakkı vardır; sınırsız kullanım için isteğe bağlı Premium veya kredi paketi bulunur.",
    },
  ];
}
