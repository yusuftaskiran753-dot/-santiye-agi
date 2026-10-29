import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getLegalDoc } from "@/lib/legal-meta";
import { pageMetadata } from "@/lib/seo";

const doc = getLegalDoc("hesap-silme");

export const metadata: Metadata = pageMetadata({
  title: doc.title,
  description: doc.description,
  path: "/hesap-silme",
});

export default function Page() {
  return <LegalPage slug="hesap-silme" />;
}
