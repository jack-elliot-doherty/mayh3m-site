import { createTrpcRouter } from "./trpc";
import { applicationRouter } from "./routers/application";
import { dropRouter } from "./routers/drop";
import { newsletterRouter } from "./routers/newsletter";
import { userRouter } from "./routers/user";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTrpcRouter({
  application: applicationRouter,
  drop: dropRouter,
  newsletter: newsletterRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
