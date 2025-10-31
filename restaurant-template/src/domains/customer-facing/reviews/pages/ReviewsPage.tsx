/**
 * Customer-Facing Reviews Page (Primary Variant)
 *
 * Uses the guest-feedback section architecture so that future variants can swap in
 * without disturbing the page contract.
 */

import { createClient } from '@/lib/supabase/server';
import { GuestFeedbackRenderer } from '../sections/guest-feedback-section';
import type { GuestFeedbackContent, GuestFeedbackReview } from '../sections/guest-feedback-section';
import { getReviewsWithFilters, getRatingStats, getFeaturedTags, getRatingBreakdown } from '../shared/services';
import { resolveReviewImages } from '../shared/config/review-media';

interface ReviewsPageProps {
  searchParams?: Promise<{
    rating?: string;
    source?: string;
    feature?: string;
    sort?: string;
  }>;
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const params = await searchParams;
  const filters = {
    rating: params?.rating || 'all',
    source: params?.source || 'all',
    feature: params?.feature || 'all',
    sort: params?.sort || 'newest',
  };

  const [reviews, stats, tags, breakdown, user] = await Promise.all([
    getReviewsWithFilters(filters),
    getRatingStats(),
    getFeaturedTags(),
    getRatingBreakdown(),
    (async () => {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    })(),
  ]);

  const mappedReviews: GuestFeedbackReview[] = (reviews ?? []).map((review) => {
    const authorName = review.author_name ?? 'Guest';
    const primaryImages = Array.isArray(review.images) ? review.images : [];
    const isGoogleReview = typeof review.source === 'string' && review.source.toLowerCase().includes('google');
    const rawPhotoCount =
      typeof review.photo_count === 'number'
        ? review.photo_count
        : typeof review.photo_count === 'string'
          ? Number.parseInt(review.photo_count, 10)
          : 0;
    const photoCount = Number.isFinite(rawPhotoCount) ? Math.max(rawPhotoCount, 0) : 0;
    const expectsPhotos = Boolean(review.has_photos || photoCount > 0 || isGoogleReview);
    const mergedImages = resolveReviewImages({
      id: review.id,
      authorName,
      images: primaryImages,
      expectsPhotos,
      expectedCount: photoCount || undefined,
    });

    return {
      id: review.id,
      authorName,
      rating: review.rating,
      comment: review.comment ?? '',
      publishedAt: review.published_at ?? new Date().toISOString(),
      source: review.source ?? 'website',
      verified: Boolean(review.verified),
      featured: Boolean(review.featured),
      images: mergedImages,
      ownerResponse: review.owner_response ?? null,
      ownerRespondedAt: review.owner_responded_at ?? null,
      helpfulCount: review.helpful_count ?? 0,
      metadata: review.metadata
        ? {
            highlights: Array.isArray(review.metadata.highlights) ? review.metadata.highlights : undefined,
            tags: Array.isArray(review.metadata.tags) ? review.metadata.tags : undefined,
          }
        : undefined,
    };
  });

  const content: GuestFeedbackContent = {
    heading: {
      title: 'Reviews',
      subtitle: 'See what our guests are saying about their experience',
      pillText: 'GUEST FEEDBACK',
    },
    stats: {
      average: stats?.average ?? 0,
      total: stats?.total ?? 0,
      breakdown: {
        '5_stars': stats?.breakdown?.['5_stars'] ?? 0,
        '4_stars': stats?.breakdown?.['4_stars'] ?? 0,
        '3_stars': stats?.breakdown?.['3_stars'] ?? 0,
        '2_stars': stats?.breakdown?.['2_stars'] ?? 0,
        '1_star': stats?.breakdown?.['1_star'] ?? 0,
      },
    },
    featuredTags: tags ?? [],
    filters: {
      totalReviews: mappedReviews.length,
      ratingBreakdown: breakdown,
    },
    reviews: mappedReviews,
    viewer: {
      isAuthenticated: Boolean(user),
      userName: user?.user_metadata?.name ?? user?.email?.split('@')[0] ?? null,
    },
  };

  return <GuestFeedbackRenderer content={content} />;
}
