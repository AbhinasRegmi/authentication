import NextAuth from "next-auth";
import {db} from "@/db/connection";
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import authConfig from "@/auth.config";

export const {handlers: {GET, POST}, auth} = NextAuth(
  {
    adapter: DrizzleAdapter(db),
    session: {
      strategy: "jwt",
    },
    ...authConfig
  }
);

// NOT EDGE Compatable...