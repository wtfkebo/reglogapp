import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/token';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Paths that require authentication
    if (pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('auth_token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const payload = await verifyJWT(token);

        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Paths that are for guests only (redirect if logged in)
    if (pathname === '/login' || pathname === '/register') {
        const token = request.cookies.get('auth_token')?.value;

        if (token) {
            const payload = await verifyJWT(token);
            if (payload) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'],
};
