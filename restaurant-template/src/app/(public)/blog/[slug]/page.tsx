export const revalidate = 60;

import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { getPostBySlug } from '@/domains/customer-facing/blog/shared/server';
import { findSamplePostBySlug } from '@/domains/customer-facing/blog/shared/data/samplePosts';
import BlogPostPage from '@/domains/customer-facing/blog/pages/BlogPostPage';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const tenant = await getTenantFromRequest();
  const supabasePost = await getPostBySlug(slug).catch(() => null);
  const post = supabasePost ?? findSamplePostBySlug(slug) ?? null;

  const site = tenant.displayName || 'Our Restaurant';
  const title = post ? `${post.title} | ${site}` : `Blog | ${site}`;
  const description = post?.excerpt || `Stories and updates from ${site}.`;
  const url = `/blog/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: post?.imageUrl ? [{ url: post.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post?.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const tenant = await getTenantFromRequest();
  const supabasePost = await getPostBySlug(slug).catch(() => null);
  const post = supabasePost ?? findSamplePostBySlug(slug) ?? null;
  if (!post) return notFound();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.publishedAt ?? post.createdAt,
    image: post.imageUrl || undefined,
  };
  return (
    <>
      <BlogPostPage post={post as any} tenant={tenant as any} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
