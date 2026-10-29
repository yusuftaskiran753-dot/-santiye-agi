# Şantiye Ağı: web sitesi

Next.js (App Router) + TypeScript + Tailwind CSS ile yazılmış, Vercel'e hazır tanıtım ve SEO/AEO sitesi.
Uygulamanın (Flutter + .NET, sürüm 2.1.2) gerçek özelliklerine göre kurulmuştur: içerikteki her iddia uygulama kaynağından doğrulanmıştır.

- **503 statik sayfa**: 11 temel/yasal sayfa + 6 ulusal kategori + 6 × 81 şehir sayfası (`/kiralik-manitou-izmir` gibi)
- Tüm sayfalar derleme sırasında statik üretilir; ortak JS ≈ 103 kB, sunucu bağımlılığı yoktur
- Lighthouse (yerel, mobil): performans 99–100, erişilebilirlik 100, en iyi uygulamalar 100, SEO 100, CLS 0

## Hızlı başlangıç

```bash
cd santiye-agi-web
npm install
cp .env.example .env.local   # değerleri doldurun (hepsi isteğe bağlı)
npm run dev                  # http://localhost:3000
npm run check                # tür denetimi + lint + derleme + içerik denetimi + şema sözlük denetimi
npm start
```

`npm run verify`, derlenen 503 sayfayı denetler: tek `<h1>`, başlık/açıklama uzunluğu, canonical, JSON-LD geçerliliği ve `@id` çakışması,
**FAQPage şemasının görünür metinle birebir eşleşmesi**, başlık sırası, kırık iç bağlantı, sitemap tutarlılığı, `noindex` sızıntısı,
Türkçe ek denetimi (soru eki `mu/mi/mı/mü`, şehir adı + `-de/-da/-te/-ta`) ve içeriğin Suspense ile gizli akış bloklarına çıkmaması.

`npm run verify:schema` ek olarak, sitenin ürettiği JSON-LD'deki her özelliğin schema.org sözlüğünde (schema-dts) o tür için tanımlı olduğunu doğrular.

## Klasör yapısı

```
santiye-agi-web/
├─ content/legal/            Yasal metinler (HTML parçaları; uygulama kaynağındaki legal/web/index.html'den)
├─ public/                   og.png (1200×630), icons/ (192, 512, maskable)
├─ scripts/verify-content.mjs   Derleme sonrası içerik/SEO denetimi
└─ src/
   ├─ app/
   │  ├─ layout.tsx          Kök düzen, site geneli JSON-LD (Organization, Person, WebSite, MobileApplication)
   │  ├─ page.tsx            Ana sayfa (10 bölüm)
   │  ├─ [slug]/page.tsx     /kiralik-{makine} ve /kiralik-{makine}-{şehir} (492 sayfa)
   │  ├─ makineler/ ihaleler/ sosyal-akis/ hakkimizda/ iletisim/ sss/
   │  ├─ kullanim-kosullari/ gizlilik/ kvkk/ hesap-silme/
   │  ├─ sitemap.ts robots.ts manifest.ts icon.svg apple-icon.png not-found.tsx
   │  └─ llms.txt/ llms-full.txt/ ai.txt/ humans.txt/   (route.ts: veriden üretilen düz metin)
   ├─ components/            Header, Footer, QuoteForm (istemci), CategoryPage, FaqList, ComparisonTable, …
   └─ lib/
      ├─ site.ts             Ortam değişkenleri, sabitler, FEATURE_STATUS
      ├─ cities.ts           81 il, plaka, bölge, Türkçe ek yardımcıları (inCity, questionParticle)
      ├─ machines.ts         5 makine + genel kategori içeriği
      ├─ machine-catalog.ts  Uygulamadaki 88 makine türü (uygulama kaynağından üretildi)
      ├─ content.ts          Şehir × makine başlık/açıklama/gövde üreticileri
      ├─ faq.ts              SSS (AEO) ve karşılaştırma tablosu verisi
      ├─ schema.ts           Tüm JSON-LD üreticileri
      ├─ seo.ts llms.ts ai-bots.ts slugs.ts whatsapp.ts tenders.ts legal.ts legal-meta.ts
```

## Yayına alma (Vercel)

1. Vercel'de bu GitHub deposunu içe aktarın; **Root Directory = `santiye-agi-web`** (Framework: Next.js otomatik).
2. Ortam değişkenleri (`.env.example`):
   | Değişken | Açıklama |
   |---|---|
   | `NEXT_PUBLIC_SITE_URL` | Kanonik adres, varsayılan `https://santiyeagi.com.tr` |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` | `905XXXXXXXXX`. Boşsa talep formu "kişi seç" modunda WhatsApp'ı açar |
   | `NEXT_PUBLIC_PLAY_STORE_URL`, `NEXT_PUBLIC_APP_STORE_URL` | Doldurunca "Yakında" rozetleri mağaza düğmesine döner, JSON-LD'ye `installUrl` eklenir |
   | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console meta doğrulaması |
   | `TENDERS_FEED_URL` | İsteğe bağlı JSON ihale akışı (biçim: `src/lib/tenders.ts`) |
3. Alan adı: `santiyeagi.com.tr` ve `www`. `www` → apex yönlendirmesini Vercel'de tanımlayın.
4. Yayından sonra Search Console'a `https://santiyeagi.com.tr/sitemap.xml` gönderin.

