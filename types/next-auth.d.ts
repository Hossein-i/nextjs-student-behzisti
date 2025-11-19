import type { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

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
