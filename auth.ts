import { getUserByEmail, getUserById } from "@/db/query/user";

import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import Github from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { LoginSchema } from "@/schemas/login";
import NextAuth from "next-auth";
import { RoleType } from "@/db/schemas";
import authConfig from "@/auth.config";
import bcrypt from "bcryptjs";
import { db } from "@/db/connection";

declare module "next-auth" {
  interface User {
    role?: RoleType;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  ...authConfig,
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          let user = await getUserByEmail(email);

          if (!user || !user?.password) {
            return null;
          }

          const isPasswordMatched = await bcrypt.compare(
            password,
            user.password
          );

          if (isPasswordMatched) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        if (token.role) {
          session.user.role = token.role as RoleType;
        }
      }

      return session;
    },

    async jwt({ token }) {
      if (token.sub) {
        const user = await getUserById(token.sub);

        if (user) {
          token.role = user.role;
        }
      }

      return token;
    },

    async signIn({ user, account }) {

      if (account?.provider === "credentials") {

        if (!user.id) return false;

        const existingUser = await getUserById(user.id);

        if (!existingUser || !existingUser.emailVerified) {
          return false;
        }
      }

      return true;

    },
  },
});

//EDGE Incompatible...
