const WOO_URL = process.env.NEXT_PUBLIC_WC_URL || ''
const WOO_KEY = process.env.WC_CONSUMER_KEY || ''
const WOO_SECRET = process.env.WC_CONSUMER_SECRET || ''

function getAuthHeader() {
  const credentials = Buffer.from(`${WOO_KEY}:${WOO_SECRET}`).toString('base64')
  return `Basic ${credentials}`
}

export interface WooProduct {
  id: number
  name: string
  slug: string
  price: string
  regular_price: string
  sale_price: string
  description: string
  short_description: string
  images: { src: string; alt: string }[]
  categories: { id: number; name: string; slug: string }[]
  attributes: { name: string; options: string[] }[]
  meta_data: { key: string; value: string }[]
  stock_status: string
  in_stock: boolean
}

export interface WooOrder {
  payment_method: string
  payment_method_title: string
  set_paid: boolean
  billing: {
    first_name: string
    last_name: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
    email: string
    phone: string
  }
  shipping: {
    first_name: string
    last_name: string
    address_1: string
    address_2: string
    city: string
    state: string
    postcode: string
    country: string
  }
  line_items: {
    product_id: number
    quantity: number
  }[]
}

export async function getProducts(params?: { category?: string; per_page?: number; page?: number }): Promise<WooProduct[]> {
  if (!WOO_URL) return []
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.per_page) searchParams.set('per_page', String(params.per_page))
  if (params?.page) searchParams.set('page', String(params.page))

  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/products?${searchParams}`, {
    headers: { Authorization: getAuthHeader() },
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  return res.json()
}

export async function getProduct(id: number): Promise<WooProduct | null> {
  if (!WOO_URL) return null
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/products/${id}`, {
    headers: { Authorization: getAuthHeader() },
    next: { revalidate: 60 },
  })
  if (!res.ok) return null
  return res.json()
}

export async function createOrder(order: WooOrder): Promise<{ id: number; number: string } | null> {
  if (!WOO_URL) return null
  const res = await fetch(`${WOO_URL}/wp-json/wc/v3/orders`, {
    method: 'POST',
    headers: {
      Authorization: getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
  if (!res.ok) return null
  return res.json()
}
