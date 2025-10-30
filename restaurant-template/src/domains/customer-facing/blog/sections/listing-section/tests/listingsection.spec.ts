import { describe, expect, it } from 'vitest';
import { listingRegistry, listListingVariants, getListingVariant } from '../registry';

describe('Blog Listing Section Registry', () => {
  it('uses the expected default variant', () => {
    expect(listingRegistry.defaultVariant).toBe('primary');
  });

  it('lists all variants', () => {
    const keys = listListingVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to default for unknown variants', () => {
    expect(getListingVariant('unknown')).toBe('primary');
  });
});
