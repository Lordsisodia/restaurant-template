import { describe, expect, it } from 'vitest';
import { specialsRegistry, listSpecialsVariants, getSpecialsVariant } from '../registry';

describe('Specials Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(specialsRegistry.defaultVariant).toBe('grid');
  });

  it('lists all registered variants', () => {
    const keys = listSpecialsVariants().map(({ key }) => key);
    expect(keys).toEqual(['grid', 'slider']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getSpecialsVariant('unknown')).toBe('grid');
  });
});
