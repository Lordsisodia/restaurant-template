'use server';

import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';

export interface AssistantMacro {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  createdAt: string;
}

export const listAssistantMacros = cache(async (): Promise<AssistantMacro[]> => {
  return withTenantSupabase(async (client, context) => {
    const { data, error } = await client
      .from('assistant_macro')
      .select('id, title, prompt, tags, created_at')
      .eq('restaurant_id', context.restaurantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? []).map((row) => ({
      id: row.id as string,
      title: (row.title as string) ?? 'Untitled macro',
      prompt: (row.prompt as string) ?? '',
      tags: (row.tags as string[]) ?? [],
      createdAt: (row.created_at as string) ?? '',
    }));
  });
});

export async function createAssistantMacro(payload: { title: string; prompt: string; tags?: string[] }) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client.from('assistant_macro').insert({
      restaurant_id: context.restaurantId,
      title: payload.title,
      prompt: payload.prompt,
      tags: payload.tags ?? [],
    });
    if (error) throw error;
  });
}

export async function updateAssistantMacro(payload: {
  id: string;
  title?: string;
  prompt?: string;
  tags?: string[];
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.title !== undefined) updates.title = payload.title;
    if (payload.prompt !== undefined) updates.prompt = payload.prompt;
    if (payload.tags !== undefined) updates.tags = payload.tags;

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('assistant_macro')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deleteAssistantMacro(id: string) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('assistant_macro')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
