import type { MetadataRoute } from "next";
import { partnersBySlug } from "@/lib/partners/localBusinessPartners";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.xtechsrenewables.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    // Main pages
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },

    // Solar & Battery pages
    { path: "/solar", priority: 0.9, changeFrequency: "weekly" },
    { path: "/solar/residential", priority: 0.8, changeFrequency: "weekly" },
    { path: "/solar/business", priority: 0.8, changeFrequency: "weekly" },
    { path: "/solar/builders", priority: 0.8, changeFrequency: "weekly" },
    { path: "/solar/off-grid", priority: 0.8, changeFrequency: "weekly" },
    { path: "/battery", priority: 0.8, changeFrequency: "weekly" },

    // Other services
    { path: "/ev-chargers", priority: 0.7, changeFrequency: "weekly" },

    // X-Classes
    { path: "/x-classes", priority: 0.5, changeFrequency: "monthly" },
    { path: "/x-classes/industry-updates", priority: 0.6, changeFrequency: "weekly" },

    // Legal pages
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },

    // Partner landing pages (default)
    { path: "/local-business-partners", priority: 0.5, changeFrequency: "monthly" },
  ];

  const partnerRoutes = Object.keys(partnersBySlug).map((slug) => ({
    path: `/local-business-partners/${slug}`,
    priority: 0.4,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...partnerRoutes].map((route) => ({
    url: new URL(route.path, base).toString(),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority: route.priority,
  }));
}
