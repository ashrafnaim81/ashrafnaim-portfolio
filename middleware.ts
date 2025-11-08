import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Check if user is accessing admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // Allow access to login page
      if (req.nextUrl.pathname === '/admin/login') {
        return NextResponse.next();
      }

      // Check if user is authenticated
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }

      // Check if user has admin role
      if (req.nextauth.token.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page without token
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        // Require token for other admin pages
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
};
