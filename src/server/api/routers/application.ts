import { z } from "zod";
import crypto from "crypto";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";
import { sendConfirmationEmail } from "../../../utils/sendConfirmationEmail";

export const applicationRouter = createTrpcRouter({
  createApplication: publicProcedure
    .input(
      z.object({
        userId: z.string(),
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

        const application = await ctx.prisma.application.create({
          data: {
            userId: input.userId,
            dropId: input.dropId,
            why: input.why,
          },
        });

        const user = await ctx.prisma.user.findFirst({
          where: { id: input.userId },
        });

        //update user to have applied to drop
        await ctx.prisma.user.update({
          where: { id: input.userId },
          data: {
            applications: {
              connect: {
                id: application.id,
              },
            },
          },
        });

        if (!user) {
          throw new Error("User does not exist");
        }

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
});
