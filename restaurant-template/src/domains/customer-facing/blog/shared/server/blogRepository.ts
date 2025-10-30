import { cache } from 'react';

import { withTenantSupabase } from '@/lib/supabase/withTenantSupabase';
import { findSamplePostBySlug, getSamplePosts } from '../data/samplePosts';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  publishedAt: string | null;
  createdAt: string;
  category: string | null;
  imageUrl: string | null;
  readTime: number | null;
}

let supabaseSupportsCategoryColumn = true;

function getSelectColumns(includeCategory: boolean) {
  const base = 'id, title, slug, excerpt, content, published_at, created_at, image_url, read_time';
  return includeCategory ? `${base}, category` : base;
}

function isMissingCategoryColumn(error: unknown) {
  if (!error || typeof error !== 'object') return false;
  const maybe = error as { code?: string; message?: string };
  if (maybe.code === '42703') return true;
  return typeof maybe.message === 'string' && maybe.message.toLowerCase().includes('post.category');
}

async function executePostQuery<T>(
  buildQuery: (selectClause: string) => Promise<{ data: T; error: unknown }>,
): Promise<T> {
  const attempts = supabaseSupportsCategoryColumn ? [true, false] : [false];

  for (const includeCategory of attempts) {
    const selectClause = getSelectColumns(includeCategory);
    const { data, error } = await buildQuery(selectClause);

    if (error) {
      if (includeCategory && isMissingCategoryColumn(error)) {
        supabaseSupportsCategoryColumn = false;
        continue;
      }
      throw error;
    }

    if (includeCategory) {
      supabaseSupportsCategoryColumn = true;
    }

    return data;
  }

  throw new Error('Unable to execute blog post query');
}

function adaptRowToBlogPost(row: Record<string, unknown>): BlogPost {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: (row.excerpt as string | null) ?? null,
    content: (row.content as string | null) ?? null,
    publishedAt: (row.published_at as string | null) ?? null,
    createdAt: row.created_at as string,
    category: 'category' in row ? ((row.category as string | null) ?? null) : null,
    imageUrl: (row.image_url as string | null) ?? null,
    readTime: (row.read_time as number | null) ?? null,
  };
}

export const listPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const posts = await withTenantSupabase(async (client, context) => {
      const data = await executePostQuery((selectClause) =>
        client
          .from('post')
          .select(selectClause)
          .eq('restaurant_id', context.restaurantId)
          .order('published_at', { ascending: false, nullsFirst: false })
          .order('created_at', { ascending: false }),
      );

      if (!Array.isArray(data) || data.length === 0) {
        return [];
      }

      return data.map((row) => adaptRowToBlogPost(row as Record<string, unknown>));
    });

    if (posts.length > 0) {
      return posts;
    }
  } catch (error) {
    console.warn('Falling back to sample blog posts because Supabase query failed or returned empty.', error);
  }

  return getSamplePosts();
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const post = await withTenantSupabase(async (client, context) => {
      const data = await executePostQuery((selectClause) =>
        client
          .from('post')
          .select(selectClause)
          .eq('restaurant_id', context.restaurantId)
          .eq('slug', slug)
          .maybeSingle(),
      );

      if (!data) return null;

      return adaptRowToBlogPost(data as Record<string, unknown>);
    });

    if (post) {
      return post;
    }
  } catch (error) {
    console.warn(`Falling back to sample blog post for slug "${slug}" because Supabase query failed.`, error);
  }

  return findSamplePostBySlug(slug) ?? null;
});

export async function createPost(payload: {
  title: string;
  excerpt?: string;
  content?: string;
  publishedAt?: string;
  category?: string;
  imageUrl?: string;
  readTime?: number;
}) {
  await withTenantSupabase(async (client, context) => {
    const slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const { error } = await client.from('post').insert({
      restaurant_id: context.restaurantId,
      title: payload.title,
      slug,
      excerpt: payload.excerpt ?? null,
      content: payload.content ?? null,
      published_at: payload.publishedAt ?? null,
      category: payload.category ?? null,
      image_url: payload.imageUrl ?? null,
      read_time: payload.readTime ?? null,
    });
    if (error) throw error;
  });
}

export async function updatePost(payload: {
  id: string;
  title?: string;
  excerpt?: string | null;
  content?: string | null;
  publishedAt?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  readTime?: number | null;
}) {
  await withTenantSupabase(async (client, context) => {
    const updates: Record<string, unknown> = {};
    if (payload.title !== undefined) {
      const trimmed = payload.title.trim();
      updates.title = trimmed;
      if (trimmed) {
        updates.slug = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }
    }
    if (payload.excerpt !== undefined) updates.excerpt = payload.excerpt ?? null;
    if (payload.content !== undefined) updates.content = payload.content ?? null;
    if (payload.publishedAt !== undefined) updates.published_at = payload.publishedAt || null;
    if (payload.category !== undefined) updates.category = payload.category ?? null;
    if (payload.imageUrl !== undefined) updates.image_url = payload.imageUrl ?? null;
    if (payload.readTime !== undefined) updates.read_time = payload.readTime ?? null;

    if (Object.keys(updates).length === 0) return;

    const { error } = await client
      .from('post')
      .update(updates)
      .eq('id', payload.id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}

export async function deletePost(id: string) {
  await withTenantSupabase(async (client, context) => {
    const { error } = await client
      .from('post')
      .delete()
      .eq('id', id)
      .eq('restaurant_id', context.restaurantId);
    if (error) throw error;
  });
}
