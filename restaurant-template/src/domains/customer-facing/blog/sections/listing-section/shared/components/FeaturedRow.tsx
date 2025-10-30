"use client";

import Link from 'next/link';
import { SectionHeading } from '@/domains/shared/components';
import type { ListingPost } from '../../types/schema';
import HorizontalScroller from './HorizontalScroller';
import { ArticleCard } from './ArticleCard';

interface FeaturedRowProps {
  posts: ListingPost[];
}

export default function FeaturedRow({ posts }: FeaturedRowProps) {
  const sorted = [...posts]
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime())
    .slice(0, 8);

  if (sorted.length === 0) return null;

  return (
    <section className="bg-[#050505] py-10 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <SectionHeading
            pillText="Featured Stories"
            title="Featured Stories"
            centered={false}
            as="h2"
            titleClassName="text-2xl font-semibold text-white"
          />
        </div>
        <HorizontalScroller ariaLabel="Featured stories" itemWidthClass="w-[320px]">
          {sorted.map((post) => {
            const seconds = post.readTimeMinutes ? Math.ceil(post.readTimeMinutes * 60) : undefined;
            const published = new Date(post.publishedAt || post.createdAt);
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="no-underline block">
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
        </HorizontalScroller>
      </div>
    </section>
  );
}
