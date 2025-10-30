import { CORE_PUBLIC_ROUTES } from '@/lib/siteRoutes';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export const revalidate = 3600;

export function GET() {
  const uniqueRoutes = Array.from(new Set(CORE_PUBLIC_ROUTES));
  const urls = uniqueRoutes
    .map((path) => {
      const loc = `${baseUrl.replace(/\/$/, '')}${path}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
