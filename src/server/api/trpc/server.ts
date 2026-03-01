import "server-only";
import { createTRPCContext } from "./context";
import { appRouter } from "~/server/api/root";

export const createCaller = async () => {
  const ctx = await createTRPCContext();
  return appRouter.createCaller(ctx);
};

export type ServerCaller = Awaited<ReturnType<typeof createCaller>>;
