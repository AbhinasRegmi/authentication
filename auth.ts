import NextAuth from "next-auth";
import { db } from "@/db/connection";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import authConfig from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import { LoginSchema } from "@/schemas/login";
import { getUserByEmail } from "@/db/query/user";
import bcrypt from "bcryptjs";


export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(
  {
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
      Credentials({
        async authorize(credentials) {
          const validatedFields = LoginSchema.safeParse(credentials);

          if (validatedFields.success) {
            const { email, password } = validatedFields.data;
            const user = await getUserByEmail(email);

            if (!user || !user?.password) {
              return null;
            }

            const isPasswordMatched = await bcrypt.compare(password, user.password);

            if (isPasswordMatched) {
              return user;
            }

          }

          return null;
        }
      })
    ]
  }
);

//EDGE Incompatible...