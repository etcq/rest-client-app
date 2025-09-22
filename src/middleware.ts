import { auth } from '@/auth/auth';

const authPaths = ['login', 'registration'];
const privatePaths = ['rest', 'variables', 'history'];

export default auth((req) => {
  const [, locale, path] = req.nextUrl.pathname.split('/');

  if (!req.auth && privatePaths.includes(path)) {
    const newUrl = new URL(`/${locale}`, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && authPaths.includes(path)) {
    const newUrl = new URL(`/${locale}`, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
