import { createSectionSchema } from '@/domains/shared/section-tools';
import { z } from 'zod';

export const loyaltyTopDinersMemberSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  tier: z.string().nullable().optional(),
  points: z.number().nullable().optional(),
  lastVisit: z.string().nullable().optional(),
});

export const loyaltyTopDinersContentZodSchema = z.object({
  heading: z.string().optional(),
  subheading: z.string().optional(),
  emptyStateMessage: z.string().optional(),
  locale: z.string().optional(),
  members: z.array(loyaltyTopDinersMemberSchema).default([]),
});

export const loyaltyTopDinersContentSchema = createSectionSchema(loyaltyTopDinersContentZodSchema);

export type LoyaltyTopDinersContentInput = z.input<typeof loyaltyTopDinersContentZodSchema>;
export type LoyaltyTopDinersContent = z.output<typeof loyaltyTopDinersContentZodSchema>;
