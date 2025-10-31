import { cache } from 'react';

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

export const listPosts = cache(async (): Promise<BlogPost[]> => {
  return getSamplePosts();
});

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
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
  console.warn('createPost called, but blog posts are currently sourced from static content.');
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
  console.warn('updatePost called, but blog posts are currently sourced from static content.');
}

export async function deletePost(id: string) {
  console.warn('deletePost called, but blog posts are currently sourced from static content.');
}
