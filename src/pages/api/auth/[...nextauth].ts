import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: parseInt(env.EMAIL_SERVER_PORT, 10),
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      // sendVerificationRequest(params) {},
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: env.JWT_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
