import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const ctaButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const ctaContentZodSchema = z.object({
  primaryCTA: ctaButtonSchema,
  secondaryCTA: ctaButtonSchema,
  showAfterScroll: z.number().min(0).max(100).optional(),
});

export const ctaContentSchema = createSectionSchema(ctaContentZodSchema);

export type CtaContentInput = z.input<typeof ctaContentZodSchema>;
export type CtaContent = z.output<typeof ctaContentZodSchema>;
