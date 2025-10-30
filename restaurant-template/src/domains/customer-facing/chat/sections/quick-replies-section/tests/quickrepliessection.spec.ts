import { describe, expect, it } from 'vitest';
import { quickRepliesRegistry, listQuickRepliesVariants, getQuickRepliesVariant } from '../registry';

describe('QuickReplies Section Registry', () => {
  it('returns the default variant when none is provided', () => {
    expect(quickRepliesRegistry.defaultVariant).toBe('primary');
  });

  it('lists all registered variants', () => {
    const keys = listQuickRepliesVariants().map(({ key }) => key);
    expect(keys).toEqual(['primary']);
  });

  it('falls back to the default when an unknown variant is requested', () => {
    expect(getQuickRepliesVariant('unknown')).toBe('primary');
  });
});
