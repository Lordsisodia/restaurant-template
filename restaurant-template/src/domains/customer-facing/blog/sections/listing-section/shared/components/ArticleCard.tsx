"use client";

import { Badge } from '@/domains/shared/components';
import { Card, CardContent, CardFooter, CardHeader } from '@/domains/shared/components';
import { cn } from '@/lib/utils';

export interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover?: string;
  tag?: string;
  readingTime?: number;
  writer?: string;
  publishedAt?: Date;
  clampLines?: number;
}

export function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return 'Less than 1 min read';
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

export function formatPostDate(date: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  cover,
  tag,
  readingTime,
  headline,
  excerpt,
  writer,
  publishedAt,
  clampLines,
}) => {
  const hasMeta = tag || readingTime;
  const hasFooter = writer || publishedAt;

  return (
    <Card className="flex w-full max-w-sm flex-col gap-4 overflow-hidden rounded-3xl border border-white/10 bg-[#111113] p-4 text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div
          className={cn('relative h-56 w-full rounded-2xl bg-black/40 bg-cover bg-center')}
          style={{ backgroundImage: `url(${cover || '/images/shared/defaults/dish-placeholder.jpg'})` }}
          aria-label={headline}
        />
      </CardHeader>

      <CardContent className="flex-grow p-3">
        {hasMeta && (
          <div className="mb-4 flex items-center text-sm text-white/60">
            {tag && (
              <Badge className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white/80">
                {tag}
              </Badge>
            )}
            {tag && readingTime && <span className="mx-2">•</span>}
            {readingTime && <span>{formatReadTime(readingTime)}</span>}
          </div>
        )}

        <h2 className="mb-2 text-2xl font-semibold leading-tight text-white">{headline}</h2>

        <p
          className={cn('text-white/70', {
            'overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]': clampLines && clampLines > 0,
          })}
          style={{ WebkitLineClamp: clampLines }}
        >
          {excerpt}
        </p>
      </CardContent>

      {hasFooter && (
        <CardFooter className="flex items-center justify-between p-3 text-white/60">
          {writer && (
            <div>
              <p className="text-sm uppercase tracking-wide text-white/40">By</p>
              <p className="font-semibold text-white/80">{writer}</p>
            </div>
          )}
          {publishedAt && (
            <div className={writer ? 'text-right' : ''}>
              <p className="text-sm uppercase tracking-wide text-white/40">Published</p>
              <p className="font-semibold text-white/80">{formatPostDate(publishedAt)}</p>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
