import type { NextRequest } from 'next/server';
import { NextResponse } from "next/server";
import { createMiddlewareClient } from './lib/utils/createMiddlewareClient';


const protectedPaths = ['/dashboard'];
const publicPaths = ['/signup', '/login']

export const middleware = async (req: NextRequest) => {
    const res = NextResponse.next()
    const pathname = req.nextUrl.pathname

    const supabase = await createMiddlewareClient(req);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user && !publicPaths.includes(pathname)) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (!user && protectedPaths.some(p => pathname.endsWith(p))) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    if (user && pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
}

export const config = {
    matcher: ['/((?!api|_next|images|image|stories|favicon.ico|sitemap.xml|robots.txt).*)'],
}