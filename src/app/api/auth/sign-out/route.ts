import { withSession } from '@/features/auth/api';
import { defaultAuthRedirect } from '@/features/auth/constants';
import { NextResponse } from 'next/server';

const handler = withSession((request) => {
  const url = new URL(defaultAuthRedirect, request.nextUrl.origin);

  request.session.destroy();

  return NextResponse.redirect(url);
});

export { handler as DELETE, handler as GET };
