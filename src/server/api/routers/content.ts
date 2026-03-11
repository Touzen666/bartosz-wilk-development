import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OFFER, PROJECTS, NEWS, USLUGI, GEO_CITATIONS, type GeoCitationCategory } from "~/data/content";
import { ProjectSchema, NewsItemSchema } from "~/generated/zod";

// Fallbacki statyczne dla SiteConfig gdy baza niedostępna
const SITE_CONFIG_FALLBACK: Record<string, string> = {
  about_intro: "Wilk Development to rzeszowska firma budowlano-remontowa z ponad 15-letnim doświadczeniem.",
  contact_phone: "+48 690 884 961", contact_email: "biuro@zlotewynajmy.com", contact_address: "Rzeszów, Podkarpacie",
  geo_years_on_market: "15", geo_bathroom_days: "14", geo_terrace_weeks: "2–4",
  geo_certification_norm: "PN-EN", geo_completed_projects: "setki",
  hero_image_main: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80&auto=format&fit=crop",
  hero_image_terraced: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1600&q=80&auto=format&fit=crop",
  hero_image_renovation: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80&auto=format&fit=crop",
  hero_tagline: "Rzeszów · Podkarpacie · od 2010 roku",
  hero_heading: "Budujemy i remontujemy pod klucz",
  hero_description: "Wilk Development — domy szeregowe, remonty mieszkań i wykończenia wnętrz. Jedna firma, pełna realizacja, terminowość gwarantowana.",
  offer_psr_domy_result: "Inwestor otrzymuje gotowy, energooszczędny dom z pisemną gwarancją, w ustalonym terminie, z jednym punktem kontaktu przez cały czas budowy.",
  offer_psr_remonty_result: "Średni czas remontu łazienki to 14 dni roboczych. Jedna umowa, jedna faktura, pełna odpowiedzialność i gwarancja pisemna na wykonane prace.",
};

const statusEnum   = z.enum(["W sprzedaży", "Zakończone"]);
const categoryEnum = z.enum(["domy-szeregowe", "remonty"]);

export const contentRouter = createTRPCRouter({

  getOffer: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      const sections = await ctx.db.offerSection.findMany({ orderBy: { slug: "asc" } });
      const bySlug = Object.fromEntries(
        sections.map((s) => [
          s.slug === "domy-szeregowe" ? "domySzeregowe" : "remontyPodKlucz",
          {
            title:       s.title,
            subtitle:    s.subtitle,
            description: s.description,
            highlights:  JSON.parse(s.highlights) as string[],
          },
        ])
      );
      return {
        domySzeregowe:  bySlug.domySzeregowe  ?? { title: "", subtitle: "", description: "", highlights: [] },
        remontyPodKlucz: bySlug.remontyPodKlucz ?? { title: "", subtitle: "", description: "", highlights: [] },
      };
    }
    return OFFER;
  }),

  getProjects: publicProcedure
    .input(
      z.object({
        status:   statusEnum.optional(),
        category: categoryEnum.optional(),
        limit:    z.number().min(1).max(50).optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const where: { status?: string; category?: string } = {};
        if (input?.status)   where.status   = input.status;
        if (input?.category) where.category = input.category;
        const list = await ctx.db.project.findMany({
          where:    Object.keys(where).length ? where : undefined,
          orderBy:  { createdAt: "desc" },
          take:     input?.limit ?? 50,
        });
        return list.map((p) => ({
          id:          p.id,
          title:       p.title,
          category:    p.category as "domy-szeregowe" | "remonty",
          description: p.description,
          image_url:   p.imageUrl,
          status:      p.status as "W sprzedaży" | "Zakończone",
        }));
      }
      let list = [...PROJECTS];
      if (input?.status)   list = list.filter((p) => p.status   === input.status);
      if (input?.category) list = list.filter((p) => p.category === input.category);
      return list.slice(0, input?.limit ?? list.length);
    }),

  getNews: publicProcedure
    .input(z.object({ limit: z.number().min(1).max(50).optional() }).optional())
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const list = await ctx.db.newsItem.findMany({
          orderBy: { date: "desc" },
          take:    input?.limit ?? 50,
        });
        return list.map((n) => ({
          id:       n.id,
          title:    n.title,
          excerpt:  n.excerpt,
          body:     n.body,
          date:     n.date,
          image_url: n.imageUrl,
        }));
      }
      return NEWS.slice(0, input?.limit ?? NEWS.length);
    }),

  getNewsItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const n = await ctx.db.newsItem.findUnique({ where: { id: input.id } });
        if (!n) return null;
        return {
          id:       n.id,
          title:    n.title,
          excerpt:  n.excerpt,
          body:     n.body,
          date:     n.date,
          image_url: n.imageUrl,
        };
      }
      return NEWS.find((n) => n.id === input.id) ?? null;
    }),

  getUslugi: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      const list = await ctx.db.service.findMany({ orderBy: { order: "asc" } });
      return list.map((s) => s.name);
    }
    return USLUGI;
  }),

  // ─── SiteConfig ────────────────────────────────────────────────────────────
  getSiteConfig: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      const rows = await ctx.db.siteConfig.findMany();
      return Object.fromEntries(rows.map((r) => [r.key, r.value])) as Record<string, string>;
    }
    return SITE_CONFIG_FALLBACK;
  }),

  // ─── FaqItems ────────────────────────────────────────────────────────────
  getFaqItems: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      return ctx.db.faqItem.findMany({ orderBy: { order: "asc" } });
    }
    return [];
  }),

  // ─── ServiceCards ────────────────────────────────────────────────────────
  getServiceCards: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      return ctx.db.serviceCard.findMany({ orderBy: { order: "asc" } });
    }
    return [];
  }),

  // ─── WhyUsItems ──────────────────────────────────────────────────────────
  getWhyUsItems: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      return ctx.db.whyUsItem.findMany({ orderBy: { order: "asc" } });
    }
    return [];
  }),

  getGeoCitations: publicProcedure
    .input(
      z.object({
        category: z
          .enum(["firma", "statystyki", "oferta", "porady", "kontakt"])
          .optional(),
      }).optional()
    )
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const where = input?.category ? { category: input.category } : undefined;
        const list = await ctx.db.geoCitation.findMany({
          where,
          orderBy: [{ category: "asc" }, { order: "asc" }],
        });
        return list.map((g) => ({
          id:       g.id,
          category: g.category as GeoCitationCategory,
          text:     g.text,
          order:    g.order,
        }));
      }
      const all = input?.category
        ? GEO_CITATIONS.filter((g) => g.category === input.category)
        : GEO_CITATIONS;
      return all;
    }),
});
