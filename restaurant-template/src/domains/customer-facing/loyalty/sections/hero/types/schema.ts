import { createSectionSchema } from '@/domains/shared/section-tools';
import { z } from 'zod';

export const loyaltyHeroContentZodSchema = z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  description: z.string().optional(),
  primaryCta: z.object({
    href: z.string(),
    label: z.string(),
  }),
  secondaryCta: z
    .object({
      href: z.string(),
      label: z.string(),
    })
    .optional(),
});

export const loyaltyHeroContentSchema = createSectionSchema(loyaltyHeroContentZodSchema);

export type LoyaltyHeroContentInput = z.input<typeof loyaltyHeroContentZodSchema>;
export type LoyaltyHeroContent = z.output<typeof loyaltyHeroContentZodSchema>;
