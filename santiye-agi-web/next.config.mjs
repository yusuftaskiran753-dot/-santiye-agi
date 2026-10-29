/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  ...(process.env.STATIC_EXPORT === "1" ? { output: "export", trailingSlash: true, images: { unoptimized: true } } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    if (process.env.STATIC_EXPORT === "1") return [];
    return [
      // Türkçe karakterli eski/yanlış yazım → ASCII adres (kalıcı yönlendirme)
      { source: "/sosyal-ak%C4%B1%C5%9F", destination: "/sosyal-akis", permanent: true },
      { source: "/sosyal-akış", destination: "/sosyal-akis", permanent: true },
      { source: "/iletişim", destination: "/iletisim", permanent: true },
      { source: "/hakkımızda", destination: "/hakkimizda", permanent: true },
      { source: "/hakkimizda.html", destination: "/hakkimizda", permanent: true },
      { source: "/privacy", destination: "/gizlilik", permanent: true },
      { source: "/privacy.html", destination: "/gizlilik", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
  async headers() {
    if (process.env.STATIC_EXPORT === "1") return [];
    return [
      { source: "/:path*", headers: securityHeaders },
    ];
  },
};

if (process.env.STATIC_EXPORT === "1") {
  delete nextConfig.redirects;
  delete nextConfig.headers;
}
export default nextConfig;
