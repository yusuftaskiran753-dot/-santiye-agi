import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";

/** Başlık eki (" | Şantiye Ağı") dahil toplam uzunluk ≈ 62 karakteri geçmesin. */
export const TITLE_MAX = 48;
export const DESC_MAX = 158;

/** Verilen adaylardan sığan ilkini seçer (en açıklayıcıdan en kısaya sıralayın). */
export function fitTitle(candidates: string[], max = TITLE_MAX): string {
  for (const c of candidates) if (c.length <= max) return c;
  const last = candidates[candidates.length - 1] ?? SITE.name;
  return last.slice(0, max).trimEnd();
}

/** Açıklamayı cümle ya da kelime sınırında kısaltır (üç nokta kullanmaz). */
export function fitDescription(text: string, max = DESC_MAX): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (sentence > max * 0.6) return cut.slice(0, sentence + 1);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 0 ? space : max).replace(/[,;:\s]+$/, "")}.`;
}

interface PageMeta {
  title: string;
  description: string;
  /** "/" ile başlayan yol; canonical ve og:url bundan üretilir */
  path: string;
  /** true ise indekslenmez (yine de linkler izlenir) */
  noindex?: boolean;
  keywords?: string[];
  /** "article" yalnızca içerik sayfalarında; varsayılan website */
  type?: "website" | "article";
  /** true: başlık zaten marka adını içerir; şablon eki (" | Şantiye Ağı") eklenmez */
  absolute?: boolean;
}

/** Her sayfa için ortak meta veri: canonical, Open Graph, Twitter, robots. */
export function pageMetadata({ title, description, path, noindex, keywords, type = "website", absolute = false }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const ogTitle = absolute ? title : `${title} | ${SITE.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url, languages: { "tr-TR": url, "x-default": url } },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      title: ogTitle,
      description,
      images: [{ url: absoluteUrl("/og.png"), width: 1200, height: 630, alt: `${SITE.name}: ${SITE.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [absoluteUrl("/og.png")],
    },
  };
}
