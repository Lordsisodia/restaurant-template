import { z } from 'zod';

export interface SectionSchema<TData> {
  schema: z.ZodType<TData>;
  parse: (input: unknown) => TData;
}

export function createSectionSchema<TData>(schema: z.ZodType<TData>): SectionSchema<TData> {
  return {
    schema,
    parse(input: unknown) {
      const result = schema.safeParse(input);
      if (!result.success) {
        const error = new Error('Invalid section data payload received.');
        (error as Error & { cause?: unknown }).cause = result.error;
        throw error;
      }

      return result.data;
    },
  };
}
