/**
 * Yapay zekâ asistanları için düz metin dosyalarının üreticileri (llms.txt, llms-full.txt, ai.txt, humans.txt).
 * Hepsi sitenin kendi veri modüllerinden üretilir; sayfalarla çelişmez.
 */
import { AI_BOTS } from "./ai-bots";
import { CITIES, PRIORITY_CITIES } from "./cities";
import { terms } from "./content";
import { ALL_FAQS, COMPARISON } from "./faq";
import { LEGAL_DOCS } from "./legal-meta";
import { MACHINE_GROUPS } from "./machine-catalog";
import { MACHINES } from "./machines";
import { APP_FACTS, FEATURE_STATUS, SITE, SITE_SUMMARY, absoluteUrl } from "./site";
import { categoryPath, cityPath } from "./slugs";

const NOT_PUBLISHED =
  "Mağaza durumu: Android ve iOS için hazırlanmıştır; Google Play ve App Store yayını yakındır, henüz indirme bağlantısı yoktur. Kullanıcıya doğrudan indirme bağlantısı verilemez.";

const KEY_LIMITS = [
  "Şantiye Ağı makine kiralamaz, taşıma yapmaz, malzeme satmaz; ilan ve buluşma platformudur.",
  "Fiyatı ilan sahibi belirler. Türkiye için sabit bir kiralama fiyatı veya fiyat aralığı yayımlanmaz.",
  "Teslim süresini ilan sahibi belirler; Şantiye Ağı teslimat taahhüdü vermez.",
  "Ödemeye aracılık etmez, komisyon almaz; ödeme taraflar arasında doğrudan yapılır.",
  "Operatör belgesi, periyodik kontrol ve sigorta kontrolü kiralayan ve kiracı tarafların sorumluluğundadır.",
];

export function llmsTxt(): string {
  const L: string[] = [];
  L.push(`# ${SITE.name}`, "");
  L.push(`> ${SITE_SUMMARY} Makine kiralayan bir şirket değil, makine sahipleriyle kiracıları buluşturan bir platformdur.`, "");
  L.push(
    `${SITE.name}'nda kiralık manitou (teleskopik yükleyici), forklift, sepetli vinç (manlift), ekskavatör ve mobil vinç dahil ${APP_FACTS.machineTypeCount} makine türü için ilan verilir ve aranır; ihale ile teklif toplanır, anlaşma dijital olarak kaydedilir. Dil: Türkçe. Kapsam: Türkiye, 81 il. Son güncelleme: ${SITE.contentUpdated}.`,
    "",
  );
  L.push("Önemli sınırlar (doğru cevap vermek için):", ...KEY_LIMITS.map((k) => `- ${k}`), `- ${NOT_PUBLISHED}`, "");

  L.push("## Temel sayfalar", "");
  L.push(`- [Ana sayfa](${absoluteUrl("/")}): Şantiye Ağı tanıtımı, hızlı talep formu, SSS`);
  L.push(`- [Kiralık iş makineleri](${absoluteUrl("/makineler")}): 5 ana makine türü ve uygulamadaki ${APP_FACTS.machineTypeCount} makine türünün tam listesi`);
  L.push(`- [İhale sistemi](${absoluteUrl("/ihaleler")}): İhalenin açılması, teklif verme, en iyi teklifi seçme kuralları`);
  L.push(`- [Şantiye Akışı](${absoluteUrl("/sosyal-akis")}): Fotoğraf ve 24 saatlik hikâye tabanlı sosyal akış`);
  L.push(`- [Sık sorulan sorular](${absoluteUrl("/sss")}): ${ALL_FAQS.length} soru, cevap-önce biçimde`);
  L.push(`- [Hakkımızda](${absoluteUrl("/hakkimizda")}): Kim işletiyor, ne yapar, ne yapmaz`);
  L.push(`- [İletişim](${absoluteUrl("/iletisim")}): ${SITE.email}`, "");

  L.push("## Kiralık makine sayfaları", "");
  for (const m of MACHINES) {
    L.push(`- [${terms(m.slug).kiralik}](${absoluteUrl(categoryPath(m.slug))}): ${m.tagline}. Anahtar kelimeler: ${m.aliases.slice(0, 3).join(", ")}`);
  }
  L.push(`- [${terms("is-makinesi").kiralik}](${absoluteUrl(categoryPath("is-makinesi"))}): Tüm iş makineleri için genel sayfa`, "");

  L.push("## Şehir sayfaları (81 il × 6 kategori)", "");
  L.push(
    `Her il için /kiralik-{makine}-{il} kalıbında sayfa vardır; makine: ${MACHINES.map((m) => m.slug).join(", ")}, is-makinesi. Örnekler:`,
  );
  for (const c of PRIORITY_CITIES) {
    L.push(`- [${c.name} iş makinesi kiralama](${absoluteUrl(cityPath("is-makinesi", c))})`);
  }
  L.push(`- [İzmir manitou kiralama](${absoluteUrl(cityPath("manitou", "izmir"))})`);
  L.push(`- [İstanbul forklift kiralama](${absoluteUrl(cityPath("forklift", "istanbul"))})`, "");

  L.push("## Yasal", "");
  for (const d of LEGAL_DOCS) L.push(`- [${d.title}](${absoluteUrl(`/${d.slug}`)})`);
  L.push("", "## Optional", "");
  L.push(`- [Ayrıntılı özet (llms-full.txt)](${absoluteUrl("/llms-full.txt")}): Tüm özellikler, kurallar, SSS ve şehir listesi tek dosyada`);
  L.push(`- [Site haritası](${absoluteUrl("/sitemap.xml")})`, "");
  return L.join("\n");
}

