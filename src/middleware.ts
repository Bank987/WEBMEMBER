import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)',
    '/favicon.ico',
  ],
};

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;
  
  // Get hostname of request (e.g. thunder.localhost:3000)
  let hostname = req.headers.get('host') || 'localhost:3000';

  // Remove port if present for processing
  hostname = hostname.split(':')[0];

  // Define our root domains
  // In production, this should be process.env.NEXT_PUBLIC_ROOT_DOMAIN
  const isLocalhost = hostname === 'localhost' || hostname.endsWith('.localhost');
  const rootDomain = isLocalhost ? 'localhost' : (process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'lastname.site');

  const currentHost = hostname;

  // Handle local development subdomains
  // For local testing, we might use thunder.localhost:3000 
  // and the hostname will be 'thunder.localhost'
  
  let isTenant = false;
  let tenantKey = '';

  if (currentHost === rootDomain || currentHost === `www.${rootDomain}`) {
    isTenant = false;
  } else {
    isTenant = true;
    if (currentHost.endsWith(`.${rootDomain}`)) {
      tenantKey = currentHost.replace(`.${rootDomain}`, '');
    } else {
      // Custom Domain (e.g., xxx.com or www.xxx.com)
      tenantKey = currentHost.replace(/^www\./, '');
    }
  }

  // 1. Root Domain -> Route to marketing/home page
  if (!isTenant) {
    if (url.pathname === '/favicon.ico') {
      return NextResponse.next();
    }
    // Let admin routes pass through normally without rewrite
    if (url.pathname.startsWith('/admin')) {
      return NextResponse.next();
    }
    // We rewrite to /home path which contains our landing page
    return NextResponse.rewrite(new URL(`/home${url.pathname}`, req.url));
  }

  // 2. Tenant Subdomain or Custom Domain -> Route to tenant pages
  if (url.pathname === '/favicon.ico') {
    const response = NextResponse.rewrite(new URL(`/${tenantKey}/favicon`, req.url));
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    return response;
  }
  const response = NextResponse.rewrite(new URL(`/${tenantKey}${url.pathname === '/' ? '' : url.pathname}`, req.url));
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  return response;
}
