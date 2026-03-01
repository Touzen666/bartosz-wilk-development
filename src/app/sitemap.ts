import type { MetadataRoute } from "next";
import { BASE_URL, PAGES } from "~/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...PAGES.map(({ path }) => ({
      url: `${BASE_URL}${path}`,
      lastModified,
      changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
  ];
}
