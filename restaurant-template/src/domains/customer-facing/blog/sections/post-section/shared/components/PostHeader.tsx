'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { SmartImage, Badge } from '@/domains/shared/components';
import type { PostContent } from '../../types/schema';

interface PostHeaderProps {
  post: PostContent;
}

export default function PostHeader({ post }: PostHeaderProps) {
  const publishDate = post.publishedAt ?? post.createdAt;
  const formattedDate = new Date(publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const backHref = post.backLinkHref ?? '/blog';
  const backLabel = post.backLinkLabel ?? '← Back to blog';

  return (
    <header className="mb-12">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      {post.imageUrl ? (
        <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-3xl bg-black/20 shadow-xl">
          <SmartImage src={post.imageUrl} alt={post.title} fill aspectRatio="video" className="object-cover" priority />
        </div>
      ) : null}

      <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">{post.title}</h1>

      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
        {post.category ? (
          <Badge className="rounded-full border border-white/20 bg-white/10 text-xs text-white/80">
            {post.category}
          </Badge>
        ) : null}
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formattedDate}
        </span>
        {post.readTimeMinutes ? (
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTimeMinutes} min read
          </span>
        ) : null}
      </div>

      <div className="mt-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </header>
  );
}
