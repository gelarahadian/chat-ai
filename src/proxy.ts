import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

     const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
     const isProtectedPage =
       req.nextUrl.pathname.startsWith("/chat") ||
       req.nextUrl.pathname.startsWith("/dashboard");

         if (token && isAuthPage) {
           return NextResponse.redirect(new URL("/chat", req.url));
         }

         if (!token && isProtectedPage) {
           return NextResponse.redirect(new URL("/auth/sign-in", req.url));
         }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/:path*", "/chat/:path*", "/dashboard/:path*"],
}