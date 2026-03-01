import "server-only";
import { db } from "~/server/db";

/** Gdy DATABASE_URL i USE_DATABASE są ustawione, procedury content używają Prisma zamiast content.ts */
export const createTRPCContext = async () => ({
  db: process.env.USE_DATABASE === "true" ? db : null,
});
