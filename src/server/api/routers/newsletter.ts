import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const newsletterRouter = createTrpcRouter({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const subscriber = await ctx.prisma.newsletterSubscriber.create({
          data: {
            email: input.email,
          },
        });

        return subscriber;
      } catch (err) {
        console.log(err);
      }
    }),
  unsubscribe: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const subscriber = await ctx.prisma.newsletterSubscriber.delete({
          where: {
            email: input.email,
          },
        });

        return subscriber;
      } catch (err) {
        console.log(err);
      }
    }),
});
