import { auth } from '@/shared/config/auth';

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ tid: string; index: string }> }
) => {
  try {
    const { tid, index } = await params;

    const session = await auth();
    const token = session?.user.token;

    const headers = new Headers(request.headers);

    headers.delete('host');

    if (token) headers.set('token', token);

    const url = `http://nodejs.behzisti.net:3500/view/${tid}/${index}?date=${Date.now()}`;
    const response = await fetch(url, { headers });

    if (!response.ok) {
      return new Response('Image not found', { status: 404 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new Response(await response.arrayBuffer(), {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch image', { status: 500 });
  }
};
