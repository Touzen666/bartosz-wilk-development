import "server-only";
import { db } from "~/server/db";

/** Gdy USE_DATABASE=true procedury używają Prisma, w przeciwnym razie fallback na content.ts */
export const createTRPCContext = async () => ({
  db: process.env.USE_DATABASE === "true" ? db : null,
});
