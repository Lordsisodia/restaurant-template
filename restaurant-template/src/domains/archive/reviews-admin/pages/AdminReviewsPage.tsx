import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import { deleteReview, listReviews, ReviewStatus, updateReviewStatus } from '@/domains/customer-facing/reviews/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';
import { AdminPageHeader } from '@/domains/shared/components/admin/AdminPageHeader';
import { AdminEmptyState } from '@/domains/shared/components/admin/AdminEmptyState';

const REVIEW_STATUSES: ReviewStatus[] = ['pending', 'published', 'archived'];

async function updateReviewAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const status = String(formData.get('status') ?? 'pending') as ReviewStatus;
  const publishedAt = String(formData.get('publishedAt') ?? '');

  await updateReviewStatus({
    id,
    status,
    publishedAt: publishedAt || null,
  });
  revalidatePath('/admin/reviews');
}

async function deleteReviewAction(formData: FormData) {
  'use server';
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteReview(id);
  revalidatePath('/admin/reviews');
}

export default async function AdminReviewsPage() {
  const tenant = await getTenantFromRequest();
  const reviews = await listReviews();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Customer reviews"
        subtitle={`Moderate incoming feedback and publish the best testimonials for ${tenant.displayName}.`}
      />

      <section className="space-y-4">
        {reviews.length === 0 ? (
          <AdminEmptyState title="No reviews yet" description="Encourage guests to share feedback after their visit." />
        ) : (
          reviews.map((review) => (
            <article
              key={review.id}
              className="space-y-4 rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{review.authorName}</h2>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Rating: {review.rating}/5 · Submitted{' '}
                    {new Date(review.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {review.publishedAt
                    ? `Published ${new Date(review.publishedAt).toLocaleDateString('id-ID')}`
                    : 'Not published'}
                </div>
              </div>
              {review.comment ? (
                <p className="rounded-md bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
                  {review.comment}
                </p>
              ) : null}
              <form action={updateReviewAction} className="grid gap-3 sm:grid-cols-3">
                <input type="hidden" name="id" value={review.id} />
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Status</span>
                  <select
                    name="status"
                    defaultValue={review.status}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {REVIEW_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Publish date</span>
                  <input
                    name="publishedAt"
                    type="date"
                    defaultValue={review.publishedAt ? review.publishedAt.slice(0, 10) : ''}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                  />
                </label>
                <div className="sm:col-span-1 flex items-end justify-end gap-2">
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                  <form action={deleteReviewAction}>
                    <input type="hidden" name="id" value={review.id} />
                    <SolidButton type="submit" size="sm" variant="danger">
                      Delete
                    </SolidButton>
                  </form>
                </div>
              </form>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
