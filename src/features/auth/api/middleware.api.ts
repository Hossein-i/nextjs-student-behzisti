import { NextResponse } from 'next/server';
import {
  defaultAuthRedirect,
  defaultAuthRoutes,
  defaultCookieName,
  defaultLoginRedirect,
  defaultPrivateRoutes,
} from '../constants';
import { checkRoute } from '../lib';
import { AuthHandler, AuthMiddlewareConfig } from '../types';
import { withSession } from './session.api';

const defaultAuthMiddlewareConfig = {
  authRedirect: defaultAuthRedirect,
  authRoutes: defaultAuthRoutes,
  cookieName: defaultCookieName,
  loginRedirect: defaultLoginRedirect,
  privateRoutes: defaultPrivateRoutes,
} as const satisfies AuthMiddlewareConfig;

export const authMiddleware = (
  next?: AuthHandler,
  config?: Partial<AuthMiddlewareConfig>
) => {
  const { authRedirect, authRoutes, cookieName, loginRedirect, privateRoutes } =
    {
      ...defaultAuthMiddlewareConfig,
      ...config,
    };

  return withSession(async (request) => {
    const response = (await next?.(request)) || NextResponse.next();

    const { origin, pathname } = request.nextUrl;

    const isLoggedIn = !!request.session.user;

    if (isLoggedIn) {
      const isAuthRoute = authRoutes.some((route) =>
        checkRoute({ pathname, route })
      );

      const callbackUrl = request.cookies.get(cookieName)?.value;

      if (callbackUrl && callbackUrl === pathname) {
        response.cookies.delete(cookieName);
      }

      if (isAuthRoute) {
        const newUrl = new URL(
          callbackUrl ? callbackUrl : loginRedirect,
          origin
        );

        return NextResponse.redirect(newUrl, { headers: response.headers });
      } else {
        return response;
      }
    } else {
      const isPrivateRoutes = privateRoutes.some((route) =>
        checkRoute({ pathname, route })
      );

      if (isPrivateRoutes) {
        const newUrl = new URL(authRedirect, origin);
        const isPrefetch = request.headers.get('next-router-prefetch') === '1';

        if (!isPrefetch || pathname !== '/auth/sign-out') {
          response.cookies.set(cookieName, pathname, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
          });
        }

        return NextResponse.redirect(newUrl, { headers: response.headers });
      } else {
        return response;
      }
    }
  });
};
