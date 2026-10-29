import type { Faq } from "./machines";
import { APP_FACTS } from "./site";

/**
 * Site geneli SSS. AEO kuralı: her cevap ilk cümlede soruyu doğrudan yanıtlar,
 * ardından kısa gerekçe ve koşullar gelir. Uydurma fiyat, süre veya sayı YOKTUR.
 * Cevaplar yalnızca düz metin içerir: aynı metin görünür SSS ve FAQPage JSON-LD'de kullanılır.
 */
export const FAQS: Record<string, Faq> = {
  nedir: {
    q: "Şantiye Ağı nedir?",
    a: "Şantiye Ağı; yük, iş makinesi, inşaat malzemesi ve operatör/personel ilanlarını tek yerde toplayan, Türkiye'nin 81 ilinde ücretsiz kullanılan, komisyonsuz bir mobil ilan ve buluşma uygulamasıdır. Makine sahipleri, müteahhitler, şantiye şefleri, nakliyeciler, tedarikçiler ve operatörler uygulamada buluşur, teklifleşir ve yaptıkları işi dijital olarak kayıt altına alır. Şantiye Ağı makine kiralayan bir şirket değil, kiralayanla kiracıyı buluşturan bir platformdur.",
  },
  nasilKiralanir: {
    q: "İş makinesi Şantiye Ağı ile nasıl kiralanır?",
    a: "Uygulamada Makine bölümünden türü (manitou, forklift, sepetli vinç, ekskavatör, mobil vinç vb.) ve ili seçip ilanları fiyat, operatör durumu ve konuma göre karşılaştırırsınız; ardından ilan sahibini arar, hazır mesajla WhatsApp'tan yazar veya teklif gönderirsiniz. Teklif kabul edilince anlaşma kaydı oluşur; kira bedelini ilan sahibine doğrudan ödersiniz.",
  },
  forkliftFiyat: {
    q: "Forklift kiralama Türkiye'de ne kadar?",
    a: "Forklift kiralama için tek bir Türkiye fiyatı yoktur; ücreti ilan sahibi belirler ve kapasiteye (ton), direk yüksekliğine, yakıt türüne (dizel, LPG, elektrikli), kiralama süresine, operatörün dahil olup olmadığına ve nakliye mesafesine göre değişir. Şantiye Ağı fiyat belirlemez ve komisyon almaz; ilanlarda saatlik ve günlük fiyat yazılır, “en ucuz” sıralamasıyla karşılaştırılır. Nakliye, yakıt, operatör ve KDV'nin fiyata dahil olup olmadığını yazılı teyit edin.",
  },
  teslimat: {
    q: "Kiralık makine ne kadar hızlı teslim edilir?",
    a: "Teslim süresini ilan sahibi belirler; Şantiye Ağı teslimat taahhüdü vermez ve makine taşımaz. Aynı gün veya ertesi gün teslim gerekiyorsa “müsait” işaretli ve “en yakın” sıralamasındaki makineleri arayın, teslim saatini ve nakliye ücretini yazılı olarak netleştirin. Uygulamada canlı konum paylaşımıyla, anlaşmanın diğer tarafına makinenin veya aracın konumunu süreli olarak gösterebilirsiniz.",
  },
  ihale: {
    q: "Şantiye Ağı'nda ihale sistemi nasıl çalışır?",
    a: `İhaleyi açan kişi (ör. müteahhit veya şantiye şefi) işi, ilini ve teklif verebilecek meslekleri belirleyip son teklif tarihini yazar. Uygun meslekten kişiler tutar ve en az ${APP_FACTS.minBidNoteLength} karakterlik bir açıklamayla (fiyata neyin dahil olduğu) tek teklif verir. Tüm teklifleri yalnızca ihaleyi açan kişi görür, teklif verenler yalnızca kendi teklifini görür; telefon numaraları ihaleyi açan onaylayana kadar kimseye gösterilmez. Süre dolunca teklifler en düşükten yükseğe sıralanır, ihaleyi açan kazananı seçer. Şantiye Ağı ihale sözleşmesinin tarafı değildir ve ödemeye aracılık etmez.`,
  },
  komisyon: {
    q: "Şantiye Ağı komisyon alıyor mu, ödeme nasıl yapılır?",
    a: "Hayır, işten komisyon alınmaz ve Şantiye Ağı ödemeye aracılık etmez. Navlun, kira veya malzeme bedeli taraflar arasında doğrudan (havale, nakit, çek) ödenir; anlaşma kaydındaki “ödedim / tahsil ettim” işaretleri tarafların kendi beyanıdır ve ödeme belgesi sayılmaz. Tanımadığınız kişiye işin tamamı bitmeden peşin ödeme yapmamanız önerilir.",
  },
  hangiMakineler: {
    q: "Hangi iş makineleri kiralanabilir?",
    a: `Uygulamada ${APP_FACTS.machineTypeCount} farklı makine türü için ilan verilebilir. En çok aranan beşi manitou (teleskopik yükleyici), forklift, sepetli vinç (manlift), ekskavatör ve mobil vinçtir; ayrıca silindir, greyder, finişer, loder, dozer, kamyon, damper, beton pompası ve daha fazlası vardır. İlanlar operatörlü veya operatörsüz, saatlik veya günlük fiyatla yayımlanır.`,
  },
  hangiIller: {
    q: "Şantiye Ağı hangi illerde kullanılabilir?",
    a: "Türkiye'nin 81 ilinde ilan verilebilir ve ilan aranabilir. Bu sitedeki sayfalar özellikle İzmir, İstanbul, Ankara, Bursa ve Antalya için ayrıntılı hazırlanmıştır; her ilin kendi sayfası da vardır. Bir ildeki ilan sayısı o ilde ilan veren kullanıcı sayısına bağlıdır.",
  },
  telefonGizli: {
    q: "Telefon numaram herkese açık mı?",
    a: "Hayır. Telefon numarası herkese açık profilde görünmez; yalnızca ilanınız için iletişim hakkı açan kullanıcıya, teklif/talebin iki tarafına ve anlaşmanın taraflarına gösterilir. İhalede teklif verenin numarası, ihaleyi açan kişi onaylayana kadar iki tarafa da gösterilmez.",
  },
  belgeler: {
    q: "Makine kiralamadan önce hangi belgeler istenmeli?",
    a: "Operatör belgesini (ör. MYK Mesleki Yeterlilik Belgesi ve ilgili ehliyet), makinenin periyodik kontrol belgesini, sigortayı, ruhsat veya kimlik bilgilerini ve nakliye için plaka ile ruhsatı isteyin. Teslimde makinenin fotoğrafını çekip saat sayacını kaydedin; fatura, irsaliye ve teslim tutanağı alın. Bu kontroller kiralayan ve kiracı tarafların sorumluluğundadır; Şantiye Ağı belgeleri doğrulamaz.",
  },
  sosyalAkis: {
    q: "Şantiye Akışı nedir?",
    a: `Şantiye Akışı, uygulamadaki fotoğraf ve hikâye tabanlı sosyal akıştır: operatörler, firmalar ve ustalar yaptıkları işi, “iş arıyorum” ve “makine arıyorum” ilanlarını paylaşır; kullanıcılar takip eder, beğenir ve yorum yapar. Yorumda “Bu kişiyle çalıştınız mı?” sorusu yanıtlanır, çalışmadıysanız kanıt gerekir. Hikâyeler ${APP_FACTS.storyHours} saat sonra silinir.`,
  },
  canliKonum: {
    q: "Canlı konum paylaşımı nasıl çalışır?",
    a: "Canlı konum isteğe bağlıdır; anlaşma ekranından 1 saat, 8 saat veya teslime kadar (en fazla 24 saat) başlatırsınız ve yalnızca o anlaşmanın diğer tarafı görür. Geçmiş rota tutulmaz, yalnızca son ölçüm saklanır; istediğiniz an durdurabilirsiniz. Mesafe ve süre bilgisi yaklaşık tahmindir, kesin navigasyon veya teslim taahhüdü değildir.",
  },
  cevrimdisi: {
    q: "Şantiyede internet yokken uygulama çalışır mı?",
    a: "Evet. Uygulama son verilerle internetsiz açılır; internet yokken yapılan ilan, teklif ve anlaşma işlemleri cihazda sıraya alınır ve bağlantı gelince otomatik gönderilir. Kredi harcayan işlemler (iletişim hakkı açma, ilan öne çıkarma, satın alma) yalnızca çevrimiçi yapılır.",
  },
  indirme: {
    q: "Şantiye Ağı nereden indirilir, ücretsiz mi?",
    a: "Uygulama ücretsizdir ve Android ile iOS için hazırlanmıştır. Google Play ve App Store yayını yakındır; mağaza bağlantıları yayın onayından sonra bu sitede yer alacaktır. İsteğe bağlı Premium abonelik ve kredi paketleri yalnızca mağaza üzerinden satılır.",
  },
  premium: {
    q: "Premium ve kredi paketi nedir?",
    a: `Ücretsiz üyelikte ayda ${APP_FACTS.freeMonthlyContacts} iletişim/teklif hakkı ve aynı anda ${APP_FACTS.freeActiveListings} yayında ilan bulunur. Premium abonelikte iletişim, teklif ve ilan sınırsızdır; hafriyat planlama aracı ve Premium rozeti eklenir. Kredi paketleri ${APP_FACTS.creditPacks.join(", ")} kredilik seçeneklerle satılır: hak bitince 1 kredi 1 iletişim hakkı açar; ilanı öne çıkarmak için 24 saat ${APP_FACTS.boostDayCost} kredi, 7 gün ${APP_FACTS.boostWeekCost} kredidir. Güncel fiyat mağazada gösterilir.`,
  },
  kimin: {
    q: "Şantiye Ağı'nı kim geliştirdi ve nasıl iletişime geçerim?",
    a: "Şantiye Ağı, Sivas'ta Yusuf Taşkıran tarafından geliştirilir ve işletilir. Soru, şikâyet ve talepler için yusuftaskiran753@gmail.com adresine yazabilirsiniz.",
  },
};

