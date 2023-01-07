import { z } from "zod";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";

export const dropRouter = createTrpcRouter({
  getDrops: publicProcedure.query(async ({ ctx }) => {
    const drops = await ctx.prisma.drop.findMany();
    return drops;
  }),
  getDrop: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const drop = await ctx.prisma.drop.findFirst({
        where: { id: input.id },
      });
      return drop;
    }),
  createDrop: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const drop = await ctx.prisma.drop.create({
          data: {
            name: input.name,
            description: input.description,
            image: input.image,
          },
        });
        return drop;
      } catch (err) {
        console.log(err);
      }
    }),
  updateDrop: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const drop = await ctx.prisma.drop.update({
          where: { id: input.id },
          data: {
            name: input.name,
            description: input.description,
            image: input.image,
          },
        });
        return drop;
      } catch (err) {
        console.log(err);
      }
    }),
  deleteDrop: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
        const drop = await ctx.prisma.drop.delete({
          where: { id: input.id },
        });
        return drop;
      } catch (err) {
        console.log(err);
      }
    }),
});
