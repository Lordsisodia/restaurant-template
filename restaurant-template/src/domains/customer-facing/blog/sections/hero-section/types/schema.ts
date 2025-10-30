import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const heroContentZodSchema = z.object({
  pillText: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  backgroundImageUrl: z.string().url().optional(),
  eyebrow: z.string().optional(),
});

export const heroContentSchema = createSectionSchema(heroContentZodSchema);

export type HeroContentInput = z.input<typeof heroContentZodSchema>;
export type HeroContent = z.output<typeof heroContentZodSchema>;
