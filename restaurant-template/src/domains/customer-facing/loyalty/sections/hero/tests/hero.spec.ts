import { describe, expect, it } from 'vitest';
import { loyaltyHeroRegistry, listLoyaltyHeroVariants, getLoyaltyHeroVariant } from '../registry';

describe('LoyaltyHero Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(loyaltyHeroRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listLoyaltyHeroVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getLoyaltyHeroVariant('unknown')).toBe('primary');
  });
});
