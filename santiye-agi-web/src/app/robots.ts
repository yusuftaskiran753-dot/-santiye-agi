import type { MetadataRoute } from "next";
import { AI_BOTS } from "@/lib/ai-bots";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

/** Tüm arama motorlarına ve yapay zekâ tarayıcılarına açık; site haritası ve yapay zekâ özetleri belirtilir. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_BOTS.map((b) => b.agent), allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
