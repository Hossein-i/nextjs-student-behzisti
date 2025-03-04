import { config } from '@/shared/config';
import { getIronSession, SessionOptions } from 'iron-session';
import { cookies } from 'next/headers';
import { AuthHandler, NextRequestWithSession, UserSession } from '../types';

export const sessionOptions = {
  password: config.SESSION_SECRET,
  cookieName: 'auth-session',
  cookieOptions: {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  },
} as const satisfies SessionOptions;

export const getSession = async () => {
  const cookieStore = await cookies();
  return getIronSession<UserSession>(cookieStore, sessionOptions);
};

export const withSession = (handler: AuthHandler) => {
  const ironSessionHandler = async (
    request: NextRequestWithSession,
    context?: unknown
  ) => {
    const cookieStore = await cookies();
    const session = await getIronSession<UserSession>(
      cookieStore,
      sessionOptions
    );
    request.session = session;
    return handler(request, context);
  };

  return ironSessionHandler;
};
