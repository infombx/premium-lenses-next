import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { SLUG_REVALIDATE_PATHS } from '@/lib/cmsFields'

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''

export async function POST(request: NextRequest) {
  // Auth check — validate JWT against WordPress
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

  const { pageId, pageSlug, value } = await request.json()

  if (!pageId || !pageSlug || value === undefined) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Call the custom WP endpoint that uses update_field() — works with ACF Free
  const wpRes = await fetch(`${WP_URL}/wp-json/pl/v1/save-legal`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ page_id: pageId, value }),
  })

  if (!wpRes.ok) {
    const err = await wpRes.json().catch(() => ({}))
    const msg = (err as { message?: string }).message ?? `WordPress error ${wpRes.status}`
    return NextResponse.json({ error: msg }, { status: wpRes.status })
  }

  // Revalidate the legal page
  const paths = SLUG_REVALIDATE_PATHS[pageSlug as string] ?? []
  for (const path of paths) {
    revalidatePath(path)
  }

  return NextResponse.json({ ok: true })
}
