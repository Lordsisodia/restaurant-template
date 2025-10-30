export const CORE_PUBLIC_ROUTES = [
  '/',
  '/menu',
  '/membership',
  '/reviews',
  '/chat',
  '/about',
  '/our-story',
  '/blog',
] as const;

export const CORE_PUBLIC_SLUGS = CORE_PUBLIC_ROUTES.map((path) =>
  path === '/' ? 'home' : path.replace(/^\//, ''),
);
