import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export default function robots() {
  const siteUrl = getSiteUrl();
  const hostname = new URL(siteUrl).hostname;
  const isNonProductionHost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".vercel.app");

  return {
    rules: [
      {
        userAgent: "*",
        allow: isNonProductionHost ? [] : "/",
        disallow: isNonProductionHost ? ["/"] : ["/admin", "/api/admin"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
