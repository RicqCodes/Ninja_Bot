import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select(`is_onboarded`)
    .eq("id", user?.id)
    .single();
  const protectedRoutes = [
    "/dashboard",
    "/swap",
    "/snipper",
    "/wallet",
    "/settings",
  ];

  // if user is not signed in and they are in any of the protected routes, redirect them to '/'
  if (!user && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // if user is signed in and they are in '/', redirect them to '/dashboard'
  if (user && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/wallet",
    "/swap",
    "/onboard",
    "/snipper",
    "/settings",
  ],
};
