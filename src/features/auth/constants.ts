/**
 * The default redirect authentication path
 *
 * @type {string}
 */
export const defaultAuthRedirect: string = '/';

/**
 * An array of routes that are used for authentication These routes will
 * redirect logged in users to /
 *
 * @type {string[]}
 */
export const defaultAuthRoutes: string[] = ['/', '/auth', '/auth/sign-up'];

/**
 * The name of the cookie used to store the callback URL. This cookie is used
 * when the user returns to the page they came from after authentication.
 *
 * @type {string}
 */
export const defaultCookieName: string = 'callback-url';

/**
 * The default redirect path after logging in
 *
 * @type {string}
 */
export const defaultLoginRedirect: string = '/my/dashboard';

/**
 * A set of routes that are available to the private These paths require
 * authentication
 *
 * @type {string[]}
 */
export const defaultPrivateRoutes: string[] = [
  '/auth/new',
  '/auth/sign-out',
  '/my/*',
];
