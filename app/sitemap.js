import { allSiteRoutes } from "@/lib/site-routes";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap() {
  const lastModified = new Date();

  return allSiteRoutes.map((route) => ({
    url: absoluteUrl(route.href),
    lastModified,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.href === "/" ? 1 : 0.8,
  }));
}
