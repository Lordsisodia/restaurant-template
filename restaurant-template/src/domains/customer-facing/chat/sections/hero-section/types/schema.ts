import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
  target: z.string().optional(),
  rel: z.string().optional(),
});

export const heroContentZodSchema = z.object({
  tenantName: z.string().optional(),
  badgeLabel: z.string().optional(),
  headline: z.string().optional(),
  description: z.string().optional(),
  primaryCta: ctaSchema,
  secondaryCta: ctaSchema.optional(),
});

export const heroContentSchema = createSectionSchema(heroContentZodSchema);

export type HeroContentInput = z.input<typeof heroContentZodSchema>;
export type HeroContent = z.output<typeof heroContentZodSchema>;
