import { serializeJsonLd } from "@/lib/schema";

/** JSON-LD bloğu. "<" karakterleri kaçırıldığı için içerik <script> içinden çıkamaz. */
export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
