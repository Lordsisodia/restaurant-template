import { describe, expect, it } from 'vitest';
import { galleryRegistry, listGalleryVariants, getGalleryVariant } from '../registry';

describe('Gallery Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(galleryRegistry.defaultVariant).toBe('grid');
  });

  it('lists all registered variants', () => {
    const keys = listGalleryVariants().map(({ key }) => key);
    expect(keys).toEqual(['grid']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getGalleryVariant('unknown')).toBe('grid');
  });
});
