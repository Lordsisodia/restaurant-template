import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import { createMember, deleteMember, listMembers, updateMember } from '@/domains/customer-facing/loyalty/shared/services';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function createMemberAction(formData: FormData) {
  'use server';

  const fullName = String(formData.get('fullName') ?? '').trim();
  if (!fullName) {
    throw new Error('Member name is required');
  }

  await createMember({
    fullName,
    email: String(formData.get('email') ?? '').trim() || undefined,
    phone: String(formData.get('phone') ?? '').trim() || undefined,
    tier: String(formData.get('tier') ?? '').trim() || undefined,
    points: Number(formData.get('points') ?? 0),
  });
  revalidatePath('/admin/loyalty');
}

async function updateMemberAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const fullName = String(formData.get('fullName') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const tier = String(formData.get('tier') ?? '').trim();
  const points = Number(formData.get('points') ?? 0);
  const lastVisit = String(formData.get('lastVisit') ?? '').trim();

  await updateMember({
    id,
    fullName,
    email: email || null,
    phone: phone || null,
    tier: tier || undefined,
    points,
    lastVisit: lastVisit || null,
  });
  revalidatePath('/admin/loyalty');
}

async function deleteMemberAction(formData: FormData) {
  'use server';
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteMember(id);
  revalidatePath('/admin/loyalty');
}

export default async function AdminLoyaltyPage() {
  const tenant = await getTenantFromRequest();
  const members = await listMembers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Loyalty programme</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Reward frequent diners and upgrade their tiers for {tenant.displayName}.
        </p>
      </div>

      <form
        action={createMemberAction}
        className="grid gap-3 rounded-xl border border-border bg-background p-6 shadow-sm sm:grid-cols-6"
      >
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Full name</span>
          <input
            name="fullName"
            required
            placeholder="e.g., Budi Santoso"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Email</span>
          <input name="email" type="email" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Phone</span>
          <input name="phone" className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Tier</span>
          <select name="tier" className="rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </label>
        <label className="flex flex-col text-xs sm:col-span-2">
          <span className="mb-1 font-semibold text-muted-foreground">Points</span>
          <input
            name="points"
            type="number"
            min={0}
            defaultValue={0}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <div className="sm:col-span-6 flex justify-end">
          <SolidButton type="submit" size="sm" variant="secondary">
            Add member
          </SolidButton>
        </div>
      </form>

      <section className="space-y-4">
        {members.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
            No loyalty members yet. Add your first loyal guest above.
          </div>
        ) : (
          members.map((member) => (
            <article
              key={member.id}
              className="space-y-3 rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{member.fullName}</h2>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">
                    Member since {new Date(member.createdAt).toLocaleDateString('id-ID')}
                  </p>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Tier: <span className="font-semibold text-primary">{member.tier}</span></p>
                  <p>Points: <span className="font-semibold text-primary">{member.points}</span></p>
                </div>
              </div>
              <form action={updateMemberAction} className="grid gap-3 sm:grid-cols-6">
                <input type="hidden" name="id" value={member.id} />
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Full name</span>
                  <input
                    name="fullName"
                    defaultValue={member.fullName}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Email</span>
                  <input
                    name="email"
                    defaultValue={member.email ?? ''}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Phone</span>
                  <input
                    name="phone"
                    defaultValue={member.phone ?? ''}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-2">
                  <span className="mb-1 font-semibold text-muted-foreground">Tier</span>
                  <select
                    name="tier"
                    defaultValue={member.tier}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  >
                    <option value="bronze">Bronze</option>
                    <option value="silver">Silver</option>
                    <option value="gold">Gold</option>
                    <option value="platinum">Platinum</option>
                  </select>
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Points</span>
                  <input
                    name="points"
                    type="number"
                    min={0}
                    defaultValue={member.points}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <label className="flex flex-col text-xs sm:col-span-1">
                  <span className="mb-1 font-semibold text-muted-foreground">Last visit</span>
                  <input
                    name="lastVisit"
                    type="date"
                    defaultValue={member.lastVisit ? member.lastVisit.slice(0, 10) : ''}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <div className="sm:col-span-6 flex justify-end gap-2">
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                  <form action={deleteMemberAction}>
                    <input type="hidden" name="id" value={member.id} />
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
