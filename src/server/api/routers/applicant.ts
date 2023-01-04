import { z } from "zod";
import crypto from "crypto";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

export const applicantRouter = createTrpcRouter({
  createApplicant: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        why: z.string(),
        token: z.string(),
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


        const applicant = await ctx.prisma.applicant.create({
          data: {
            name: input.name,
            email: input.email,
            why: input.why,
          },
        });

        const verificationToken =
          await ctx.prisma.applicantVerificationToken.create({
            data: {
              applicantId: applicant.id,
              token: crypto.randomBytes(32).toString("hex"),
            },
          });

        await sendVerificationEmail(applicant.email, verificationToken.token);
        return applicant;
      } catch (err) {
        console.log(err);
      }
    }),
  getApplicant: publicProcedure
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
  getAllVerifiedApplicants: protectedProcedure
    .query(async ({ ctx }) => {
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
