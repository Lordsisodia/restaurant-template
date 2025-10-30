import { describe, expect, it } from 'vitest';
import { heroRegistry, listHeroVariants, getHeroVariant } from '../registry';

describe('Hero Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(heroRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listHeroVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-1', 'template-2', 'template-3']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getHeroVariant('unknown')).toBe('primary');
  });
});
