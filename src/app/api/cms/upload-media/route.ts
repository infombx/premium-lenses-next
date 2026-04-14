import { NextRequest, NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''

export async function POST(request: NextRequest) {
  const token = request.cookies.get('wp_jwt')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()

  const wpRes = await fetch(`${WP_URL}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Disposition': `attachment; filename="${file.name}"`,
      'Content-Type': file.type,
    },
    body: arrayBuffer,
  })

  if (!wpRes.ok) {
    const err = await wpRes.json().catch(() => ({}))
    return NextResponse.json(
      { error: (err as { message?: string }).message ?? `WordPress error ${wpRes.status}` },
      { status: wpRes.status },
    )
  }

  const data = await wpRes.json() as { id: number; source_url: string }
  return NextResponse.json({ url: data.source_url, id: data.id })
}
