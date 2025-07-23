import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { verifyJWT } from '@/lib/auth';
import { verifyJWT } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {

    const token = request.cookies.get('auth_token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.redirect(new URL('/login?redirect=/admin', request.url));
    }

    const decoded =await verifyJWT(token);
    console.log("request headers", decoded)

    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};