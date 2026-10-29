import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { LegalSlug } from "./legal-meta";

/**
 * Yasal metinler `content/legal/*.html` içinde tutulur (uygulama kaynağındaki `legal/web/index.html`
 * bölümlerinden türetilmiştir). Metinler İşletici tarafından yönetilir; burada yalnızca okunur.
 * Sayfalar derleme sırasında statik üretilir.
 */
export function readLegalHtml(slug: LegalSlug): string {
  return readFileSync(path.join(process.cwd(), "content", "legal", `${slug}.html`), "utf-8");
}

/** Metnin ilk "Son güncelleme" tarihini (GG.AA.YYYY) çıkarır. */
export function legalUpdated(html: string): string | undefined {
  return /Son güncelleme:<\/strong>\s*(\d{2}\.\d{2}\.\d{4})/.exec(html)?.[1];
}
