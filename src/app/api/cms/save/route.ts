import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { REVALIDATE_PATHS } from '@/lib/cmsFields'

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''

export async function POST(request: NextRequest) {
  // Auth check — validate token against WordPress
  const token = request.cookies.get('wp_jwt')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const validateRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token/validate`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!validateRes.ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { pageId, fieldName, value } = await request.json()
  if (!pageId || !fieldName || value === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // ACF Image fields require an integer attachment ID, not a URL string
  const acfValue = /^\d+$/.test(String(value)) ? parseInt(value, 10) : value

  // Write to WordPress via REST API using the user's JWT
  const wpRes = await fetch(`${WP_URL}/wp-json/wp/v2/pages/${pageId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ acf: { [fieldName]: acfValue } }),
  })

  if (!wpRes.ok) {
    const err = await wpRes.json().catch(() => ({}))
    const msg = (err as { message?: string }).message ?? `WordPress error ${wpRes.status}`
    return NextResponse.json({ error: msg }, { status: wpRes.status })
  }

  // Revalidate affected Next.js pages
  const paths = REVALIDATE_PATHS[pageId as number] ?? ['/']
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ ok: true })
}
