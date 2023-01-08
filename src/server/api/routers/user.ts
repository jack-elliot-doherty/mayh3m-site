import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = createTrpcRouter({
  getUser: protectedProcedure.query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
    });
    return user;
  }),
  deleteUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const user = await ctx.prisma.user.delete({
          where: { id: input.id },
        });
        return user;
      } catch (err) {
        console.log(err);
      }
    }),
  hasUSerApplied: protectedProcedure
    .input(
      z.object({
        dropId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          id: ctx.session.user.id,
          applications: {
            some: {
              dropId: input.dropId,
            },
          },
        },
      });
      console.log(user);

      if (user) {
        return true;
      }
      return false;
    }),
});
