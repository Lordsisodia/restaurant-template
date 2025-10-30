import type { PostContent } from '../../types/schema';

export default function PostTemplate2(post: PostContent) {
  return (
    <article className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-gray-500">Template Two Placeholder</p>
        <p className="mt-6 text-base text-gray-600">
          This template is a placeholder for an alternate article layout. Replace with final design when ready.
        </p>
      </div>
    </article>
  );
}
