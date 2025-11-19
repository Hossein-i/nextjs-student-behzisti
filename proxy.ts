import { defineAuthMiddleware } from './src/shared/middleware/auth';

const authMiddleware = defineAuthMiddleware({
  routes: {
    auth: [
      { path: '/' },
      { path: '/auth' },
      { path: '/auth/sign-up' },
      { path: '/auth/forget-password' },
    ],
    protected: [{ path: '/my/*' }],
    fallback: {
      loginRedirect: '/my/dashboard',
      authRedirect: '/auth',
      accessDeniedRedirect: '/access-denied',
      logoutRedirect: '/auth/sign-out',
    },
  },
  cookieNames: {
    callbackUrl: 'callback_url',
  },
});

export const proxy = authMiddleware();

export const config = { matcher: [{ source: '/((?!api|_next|.*\\..*).*)' }] };
