import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import { createPost, deletePost, listPosts, updatePost, getPostBySlug } from '@/domains/customer-facing/blog/shared/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function createPostAction(formData: FormData) {
  'use server';

  const title = String(formData.get('title') ?? '').trim();
  if (!title) {
    throw new Error('Title is required');
  }

  await createPost({
    title,
    excerpt: String(formData.get('excerpt') ?? '').trim() || undefined,
    content: String(formData.get('content') ?? '').trim() || undefined,
    publishedAt: String(formData.get('publishedAt') ?? '') || undefined,
  });
  revalidatePath('/admin/blog');
}

async function updatePostAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const title = String(formData.get('title') ?? '').trim();
  if (!title) {
    throw new Error('Title is required');
  }

  const excerptRaw = String(formData.get('excerpt') ?? '').trim();
  const contentRaw = String(formData.get('content') ?? '').trim();
  const publishedAtRaw = String(formData.get('publishedAt') ?? '').trim();

  await updatePost({
    id,
    title,
    excerpt: excerptRaw || null,
    content: contentRaw || null,
    publishedAt: publishedAtRaw || null,
  });
  revalidatePath('/admin/blog');
}

async function deletePostAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deletePost(id);
  revalidatePath('/admin/blog');
}

export default async function AdminBlogPage() {
  const tenant = await getTenantFromRequest();
  const posts = await listPosts();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Blog posts</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Publish updates and stories for {tenant.displayName}.
        </p>
      </div>

      <form
        action={createPostAction}
        className="space-y-3 rounded-xl border border-border bg-background p-6 shadow-sm"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col text-xs">
            <span className="mb-1 font-semibold text-muted-foreground">Title</span>
            <input
              name="title"
              required
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Signature dish launch"
            />
          </label>
          <label className="flex flex-col text-xs">
            <span className="mb-1 font-semibold text-muted-foreground">Publish date</span>
            <input
              name="publishedAt"
              type="date"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="flex flex-col text-xs">
          <span className="mb-1 font-semibold text-muted-foreground">Excerpt</span>
          <textarea
            name="excerpt"
            rows={2}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Share a teaser for the post..."
          />
        </label>
        <label className="flex flex-col text-xs">
          <span className="mb-1 font-semibold text-muted-foreground">Content</span>
          <textarea
            name="content"
            rows={6}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Write the full blog content here..."
          />
        </label>
        <SolidButton type="submit" size="sm">
          Publish post
        </SolidButton>
      </form>

      {/* Quick seed test post */}
      <form
        action={async () => {
          'use server';
          const existing = await getPostBySlug('welcome-to-our-kitchen-stories');
          if (!existing) {
            const now = new Date().toISOString();
            await createPost({
              title: 'Welcome to Our Kitchen Stories',
              excerpt: "A first look at what we're cooking, brewing, and learning behind the scenes.",
              content: '<p>We\'re launching our blog to share recipes, behind-the-scenes, and special events.</p>',
              category: 'News',
              imageUrl: '/images/shared/defaults/hero-default.jpg',
              readTime: 3,
              publishedAt: now,
            });
          }
          revalidatePath('/blog');
          revalidatePath('/admin/blog');
        }}
        className="rounded-xl border border-border bg-background p-6 shadow-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold">Seed Test Blog Post</h3>
            <p className="text-xs text-muted-foreground">Creates a single sample post if missing.</p>
          </div>
          <SolidButton type="submit" size="sm">Seed Sample</SolidButton>
        </div>
      </form>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent posts</h2>
        {posts.length === 0 ? (
          <p className="rounded-md border border-dashed border-border px-4 py-4 text-sm text-muted-foreground">
            No posts yet.
          </p>
        ) : (
          posts.map((post) => (
            <article
              key={post.id}
              className="space-y-3 rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <form action={updatePostAction} className="space-y-3">
                <input type="hidden" name="id" value={post.id} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col text-xs">
                    <span className="mb-1 font-semibold text-muted-foreground">Title</span>
                    <input
                      name="title"
                      required
                      defaultValue={post.title}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="flex flex-col text-xs">
                    <span className="mb-1 font-semibold text-muted-foreground">Publish date</span>
                    <input
                      name="publishedAt"
                      type="date"
                      defaultValue={post.publishedAt ? post.publishedAt.slice(0, 10) : ''}
                      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <label className="flex flex-col text-xs">
                  <span className="mb-1 font-semibold text-muted-foreground">Excerpt</span>
                  <textarea
                    name="excerpt"
                    rows={2}
                    defaultValue={post.excerpt ?? ''}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs">
                  <span className="mb-1 font-semibold text-muted-foreground">Content</span>
                  <textarea
                    name="content"
                    rows={5}
                    defaultValue={post.content ?? ''}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    Slug: {post.slug}
                  </div>
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                </div>
              </form>
              <div className="flex justify-end">
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <SolidButton type="submit" size="sm" variant="danger">
                    Delete
                  </SolidButton>
                </form>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
