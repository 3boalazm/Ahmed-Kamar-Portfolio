import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...["about", "work", "skills", "method", "contact"].map((p) => ({
      url: `${SITE.url}/${p}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/cv`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
