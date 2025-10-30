export const revalidate = 60;

import React from 'react';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { listPosts, type BlogPost as DataBlogPost } from '@/domains/customer-facing/blog/shared/server';
import { getSamplePosts } from '@/domains/customer-facing/blog/shared/data/samplePosts';
import BlogPageClient from '@/domains/customer-facing/blog/pages/BlogPage';
import type { Metadata } from 'next';

// Basic SEO for the blog landing; refined later as needed
export async function generateMetadata(): Promise<Metadata> {
  const tenant = await getTenantFromRequest();
  const site = tenant.displayName || 'Our Restaurant';
  const title = `Blog | ${site}`;
  const description = `Stories, updates, and kitchen notes from ${site}.`;
  const url = `/blog`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

function toClientPost(p: DataBlogPost) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    publishedAt: p.publishedAt,
    createdAt: p.createdAt,
    category: p.category ?? undefined,
    imageUrl: p.imageUrl ?? undefined,
    readTime: p.readTime ?? undefined,
  } as const;
}

export default async function Page() {
  const tenant = await getTenantFromRequest();

  let posts = getSamplePosts().map(toClientPost);
  try {
    const rows = await listPosts();
    if (rows.length > 0) {
      posts = rows.map(toClientPost);
    }
  } catch {
    // Keep fallback sample posts
  }

  const categories = Array.from(new Set(posts.map((p) => p.category).filter(Boolean))) as string[];

  const siteName = tenant.displayName || 'Our Restaurant';
  const firstThree = posts.slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteName} Blog`,
    blogPost: firstThree.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      datePublished: p.publishedAt ?? p.createdAt,
      image: p.imageUrl || undefined,
    })),
  };

  return (
    <div className="min-h-screen bg-black">
      <BlogPageClient posts={posts as any} tenant={tenant as any} categories={categories} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
