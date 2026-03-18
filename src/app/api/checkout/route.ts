import { NextRequest, NextResponse } from 'next/server'
import { createOrder, WooOrder } from '@/lib/woocommerce'

export async function POST(request: NextRequest) {
  const body: WooOrder = await request.json()
  const result = await createOrder(body)
  if (!result) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
  return NextResponse.json(result)
}
