import { z } from "zod";

import { createTrpcRouter, publicProcedure, protectedProcedure } from "../trpc";

export const applicantRouter = createTrpcRouter({
  createApplicant: publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), why: z.string() }))
    .mutation(({ input, ctx }) => {
      
      ctx.prisma.applicant.create({
        data: {
          name: input.name,
          email: input.email,
          why: input.why,
        },
      });

      return {status: "success"};
      
    }),
});
