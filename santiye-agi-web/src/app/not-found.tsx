import type { Metadata } from "next";
import Link from "next/link";
import { MachineCards } from "@/components/MachineCards";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-page py-16 sm:py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl sm:text-5xl">Aradığınız sayfa bulunamadı</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-3">
        Adres değişmiş ya da yanlış yazılmış olabilir. Aşağıdan kiralık makine sayfalarına gidebilir, ana sayfaya dönebilirsiniz.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Ana sayfa
        </Link>
        <Link href="/makineler" className="btn btn-outline">
          Tüm makineler
        </Link>
      </div>
      <div className="mt-12">
        <MachineCards headingLevel="h2" />
      </div>
    </div>
  );
}
