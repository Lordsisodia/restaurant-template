import { describe, expect, it } from 'vitest';
import { menuHeaderRegistry, listMenuHeaderVariants, getMenuHeaderVariant } from '../registry';

describe('MenuHeader Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(menuHeaderRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listMenuHeaderVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getMenuHeaderVariant('unknown')).toBe('primary');
  });
});
