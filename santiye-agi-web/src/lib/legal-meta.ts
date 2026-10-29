/**
 * Yasal belgelerin istemci/sunucu ortak meta verisi (dosya okuma içermez).
 * İçeriği okuyan sunucu işlevleri `legal.ts` içindedir.
 */
export type LegalSlug = "kullanim-kosullari" | "gizlilik" | "kvkk" | "hesap-silme";

export interface LegalDoc {
  slug: LegalSlug;
  title: string;
  description: string;
  /** Mobil uygulamalardaki eski tek sayfa adresinin (/#...) karşılığı */
  legacyHash: string;
}

export const LEGAL_DOCS: readonly LegalDoc[] = [
  {
    slug: "kullanim-kosullari",
    title: "Kullanım Koşulları",
    description:
      "Şantiye Ağı Kullanım Koşulları: uygulamanın niteliği, hesap, kullanıcı yükümlülükleri, güvenli ticaret, puanlama, Premium ve kredi, Şantiye Akışı ve ihale kuralları.",
    legacyHash: "#kullanim-kosullari",
  },
  {
    slug: "gizlilik",
    title: "Gizlilik Politikası",
    description:
      "Şantiye Ağı Gizlilik Politikası: hangi veriler işlenir, canlı konum, yapay zekâ asistanı, hizmet sağlayıcılar, saklama ve silme süreleri, haklarınız.",
    legacyHash: "#gizlilik",
  },
  {
    slug: "kvkk",
    title: "KVKK Aydınlatma Metni",
    description:
      "Şantiye Ağı Kişisel Verilerin İşlenmesine İlişkin Aydınlatma Metni: işlenen veriler, amaçlar ve hukuki sebepler, aktarım, saklama süresi ve KVKK m. 11 hakları.",
    legacyHash: "#kvkk",
  },
  {
    slug: "hesap-silme",
    title: "Hesap ve Veri Silme",
    description:
      "Şantiye Ağı hesabını uygulamadan (Profil → Hesabımı sil) veya e-posta ile nasıl silersiniz; hangi veriler silinir, hangileri sınırlı süre kalır; abonelik iptali.",
    legacyHash: "#hesap-silme",
  },
];

export function getLegalDoc(slug: LegalSlug): LegalDoc {
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  if (!doc) throw new Error(`Bilinmeyen yasal belge: ${slug}`);
  return doc;
}
