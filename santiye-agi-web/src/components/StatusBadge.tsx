/** Henüz herkese açık olmayan veya örnek içerik gösteren alanlar için dürüst etiket. */
export function StatusBadge({ kind }: { kind: "preview" | "sample" | "soon" | "new" }) {
  const map = {
    preview: "Önizleme",
    sample: "Örnek",
    soon: "Yakında",
    new: "Yeni",
  } as const;
  return <span className={`badge ${kind === "new" ? "badge-brand" : ""}`}>{map[kind]}</span>;
}