const pick = (...keys: string[]): Faq[] =>
  keys.map((k) => {
    const f = FAQS[k];
    if (!f) throw new Error(`Bilinmeyen SSS anahtarı: ${k}`);
    return f;
  });

/** Ana sayfa: kullanıcının en çok sorduğu 8 soru (AEO çekirdeği). */
export const HOME_FAQS: Faq[] = pick(
  "nedir",
  "forkliftFiyat",
  "teslimat",
  "ihale",
  "komisyon",
  "nasilKiralanir",
  "belgeler",
  "indirme",
);

/** /sss: tüm sorular. */
export const ALL_FAQS: Faq[] = pick(
  "nedir",
  "nasilKiralanir",
  "forkliftFiyat",
  "teslimat",
  "ihale",
  "komisyon",
  "hangiMakineler",
  "hangiIller",
  "telefonGizli",
  "belgeler",
  "sosyalAkis",
  "canliKonum",
  "cevrimdisi",
  "indirme",
  "premium",
  "kimin",
);

/** Şantiye Ağı vs geleneksel kiralama. Adil ve doğrulanabilir; her satır uygulamanın gerçek davranışına dayanır. */
export const COMPARISON: Array<{ topic: string; santiye: string; classic: string }> = [
  {
    topic: "Aracı ve komisyon",
    santiye: "Aracısız; işten komisyon alınmaz, ödeme doğrudan ilan sahibine yapılır",
    classic: "Aracı veya filo firması varsa kira bedeline marj/komisyon eklenmiş olabilir",
  },
  {
    topic: "Seçenek ve fiyat karşılaştırma",
    santiye: "Aynı ekranda çok sayıda ilan; saatlik/günlük fiyat, en yakın / en ucuz / en yüksek puan sıralaması",
    classic: "Tek tek telefon açıp fiyat toplamak gerekir",
  },
  {
    topic: "İhale ile teklif toplama",
    santiye: "İşi ihaleye açıp birden çok firmadan açıklamalı teklif alabilirsiniz",
    classic: "Her firmadan ayrı ayrı sözlü veya yazılı teklif istenir",
  },
  {
    topic: "Kayıt ve takip",
    santiye: "Kabul edilen teklif dijital anlaşma kaydına dönüşür; ödeme planı, teslim ve puan aynı kayıtta",
    classic: "Çoğunlukla sözlü anlaşma, mesaj veya kâğıt belge",
  },
  {
    topic: "Güven sinyalleri",
    santiye: "Puan yalnızca tamamlanan işten sonra verilir; telefon doğrulandı ve onaylı firma rozeti; şikâyet ve engelleme",
    classic: "Tanıdık referansı ve firmanın kendi itibarı",
  },
  {
    topic: "Telefon gizliliği",
    santiye: "Numara herkese açık değil; yalnızca iletişim hakkı açanlara ve anlaşma taraflarına gösterilir",
    classic: "Numara genellikle ilanda veya internette herkese açıktır",
  },
  {
    topic: "Kapsam",
    santiye: "81 ilde ilan verilebilir ve aranabilir",
    classic: "Genellikle firmanın bulunduğu bölgeyle sınırlı",
  },
  {
    topic: "Şantiyede internet yokken",
    santiye: "Uygulama son verilerle açılır, işlemler bağlantı gelince gönderilir",
    classic: "Telefon görüşmesi için şebeke gerekir",
  },
  {
    topic: "Makine, operatör, sigorta sorumluluğu",
    santiye: "Şantiye Ağı makine veya operatör sağlamaz; belge ve sigorta kontrolü taraflara aittir",
    classic: "Kurumsal filo firmaları genellikle kendi makine, operatör ve sigortalarını sunar",
  },
];
