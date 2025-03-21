import type { SignUpMutationVariables } from '@/shared/api/graphql';
import type { IronSession } from 'iron-session';
import type { NextRequest, NextResponse } from 'next/server';

export interface UserSession {
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    token: string;
  };
}

export interface AuthMiddlewareConfig {
  authRedirect: string;
  authRoutes: Array<string>;
  cookieName: string;
  loginRedirect: string;
  privateRoutes: Array<string>;
}

export type NextRequestWithSession = NextRequest & {
  session: IronSession<UserSession>;
};

export type AuthHandler = (
  // eslint-disable-next-line no-unused-vars
  request: NextRequestWithSession,
  // eslint-disable-next-line no-unused-vars
  context?: unknown
) => NextResponse | Promise<NextResponse>;

export type SignUpVariables = Pick<
  SignUpMutationVariables['dto'],
  'person' | 'address' | 'university'
>;
