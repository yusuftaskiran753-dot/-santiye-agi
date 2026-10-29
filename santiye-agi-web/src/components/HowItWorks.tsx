export const HOW_STEPS = [
  {
    name: "İlan ver ya da ilan bul",
    text: "Makine, yük, malzeme veya personel: ilinizi ve türü seçin, ilanları liste ya da haritada fiyat, operatör durumu ve konuma göre karşılaştırın. İlan vermek ücretsizdir.",
  },
  {
    name: "Teklifleş, doğrudan yaz",
    text: "Telefon numaraları gizlidir: iletişim hakkıyla arayın, WhatsApp'tan hazır mesajla yazın ya da teklif gönderin. Büyük işleri ihaleye açıp birden çok firmadan açıklamalı teklif toplayın.",
  },
  {
    name: "Anlaş, kaydet, takip et",
    text: "Kabul edilen teklif dijital anlaşma kaydına dönüşür: ödeme planı, teslim, isteğe bağlı süreli canlı konum ve karşılıklı puan. Ödemeyi ilan sahibine doğrudan yaparsınız.",
  },
] as const;

export function HowItWorks() {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {HOW_STEPS.map((s, i) => (
        <li key={s.name} className="relative border-2 border-ink bg-white p-6 pt-10 shadow-block-sm">
          <span
            aria-hidden
            className="absolute -top-5 left-5 grid h-12 w-12 place-items-center border-2 border-ink bg-brand text-2xl font-black"
          >
            {i + 1}
          </span>
          <h3 className="text-xl font-black">{s.name}</h3>
          <p className="mt-2 text-ink-3">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
