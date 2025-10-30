import { describe, expect, it } from 'vitest';
import { postRegistry, listPostVariants, getPostVariant } from '../registry';

describe('Blog Post Section Registry', () => {
  it('uses the expected default variant', () => {
    expect(postRegistry.defaultVariant).toBe('primary');
  });

  it('lists all variants', () => {
    const keys = listPostVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to default for unknown variants', () => {
    expect(getPostVariant('unknown')).toBe('primary');
  });
});
