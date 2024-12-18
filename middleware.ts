import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Public paths that don't require authentication
    if (["/", "/login", "/signup", "/privacy", "/terms"].includes(path)) {
      return NextResponse.next();
    }

    // Require authentication
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Handle role-based routing for dashboard
    if (path.startsWith("/dashboard")) {
      const role = token.role as string;
      const isArtistPath = path.startsWith("/dashboard/artist");
      const isCuratorPath = path.startsWith("/dashboard/curator");

      // If no specific dashboard is specified, redirect to role-specific dashboard
      if (path === "/dashboard") {
        return NextResponse.redirect(
          new URL(`/dashboard/${role}`, req.url)
        );
      }

      // Redirect if user tries to access wrong dashboard
      if (role === "artist" && isCuratorPath) {
        return NextResponse.redirect(
          new URL("/dashboard/artist", req.url)
        );
      }
      if (role === "curator" && isArtistPath) {
        return NextResponse.redirect(
          new URL("/dashboard/curator", req.url)
        );
      }
    }

    // Handle role-based API access
    if (path.startsWith("/api")) {
      const role = token.role as string;
      
      // Protect curator-specific endpoints
      if (path.startsWith("/api/curator") && role !== "curator") {
        return NextResponse.json(
          { error: "Unauthorized: Curator access required" },
          { status: 403 }
        );
      }

      // Protect artist-specific endpoints
      if (path.startsWith("/api/artist") && role !== "artist") {
        return NextResponse.json(
          { error: "Unauthorized: Artist access required" },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/api/curator/:path*",
    "/api/artist/:path*",
    "/api/analytics/:path*",
  ],
};
