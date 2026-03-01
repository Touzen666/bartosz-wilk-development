import "server-only";
import { unstable_cache } from "next/cache";
import { createCaller } from "~/server/api/trpc/server";
import type { NewsItem } from "~/data/content";

/**
 * Revalidation windows:
 *  - Static content (offer, services): 1 h
 *  - Projects gallery: 1 h
 *  - News: 10 min (updated more often)
 */
const TTL_STANDARD = 3600; // 1 hour
const TTL_NEWS     = 600;  // 10 minutes

// ─── Offer ───────────────────────────────────────────────────────────────────
export const getCachedOffer = unstable_cache(
  async () => {
    const caller = await createCaller();
    return caller.content.getOffer();
  },
  ["offer"],
  { revalidate: TTL_STANDARD, tags: ["offer"] }
);

// ─── Projects ────────────────────────────────────────────────────────────────
export const getCachedProjects = unstable_cache(
  async (opts?: { status?: string; category?: string; limit?: number }) => {
    const caller = await createCaller();
    return caller.content.getProjects(
      opts as Parameters<typeof caller.content.getProjects>[0]
    );
  },
  ["projects"],
  { revalidate: TTL_STANDARD, tags: ["projects"] }
);

// ─── News ─────────────────────────────────────────────────────────────────────
export const getCachedNews = unstable_cache(
  async (limit?: number) => {
    const caller = await createCaller();
    return caller.content.getNews(limit ? { limit } : undefined) as Promise<NewsItem[]>;
  },
  ["news"],
  { revalidate: TTL_NEWS, tags: ["news"] }
);

export const getCachedNewsItem = unstable_cache(
  async (id: string) => {
    const caller = await createCaller();
    return caller.content.getNewsItem({ id });
  },
  ["news-item"],
  { revalidate: TTL_NEWS, tags: ["news"] }
);

// ─── Services ────────────────────────────────────────────────────────────────
export const getCachedUslugi = unstable_cache(
  async () => {
    const caller = await createCaller();
    return caller.content.getUslugi();
  },
  ["uslugi"],
  { revalidate: TTL_STANDARD, tags: ["uslugi"] }
);
