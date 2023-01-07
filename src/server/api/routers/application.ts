import { z } from "zod";
import crypto from "crypto";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

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
        const response = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY}&response=${input.token}`,
          {
            method: "POST",
          }
        );

        const data = await response.json();

        if (!data.success) {
          return Error("Recaptcha failed");
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

        const verificationToken =
          await ctx.prisma.applicantVerificationToken.create({
            data: {
              applicantId: application.id,
              token: crypto.randomBytes(32).toString("hex"),
            },
          });

        await sendConfirmationEmail(user.email);
        return application;
      } catch (err) {
        console.log(err);
      }
    }),
  getApplication: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const applicant = await ctx.prisma.applicant.findFirst({
          where: { id: input.id },
        });
        return applicant;
      } catch (err) {
        console.log(err);
      }
    }),
  getAllApplications: protectedProcedure.query(async ({ ctx }) => {
    try {
      const applicants = await ctx.prisma.applicant.findMany({
        where: { verified: true },
      });
      return applicants;
    } catch (err) {
      console.log(err);
    }
  }),
});
