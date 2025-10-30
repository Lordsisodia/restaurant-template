import type { PostContent } from '../../types/schema';

export default function PostTemplate3(post: PostContent) {
  return (
    <article className="bg-neutral-950 py-20 text-white">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="mt-4 text-sm text-white/70">Experimental post layout placeholder.</p>
      </div>
    </article>
  );
}
