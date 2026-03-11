import "server-only";
import { unstable_cache } from "next/cache";
import { createCaller } from "~/server/api/trpc/server";
import { list } from "@vercel/blob";
import type { NewsItem } from "~/data/content";

/**
 * Revalidation windows:
 *  - Static content (offer, services): 1 h
 *  - Projects gallery: 1 h
 *  - News: 10 min (updated more often)
 *  - Blob images list: 1 h
 *  - Development: cache wyłączony — zmiany w bazie widoczne od razu
 */
const DEV = process.env.NODE_ENV === "development";
const TTL_STANDARD = 3600; // 1 h
const TTL_NEWS     = 600;  // 10 min
const TTL_IMAGES   = 3600; // 1 h

// ─── Offer ───────────────────────────────────────────────────────────────────
const _getCachedOffer = unstable_cache(
  async () => {
    const caller = await createCaller();
    return caller.content.getOffer();
  },
  ["offer"],
  { revalidate: TTL_STANDARD, tags: ["offer"] }
);

export const getCachedOffer = DEV
  ? () => createCaller().then((c) => c.content.getOffer())
  : _getCachedOffer;

// ─── Projects ────────────────────────────────────────────────────────────────
const _getCachedProjects = unstable_cache(
  async (opts?: { status?: string; category?: string; limit?: number }) => {
    const caller = await createCaller();
    return caller.content.getProjects(
      opts as Parameters<typeof caller.content.getProjects>[0]
    );
  },
  ["projects"],
  { revalidate: TTL_STANDARD, tags: ["projects"] }
);

export const getCachedProjects = DEV
  ? (opts?: { status?: string; category?: string; limit?: number }) =>
      createCaller().then((c) =>
        c.content.getProjects(opts as Parameters<typeof c.content.getProjects>[0])
      )
  : _getCachedProjects;

// ─── News ─────────────────────────────────────────────────────────────────────
const _getCachedNews = unstable_cache(
  async (limit?: number) => {
    const caller = await createCaller();
    return caller.content.getNews(limit ? { limit } : undefined) as Promise<NewsItem[]>;
  },
  ["news"],
  { revalidate: TTL_NEWS, tags: ["news"] }
);

export const getCachedNews = DEV
  ? (limit?: number) =>
      createCaller().then((c) =>
        c.content.getNews(limit ? { limit } : undefined) as Promise<NewsItem[]>
      )
  : _getCachedNews;

// ─── NewsItem ─────────────────────────────────────────────────────────────────
/** Cache per id – klucz musi zawierać id, inaczej wszystkie artykuły dzielą ten sam wpis cache (SSR zwracałby zły artykuł). */
export async function getCachedNewsItem(id: string) {
  if (DEV) {
    const caller = await createCaller();
    return caller.content.getNewsItem({ id });
  }
  return unstable_cache(
    async () => {
      const caller = await createCaller();
      return caller.content.getNewsItem({ id });
    },
    ["news-item", id],
    { revalidate: TTL_NEWS, tags: ["news", `news-${id}`] }
  )();
}

// ─── Services ────────────────────────────────────────────────────────────────
const _getCachedUslugi = unstable_cache(
  async () => {
    const caller = await createCaller();
    return caller.content.getUslugi();
  },
  ["uslugi"],
  { revalidate: TTL_STANDARD, tags: ["uslugi"] }
);

export const getCachedUslugi = DEV
  ? () => createCaller().then((c) => c.content.getUslugi())
  : _getCachedUslugi;

// ─── Geo Citations ────────────────────────────────────────────────────────────
type GeoCitationCategory = "firma" | "statystyki" | "oferta" | "porady" | "kontakt";

const _getCachedGeoCitations = (category?: GeoCitationCategory) =>
  unstable_cache(
    async () => {
      const caller = await createCaller();
      return caller.content.getGeoCitations(category ? { category } : undefined);
    },
    ["geo-citations", category ?? "all"],
    { revalidate: TTL_STANDARD, tags: ["geo-citations"] }
  )();

/** Zwraca zdania GEO z bazy (z cache 1h). Opcjonalnie filtruje po kategorii. */
export const getCachedGeoCitations = DEV
  ? async (category?: GeoCitationCategory) => {
      const caller = await createCaller();
      return caller.content.getGeoCitations(category ? { category } : undefined);
    }
  : _getCachedGeoCitations;

// ─── Blob Images ──────────────────────────────────────────────────────────────
type BlobFolder = "projects" | "news" | "hero";

const _getCachedBlobImages = (folder: BlobFolder) =>
  unstable_cache(
    async () => {
      const result = await list({ prefix: `images/${folder}/` });
      return result.blobs.map((b) => ({ url: b.url, pathname: b.pathname }));
    },
    ["blob-images", folder],
    { revalidate: TTL_IMAGES, tags: ["blob-images", `blob-images-${folder}`] }
  )();

/** Zwraca listę URL obrazków z Vercel Blob dla danego folderu (z cache 1h). */
export const getCachedBlobImages = DEV
  ? async (folder: BlobFolder) => {
      const result = await list({ prefix: `images/${folder}/` });
      return result.blobs.map((b) => ({ url: b.url, pathname: b.pathname }));
    }
  : _getCachedBlobImages;
