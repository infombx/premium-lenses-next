import { NextRequest, NextResponse } from 'next/server'

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''

export async function POST(request: NextRequest) {
  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
  }

  const wpRes = await fetch(`${WP_URL}/wp-json/jwt-auth/v1/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!wpRes.ok) {
    const err = await wpRes.json().catch(() => ({}))
    return NextResponse.json(
      { error: (err as { message?: string }).message ?? 'Invalid credentials' },
      { status: 401 },
    )
  }

  const data = (await wpRes.json()) as { token: string; user_display_name: string }

  const response = NextResponse.json({ ok: true, name: data.user_display_name })
  response.cookies.set('wp_jwt', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })
  response.cookies.set('edit-mode', '1', {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  })

  return response
}
