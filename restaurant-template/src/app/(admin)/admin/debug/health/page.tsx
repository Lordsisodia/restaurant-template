import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Debug Health',
};

export default async function DebugHealthPage() {
  const envKeys = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  ] as const;

  const env = envKeys.map((k) => ({ key: k, present: Boolean(process.env[k]) }));

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-10">
      <h1 className="text-2xl font-semibold">Debug Health</h1>
      <section className="rounded-xl border border-border/60 bg-background p-5">
        <h2 className="text-lg font-medium">Environment</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {env.map(({ key, present }) => (
            <li key={key} className="flex items-center justify-between border-b border-border/40 py-2 last:border-b-0">
              <span className="font-mono text-xs">{key}</span>
              <span className={present ? 'text-green-600' : 'text-red-600'}>
                {present ? 'present' : 'missing'}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: For this project, Next reads env from <code>restaurant-template/.env.local</code>.
        </p>
      </section>

      <section className="rounded-xl border border-border/60 bg-background p-5">
        <h2 className="text-lg font-medium">API</h2>
        <p className="text-sm text-muted-foreground">
          JSON diagnostics now live at <code>/api/admin/debug/status</code> and <code>/api/admin/debug/landing-probe</code>.
        </p>
      </section>
    </main>
  );
}

