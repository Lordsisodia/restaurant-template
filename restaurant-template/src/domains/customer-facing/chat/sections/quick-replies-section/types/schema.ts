import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

const macroSchema = z.object({
  id: z.string(),
  title: z.string(),
  prompt: z.string(),
  tags: z.array(z.string()).default([]),
  createdAt: z.union([z.string(), z.date()]),
});

export const quickRepliesContentZodSchema = z.object({
  heading: z.string().optional(),
  description: z.string().optional(),
  emptyStateMessage: z.string().optional(),
  locale: z.string().optional(),
  macros: z.array(macroSchema),
});

export const quickRepliesContentSchema = createSectionSchema(quickRepliesContentZodSchema);

export type QuickRepliesContentInput = z.input<typeof quickRepliesContentZodSchema>;
export type QuickRepliesContent = z.output<typeof quickRepliesContentZodSchema>;
