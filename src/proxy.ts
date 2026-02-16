import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/chat", "/dashboard", "/settings", "/profile"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthPage = pathname.startsWith("/auth");

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url));
  }
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*", "/auth/:path*", "/chat/:path*", "/dashboard/:path*"],
};