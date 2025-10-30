import { createSectionSchema } from '@/domains/shared/section-tools';
import { z } from 'zod';

export const loyaltyTierHighlightsContentZodSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  tiers: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    )
    .min(1, 'Provide at least one tier to highlight.'),
});

export const loyaltyTierHighlightsContentSchema = createSectionSchema(loyaltyTierHighlightsContentZodSchema);

export type LoyaltyTierHighlightsContentInput = z.input<typeof loyaltyTierHighlightsContentZodSchema>;
export type LoyaltyTierHighlightsContent = z.output<typeof loyaltyTierHighlightsContentZodSchema>;
