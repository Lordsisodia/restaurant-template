import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface PageBlockRecord<T = Record<string, unknown>> {
  id: string;
  page: string;
  blockType: string;
  position: number;
  locale: string;
  content: T;
}

export const listPageBlocks = cache(async (page: string, locale?: string): Promise<PageBlockRecord[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('page_block')
      .select('id, page, block_type, content_json, position, locale')
      .eq('restaurant_id', context.restaurantId)
      .eq('page', page)
      .order('position', { ascending: true });

    if (error) throw error;

    const blocks = (data ?? []).map((row) => ({
      id: row.id as string,
      page: row.page as string,
      blockType: row.block_type as string,
      position: (row.position as number) ?? 0,
      locale: (row.locale as string) ?? 'default',
      content: (row.content_json as Record<string, unknown>) ?? {},
    }));

    if (!locale) {
      return blocks;
    }

    const exact = blocks.filter((block) => block.locale === locale);
    if (exact.length > 0) return exact;

    const defaultBlocks = blocks.filter((block) => block.locale === 'default');
    return defaultBlocks.length > 0 ? defaultBlocks : blocks;
  });
});

export async function createPageBlock(payload: {
  page: string;
  blockType: string;
  content: Record<string, unknown>;
  position?: number;
  locale?: string;
}) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client.from('page_block').insert({
      restaurant_id: context.restaurantId,
      page: payload.page,
      block_type: payload.blockType,
      content_json: payload.content,
      position: payload.position ?? 0,
      locale: payload.locale ?? 'default',
    });
    if (error) throw error;
  });
}

export async function updatePageBlock(payload: {
  id: string;
  blockType?: string;
  content?: Record<string, unknown>;
  position?: number;
  locale?: string;
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.blockType !== undefined) updates.block_type = payload.blockType;
    if (payload.content !== undefined) updates.content_json = payload.content;
    if (payload.position !== undefined) updates.position = payload.position;
    if (payload.locale !== undefined) updates.locale = payload.locale;

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('page_block')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deletePageBlock(id: string) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('page_block')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
