import { createTrpcRouter } from "./trpc";
import { applicantRouter } from "./routers/applicant";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTrpcRouter({
  applicant: applicantRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