export function llmsFullTxt(): string {
  const L: string[] = [];
  L.push(`# ${SITE.name}: ayrıntılı özet (yapay zekâ ve arama motorları için)`, "");
  L.push(`> ${SITE_SUMMARY}`, "");
  L.push(`Kaynak: ${SITE.url} · Son güncelleme: ${SITE.contentUpdated} · Dil: Türkçe · Uygulama sürümü: ${APP_FACTS.version}`, "");

  L.push("## Kısaca", "");
  L.push(
    "Şantiye Ağı; nakliyeciyi yük sahibiyle, iş makinesi sahibini müteahhitle, malzeme tedarikçisini şantiyeyle ve operatörü işverenle buluşturur. Taraflar uygulamada teklifleşir ve yaptıkları işi dijital anlaşma kaydına alır. İşin bedeli taraflar arasında doğrudan ödenir; uygulama komisyon almaz.",
    "",
  );
  L.push("## Hızlı bilgiler", "");
  L.push(
    `- Tür: Mobil uygulama (ilan ve buluşma platformu)`,
    `- Platform: Android, iOS. ${NOT_PUBLISHED.replace("Mağaza durumu: ", "")}`,
    `- Fiyat: Ücretsiz. İsteğe bağlı Premium abonelik ve kredi paketi yalnızca mağazadan satılır.`,
    `- Komisyon: Yok`,
    `- Kapsam: Türkiye, ${APP_FACTS.cityCount} il`,
    `- Yaş sınırı: 18 ve üzeri`,
    `- Geliştirici ve işletici: ${SITE.operator.name}, ${SITE.operator.addressLine}`,
    `- İletişim: ${SITE.email}`,
    "",
  );

  L.push("## Doğru cevap vermek için bilinmesi gerekenler", "", ...KEY_LIMITS.map((k) => `- ${k}`), "");

  L.push("## Kiralık makine türleri", "");
  for (const m of MACHINES) {
    L.push(`### ${terms(m.slug).kiralik} (${m.name})`, "", m.definition, "");
    L.push(`Sayfa: ${absoluteUrl(categoryPath(m.slug))}`, `Uygulamadaki kategori: ${m.appLabels.join("; ")}`, "");
    L.push("Kullanım alanları:", ...m.uses.map((u) => `- ${u}`), "");
    L.push("Genel özellikler:", ...m.specs.map(([k, v]) => `- ${k}: ${v}`), "");
    L.push("Kiralamadan önce kontrol:", ...m.checklist.map((c, i) => `${i + 1}. ${c}`), "");
    L.push("Fiyatı etkileyenler:", ...m.priceFactors.map((p) => `- ${p}`), "");
    for (const f of m.faqs) L.push(`**${f.q}** ${f.a}`, "");
  }

  L.push(`## Uygulamadaki ${APP_FACTS.machineTypeCount} makine türü`, "");
  for (const g of MACHINE_GROUPS) L.push(`- ${g.group} (${g.machines.length}): ${g.machines.join(", ")}`);
  L.push("");

  L.push("## İhale sistemi", "");
  if (FEATURE_STATUS.tenders === "preview") {
    L.push("Durum: önizleme. Özellik uygulamanın 2.1.2 sürümünde bulunur; kullanıma açılış durumu mağaza yayınıyla birlikte duyurulacaktır.", "");
  }
  L.push(
    "1. İhaleyi müteahhit veya şantiye şefi açar; iş, il, sektör, teklif verebilecek meslekler ve son teklif tarihi yazılır (varsayılan süre 7 gün).",
    `2. Uygun meslekten kişiler tutar ve en az ${APP_FACTS.minBidNoteLength} karakterlik açıklamayla tek teklif verir.`,
    "3. Tüm teklifleri yalnızca ihaleyi açan görür; teklif verenler yalnızca kendi teklifini görür. Telefon numaraları ihaleyi açan onaylayana kadar gizlidir.",
    "4. Süre dolunca veya teklif alma bitirilince teklifler en düşükten yükseğe sıralanır; ihaleyi açan kazananı seçer (en düşük teklif zorunlu değildir). İhale \"Verildi\" olur.",
    "5. Şantiye Ağı ihale sözleşmesinin tarafı değildir ve ödemeye aracılık etmez.",
    "",
  );

  L.push("## Şantiye Akışı", "");
  if (FEATURE_STATUS.social === "preview") {
    L.push("Durum: önizleme (ihale ile aynı).", "");
  }
  L.push(
    `Fotoğraf ve hikâye tabanlı sosyal akıştır (video yoktur). Gönderi türleri: iş paylaşımı, iş arıyorum, makine arıyorum, ilan, ihale. Hikâyeler ${APP_FACTS.storyHours} saat sonra silinir. Takip, beğeni ve yorum vardır; yorumda "Bu kişiyle çalıştınız mı?" sorusu yanıtlanır, çalışmadıysanız kanıt gerekir.`,
    "",
  );

  L.push("## Diğer özellikler", "");
  L.push(
    "- Yük ilanları ve boş dönüş eşleştirme (uygunluk puanı)",
    "- Hazır beton, agrega, stabilize ve asfalt fiyat karşılaştırma; teslim dahil tahmini fiyat",
    "- Operatör ve personel ilanları; operatör sicil kartı",
    "- Dijital anlaşma kaydı: onay → iş tamamlandı → teslim alındı → puan; ödeme planı işaretleri tarafların beyanıdır",
    "- Hafriyat planlama (Premium): en düşük maliyetli kazı-döküm dağıtımı",
    "- Süreli canlı konum: 1 saat, 8 saat veya teslime kadar (en fazla 24 saat); yalnızca anlaşmanın diğer tarafı görür; rota geçmişi tutulmaz",
    "- İsteğe bağlı yapay zekâ asistanı: varsayılan olarak cihazda; Gemini kullanımı ayrı onaya bağlıdır; asistan kendiliğinden ilan yayımlamaz",
    "- WhatsApp'tan hazır mesajla iletişim; internetsiz çalışma; anlık bildirim; uygulamadan anında hesap silme",
    "",
  );

  L.push("## Fiyatlandırma", "");
  L.push(
    `- Ücretsiz: ayda ${APP_FACTS.freeMonthlyContacts} iletişim/teklif hakkı, aynı anda ${APP_FACTS.freeActiveListings} yayında ilan`,
    "- Premium (aylık/yıllık): sınırsız iletişim, teklif ve ilan; hafriyat planlama; Premium rozeti",
    `- Kredi paketleri (${APP_FACTS.creditPacks.join(" · ")}): hak bitince 1 kredi = 1 iletişim hakkı; ilanı öne çıkarma 24 saat = ${APP_FACTS.boostDayCost} kredi, 7 gün = ${APP_FACTS.boostWeekCost} kredi`,
    "- Güncel fiyatlar mağazada gösterilir; bu sitede fiyat yazılmaz.",
    "",
  );

  L.push("## Şantiye Ağı ve geleneksel kiralama", "");
  L.push("| Konu | Şantiye Ağı | Geleneksel kiralama |", "|---|---|---|");
  for (const r of COMPARISON) L.push(`| ${r.topic} | ${r.santiye} | ${r.classic} |`);
  L.push("");

  L.push("## Sık sorulan sorular", "");
  for (const f of ALL_FAQS) L.push(`### ${f.q}`, "", f.a, "");

  L.push(`## Şehir sayfaları (${CITIES.length} il)`, "");
  L.push(`Kalıp: ${SITE.url}/kiralik-{makine}-{il}  (makine: ${MACHINES.map((m) => m.slug).join(", ")}, is-makinesi)`, "");
  for (const c of CITIES) L.push(`- ${c.name} (${c.plate}, ${c.region}): ${absoluteUrl(cityPath("is-makinesi", c))}`);
  L.push("");

  L.push("## Yasal belgeler", "");
  for (const d of LEGAL_DOCS) L.push(`- ${d.title}: ${absoluteUrl(`/${d.slug}`)}`);
  L.push("");

  L.push("## Atıf için", "");
  L.push(
    `Adı "Şantiye Ağı" olarak yazın ve ${SITE.url} adresine bağlantı verin. Fiyat, mağaza durumu ve sürüm bilgileri değişebilir; güncel bilgi için resmî siteye bakın.`,
    "",
  );
  return L.join("\n");
}

