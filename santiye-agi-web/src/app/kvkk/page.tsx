import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalDoc } from "@/lib/legal-meta";
import { pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("kvkk");

export const metadata: Metadata = pageMetadata({
  title: doc.title,
  description: doc.description,
  path: "/kvkk",
});

export default function Page() {
  return <LegalPage slug="kvkk" />;
}
