import type { ListingContent } from '../../types/schema';

export default function ListingTemplate3({ posts }: ListingContent) {
  return (
    <section className="bg-neutral-950 py-20 text-white">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-semibold">Experimental Feed Layout</h2>
        <p className="mt-3 text-base text-white/70">
          This placeholder keeps parity with the previous template-3 stub. Update when the new design ships.
        </p>
        <ul className="mt-10 space-y-6 text-left">
          {posts.slice(0, 5).map((post) => (
            <li key={post.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">{post.category ?? 'Story'}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{post.title}</h3>
              <p className="mt-3 text-sm text-white/70 line-clamp-3">{post.excerpt ?? 'Summary coming soon.'}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
