import { describe, expect, it } from 'vitest';
import { menuRegistry, listMenuVariants, getMenuVariant } from '../registry';

describe('Menu Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(menuRegistry.defaultVariant).toBe('signature-dishes');
  });

  it('lists all registered variants', () => {
    const keys = listMenuVariants().map(({ key }) => key);
    expect(keys).toEqual(['signature-dishes', 'overview']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getMenuVariant('unknown')).toBe('signature-dishes');
  });
});
