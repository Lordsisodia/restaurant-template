import { describe, expect, it, vi } from 'vitest';
import { loyaltyMembershipShowcaseRegistry, listLoyaltyMembershipShowcaseVariants, getLoyaltyMembershipShowcaseVariant } from '../registry';

vi.mock('@/components/ui/membership-card', () => ({
  Component: () => null,
}));

describe('LoyaltyMembershipShowcase Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(loyaltyMembershipShowcaseRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listLoyaltyMembershipShowcaseVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary', 'template-2', 'template-3']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getLoyaltyMembershipShowcaseVariant('unknown')).toBe('primary');
  });
});
