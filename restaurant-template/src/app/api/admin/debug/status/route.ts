import { NextResponse } from 'next/server';

export async function GET() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
  ] as const;

  const env = Object.fromEntries(
    required.map((k) => [k, Boolean(process.env[k])])
  ) as Record<string, boolean>;

  return NextResponse.json({
    ok: true,
    env,
    nodeEnv: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}

