import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const promoContentZodSchema = z.object({
  pillText: z.string().optional(),
  eyebrow: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  imageAlt: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaHref: z.string().optional(),
  secondaryCtaLabel: z.string().optional(),
  secondaryCtaHref: z.string().optional(),
  badge: z.string().optional(),
  schedule: z.string().optional(),
});

export const promoContentSchema = createSectionSchema(promoContentZodSchema);

export type PromoContentInput = z.input<typeof promoContentZodSchema>;
export type PromoContent = z.output<typeof promoContentZodSchema>;
