'use client';

import Link from 'next/link';
import { SectionHeading } from '@/domains/shared/components';
import { ArticleCard } from '../../shared/components/ArticleCard';
import FeaturedRow from '../../shared/components/FeaturedRow';
import CategoryRow from '../../shared/components/CategoryRow';
import type { ListingContent } from '../../types/schema';

export default function ListingPrimary({
  posts,
  featuredPosts,
  categoryGroups,
  emptyStateTitle,
  emptyStateMessage,
}: ListingContent) {
  if (!posts || posts.length === 0) {
    return (
      <section className="bg-[#050505]">
        <div className="container mx-auto px-4 py-16 text-center text-white">
          <h2 className="mb-4 text-2xl font-semibold">{emptyStateTitle ?? 'No blog posts yet'}</h2>
          <p className="text-white/80">{emptyStateMessage ?? 'Check back soon for our latest stories and updates.'}</p>
        </div>
      </section>
    );
  }

  const derivedFeatured = featuredPosts && featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 4);
  const derivedCategories = categoryGroups ?? [];

  return (
    <div className="bg-[#050505]">
      {derivedFeatured.length > 0 ? <FeaturedRow posts={derivedFeatured} /> : null}

      {derivedCategories.length > 0 ? (
        derivedCategories.slice(0, 3).map((group) => (
          <CategoryRow key={group.name} category={group.name} posts={group.posts} />
        ))
      ) : null}

      <section className="bg-[#050505] py-16">
        <div className="container mx-auto px-4">
          <SectionHeading
            pillText="All Stories"
            title="All Stories"
            centered={false}
            as="h2"
            titleClassName="text-3xl font-semibold text-white"
          />
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const seconds = post.readTimeMinutes ? Math.ceil(post.readTimeMinutes * 60) : undefined;
              const published = new Date(post.publishedAt || post.createdAt);
              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="no-underline">
                  <ArticleCard
                    headline={post.title}
                    excerpt={post.excerpt ?? ''}
                    cover={post.imageUrl ?? undefined}
                    tag={post.category ?? undefined}
                    readingTime={seconds}
                    publishedAt={published}
                    clampLines={3}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
