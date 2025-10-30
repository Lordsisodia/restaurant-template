import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Supabase Auth Middleware
 *
 * Handles route protection and session management
 */
export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Define auth routes
  const isAuthRoute = pathname.startsWith('/auth/');

  // Define protected routes
  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isProtectedRoute = isAdminRoute || isDashboardRoute || isAdminApiRoute;

  // Redirect non-logged-in users to sign-in page or block API access
  if (isAdminApiRoute && !user) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Admin session required' },
      { status: 401 },
    );
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';
    url.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(url);
  }

  // Role-based access for admin routes
  if (isAdminRoute && user) {
    // Get user role from database (you'll implement this)
    // For now, we'll check if user exists
    // TODO: Implement role checking with RLS
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