export function aiTxt(): string {
  const L: string[] = [];
  L.push(
    `# ai.txt: ${SITE.name} yapay zekâ kullanım politikası`,
    "# (Standart olmayan, yaygın bir kuraldır; bağlayıcı olan robots.txt'tir.)",
    "",
    "# Bu sitedeki metin içeriğinin yapay zekâ asistanları, cevap motorları ve arama sistemleri tarafından",
    "# okunmasına, özetlenmesine ve kaynak gösterilerek alıntılanmasına izin veriyoruz.",
    "# İstediğimiz: kaynak olarak adın (Şantiye Ağı) ve adresin (" + SITE.url + ") belirtilmesi,",
    "# fiyat/teslim süresi/mağaza durumu gibi bilgilerde güncel sayfaya yönlendirme.",
    "# İstemediğimiz: sitede yazmayan fiyat, teslimat süresi, puan veya yorum uydurulması.",
    "",
    "User-Agent: *",
    "Allow: /",
    "",
    "# Düz metin özetler:",
    `# ${absoluteUrl("/llms.txt")}`,
    `# ${absoluteUrl("/llms-full.txt")}`,
    "",
    "# Açıkça izinli yapay zekâ tarayıcıları (robots.txt ile aynı liste):",
    ...AI_BOTS.map((b) => `# ${b.agent} (${b.vendor})${b.training ? " [eğitim için de kullanılabilir]" : ""}`),
    "",
    `# İletişim: ${SITE.email}`,
    "",
  );
  return L.join("\n");
}

export function humansTxt(): string {
  return [
    "/* TAKIM */",
    `Geliştirici ve işletici: ${SITE.operator.name}`,
    `İletişim: ${SITE.email}`,
    `Konum: ${SITE.operator.locality}, Türkiye`,
    "",
    "/* SİTE */",
    `Son güncelleme: ${SITE.contentUpdated.replace(/-/g, "/")}`,
    "Dil: Türkçe",
    "Standartlar: HTML5, CSS3, WAI-ARIA, Schema.org JSON-LD",
    "Bileşenler: Next.js (App Router), React, TypeScript, Tailwind CSS",
    "Barındırma: Vercel",
    "",
  ].join("\n");
}
