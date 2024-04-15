import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
  const isLoggedIn = !!req.auth;

  console.log(isLoggedIn);
})


export const config = {
    matcher: [
      "/((?!.+\\.[\\w]+$|_next).*)",
      "/(api|trpc)(.*)"
    ]
  };