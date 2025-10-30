import type { ListingContent } from '../../types/schema';

export default function ListingTemplate2({ posts }: ListingContent) {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">Template Two</p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Magazine Grid (In Progress)</h2>
          <p className="mt-3 text-base text-gray-600">
            Placeholder layout for a future editorial grid. Replace when the design is finalized.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <article key={post.id} className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-gray-600">{post.excerpt ?? 'Add summary copy.'}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
