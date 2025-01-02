import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || 
                     request.nextUrl.pathname.startsWith("/register");

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Handle onboarding redirection
  if (token && request.nextUrl.pathname.startsWith("/dashboard")) {
    const response = await fetch(`${request.nextUrl.origin}/api/profile`, {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    });
    const profile = await response.json();

    if (!profile?.onboardingComplete) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/onboarding"],
};