import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OFFER, PROJECTS, NEWS, USLUGI } from "~/data/content";

const statusEnum = z.enum(["W sprzedaży", "Zakończone"]);
const categoryEnum = z.enum(["domy-szeregowe", "remonty"]);

export const contentRouter = createTRPCRouter({
  getOffer: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      const sections = await ctx.db.offerSection.findMany({
        orderBy: { slug: "asc" },
      });
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
        domySzeregowe: bySlug.domySzeregowe ?? {
          title: "",
          subtitle: "",
          description: "",
          highlights: [],
        },
        remontyPodKlucz: bySlug.remontyPodKlucz ?? {
          title: "",
          subtitle: "",
          description: "",
          highlights: [],
        },
      };
    }
    return OFFER;
  }),

  getProjects: publicProcedure
    .input(
      z
        .object({
          status: statusEnum.optional(),
          category: categoryEnum.optional(),
          limit: z.number().min(1).max(20).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const where: { status?: string; category?: string } = {};
        if (input?.status) where.status = input.status;
        if (input?.category) where.category = input.category;
        const list = await ctx.db.project.findMany({
          where: Object.keys(where).length ? where : undefined,
          orderBy: { createdAt: "desc" },
          take: input?.limit ?? 50,
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
      let list = [...PROJECTS];
      if (input?.status) list = list.filter((p) => p.status === input.status);
      if (input?.category) list = list.filter((p) => p.category === input.category);
      const limit = input?.limit ?? list.length;
      return list.slice(0, limit);
    }),

  getNews: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(50).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const list = await ctx.db.newsItem.findMany({
          orderBy: { date: "desc" },
          take: input?.limit ?? 50,
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
      const limit = input?.limit ?? NEWS.length;
      return NEWS.slice(0, limit);
    }),

  getNewsItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (ctx.db) {
        const n = await ctx.db.newsItem.findUnique({ where: { id: input.id } });
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
      return NEWS.find((n) => n.id === input.id) ?? null;
    }),

  getUslugi: publicProcedure.query(async ({ ctx }) => {
    if (ctx.db) {
      const list = await ctx.db.service.findMany({ orderBy: { order: "asc" } });
      return list.map((s) => s.name);
    }
    return USLUGI;
  }),
});
