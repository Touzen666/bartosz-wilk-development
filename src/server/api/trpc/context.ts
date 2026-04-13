import "server-only";
import { db } from "~/server/db";

export const createTRPCContext = async () => ({ db });
