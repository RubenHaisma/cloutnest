import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Skip static files (e.g., images, CSS, JS, fonts) and API requests
  if (
    url.pathname.startsWith("/_next") || // Next.js internals
    url.pathname.startsWith("/api") || // API routes
    url.pathname.startsWith("/static") || // Static files
    /\.(.*)$/.test(url.pathname) // Files with extensions (e.g., .png, .css)
  ) {
    return NextResponse.next();
  }

  // Redirect all other requests to /construction
  if (!url.pathname.startsWith("/construction")) {
    return NextResponse.redirect(new URL("/construction", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Match all paths
};
