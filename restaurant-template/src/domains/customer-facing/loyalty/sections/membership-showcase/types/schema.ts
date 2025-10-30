import { createSectionSchema } from '@/domains/shared/section-tools';
import { z } from 'zod';

const membershipTierEnum = z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']);

export const loyaltyMembershipShowcaseContentZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  className: z.string().optional(),
  card: z
    .object({
      name: z.string().optional(),
      email: z.string().optional(),
      avatar: z.string().optional(),
      memberSince: z.string().optional(),
      tier: membershipTierEnum.optional(),
      points: z.number().optional(),
      nextTier: z.string().optional(),
      pointsToNextTier: z.number().optional(),
      benefits: z.array(z.string()).optional(),
      cardNumber: z.string().optional(),
      expiryDate: z.string().optional(),
    })
    .optional(),
});

export const loyaltyMembershipShowcaseContentSchema = createSectionSchema(loyaltyMembershipShowcaseContentZodSchema);

export type LoyaltyMembershipShowcaseContentInput = z.input<typeof loyaltyMembershipShowcaseContentZodSchema>;
export type LoyaltyMembershipShowcaseContent = z.output<typeof loyaltyMembershipShowcaseContentZodSchema>;
