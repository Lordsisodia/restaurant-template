import { z } from 'zod';
import { createSectionSchema } from '@/domains/shared/section-tools';

export const essentialsContentZodSchema = z.object({
  hours: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  partners: z.array(z.string()).nullable().optional(),
});

export const essentialsContentSchema = createSectionSchema(essentialsContentZodSchema);

export type EssentialsContentInput = z.input<typeof essentialsContentZodSchema>;
export type EssentialsContent = z.output<typeof essentialsContentZodSchema>;
