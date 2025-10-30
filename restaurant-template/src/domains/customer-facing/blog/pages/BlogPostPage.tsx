/**
 * Customer-Facing Single Blog Post Page
 *
 * Renders the section-architecture powered blog post renderer.
 */

import Link from 'next/link';
import type { PostContent } from '../sections/post-section';
import { PostRenderer } from '../sections/post-section';

interface BlogPostPageProps {
  post: any;
  tenant: any;
}

export default function BlogPostPage({ post, tenant }: BlogPostPageProps) {
  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center text-white">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block text-amber-300 transition-colors hover:text-white">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const postContent: PostContent = {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt ?? null,
    content: post.content ?? null,
    publishedAt: post.publishedAt ?? null,
    createdAt: post.createdAt,
    category: post.category ?? null,
    imageUrl: post.imageUrl ?? null,
    readTimeMinutes: post.readTime ?? null,
    backLinkHref: '/blog',
    backLinkLabel: '← Back to blog',
  };

  return (
    <main className="bg-[#050505] text-white">
      <PostRenderer content={postContent} variant="primary" />

      {/* Footer CTA */}
      <section className="border-t border-white/10 bg-[#040404] py-16 text-center">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-3xl font-bold text-white">Enjoyed this story?</h2>
          <p className="mb-8 text-lg text-white/70">
            Visit {tenant?.displayName || 'us'} and experience it yourself.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-base font-semibold text-black transition-colors hover:bg-white/90"
            >
              View Menu
            </Link>
            <Link
              href="/reservations"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              Make Reservation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
