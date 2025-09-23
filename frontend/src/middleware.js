import { NextResponse } from "next/server";

const AUTH_ROUTES = ["/", "/login", "/register", "/verify-email"];
const PRIVATE_ROUTES = ["/dashboard", "/settings"];

export function middleware(req) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  // read cookie safely
  const rawCookie = req.cookies.get("accessToken");
  const token =
    rawCookie && typeof rawCookie === "object" && "value" in rawCookie
      ? rawCookie.value
      : rawCookie;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isPrivateRoute = PRIVATE_ROUTES.some((r) => pathname.startsWith(r));

  // logged in, trying to access login/register/verify-email/home → redirect to dashboard
  if (token && isAuthRoute) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // not logged in, trying to access private routes → redirect to login
  if (!token && isPrivateRoute) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  //  all good → continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/", // home
    "/login",
    "/register",
    "/verify-email",
    "/dashboard/:path*",
    "/settings/:path*",
  ],
};
