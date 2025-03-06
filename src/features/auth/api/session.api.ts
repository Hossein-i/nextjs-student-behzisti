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
  const session = await getIronSession<UserSession>(
    cookieStore,
    sessionOptions
  );
  return session;
};

export const withSession = (handler: AuthHandler) => {
  const ironSessionHandler = async (
    request: NextRequestWithSession,
    context?: unknown
  ) => {
    const session = await getSession();
    request.session = session;
    return handler(request, context);
  };

  return ironSessionHandler;
};
