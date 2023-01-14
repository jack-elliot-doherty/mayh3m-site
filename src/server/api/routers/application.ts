import { z } from "zod";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendConfirmationEmail } from "../../../utils/sendConfirmationEmail";

export const applicationRouter = createTrpcRouter({
  createApplication: protectedProcedure
    .input(
      z.object({
        dropId: z.string(),
        why: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const drop = await ctx.prisma.drop.findFirst({
          where: { id: input.dropId },
        });

        if (!drop) {
          throw new Error("Drop does not exist");
        }

        // check if user has already applied to drop
        let user = await ctx.prisma.user.findFirst({
          where: {
            id: ctx.session.user.id,
            applications: {
              some: {
                dropId: input.dropId,
              },
            },
          },
        });

        // if user has already applied to drop, throw error
        if (user) {
          throw new Error("User has already applied to drop");
        }

        user = await ctx.prisma.user.findFirst({
          where: { id: ctx.session.user.id },
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const application = await ctx.prisma.application.create({
          data: {
            userId: ctx.session.user.id,
            dropId: input.dropId,
            why: input.why,
          },
        });

        //update user to have applied to drop
        await ctx.prisma.user.update({
          where: { id: ctx.session.user.id },
          data: {
            applications: {
              connect: {
                id: application.id,
              },
            },
          },
        });

        await sendConfirmationEmail(user.email, drop.name);
        return application;
      } catch (err) {
        console.log(err);
      }
    }),
  getApplication: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const applicant = await ctx.prisma.application.findFirst({
          where: { id: input.id },
        });
        return applicant;
      } catch (err) {
        console.log(err);
      }
    }),
  getAllApplicationsByDrop: protectedProcedure
    .input(z.object({ dropId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const applications = await ctx.prisma.application.findMany({
          where: { dropId: input.dropId },
        });
        return applications;
      } catch (err) {
        console.log(err);
      }
    }),
  getAllApplications: protectedProcedure.query(async ({ ctx }) => {
    try {
      const applications = await ctx.prisma.application.findMany();
      return applications;
    } catch (err) {
      console.log(err);
    }
  }),
  updateApplication: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const application = await ctx.prisma.application.update({
          where: { id: input.id },
          data: { status: input.status },
        });
        return application;
      } catch (err) {
        console.log(err);
      }
    }),
});
