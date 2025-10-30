import { revalidatePath } from 'next/cache';

import { SolidButton } from '@siso/ui';

import {
  createAssistantMacro,
  deleteAssistantMacro,
  listAssistantMacros,
  updateAssistantMacro,
} from '@/domains/customer-facing/chat/server';
import { getTenantFromRequest } from '@/domains/shared/hooks/useTenantServer';

async function createMacroAction(formData: FormData) {
  'use server';

  const title = String(formData.get('title') ?? '').trim();
  const prompt = String(formData.get('prompt') ?? '').trim();
  const tagsRaw = String(formData.get('tags') ?? '').trim();

  if (!title || !prompt) {
    throw new Error('Title and prompt are required');
  }

  await createAssistantMacro({
    title,
    prompt,
    tags: tagsRaw ? tagsRaw.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
  });
  revalidatePath('/admin/chat-assistant');
}

async function updateMacroAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;

  const title = String(formData.get('title') ?? '').trim();
  const prompt = String(formData.get('prompt') ?? '').trim();
  const tagsRaw = String(formData.get('tags') ?? '').trim();

  await updateAssistantMacro({
    id,
    title,
    prompt,
    tags: tagsRaw ? tagsRaw.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
  });
  revalidatePath('/admin/chat-assistant');
}

async function deleteMacroAction(formData: FormData) {
  'use server';

  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await deleteAssistantMacro(id);
  revalidatePath('/admin/chat-assistant');
}

export default async function AdminChatAssistantPage() {
  const tenant = await getTenantFromRequest();
  const macros = await listAssistantMacros();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Chat assistant macros</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Prepare canned responses the chat assistant can use when talking to guests on behalf of {tenant.displayName}.
        </p>
      </div>

      <form
        action={createMacroAction}
        className="space-y-3 rounded-xl border border-border bg-background p-6 shadow-sm"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col text-xs">
            <span className="mb-1 font-semibold text-muted-foreground">Title</span>
            <input
              name="title"
              required
              placeholder="e.g., Delivery ETA"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="flex flex-col text-xs">
            <span className="mb-1 font-semibold text-muted-foreground">Tags</span>
            <input
              name="tags"
              placeholder="delivery, eta"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </label>
        </div>
        <label className="flex flex-col text-xs">
          <span className="mb-1 font-semibold text-muted-foreground">Assistant prompt / response</span>
          <textarea
            name="prompt"
            required
            rows={4}
            placeholder="Thanks for ordering! Your food will arrive in 30 minutes..."
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </label>
        <div className="flex justify-end">
          <SolidButton type="submit" size="sm" variant="secondary">
            Add macro
          </SolidButton>
        </div>
      </form>

      <section className="space-y-4">
        {macros.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted px-6 py-12 text-center text-muted-foreground">
            No macros yet. Create saved replies to speed up support responses.
          </div>
        ) : (
          macros.map((macro) => (
            <article
              key={macro.id}
              className="space-y-3 rounded-xl border border-border bg-background p-5 shadow-sm"
            >
              <form action={updateMacroAction} className="space-y-3">
                <input type="hidden" name="id" value={macro.id} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="flex flex-col text-xs">
                    <span className="mb-1 font-semibold text-muted-foreground">Title</span>
                    <input
                      name="title"
                      defaultValue={macro.title}
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    />
                  </label>
                  <label className="flex flex-col text-xs">
                    <span className="mb-1 font-semibold text-muted-foreground">Tags</span>
                    <input
                      name="tags"
                      defaultValue={macro.tags.join(', ')}
                      className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                    />
                  </label>
                </div>
                <label className="flex flex-col text-xs">
                  <span className="mb-1 font-semibold text-muted-foreground">Prompt</span>
                  <textarea
                    name="prompt"
                    rows={4}
                    defaultValue={macro.prompt}
                    className="rounded-md border border-input bg-background px-2 py-1 text-sm"
                  />
                </label>
                <div className="flex justify-end gap-2">
                  <SolidButton type="submit" size="sm" variant="secondary">
                    Save changes
                  </SolidButton>
                  <form action={deleteMacroAction}>
                    <input type="hidden" name="id" value={macro.id} />
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
