import { describe, expect, it } from 'vitest';
import { categoriesRegistry, listCategoriesVariants, getCategoriesVariant } from '../registry';

describe('Blog Categories Section Registry', () => {
  it('uses the expected default variant', () => {
    expect(categoriesRegistry.defaultVariant).toBe('primary');
  });

  it('lists all variants', () => {
    const keys = listCategoriesVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to default for unknown variants', () => {
    expect(getCategoriesVariant('unknown')).toBe('primary');
  });
});
