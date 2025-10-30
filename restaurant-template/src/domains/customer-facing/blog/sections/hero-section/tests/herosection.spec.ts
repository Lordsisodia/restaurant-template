import { describe, expect, it } from 'vitest';
import { heroRegistry, listHeroVariants, getHeroVariant } from '../registry';

describe('Blog Hero Section Registry', () => {
  it('uses the expected default variant', () => {
    expect(heroRegistry.defaultVariant).toBe('primary');
  });

  it('lists all variants', () => {
    const keys = listHeroVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to default for unknown variants', () => {
    expect(getHeroVariant('unknown')).toBe('primary');
  });
});
