"use client";

import Image from 'next/image';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { VerifiedIcon, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReviewCardComponentProps } from '../../types';

export default function ReviewCardPrimary({ review, onImageClick, onHelpfulClick }: ReviewCardComponentProps) {
  const {
    id,
    authorName,
    rating,
    comment,
    publishedAt,
    source,
    verified,
    featured,
    images,
    ownerResponse,
    ownerRespondedAt,
    helpfulCount,
    metadata,
  } = review;

  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);

  const handleHelpfulClick = () => {
    if (!isHelpfulClicked && onHelpfulClick) {
      setIsHelpfulClicked(true);
      onHelpfulClick(id);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  const stars = Array.from({ length: 5 }, (_, index) => index < rating);

  return (
    <div
      className={cn(
        'w-full p-1.5 rounded-2xl relative isolate overflow-hidden',
        'bg-gradient-to-br from-zinc-800/80 to-zinc-850/90 dark:from-zinc-800/70 dark:to-zinc-850/80',
        'backdrop-blur-xl backdrop-saturate-[180%]',
        'border border-zinc-700/60 dark:border-zinc-700/50',
        'shadow-[0_8px_24px_rgb(0_0_0_/_0.25)] dark:shadow-[0_8px_24px_rgb(0_0_0_/_0.4)]',
        'transition-all hover:shadow-[0_12px_32px_rgb(0_0_0_/_0.35)] dark:hover:shadow-[0_12px_32px_rgb(0_0_0_/_0.5)]',
        featured && 'ring-2 ring-yellow-500/40 dark:ring-yellow-500/50'
      )}
    >
      <div
        className={cn(
          'w-full p-5 rounded-xl relative',
          'bg-gradient-to-br from-zinc-800/60 to-zinc-850/70 dark:from-zinc-800/40 dark:to-zinc-850/50',
          'backdrop-blur-md backdrop-saturate-150',
          'border border-zinc-700/40 dark:border-zinc-700/30',
          'text-gray-300 dark:text-gray-200'
        )}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-primary/20 dark:from-primary/40 dark:to-primary/30 flex items-center justify-center border border-primary/20 dark:border-primary/30">
              <span className="text-lg font-bold text-primary dark:text-primary">
                {authorName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-gray-200 dark:text-gray-200">{authorName}</span>
                  {verified && <VerifiedIcon className="h-4 w-4 text-blue-400 dark:text-blue-400" />}
                  {featured && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                </div>
                <div className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500">
                  <span>{source === 'website' ? 'Website Review' : source}</span>
                  <span className="text-gray-600 dark:text-gray-600">·</span>
                  <span>{timeAgo}</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {stars.map((filled, index) => (
                  <Star
                    key={index}
                    className={cn(
                      'h-4 w-4',
                      filled
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-zinc-700/50 dark:fill-zinc-700/50 text-zinc-700/50 dark:text-zinc-700/50'
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-gray-300 dark:text-gray-300 text-base leading-relaxed">{comment}</p>
        </div>

        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => onImageClick?.(images, idx)}
                className="relative aspect-square overflow-hidden rounded-lg border border-zinc-700/50 dark:border-zinc-700/50 hover:opacity-90 transition-opacity"
              >
                <Image
                  src={img}
                  alt={`Review photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 150px"
                />
                {idx === 2 && images.length > 3 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white">
                    +{images.length - 3}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {metadata?.highlights && metadata.highlights.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {metadata.highlights.slice(0, 3).map((highlight, index) => (
              <span
                key={index}
                className="rounded-full border border-zinc-700/50 dark:border-zinc-700/50 bg-zinc-800/60 dark:bg-zinc-800/50 px-3 py-1 text-xs font-medium text-gray-400 dark:text-gray-400"
              >
                {highlight}
              </span>
            ))}
          </div>
        )}

        {ownerResponse && (
          <div className="mt-4 pt-4 border-t border-zinc-700/50 dark:border-zinc-700/50">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-primary/25 to-primary/15 flex items-center justify-center border border-primary/25">
                  <span className="text-sm font-bold text-white">🏪</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-gray-200 dark:text-gray-200">
                    Response from Owner
                  </span>
                  <VerifiedIcon className="h-4 w-4 text-blue-400 dark:text-blue-400" />
                  {ownerRespondedAt && (
                    <>
                      <span className="text-xs text-gray-600 dark:text-gray-600">·</span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {formatDistanceToNow(new Date(ownerRespondedAt), { addSuffix: true })}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{ownerResponse}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-zinc-700/50 dark:border-zinc-700/50 pt-3">
          <button
            onClick={handleHelpfulClick}
            disabled={isHelpfulClicked}
            className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
              isHelpfulClicked ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{isHelpfulClicked ? '👍' : '👍🏼'}</span>
            <span>Helpful ({helpfulCount + (isHelpfulClicked ? 1 : 0)})</span>
          </button>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/reviews#${id}`);
            }}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
