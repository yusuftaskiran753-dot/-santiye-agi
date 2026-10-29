"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Mobil uygulamalarda ve mağaza kayıtlarında yasal bağlantılar eski tek sayfa biçimindedir
 * (ör. https://santiyeagi.com.tr/#gizlilik). Bu adresler kırılmasın diye ana sayfada,
 * hash değeri bilinen bir yasal bölümse ilgili sayfaya yönlendirilir.
 */
const MAP: Record<string, string> = {
  "#kullanim-kosullari": "/kullanim-kosullari",
  "#gizlilik": "/gizlilik",
  "#kvkk": "/kvkk",
  "#hesap-silme": "/hesap-silme",
};

export function LegalHashRedirect() {
  const router = useRouter();
  useEffect(() => {
    const target = MAP[window.location.hash.toLowerCase()];
    if (target) router.replace(target);
  }, [router]);
  return null;
}
