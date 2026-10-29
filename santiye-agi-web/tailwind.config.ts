import type { Config } from "tailwindcss";

/**
 * Şantiye Ağı tasarım sistemi: Şantiye Sarısı + Siyah + Beyaz (endüstriyel, güven veren).
 * Sarı yalnızca zemin/vurgu olarak kullanılır; beyaz zeminde sarı yazı kullanılmaz (kontrast).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#FFC400", dark: "#E0AB00", soft: "#FFF6CC" },
        ink: { DEFAULT: "#111111", 2: "#27272A", 3: "#3F3F46" },
        steel: { 50: "#F7F7F5", 100: "#EFEFEA", 200: "#E1E1DA", 300: "#C9C9C0", 500: "#6B6B63", 600: "#55554E" },
        ok: "#15803D",
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      maxWidth: { page: "72rem" },
      boxShadow: {
        block: "6px 6px 0 0 #111111",
        "block-sm": "3px 3px 0 0 #111111",
      },
    },
  },
  plugins: [],
};

export default config;
