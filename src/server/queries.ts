import "server-only";
import { OFFER, PROJECTS, NEWS, USLUGI } from "~/data/content";
import type { Project, NewsItem } from "~/data/content";

async function getDb() {
  if (process.env.USE_DATABASE !== "true") return null;
  const { db } = await import("~/server/db");
  return db;
}

// ─── Offer ───────────────────────────────────────────────────────────────────

export async function queryOffer() {
  const db = await getDb();
  if (db) {
    const sections = await db.offerSection.findMany({ orderBy: { slug: "asc" } });
    const bySlug = Object.fromEntries(
      sections.map((s) => [
        s.slug === "domy-szeregowe" ? "domySzeregowe" : "remontyPodKlucz",
        {
          title: s.title,
          subtitle: s.subtitle,
          description: s.description,
          highlights: JSON.parse(s.highlights) as string[],
        },
      ])
    );
    return {
      domySzeregowe: bySlug.domySzeregowe ?? { title: "", subtitle: "", description: "", highlights: [] },
      remontyPodKlucz: bySlug.remontyPodKlucz ?? { title: "", subtitle: "", description: "", highlights: [] },
    };
  }
  return OFFER;
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function queryProjects(opts?: {
  status?: string;
  category?: string;
  limit?: number;
}) {
  const db = await getDb();
  if (db) {
    const where: { status?: string; category?: string } = {};
    if (opts?.status)   where.status   = opts.status;
    if (opts?.category) where.category = opts.category;
    const list = await db.project.findMany({
      where: Object.keys(where).length ? where : undefined,
      orderBy: { createdAt: "desc" },
      take: opts?.limit ?? 50,
    });
    return list.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category as "domy-szeregowe" | "remonty",
      description: p.description,
      image_url: p.imageUrl,
      status: p.status as "W sprzedaży" | "Zakończone",
    }));
  }
  let list = [...PROJECTS] as Project[];
  if (opts?.status)   list = list.filter((p) => p.status   === opts.status);
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  return list.slice(0, opts?.limit ?? list.length);
}

// ─── News ─────────────────────────────────────────────────────────────────────

export async function queryNews(limit?: number) {
  const db = await getDb();
  if (db) {
    const list = await db.newsItem.findMany({
      orderBy: { date: "desc" },
      take: limit ?? 50,
    });
    return list.map((n) => ({
      id: n.id,
      title: n.title,
      excerpt: n.excerpt,
      body: n.body,
      date: n.date,
      image_url: n.imageUrl,
    }));
  }
  return NEWS.slice(0, limit ?? NEWS.length) as NewsItem[];
}

export async function queryNewsItem(id: string) {
  const db = await getDb();
  if (db) {
    const n = await db.newsItem.findUnique({ where: { id } });
    if (!n) return null;
    return {
      id: n.id,
      title: n.title,
      excerpt: n.excerpt,
      body: n.body,
      date: n.date,
      image_url: n.imageUrl,
    };
  }
  return NEWS.find((n) => n.id === id) ?? null;
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function queryUslugi() {
  const db = await getDb();
  if (db) {
    const list = await db.service.findMany({ orderBy: { order: "asc" } });
    return list.map((s) => s.name);
  }
  return USLUGI as string[];
}
