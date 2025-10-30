import { describe, expect, it } from 'vitest';
import { essentialsRegistry, listEssentialsVariants, getEssentialsVariant } from '../registry';

describe('Essentials Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(essentialsRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listEssentialsVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getEssentialsVariant('unknown')).toBe('primary');
  });
});
