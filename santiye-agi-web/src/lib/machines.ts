/**
 * Kiralık makine içeriği (5 ana tür + genel "iş makinesi" kategorisi).
 *
 * İçerik ilkeleri:
 *  - Fiyat, teslim süresi veya stok rakamı UYDURULMAZ: bunları ilan sahibi belirler (Şantiye Ağı komisyon/aracı değildir).
 *  - Teknik aralıklar "genellikle / modele göre" ifadesiyle verilir; ilandaki değer esastır.
 *  - `appLabels`, mobil uygulamadaki gerçek makine kategorisi adlarıdır (MachineType etiketleri).
 */

export type MachineSlug = "manitou" | "forklift" | "sepetli-vinc" | "ekskavator" | "mobil-vinc";
export type CategorySlug = MachineSlug | "is-makinesi";

export interface Faq {
  q: string;
  a: string;
}

export interface Machine {
  slug: MachineSlug;
  /** Sayfa başlıklarında geçen tam ad */
  name: string;
  /** "Kiralık Manitou", "Forklift Kiralama" gibi kalıplarda kullanılan kısa ad */
  short: string;
  /** Arama niyeti eş anlamlıları (açıklama ve gövde metninde doğal geçer) */
  aliases: string[];
  /** Mobil uygulamadaki kategori adları */
  appLabels: string[];
  /** Cevap motorları için ilk paragraf: tek başına alıntılanabilir tanım */
  definition: string;
  tagline: string;
  uses: string[];
  specs: Array<[label: string, value: string]>;
  checklist: string[];
  priceFactors: string[];
  faqs: Faq[];
  related: MachineSlug[];
}

