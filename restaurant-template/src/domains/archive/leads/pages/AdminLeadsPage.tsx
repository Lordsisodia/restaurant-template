import { SolidButton } from '@siso/ui';

import { listLeads, updateLeadStatus } from '@/domains/archive/leads/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function updateLeadStatusAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id) return;
  await updateLeadStatus({ id, status });
}

export default async function AdminLeadsPage() {
  const tenant = await getTenantFromRequest();
  const leads = await listLeads();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Leads</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Track catering and private dining inquiries for {tenant.displayName}.
        </p>
      </div>
      {leads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
          No leads yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="min-w-full divide-y divide-border text-sm">
            <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-background">
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {lead.email ?? '—'} · {lead.phone ?? '—'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    <div>Type: {lead.leadType}</div>
                    {lead.partySize ? <div>Party size: {lead.partySize}</div> : null}
                    {lead.eventDate ? <div>Event date: {lead.eventDate}</div> : null}
                    {lead.message ? <div>Notes: {lead.message}</div> : null}
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateLeadStatusAction} className="inline-flex items-center gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In progress</option>
                        <option value="won">Won</option>
                        <option value="lost">Lost</option>
                      </select>
                      <SolidButton type="submit" size="sm" variant="secondary">
                        Save
                      </SolidButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
