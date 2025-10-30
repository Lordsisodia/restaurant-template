import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const heroContentZodSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  logoUrl: z.string().optional(),
  primaryCta: ctaSchema.optional(),
  secondaryCta: ctaSchema.optional(),
  words: z.tuple([z.string(), z.string(), z.string()]).optional(),
  videoUrl: z.string().optional(),
  useAnimatedHeadline: z.boolean().optional(),
});

export const heroContentSchema = createSectionSchema(heroContentZodSchema);

export type HeroContentInput = z.input<typeof heroContentZodSchema>;
export type HeroContent = z.output<typeof heroContentZodSchema>;
