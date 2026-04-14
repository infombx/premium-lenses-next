import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/woocommerce'

const BASE_URL = 'https://premiumlenses.mu'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  let productPages: MetadataRoute.Sitemap = []
  try {
    const products = await getProducts({ per_page: 100 })
    productPages = products.map(p => ({
      url: `${BASE_URL}/shop/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch {
    // If WooCommerce is unavailable, sitemap still works for static pages
  }

  return [...staticPages, ...productPages]
}
