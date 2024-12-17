import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { checkRateLimit } from '@/lib/security/rate-limit'

export async function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1'
  const ratelimited = await checkRateLimit(ip)
  
  if (!ratelimited) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  // Auth protection
  const token = await getToken({ req: request })
  const isAuth = !!token
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  if (!isAuth && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-based access
  if (isAuth && request.nextUrl.pathname.startsWith('/dashboard')) {
    const userRole = token.role as string
    const isCreatorPath = request.nextUrl.pathname.startsWith('/dashboard/creator')
    const isCompanyPath = request.nextUrl.pathname.startsWith('/dashboard/company')

    if (isCreatorPath && userRole !== 'CREATOR') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (isCompanyPath && userRole !== 'COMPANY') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
    '/register',
    '/api/:path*'
  ],
}
