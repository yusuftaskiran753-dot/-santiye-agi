import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema";
import { SITE, SITE_SUMMARY } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Şantiye Ağı | Kiralık İş Makinesi, Manitou, Forklift, Vinç",
    template: "%s | Şantiye Ağı",
  },
  description: SITE_SUMMARY,
  applicationName: SITE.name,
  authors: [{ name: SITE.operator.name, url: SITE.url }],
  creator: SITE.operator.name,
  publisher: SITE.name,
  category: "business",
  formatDetection: { telephone: false, email: false, address: false },
  manifest: "/manifest.webmanifest",
  verification: SITE.googleVerification ? { google: SITE.googleVerification } : undefined,
  other: {
    "geo.region": "TR",
    "geo.placename": "Türkiye",
  },
};

/**
 * Kök düzen: skip-link + üst menü + <main id="icerik"> + alt bilgi.
 * Site genelindeki JSON-LD grafiği (Organization, Person, WebSite, MobileApplication) her sayfada bir kez yer alır;
 * sayfa düzeyindeki şemalar (WebPage, BreadcrumbList, FAQPage, Service, ItemList…) ilgili sayfalarda eklenir.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} dir="ltr">
      <body>
        <Header />
        <main id="icerik" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={siteGraph()} />
      </body>
    </html>
  );
}
