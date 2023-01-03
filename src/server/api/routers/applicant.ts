import { z } from "zod";
import crypto from "crypto";
import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

export const applicantRouter = createTrpcRouter({
  createApplicant: publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), why: z.string() }))
    .mutation(async ({ input, ctx }) => {
      try {
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
});
