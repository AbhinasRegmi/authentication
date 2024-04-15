import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {NextResponse} from "next/server";
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from "@/routes";

const {auth: middleware} = NextAuth(authConfig);

export default middleware((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthPrefixRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthPrefixRoute){
    return NextResponse.next();
  }

  if(isAuthRoute){
    if(isLoggedIn){
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, req.url)
      )
    }

    return NextResponse.next();
  }

  if(!isLoggedIn && !isPublicRoute){
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    )
  }

  return NextResponse.next();

})


export const config = {
    matcher: [
      "/((?!.+\\.[\\w]+$|_next).*)",
      "/(api|trpc)(.*)"
    ]
  };