/**
 * Türkiye'nin 81 ili: plaka kodu, coğrafi bölge, URL slug'ı ve Türkçe ek (-de/-da) üretimi.
 * Bölge ve plaka verisi `scripts/verify-content.mjs` ile her derlemede doğrulanır (81 benzersiz il).
 */

export type Region =
  | "Marmara"
  | "Ege"
  | "Akdeniz"
  | "İç Anadolu"
  | "Karadeniz"
  | "Doğu Anadolu"
  | "Güneydoğu Anadolu";

export interface City {
  name: string;
  slug: string;
  plate: string;
  region: Region;
  /** Önceliği yüksek 5 büyük şehir (özel bağlam metni ve yüksek sitemap önceliği). */
  priority: boolean;
}

const RAW: ReadonlyArray<readonly [string, string, Region]> = [
  ["01", "Adana", "Akdeniz"],
  ["02", "Adıyaman", "Güneydoğu Anadolu"],
  ["03", "Afyonkarahisar", "Ege"],
  ["04", "Ağrı", "Doğu Anadolu"],
  ["05", "Amasya", "Karadeniz"],
  ["06", "Ankara", "İç Anadolu"],
  ["07", "Antalya", "Akdeniz"],
  ["08", "Artvin", "Karadeniz"],
  ["09", "Aydın", "Ege"],
  ["10", "Balıkesir", "Marmara"],
  ["11", "Bilecik", "Marmara"],
  ["12", "Bingöl", "Doğu Anadolu"],
  ["13", "Bitlis", "Doğu Anadolu"],
  ["14", "Bolu", "Karadeniz"],
  ["15", "Burdur", "Akdeniz"],
  ["16", "Bursa", "Marmara"],
  ["17", "Çanakkale", "Marmara"],
  ["18", "Çankırı", "İç Anadolu"],
  ["19", "Çorum", "Karadeniz"],
  ["20", "Denizli", "Ege"],
  ["21", "Diyarbakır", "Güneydoğu Anadolu"],
  ["22", "Edirne", "Marmara"],
  ["23", "Elazığ", "Doğu Anadolu"],
  ["24", "Erzincan", "Doğu Anadolu"],
  ["25", "Erzurum", "Doğu Anadolu"],
  ["26", "Eskişehir", "İç Anadolu"],
  ["27", "Gaziantep", "Güneydoğu Anadolu"],
  ["28", "Giresun", "Karadeniz"],
  ["29", "Gümüşhane", "Karadeniz"],
  ["30", "Hakkâri", "Doğu Anadolu"],
  ["31", "Hatay", "Akdeniz"],
  ["32", "Isparta", "Akdeniz"],
  ["33", "Mersin", "Akdeniz"],
  ["34", "İstanbul", "Marmara"],
  ["35", "İzmir", "Ege"],
  ["36", "Kars", "Doğu Anadolu"],
  ["37", "Kastamonu", "Karadeniz"],
  ["38", "Kayseri", "İç Anadolu"],
  ["39", "Kırklareli", "Marmara"],
  ["40", "Kırşehir", "İç Anadolu"],
  ["41", "Kocaeli", "Marmara"],
  ["42", "Konya", "İç Anadolu"],
  ["43", "Kütahya", "Ege"],
  ["44", "Malatya", "Doğu Anadolu"],
  ["45", "Manisa", "Ege"],
  ["46", "Kahramanmaraş", "Akdeniz"],
  ["47", "Mardin", "Güneydoğu Anadolu"],
  ["48", "Muğla", "Ege"],
  ["49", "Muş", "Doğu Anadolu"],
  ["50", "Nevşehir", "İç Anadolu"],
  ["51", "Niğde", "İç Anadolu"],
  ["52", "Ordu", "Karadeniz"],
  ["53", "Rize", "Karadeniz"],
  ["54", "Sakarya", "Marmara"],
  ["55", "Samsun", "Karadeniz"],
  ["56", "Siirt", "Güneydoğu Anadolu"],
  ["57", "Sinop", "Karadeniz"],
  ["58", "Sivas", "İç Anadolu"],
  ["59", "Tekirdağ", "Marmara"],
  ["60", "Tokat", "Karadeniz"],
  ["61", "Trabzon", "Karadeniz"],
  ["62", "Tunceli", "Doğu Anadolu"],
  ["63", "Şanlıurfa", "Güneydoğu Anadolu"],
  ["64", "Uşak", "Ege"],
  ["65", "Van", "Doğu Anadolu"],
  ["66", "Yozgat", "İç Anadolu"],
  ["67", "Zonguldak", "Karadeniz"],
  ["68", "Aksaray", "İç Anadolu"],
  ["69", "Bayburt", "Karadeniz"],
  ["70", "Karaman", "İç Anadolu"],
  ["71", "Kırıkkale", "İç Anadolu"],
  ["72", "Batman", "Güneydoğu Anadolu"],
  ["73", "Şırnak", "Güneydoğu Anadolu"],
  ["74", "Bartın", "Karadeniz"],
  ["75", "Ardahan", "Doğu Anadolu"],
  ["76", "Iğdır", "Doğu Anadolu"],
  ["77", "Yalova", "Marmara"],
  ["78", "Karabük", "Karadeniz"],
  ["79", "Kilis", "Güneydoğu Anadolu"],
  ["80", "Osmaniye", "Akdeniz"],
  ["81", "Düzce", "Karadeniz"],
];

