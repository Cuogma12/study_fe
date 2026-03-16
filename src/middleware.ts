import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'vi'],

  // Used when no locale matches
  defaultLocale: 'vi',

  // If this is set to 'always', the locale will always be present in the URL.
  // E.g. /login -> /vi/login
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_static (inside /public)
  // - /_vercel (Vercel internals)
  // - all files (e.g. favicon.ico, sitemap.xml, robots.txt, etc.)
  matcher: ['/((?!api|_next|_static|_vercel|.*\\..*).*)']
};
