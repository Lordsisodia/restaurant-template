import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import { getMenu } from '@/domains/customer-facing/menu/shared/services';
import { createSpecial, deleteSpecial, getSpecials, updateSpecial } from '@/domains/archive/specials/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function createSpecialAction(formData: FormData) {
  'use server';

  const scope = String(formData.get('scope')) as 'item' | 'category';
  const targetIdRaw = scope === 'category'
    ? formData.get('categoryTargetId')
    : formData.get('itemTargetId');
  const targetId = String(targetIdRaw ?? '');
  const type = String(formData.get('type')) as 'percent' | 'fixed' | 'bogo';
  const value = Number(formData.get('value') ?? 0);

  if (!targetId || Number.isNaN(value)) {
    throw new Error('Invalid special details');
  }

  await createSpecial({ scope, targetId, type, value });
  revalidatePath('/admin/specials');
}

async function updateSpecialAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const type = String(formData.get('type') ?? 'percent') as 'percent' | 'fixed' | 'bogo';
  const valueRaw = String(formData.get('value') ?? '');
  const value = Number(valueRaw);
  const startDate = String(formData.get('startDate') ?? '').trim();
  const endDate = String(formData.get('endDate') ?? '').trim();

  if (type !== 'bogo' && Number.isNaN(value)) {
    throw new Error('Value is required for this special type');
  }

  await updateSpecial({
    id,
    type,
    value: Number.isNaN(value) ? 0 : value,
    startDate: startDate || null,
    endDate: endDate || null,
  });
  revalidatePath('/admin/specials');
}

async function deleteSpecialAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteSpecial(id);
  revalidatePath('/admin/specials');
}

export default async function AdminSpecialsPage() {
  const tenant = await getTenantFromRequest();
  const specials = await getSpecials();
  const menu = await getMenu();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Specials</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Configure limited-time offers for {tenant.displayName}.
        </p>
      </div>
      <section className="space-y-4">
        <form action={createSpecialAction} className="grid gap-4 rounded-xl border border-border bg-background p-5 shadow-sm sm:grid-cols-5">
          <label className="flex flex-col text-xs sm:col-span-1">
            <span className="mb-1 font-semibold text-muted-foreground">Scope</span>
            <select name="scope" className="rounded-md border border-input bg-background px-2 py-2 text-sm">
              <option value="item">Item</option>
              <option value="category">Category</option>
            </select>
          </label>
          <label className="flex flex-col text-xs sm:col-span-2">
            <span className="mb-1 font-semibold text-muted-foreground">Category target</span>
            <select name="categoryTargetId" className="rounded-md border border-input bg-background px-2 py-2 text-sm">
              {menu.categories.map((category) => (
                <option key={`category-${category.id}`} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-xs sm:col-span-2">
            <span className="mb-1 font-semibold text-muted-foreground">Item target</span>
            <select name="itemTargetId" className="rounded-md border border-input bg-background px-2 py-2 text-sm">
              {menu.categories.flatMap((category) =>
                category.items.map((item) => (
                  <option key={`item-${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                )),
              )}
            </select>
          </label>
          <label className="flex flex-col text-xs sm:col-span-1">
            <span className="mb-1 font-semibold text-muted-foreground">Type</span>
            <select name="type" className="rounded-md border border-input bg-background px-2 py-2 text-sm">
              <option value="percent">Percent</option>
              <option value="fixed">Fixed</option>
              <option value="bogo">BOGO</option>
            </select>
          </label>
          <label className="flex flex-col text-xs sm:col-span-1">
            <span className="mb-1 font-semibold text-muted-foreground">Value</span>
            <input
              name="value"
              type="number"
              min={0}
              className="rounded-md border border-input bg-background px-2 py-2 text-sm"
              required
            />
          </label>
          <div className="sm:col-span-5">
            <SolidButton type="submit" size="sm">
              Add special
            </SolidButton>
          </div>
        </form>
        {specials.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
            No specials yet. Create a new offer to engage guests.
          </div>
        ) : (
          specials.map((special) => (
            <article key={special.id} className="space-y-4 rounded-xl border border-border bg-background p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{special.title}</h2>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Scope: {special.scope} · Target: {special.targetId}
                  </p>
                </div>
                <span className="text-sm font-semibold text-primary">{special.savings}</span>
              </div>

              <form action={updateSpecialAction} className="grid gap-3 sm:grid-cols-5">
                <input type="hidden" name="id" value={special.id} />
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Type</span>
                  <select
                    name="type"
                    defaultValue={special.type}
                    className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  >
                    <option value="percent">Percent</option>
                    <option value="fixed">Fixed</option>
                    <option value="bogo">BOGO</option>
                  </select>
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Value</span>
                  <input
                    name="value"
                    type="number"
                    min={0}
                    step="1"
                    defaultValue={special.value}
                    className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Start date</span>
                  <input
                    name="startDate"
                    type="date"
                    defaultValue={special.startDate ? special.startDate.slice(0, 10) : ''}
                    className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">End date</span>
                  <input
                    name="endDate"
                    type="date"
                    defaultValue={special.endDate ? special.endDate.slice(0, 10) : ''}
                    className="rounded-md border border-input bg-background px-2 py-2 text-sm"
                  />
                </label>
                <div className="sm:col-span-5 flex justify-end">
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                </div>
              </form>

              <div className="flex justify-end">
                <form action={deleteSpecialAction}>
                  <input type="hidden" name="id" value={special.id} />
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