export const MACHINES: readonly Machine[] = [
  {
    slug: "manitou",
    name: "Manitou (Teleskopik Yükleyici)",
    short: "Manitou",
    aliases: ["kiralık manitou", "manitou kiralama", "teleskopik yükleyici kiralama", "telehandler kiralama"],
    appLabels: ["Teleskopik yükleyici"],
    definition:
      "Manitou, Türkiye'de teleskopik yükleyici (telehandler) için halk arasında kullanılan addır; aslında bir üretici markasıdır. Teleskopik bomlu bu makine yükü hem yükseğe hem öne uzatarak taşır; şantiyede palet, iskele, kalıp, çatı malzemesi ve çelik elemanları kaldırmada forklift ile küçük vincin yerini alır. Şantiye Ağı'nda “Teleskopik yükleyici” kategorisinde ilan bulur veya ilan verirsiniz; marka (Manitou, JCB, Merlo vb.) ilan notunda belirtilir.",
    tagline: "Yükü yükseğe ve öne uzatan şantiye makinesi",
    uses: [
      "İskele, kalıp, çelik ve palet malzemenin üst katlara kaldırılması",
      "Çatı ve cephe malzemesi montajı",
      "Prefabrik ve hafif yapı elemanlarının yerleştirilmesi",
      "Depo, açık stok ve fabrika sahasında yükleme–boşaltma",
      "Uygun sepet aparatı ve ilgili emniyet kurallarıyla yüksekte çalışma",
      "Kova aparatıyla kum, çakıl ve hafif dökme malzeme taşıma",
    ],
    specs: [
      ["Kaldırma kapasitesi", "Genellikle 2,5–5 ton aralığında; daha büyük modeller de vardır"],
      ["Kaldırma yüksekliği", "Modele göre yaklaşık 6–20 m"],
      ["Aparatlar", "Çatal, kova, sepet (yüksekte çalışma platformu), vinç ucu (jib)"],
      ["Zemin", "4×4 arazi tipi lastiklerle şantiye zeminine uygun"],
      ["Operatör", "Belgeli operatör gerekir; ilanların çoğu operatörlü verilir"],
      ["Kiralama modeli", "Saatlik, günlük, haftalık veya aylık; ilanda belirtilir"],
    ],
    checklist: [
      "Yük tablosunu isteyin: kapasite, bom uzadıkça düşer; gerçek erişim noktasındaki kapasiteye bakın",
      "Aparatın (çatal, kova, sepet) kirada dahil olup olmadığını netleştirin",
      "Operatör belgesini (ör. MYK Mesleki Yeterlilik Belgesi) ve operatörün eğitim durumunu sorun",
      "Periyodik kontrol ve sigorta belgelerinin güncel olduğunu doğrulayın",
      "Nakliyeyi (lowbed/çekici) kimin ve hangi ücretle karşılayacağını yazılı alın",
      "Yakıtın kim tarafından karşılanacağını ve asgari kiralama süresini sorun",
      "Teslim anında makinenin fotoğrafını çekin ve saat sayacını not edin",
    ],
    priceFactors: [
      "Kapasite ve kaldırma yüksekliği",
      "Kiralama süresi (saatlik, günlük, haftalık, aylık)",
      "Operatörün dahil olup olmadığı",
      "Nakliye mesafesi ve yakıt",
      "Aparat türü (çatal, kova, sepet)",
      "Mevsim ve bölgedeki talep",
    ],
    faqs: [
      {
        q: "Manitou ile teleskopik yükleyici aynı şey mi?",
        a: "Günlük kullanımda evet. Manitou aslında bir üretici markasıdır; Türkiye'de teleskopik yükleyici (telehandler) anlamında genelleşmiştir. Aynı işi JCB, Merlo ve diğer üreticilerin teleskopik yükleyicileri de yapar. Şantiye Ağı'nda hepsi “Teleskopik yükleyici” kategorisinde yer alır.",
      },
      {
        q: "Manitou kiralamada operatör gerekir mi?",
        a: "Makineyi kullanan kişinin yasal operatör belgesi ve eğitimi olmalıdır. İlanların çoğu operatörlü verilir; operatörsüz kiralamada belgeli operatörü kiracı sağlar. Şantiye Ağı'nda ilanları “operatörlü / operatörsüz” olarak ayırt edebilirsiniz.",
      },
      {
        q: "Manitou ile personel yukarı çıkarılabilir mi?",
        a: "Yalnızca üreticinin onayladığı sepet aparatı, uygun emniyet donanımı ve ilgili mevzuata uygun, eğitimli operatörle mümkündür. Çatalda veya kovada kişi taşınmaz. Yalnızca yüksekte çalışma için tasarlanmış bir platform gerekiyorsa sepetli araç veya manlift kiralamak daha uygundur.",
      },
    ],
    related: ["forklift", "sepetli-vinc", "mobil-vinc"],
  },
  {
    slug: "forklift",
    name: "Forklift",
    short: "Forklift",
    aliases: ["kiralık forklift", "forklift kiralama", "istif makinesi kiralama"],
    appLabels: ["Forklift"],
    definition:
      "Forklift, paletli yükü çatalla kaldırıp taşıyan ve istifleyen motorlu istif makinesidir. Şantiye, depo, fabrika ve lojistik sahalarında yükleme–boşaltma, palet istifleme ve kısa mesafe taşıma için kullanılır. Dizel veya LPG'li modeller dış sahada, elektrikli modeller kapalı alanda tercih edilir. Şantiye Ağı'nda “Forklift” kategorisinde, operatörlü veya operatörsüz, saatlik ya da günlük fiyatlı ilanlar yayımlanır.",
    tagline: "Palet, yükleme–boşaltma ve istif için",
    uses: [
      "Tır ve kamyondan palet yükleme–boşaltma",
      "Depo ve açık sahada istif",
      "Şantiyede paketli inşaat malzemesinin taşınması",
      "Fabrika içi hat besleme ve kısa mesafe nakil",
      "Arazi tipi (rough terrain) modellerle engebeli zeminde çalışma",
    ],
    specs: [
      ["Kapasite", "Genellikle 1,5–3,5 ton; daha yüksek kapasiteli modeller de vardır"],
      ["Yük merkezi", "Nominal kapasite standart yük merkezi için verilir (genellikle 500 mm)"],
      ["Kaldırma yüksekliği", "Standart direkle genellikle 3–6 m; özel direklerle daha fazla"],
      ["Tahrik / yakıt", "Dizel, LPG veya elektrikli"],
      ["Zemin", "Düz sert zeminde standart; engebeli şantiyede arazi tipi"],
      ["Operatör", "Forklift operatörü belgesi ve eğitimi (ör. MYK) aranır"],
    ],
    checklist: [
      "Kaldıracağınız en ağır paletin kg değerini ve yük merkezini bilin; kapasite plakasını isteyin",
      "Direk (kaldırma) yüksekliğinin raf veya istif yüksekliğinize yettiğini doğrulayın",
      "Dış saha için dizel/LPG ve uygun lastik; kapalı alan için elektrikli seçin",
      "Operatör belgesini ve periyodik kontrol belgesini sorun",
      "Çatal boyu ve yan kaydırıcı gibi aparatların dahil olup olmadığını netleştirin",
      "Yakıt/şarj ve teslim–iade saatlerini yazılı belirleyin",
      "Teslimde makinenin fotoğrafını çekin, saat sayacını kaydedin",
    ],
    priceFactors: [
      "Kapasite (ton) ve direk yüksekliği",
      "Yakıt / tahrik türü (dizel, LPG, elektrikli)",
      "Süre: günlük, haftalık veya aylık",
      "Operatör dahil mi",
      "Nakliye mesafesi",
      "Arazi tipi veya özel aparat ihtiyacı",
    ],
    faqs: [
      {
        q: "Forklift kiralama ücreti neye göre belirlenir?",
        a: "Kapasiteye, direk yüksekliğine, yakıt türüne, kiralama süresine, operatörün dahil olup olmadığına ve nakliye mesafesine göre değişir. Türkiye için tek bir fiyat listesi yoktur; fiyatı ilan sahibi belirler. Şantiye Ağı fiyat belirlemez ve komisyon almaz.",
      },
      {
        q: "Dizel mi, LPG mi, elektrikli mi seçmeliyim?",
        a: "Dış sahada ve engebeli zeminde dizel veya LPG'li forkliftler, kapalı depo ve fabrikalarda egzoz çıkarmayan elektrikli forkliftler tercih edilir. Zemin düz değilse arazi tipi modeli sorun.",
      },
      {
        q: "Forklift operatörlü mü, operatörsüz mü kiralanır?",
        a: "İkisi de mümkündür. Operatörsüz kiralamada makineyi yalnızca belgeli ve eğitimli kişi kullanabilir. Şantiye Ağı'ndaki makine ilanlarında operatör durumu belirtilir ve filtrelenebilir.",
      },
    ],
    related: ["manitou", "mobil-vinc", "ekskavator"],
  },
  {
    slug: "sepetli-vinc",
    name: "Sepetli Vinç (Manlift)",
    short: "Sepetli Vinç",
    aliases: ["sepetli vinç kiralama", "sepetli araç kiralama", "manlift kiralama", "personel yükseltme platformu kiralama"],
    appLabels: ["Personel yükseltme / Manlift", "Sepetli araç / Hidrolik merdiven"],
    definition:
      "Sepetli vinç (sepetli araç, manlift, personel yükseltme platformu), çalışanı bir sepet içinde yüksekteki çalışma noktasına çıkaran makinedir. İskele kurmadan cephe, tabela, aydınlatma, tesisat, boya, montaj ve ağaç budama işlerini yapmayı sağlar. Kamyon üstü sepetli araçlar, eklemli veya teleskopik bomlu manliftler ve makaslı platformlar farklı erişim ihtiyaçlarına uyar. Şantiye Ağı'nda “Personel yükseltme / Manlift” ve “Sepetli araç / Hidrolik merdiven” kategorilerinde ilan bulunur.",
    tagline: "İskelesiz, güvenli yüksekte çalışma",
    uses: [
      "Cephe boya, kaplama ve temizlik işleri",
      "Tabela, reklam ve aydınlatma montajı",
      "Elektrik ve tesisat bakım–onarımı",
      "Ağaç budama ve yüksekteki bakım işleri",
      "Çelik konstrüksiyon ve çatı detaylarında montaj",
    ],
    specs: [
      ["Türler", "Kamyon üstü sepetli araç, eklemli/teleskopik bomlu manlift, makaslı platform"],
      ["Çalışma yüksekliği", "Türe ve modele göre yaklaşık 8 m'den 40 m üzerine kadar; ilandaki değer esastır"],
      ["Sepet kapasitesi", "Modele göre değişir; ilanda kg değeri belirtilir"],
      ["Zemin", "Makaslı platformlar düz ve sert zemin ister; kamyon üstü araçlar yolda gidebilir"],
      ["Güvenlik", "Sepette emniyet kemeri ve uygun yüksekte çalışma ekipmanı; elektrik hatlarından güvenli mesafe"],
      ["Operatör", "Belgeli platform operatörü; ilanların çoğu operatörlü"],
    ],
    checklist: [
      "Gerekli çalışma yüksekliğini ve yatay erişimi (uzanma mesafesini) önceden ölçün",
      "Sepet kapasitesinin (kg ve kişi sayısı) alet ve malzeme ağırlığıyla birlikte yettiğini doğrulayın",
      "Zeminin taşıma kapasitesini ve eğimini kontrol edin; mesnet ayaklarının oturacağı yeri belirleyin",
      "Çalışma alanındaki elektrik hatlarına güvenli mesafeyi ve üreticinin rüzgâr sınırını öğrenin",
      "Operatör belgesini ve periyodik kontrol belgesini isteyin",
      "Yüksekte çalışma ekipmanını (emniyet kemeri, bağlantı noktası) kimin getireceğini netleştirin",
      "Nakliye, trafik ve saha giriş koşullarını (kapı genişliği, yükseklik sınırı) teyit edin",
    ],
    priceFactors: [
      "Çalışma yüksekliği ve erişim",
      "Türü (kamyon üstü, manlift, makaslı)",
      "Süre: saatlik, günlük, haftalık",
      "Operatör dahil mi",
      "Nakliye ve saha mesafesi",
      "Mevsim ve talep",
    ],
    faqs: [
      {
        q: "Sepetli vinç ile manlift arasındaki fark nedir?",
        a: "Sepetli vinç (sepetli araç) genellikle kamyon şasisi üzerindeki bomlu sepettir ve yolda kendi gidebilir. Manlift ise sahada hareket eden eklemli, teleskopik veya makaslı platformlardır. Makaslı platform dikey çıkar ve geniş sepet sunar; eklemli bomlu manlift engellerin üzerinden uzanabilir. Şantiye Ağı'nda her iki grup da ayrı kategorilerde listelenir.",
      },
      {
        q: "Kaç metrelik sepetli araç kiralamalıyım?",
        a: "Çalışacağınız en yüksek noktayı ve yataydaki uzanma mesafesini ölçün; bunun üzerine güvenlik payı ekleyip ilandaki “çalışma yüksekliği”ne bakın. Sepetli araç ilanında yüksekliğin yanında sepet kapasitesini de kontrol edin.",
      },
      {
        q: "Sepetli araç kiralamada operatör şart mı?",
        a: "Makineyi yalnızca belgeli ve eğitimli operatör kullanabilir. Çoğu ilan operatörlü verilir. Operatörsüz kiralamada belgeli operatörü kiracı sağlamalıdır; yüksekte çalışma ekipmanı ve güvenlik önlemleri de kiracının sorumluluğundadır.",
      },
    ],
    related: ["manitou", "mobil-vinc", "forklift"],
  },
  {
    slug: "ekskavator",
    name: "Ekskavatör (Kepçe)",
    short: "Ekskavatör",
    aliases: ["kiralık ekskavatör", "ekskavatör kiralama", "kepçe kiralama", "kiralık kepçe", "hafriyat makinesi kiralama"],
    appLabels: ["Ekskavatör", "Mini ekskavatör", "Lastikli ekskavatör", "Uzun kol ekskavatör", "Hidrolik kırıcı"],
    definition:
      "Ekskavatör (halk arasında kepçe), hidrolik kollu ve kovalı kazı makinesidir; temel ve hendek kazısı, hafriyat, yükleme, tesviye ve (hidrolik kırıcıyla) yıkım veya kaya kırma işlerinde kullanılır. Mini, midi, standart ve büyük ton sınıfları ile paletli, lastikli ve uzun kollu tipleri vardır. Şantiye Ağı'nda ekskavatör ilanları ton sınıfı, operatör durumu, saatlik/günlük fiyat ve konuma göre karşılaştırılabilir.",
    tagline: "Kazı, hafriyat ve yükleme işleri için",
    uses: [
      "Temel, bodrum ve hendek kazısı",
      "Hafriyat ve dolgu işlerinde yükleme",
      "Altyapı (kanal, boru hattı) kazısı",
      "Tesviye ve şev düzeltme",
      "Hidrolik kırıcıyla yıkım ve kaya kırma",
      "Dar alanlarda mini ekskavatörle çalışma",
    ],
    specs: [
      ["Ton sınıfları (yaklaşık)", "Mini (6 tona kadar), midi (6–12 ton), standart (12–30 ton), büyük (30 ton üstü)"],
      ["Tipler", "Paletli, lastikli (yolda hareket eder), uzun kollu"],
      ["Aparatlar", "Farklı kovalar, hidrolik kırıcı, tırmık, burgu"],
      ["Nakliye", "Paletli makineler genellikle lowbed/çekici ile taşınır"],
      ["Operatör", "İş makinesi operatörü belgesi; ilanların çoğu operatörlü"],
      ["Kiralama modeli", "Saatlik, günlük, haftalık veya aylık"],
    ],
    checklist: [
      "Kazı derinliği, erişim ve yükleme yüksekliğine göre doğru ton sınıfını seçin",
      "Kova hacmini ve gerekiyorsa hidrolik kırıcı veya özel aparatı kiraya dahil edin",
      "Paletli makinenin asfalt veya bitmiş zemine zarar verebileceğini unutmayın; gerekirse lastikli seçin",
      "Nakliye (lowbed) ve yükleme–indirme masrafının kimde olduğunu yazılı alın",
      "Çalışma saati sayacını ve makinenin genel durumunu teslimde kayda geçirin",
      "Operatör belgesini, periyodik bakım kaydını ve sigortayı sorun",
      "Yakıtı kimin karşılayacağını ve saat/gün hesabının nasıl yapılacağını belirleyin",
    ],
    priceFactors: [
      "Ton sınıfı ve kova hacmi",
      "Paletli / lastikli / uzun kollu tipi",
      "Aparat (kova, hidrolik kırıcı)",
      "Süre ve çalışma saati (saatlik, günlük, aylık)",
      "Operatör ve yakıt dahil mi",
      "Lowbed nakliyesi ve mesafe",
    ],
    faqs: [
      {
        q: "Ekskavatör kiralamada hangi ton sınıfını seçmeliyim?",
        a: "Kazı derinliği, erişim mesafesi, dar alan ve nakliye koşullarına bağlıdır. Dar sokak ve küçük temel işlerinde mini ekskavatör, genel hafriyat ve temel kazısında standart sınıf (yaklaşık 12–30 ton) yaygındır. Emin değilseniz ilan sahibine kazı ölçülerinizi yazıp önerisini isteyin.",
      },
      {
        q: "Ekskavatör saatlik mi, günlük mü kiralanır?",
        a: "İkisi de yaygındır. Kısa ve belirli işlerde saatlik, süreklilik gerektiren şantiyelerde günlük, haftalık veya aylık fiyat daha uygun olur. Şantiye Ağı'ndaki makine ilanlarında saatlik ve günlük fiyat ayrı belirtilir.",
      },
      {
        q: "Ekskavatörün nakliyesi için lowbed gerekir mi?",
        a: "Paletli ekskavatörler genellikle yolda yürümez; lowbed veya çekiciyle taşınır. Lastikli ekskavatörler kısa mesafede kendi gidebilir. Nakliye ücreti kiraya dahil olmayabilir; fiyat konuşurken ayrıca sorun.",
      },
    ],
    related: ["manitou", "mobil-vinc", "forklift"],
  },
  {
    slug: "mobil-vinc",
    name: "Mobil Vinç",
    short: "Mobil Vinç",
    aliases: ["kiralık vinç", "vinç kiralama", "mobil vinç kiralama", "kiralık mobil vinç", "kamyon vinç kiralama"],
    appLabels: ["Mobil Vinç", "Paletli vinç", "Örümcek vinç", "Hiyap / Kamyon üstü vinç"],
    definition:
      "Mobil vinç, kendi taşıyıcısı üzerinde yolda hareket edebilen, teleskopik bomlu vinçtir. Ağır yüklerin kaldırılıp yerleştirilmesinde (prefabrik, çelik konstrüksiyon, makine ve ekipman montajı, yükleme–boşaltma) kullanılır. Kapasite bom uzunluğuna ve çalışma yarıçapına göre değişir; doğru tonaj yük tablosuna göre seçilir. Şantiye Ağı'nda “Mobil Vinç” kategorisinde ve ilgili paletli, örümcek ve hiyap vinç kategorilerinde ilan bulunur.",
    tagline: "Ağır yük kaldırma ve montaj için",
    uses: [
      "Prefabrik ve çelik konstrüksiyon montajı",
      "Makine, jeneratör, klima santrali gibi ağır ekipmanı yerleştirme",
      "Tır ve kamyondan ağır yük indirme–bindirme",
      "Köprü, boru ve altyapı elemanlarının yerleştirilmesi",
      "Dar ve erişimi zor sahalarda küçük tonajlı örümcek veya hiyap vinç",
    ],
    specs: [
      ["Kapasite sınıfı", "Yaygın olarak 20–100 ton; daha büyük tonajlı mobil vinçler de vardır"],
      ["Kapasite", "Bom uzadıkça ve yarıçap arttıkça düşer; yük tablosu esastır"],
      ["Destek", "Mesnet ayakları ve zemin takozlarıyla dengelenir"],
      ["Ekip", "Vinç operatörü; çoğu işte bağlama (rigger) ve işaretçi de gerekir"],
      ["Belgeler", "Operatör belgesi, periyodik kontrol ve sigorta"],
      ["Kiralama modeli", "Saatlik, günlük veya iş bazlı; ilanda belirtilir"],
    ],
    checklist: [
      "Kaldıracağınız yükün ağırlığını, bağlama ekipmanını ve kanca bloğunu birlikte hesaba katın",
      "Yükün çalışma yarıçapını belirleyin; ilgili yarıçaptaki yük tablosu kapasitesi yükünüzden büyük olmalı",
      "Zeminin taşıma kapasitesini kontrol edin; gerekirse takoz veya plaka kullanılacağını netleştirin",
      "Vincin sahaya giriş ölçülerini, yol ve elektrik hattı kısıtlarını önceden teyit edin",
      "Operatör ve işaretçi/bağlama personelinin kim tarafından sağlanacağını yazılı alın",
      "Vincin periyodik kontrol belgesini, operatör belgesini ve sigortayı isteyin",
      "Rüzgâr ve hava koşullarında çalışma sınırını üreticinin değerlerine göre sorun",
    ],
    priceFactors: [
      "Tonaj ve bom uzunluğu",
      "Çalışma süresi (saat, gün) ve iş bazlı fiyat",
      "Vinç türü (mobil, paletli, örümcek, hiyap)",
      "Operatör ve işaretçi dahil mi",
      "Nakliye ve sahaya erişim",
      "Mevsim, rüzgâr ve talep",
    ],
    faqs: [
      {
        q: "Kaç tonluk mobil vinç kiralamalıyım?",
        a: "Yalnızca yükün ağırlığına değil, çalışma yarıçapına da bağlıdır. Yük ağırlığına bağlama ekipmanı ve kanca bloğunu ekleyin; vincin o yarıçaptaki yük tablosu kapasitesi bu toplamın üzerinde olmalıdır. İlan sahibinden yük tablosunu isteyin ve kararı onunla birlikte verin.",
      },
      {
        q: "Kiralık vinç operatörlü mü gelir?",
        a: "Mobil vinçler genellikle operatörlü kiralanır; bağlama ve işaretçi desteği de iş tanımına göre ayrıca sorulmalıdır. Vinç operatörünün yasal belgesi ve vincin periyodik kontrol belgesi güncel olmalıdır.",
      },
      {
        q: "Vinç kiralamada zemin neden önemlidir?",
        a: "Mesnet ayakları yükü zemine aktarır. Yumuşak, dolgu veya eğimli zeminde vinç devrilebilir. Saha zemininin taşıma kapasitesini önceden kontrol edin; gerekirse takoz ve plaka kullanılmasını ilan sahibiyle netleştirin.",
      },
    ],
    related: ["manitou", "sepetli-vinc", "ekskavator"],
  },
];

