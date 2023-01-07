import { createTrpcRouter } from "./trpc";
import { applicationRouter } from "./routers/application";
import { dropRouter } from "./routers/drop";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTrpcRouter({
  application: applicationRouter,
  drop: dropRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
