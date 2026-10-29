import { aiTxt } from "@/lib/llms";

export const dynamic = "force-static";

/** /ai.txt: düz metin (UTF-8). İçerik `lib/llms.ts` içinde site verisinden üretilir. */
export function GET() {
  return new Response(aiTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