/** "İş makinesi kiralama" genel kategori sayfası (tüm makine türlerinin üst sayfası). */
export const CATEGORY_ALL = {
  slug: "is-makinesi" as const,
  name: "İş Makinesi",
  short: "İş Makinesi",
  aliases: ["iş makinesi kiralama", "kiralık iş makinesi", "inşaat makinesi kiralama"],
  definition:
    "İş makinesi kiralama, şantiye ve sanayi işlerinde ihtiyaç duyulan ekskavatör, forklift, manitou (teleskopik yükleyici), sepetli vinç, mobil vinç gibi makinelerin saatlik, günlük, haftalık veya aylık süreyle kiralanmasıdır. Şantiye Ağı, makine sahipleriyle kiracıları aracısız ve komisyonsuz buluşturan bir ilan ve buluşma uygulamasıdır; uygulamada 88 farklı makine türü için ilan verilebilir.",
  tagline: "Makine sahibiyle kiracıyı aracısız buluşturan ilan uygulaması",
} as const;

export const MACHINE_SLUGS = MACHINES.map((m) => m.slug);
export const CATEGORY_SLUGS: readonly CategorySlug[] = [...MACHINE_SLUGS, "is-makinesi"];

const BY_SLUG = new Map<string, Machine>(MACHINES.map((m) => [m.slug, m]));

export function getMachine(slug: string): Machine | undefined {
  return BY_SLUG.get(slug);
}

/** Listeleme/sayfa üretiminde kullanılan, ortak alanlara indirgenmiş kategori görünümü. */
export interface CategoryView {
  slug: CategorySlug;
  name: string;
  short: string;
  aliases: readonly string[];
  tagline: string;
  definition: string;
}

export function getCategory(slug: string): CategoryView | undefined {
  if (slug === CATEGORY_ALL.slug) return CATEGORY_ALL;
  return getMachine(slug);
}
