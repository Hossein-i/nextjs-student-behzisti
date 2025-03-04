import { authMiddleware } from './features/auth/api';

export default authMiddleware();

export const config = { matcher: [{ source: '/((?!api|_next|.*\\..*).*)' }] };
