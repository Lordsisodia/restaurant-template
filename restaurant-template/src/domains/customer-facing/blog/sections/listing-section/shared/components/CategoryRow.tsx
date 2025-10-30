"use client";

import Link from 'next/link';
import { SectionHeading } from '@/domains/shared/components';
import type { ListingPost } from '../../types/schema';
import HorizontalScroller from './HorizontalScroller';
import { ArticleCard } from './ArticleCard';

interface CategoryRowProps {
  category: string;
  posts: ListingPost[];
}

export default function CategoryRow({ category, posts }: CategoryRowProps) {
  if (posts.length === 0) return null;
  const top = posts.slice(0, 12);

  return (
    <section className="bg-[#050505] py-8 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <SectionHeading
            pillText={category}
            title={category}
            centered={false}
            as="h2"
            titleClassName="text-xl font-semibold text-white"
          />
          <Link href={`/blog?category=${encodeURIComponent(category)}`} className="text-sm text-white/80 hover:text-white">
            View all
          </Link>
        </div>
        <HorizontalScroller ariaLabel={`${category} stories`} itemWidthClass="w-[320px]">
          {top.map((post) => {
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