const TR_ASCII: Record<string, string> = {
  ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u",
};

/** "Şanlıurfa" → "sanliurfa". Türkçe büyük/küçük harf kurallarını (İ/ı) doğru işler. */
export function slugify(input: string): string {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]/g, (c) => TR_ASCII[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const PRIORITY_SLUGS = ["izmir", "istanbul", "ankara", "bursa", "antalya"] as const;

export const CITIES: readonly City[] = RAW.map(([plate, name, region]) => {
  const slug = slugify(name);
  return { name, slug, plate, region, priority: (PRIORITY_SLUGS as readonly string[]).includes(slug) };
});

const BY_SLUG = new Map(CITIES.map((c) => [c.slug, c]));

export function getCity(slug: string): City | undefined {
  return BY_SLUG.get(slug);
}

export const PRIORITY_CITIES: readonly City[] = PRIORITY_SLUGS.map((s) => BY_SLUG.get(s)).filter(
  (c): c is City => Boolean(c),
);

export function citiesInRegion(region: Region, excludeSlug?: string): City[] {
  return CITIES.filter((c) => c.region === region && c.slug !== excludeSlug);
}

/**
 * Türkçe bulunma eki: "İzmir'de", "Ankara'da", "Kars'ta", "Siirt'te".
 * Kural: son ünlü kalın (a ı o u) → -da/-ta, ince (e i ö ü) → -de/-te;
 * son harf sert ünsüzse (ç f h k p s ş t) → t'li ek.
 */
export function inCity(name: string): string {
  const lower = name.toLocaleLowerCase("tr-TR");
  const vowels = lower.match(/[aeıioöuüâîû]/g);
  const last = vowels?.[vowels.length - 1] ?? "e";
  const back = /[aıouâû]/.test(last);
  const voiceless = /[çfhkpsşt]$/.test(lower);
  return `${name}'${voiceless ? "t" : "d"}${back ? "a" : "e"}`;
}

/** "-deki/-daki" eki: "İzmir'deki", "Ankara'daki", "Kars'taki". */
export function inCityKi(name: string): string {
  return `${inCity(name)}ki`;
}

/** Soru eki ünlü uyumu: "forklift mi", "manitou mu", "ekskavatör mü", "vinç mi", "makine mi". */
export function questionParticle(phrase: string): "mı" | "mi" | "mu" | "mü" {
  const vowels = phrase.toLocaleLowerCase("tr-TR").match(/[aeıioöuüâîû]/g);
  const last = vowels?.[vowels.length - 1] ?? "e";
  if ("aıâ".includes(last)) return "mı";
  if ("eiî".includes(last)) return "mi";
  if ("ouû".includes(last)) return "mu";
  return "mü";
}

/** Bölgeye özgü, genel ve doğrulanabilir bağlam cümlesi (şablon sayfalara bölgesel özgünlük katar). */
export const REGION_NOTES: Record<Region, string> = {
  Marmara:
    "Marmara Bölgesi, Türkiye'nin sanayi ve nüfus bakımından en yoğun bölgesidir; organize sanayi bölgeleri, limanlar ve kentsel dönüşüm projeleri kiralık iş makinesi talebini yüksek tutar.",
  Ege:
    "Ege Bölgesi'nde liman ve sanayi tesisleri, tarıma dayalı sanayi, mermer ocakları ve turizm yapıları makine ihtiyacını belirler; kıyı illerinde rüzgâr ve yaz sezonu yoğunluğu planlamayı etkiler.",
  Akdeniz:
    "Akdeniz Bölgesi'nde turizm tesisleri, sera ve liman yatırımları öne çıkar; yaz aylarında yüksek sıcaklık ve sezon yoğunluğu hem talebi hem iş saatlerini etkiler.",
  "İç Anadolu":
    "İç Anadolu'da kamu altyapısı, enerji ve sanayi yatırımları yaygındır; karasal iklim nedeniyle kışın don ve kar iş programını, yazın geniş ovalar ise makine nakliyesini kolaylaştırır.",
  Karadeniz:
    "Karadeniz Bölgesi'nde engebeli arazi ve yoğun yağış nedeniyle dar, eğimli yollar ve zemin koşulları makine seçimini ve nakliyesini belirler; yol, tünel ve enerji projeleri sık görülür.",
  "Doğu Anadolu":
    "Doğu Anadolu'da yüksek rakım ve sert kış koşulları iş takvimini belirler; yol, baraj ve enerji yatırımlarında mevsim ve erişim koşulları kiralama planında önceden hesaba katılmalıdır.",
  "Güneydoğu Anadolu":
    "Güneydoğu Anadolu'da konut, altyapı ve enerji yatırımları ile tarım işleri makine talebini şekillendirir; yaz sıcağı çalışma saatlerini ve makine bakımını etkiler.",
};

/** Öncelikli 5 şehir için genel (rakamsız) yerel bağlam. */
export const PRIORITY_NOTES: Record<(typeof PRIORITY_SLUGS)[number], string> = {
  istanbul:
    "İstanbul'da yoğun yapılaşma ve trafik, makinenin şantiyeye varış süresini doğrudan etkiler; Avrupa ve Anadolu yakası arasındaki geçişler teslim planına eklenmelidir. Dar sokak ve ara sokak şantiyelerinde küçük gabaritli makineler öne çıkar, bazı ilçelerde ağır nakliye için saat kısıtlaması olabilir.",
  izmir:
    "İzmir'de liman, organize sanayi bölgeleri (ör. Kemalpaşa, Aliağa) ve kıyı şeridindeki konut ve turizm yatırımları kiralık makine talebini şekillendirir. Kıyıda rüzgâr, vinç ve sepetli araç işlerinde çalışma sınırını belirleyen başlıca etkenlerden biridir.",
  ankara:
    "Ankara'da kamu yapıları, konut projeleri ve organize sanayi bölgeleri (ör. Ostim, Sincan) makine talebinin başlıca kaynaklarıdır. İç Anadolu'nun karasal iklimi nedeniyle kışın don ve kar iş programını etkiler.",
  bursa:
    "Bursa'da otomotiv yan sanayisi ve tekstil başta olmak üzere organize sanayi bölgelerindeki fabrika ve depo tesisleri forklift ve teleskopik yükleyici talebini canlı tutar. Konut ve altyapı işleri ise ekskavatör ve vinç ihtiyacını belirler.",
  antalya:
    "Antalya'da otel, tatil sitesi ve konut inşaatları ile mevcut tesislerin bakım işleri yoğundur. Yaz sezonunda talep artar; cephe, tabela ve ağaç bakımı gibi işlerde sepetli araçlar sık tercih edilir.",
};
