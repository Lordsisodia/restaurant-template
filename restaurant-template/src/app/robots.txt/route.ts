const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function GET() {
  const sitemapUrl = `${baseUrl.replace(/\/$/, '')}/sitemap.xml`;
  const body = `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
