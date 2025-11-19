import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & { token?: string };
  }

  interface User {
    token?: string;
    // role?: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token?: string;
    // role?: UserRole;
  }
}
