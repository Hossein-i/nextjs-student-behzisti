import { NextRequest, NextResponse } from 'next/server';

import { config } from '@/shared/config';
import { auth } from '@/shared/config/auth';

export const POST = async (request: NextRequest) => {
  const session = await auth();
  const token = session?.user.token;

  const headers = new Headers(request.headers);

  headers.delete('host');
  headers.delete('content-length');

  if (token) headers.set('token', token);

  const upstream = await fetch(config.GQL_URL, {
    method: 'POST',
    headers,
    body: request.body,
    // @ts-expect-error I know it!
    duplex: 'half',
  });

  const response = new NextResponse(upstream.body, {
    status: upstream.status,
  });

  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'content-encoding') {
      response.headers.set(key, value);
    }
  });

  return response;
};
