"use client";

import { useState } from 'react';
import { SectionHeading } from '@/domains/shared/components';
import type { GuestFeedbackContent } from '../../types';
import { RatingsSummaryPrimary } from '@/domains/customer-facing/reviews/sections/ratings-summary/templates/primary';
import { FilterBarPrimary } from '@/domains/customer-facing/reviews/sections/filter-bar/templates/primary';
import { ReviewsGridPrimary } from '@/domains/customer-facing/reviews/sections/reviews-grid/templates/primary';
import { AddReviewModalPrimary } from '@/domains/customer-facing/reviews/sections/add-review-modal/templates/primary';
import { FloatingAddReviewButton } from '@/domains/customer-facing/reviews/shared/components/FloatingAddReviewButton';
import { WriteReviewButton } from '@/domains/customer-facing/reviews/shared/components/WriteReviewButton';

interface GuestFeedbackClientProps {
  content: GuestFeedbackContent;
}

export function GuestFeedbackClient({ content }: GuestFeedbackClientProps) {
  const { heading, stats, featuredTags, filters, reviews, viewer } = content;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitReview = async (data: { rating: number; comment: string }) => {
    console.info('[reviews] submitReview placeholder', data);
  };

  const handleHelpfulClick = async (reviewId: string) => {
    console.info('[reviews] incrementHelpfulCount placeholder', reviewId);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="mb-8">
            <SectionHeading
              title={heading.title}
              subtitle={heading.subtitle}
              pillText={heading.pillText}
              titleClassName="text-4xl font-bold"
              centered
            />
          </div>

          <div className="mb-8">
            <RatingsSummaryPrimary
              content={{ stats, featuredTags }}
              actionSlot={<WriteReviewButton onClick={() => setIsModalOpen(true)} />}
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="lg:sticky lg:top-32 lg:h-fit">
              <FilterBarPrimary content={filters} />
            </aside>

            <main>
              <ReviewsGridPrimary content={{ reviews }} onHelpfulClick={handleHelpfulClick} />
            </main>
          </div>
        </div>
      </div>

      <FloatingAddReviewButton onClick={() => setIsModalOpen(true)} />

      <AddReviewModalPrimary
        content={{ userName: viewer.userName, isAuthenticated: viewer.isAuthenticated }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </>
  );
}

export default GuestFeedbackClient;
