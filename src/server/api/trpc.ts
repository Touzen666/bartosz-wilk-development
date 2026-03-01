import type { PrismaClient } from "@prisma/client";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

export type Context = { db: PrismaClient | null };

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
