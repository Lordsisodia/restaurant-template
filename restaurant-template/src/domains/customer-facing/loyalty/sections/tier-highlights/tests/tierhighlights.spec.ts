import { describe, expect, it } from 'vitest';
import { loyaltyTierHighlightsRegistry, listLoyaltyTierHighlightsVariants, getLoyaltyTierHighlightsVariant } from '../registry';

describe('LoyaltyTierHighlights Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(loyaltyTierHighlightsRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listLoyaltyTierHighlightsVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getLoyaltyTierHighlightsVariant('unknown')).toBe('primary');
  });
});
