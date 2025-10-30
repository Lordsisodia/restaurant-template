'use client';

/**
 * Customer-Facing Blog List Page
 *
 * This page renders domain sections instead of ad-hoc template wiring.
 * Variant selection can be driven by tenant config (future enhancement).
 */

import { useMemo, useState } from 'react';
import type { HeroContent } from '../sections/hero-section';
import { HeroRenderer } from '../sections/hero-section';
import { ListingRenderer, type ListingContent, type ListingPost } from '../sections/listing-section';
import type { CategoriesContent } from '../sections/categories-section';
import { CategoriesRenderer } from '../sections/categories-section';

interface BlogPageProps {
  posts?: any[];
  tenant?: any;
  categories?: string[];
}

export default function BlogPage({ posts, tenant, categories = [] }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Normalize posts to avoid runtime errors if not provided
  const safePosts = Array.isArray(posts) ? posts : [];

  // Extract categories from posts if not provided
  const postCategories = categories.length > 0
    ? categories
    : Array.from(new Set(safePosts.map(p => p?.category).filter(Boolean)));

  // Filter posts by category
  const filteredPosts = useMemo(() => (
    activeCategory === 'all'
      ? safePosts
      : safePosts.filter(post => post?.category === activeCategory)
  ), [activeCategory, safePosts]);

  const toListingPost = (post: any): ListingPost => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    category: post.category ?? undefined,
    imageUrl: post.imageUrl ?? undefined,
    readTimeMinutes: post.readTime ?? undefined,
    publishedAt: post.publishedAt ?? undefined,
    createdAt: post.createdAt,
  });

  const heroContent: HeroContent = useMemo(() => {
    const heroTitle = (tenant?.blogHeroTitle ?? '').trim() || 'Our Stories';
    const heroSubtitle =
      (tenant?.blogHeroSubtitle ?? '').trim() ||
      "Sip the latest from Draco Coffee & Eatery—menu drops, events, and community stories we think you'll love.";
    return {
      pillText: 'Blog',
      title: heroTitle,
      subtitle: heroSubtitle,
      backgroundImageUrl: tenant?.blogHeroImageUrl ?? '/images/shared/defaults/hero-default.jpg',
    };
  }, [tenant]);

  const introCopy =
    (tenant?.blogIntro ?? '').trim() ||
    "From Denpasar cafe culture to behind-the-bar craft, Our Stories is where Draco Coffee & Eatery shares the notes, people, and flavors reshaping each service.";

  const categoriesContent: CategoriesContent = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of safePosts) {
      if (!post?.category) continue;
      counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    }

    const categoryOptions = postCategories.map((category) => ({
      key: category,
      label: category,
      count: counts.get(category),
    }));

    return {
      label: 'Filter by',
      activeCategoryKey: activeCategory,
      categories: [
        {
          key: 'all',
          label: 'All Stories',
          pillText: 'FEATURED',
          count: safePosts.length,
        },
        ...categoryOptions,
      ],
    };
  }, [activeCategory, postCategories, safePosts]);

  const listingContent: ListingContent = useMemo(() => {
    const basePosts = filteredPosts.map(toListingPost);
    const featured = safePosts.slice(0, 4).map(toListingPost);
    const categoryGroups =
      postCategories.length > 0
        ? postCategories.slice(0, 3).map((category) => ({
            name: category,
            posts: safePosts.filter((post) => post?.category === category).map(toListingPost),
          }))
        : undefined;

    return {
      posts: basePosts,
      featuredPosts: featured,
      categoryGroups,
      emptyStateTitle: 'No blog posts yet',
      emptyStateMessage: "Check back soon for the latest stories from our kitchen.",
    };
  }, [filteredPosts, postCategories, safePosts]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <HeroRenderer content={heroContent} variant="primary" />
      <section className="border-b border-white/10 bg-[#050505] py-10">
        <div className="container mx-auto px-4">
          <p className="max-w-3xl text-lg leading-relaxed text-white/75">
            {introCopy}
          </p>
        </div>
      </section>
      <CategoriesRenderer
        content={categoriesContent}
        onCategoryChange={(categoryKey) => setActiveCategory(categoryKey)}
      />
      <ListingRenderer content={listingContent} variant="primary" />
    </main>
  );
}