### Eski yasal bağlantılar kırılmaz
Mobil sürümlerde ve mağaza kayıtlarında yasal bağlantılar `https://santiyeagi.com.tr/#gizlilik` gibi hash'lidir. Ana sayfa bu hash'leri
(`#gizlilik`, `#kvkk`, `#kullanim-kosullari`, `#hesap-silme`) ilgili sayfaya yönlendirir (`LegalHashRedirect`). Mağaza formlarında artık
`/gizlilik`, `/kvkk`, `/kullanim-kosullari`, `/hesap-silme` adreslerini kullanın; bunlar JavaScript gerektirmez (Google Play hesap silme URL'si için önemlidir).

## Brifte istenenlerden bilinçli sapmalar (ve nedenleri)

| Brif | Yapılan | Neden |
|---|---|---|
| "Türkiye'nin en büyük kiralama pazaryeri", "2 saatte teslimat" | Kullanılmadı | Uygulamada yok / doğrulanamaz. Şantiye Ağı makine kiralamaz, taşımaz; teslim süresini ilan sahibi belirler |
| `AggregateRating`, `priceRange` | Eklenmedi | Gerçek puan/yorum ve fiyat verisi yok; uydurmak Google yapılandırılmış veri ilkelerini ihlal eder. `verify` bunu denetler |
| `LocalBusiness`, `RentalService`, `Product` | `Organization` + `MobileApplication` + `Service` + `ItemList` | Fiziksel işyeri yok; `RentalService` schema.org'da yok; sunulan şey ürün değil ilan/buluşma hizmeti |
| Anlık fiyat hesaplama, canlı makine takibi, dijital fatura, kazanç paneli, müsaitlik takvimi | Yok | Uygulamada bu biçimde yok. Karşılığı: hazır WhatsApp talebi, anlaşma ekranından **süreli canlı konum**, anlaşma kaydı |
| "Insured Rental" / "Licensed Operator" rozetleri | Yok | Uygulama sigorta veya operatör belgesi doğrulamaz; "Telefon doğrulandı", "Onaylı firma", puan sistemi anlatılır, belge kontrolü kullanıcıya hatırlatılır |
| Logo bulutu (iş ortakları) | "Güven ve güvenlik" şeridi | Gerçek iş ortağı yok; uydurma logo kullanılmaz |
| Video akışı | Fotoğraf + 24 saatlik hikâye | Uygulamada video yok |
| "Canlı ihale akışı" | `TENDERS_FEED_URL` yoksa **açıkça "Örnek"** etiketli kartlar | Uygulama kaynağında ihale/akış şimdilik cihazda; ortak sunucu ucu yok |
| `kiralik-[makine]-[sehir]` klasörü | `[slug]` rotası + ayrıştırıcı (`src/lib/slugs.ts`) | App Router tek segmentte sabit metin + dinamik parçayı desteklemez |
| `/sosyal-akış` | `/sosyal-akis` (+ 308 yönlendirme) | ASCII adres daha güvenli; eski yazım yönlendirilir |
| Next.js 14 | **Next.js 15.5.28** (Next 14.2.35 ile de derlenip doğrulandı) | 14 hattının son sürümünde yamasız yüksek/kritik bildirimler var (`npm audit`); 15.5.28 + postcss override → 0 açık |
| Core Web Vitals 100/100 | Ölçüldü: perf 99–100 | Hiçbir araç "garanti" veremez; sonuçlar Lighthouse'tan gelir |

Next 14'e dönmek isterseniz: `npm i next@14.2.35 react@18.3.1 react-dom@18.3.1 @types/react@18 @types/react-dom@18 eslint-config-next@14.2.35`
(kod iki sürümde de aynen derlenir). Güvenlik bildirimleri için 15.x önerilir.

## İçerik ve yasal notlar

- **Fiyat yok**: sitede kiralama fiyatı yazılmaz; fiyatı ilan sahibi belirler. Premium/kredi fiyatları da mağazada gösterilir.
- **Şehir sayfaları** ince içerik (thin content) riski taşır. `src/lib/slugs.ts` içindeki `INDEX_ALL_CITY_PAGES = false` yaparsanız yalnızca
  öncelikli 5 şehir indekslenir ve sitemap'e girer; diğer iller `noindex, follow` olur. Gerçek ilan veya yerel veri eklendikçe `true` yapın.
- **İhale ve Şantiye Akışı** `FEATURE_STATUS` ile "Önizleme" olarak işaretlidir (`src/lib/site.ts`). Sunucu uçları bağlanınca `"live"` yapın.
- **Yasal metinler** `content/legal/` içinde, uygulama kaynağındaki 24.10.2026 sürümüdür. Tek değişiklik: barındırma cümleleri
  ("GitHub Pages" → "Vercel Inc."). Metinler avukat onaylı değildir (uygulama notlarında da belirtilmiştir); yayından önce hukuki kontrol yapın.
- Sürüm, sayılar (81 il, 88 makine türü, 82 meslek) ve kurallar `src/lib/site.ts` / `faq.ts` içinde tek yerde tutulur.

## Bakım

- İçerik değişince `SITE.contentUpdated` (sitemap `lastmod`, JSON-LD `dateModified`) tarihini güncelleyin.
- Uygulamaya makine türü eklenirse `src/lib/machine-catalog.ts` yeniden üretilmelidir (başlıktaki açıklamaya bakın).
- Her değişiklikten sonra: `npm run build && npm run verify`.
