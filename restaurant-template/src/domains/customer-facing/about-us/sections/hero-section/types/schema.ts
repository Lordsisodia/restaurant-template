import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const heroContentZodSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  pillText: z.string().optional(),
});

export const heroContentSchema = createSectionSchema(heroContentZodSchema);

export type HeroContentInput = z.input<typeof heroContentZodSchema>;
export type HeroContent = z.output<typeof heroContentZodSchema>;
