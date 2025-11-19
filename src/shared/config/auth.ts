import NextAuth, { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { signInDocument, type SignInMutation } from '../api/graphql';

import { config } from '.';

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.token = token.token;
      }

      return session;
    },
  },
  pages: { signIn: '/auth', signOut: '/auth/sign-out', error: '/auth/error' },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: {
          type: 'text',
          label: 'Username',
        },
        password: {
          type: 'password',
          label: 'Password',
        },
      },
      authorize: async (credentials) => {
        let user: User | null = null;

        const { username, password } = credentials as Record<
          'username' | 'password',
          string
        >;

        const { data, errors } = (await fetch(config.GQL_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            operationName: 'signIn',
            variables: { dto: { username, password } },
            query: signInDocument.loc?.source.body,
          }),
        }).then((response) => response.json())) as {
          data: SignInMutation | null;
          errors: { message: string }[] | null;
        };

        if (errors || !data || !data.Login.token)
          throw new Error(
            errors?.map(({ message }) => message).join(', ') ||
              'Invalid credentials.'
          );

        const { id, token, firstName, lastName } = data.Login;

        user = {
          id,
          name: [firstName, lastName].join(' '),
          token,
        };

        return user;
      },
    }),
  ],
});
