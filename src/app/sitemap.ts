import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xtechsrenewables.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/", "/about", "/pv-battery", "/builders", "/off-grid", "/ev-chargers",
    "/electrical", "/x-classes", "/blog", "/careers", "/contact",
    "/privacy", "/cookies", "/terms"
  ];

  return staticRoutes.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
