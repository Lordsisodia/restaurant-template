import { describe, expect, it } from 'vitest';
import { loyaltyTopDinersRegistry, listLoyaltyTopDinersVariants, getLoyaltyTopDinersVariant } from '../registry';

describe('LoyaltyTopDiners Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(loyaltyTopDinersRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listLoyaltyTopDinersVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getLoyaltyTopDinersVariant('unknown')).toBe('primary');
  });
});
