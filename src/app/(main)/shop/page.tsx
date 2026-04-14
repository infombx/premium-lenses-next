import type { Metadata } from 'next'
import { getProducts, getCategories, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts, categories as staticCategories } from '@/app/data/products'
import { getShopHeroContent } from '@/lib/wordpress'
import { getPageSEO } from '@/lib/seo'
import { ItemListSchema } from '@/components/seo/ItemListSchema'
import ShopContent from './ShopContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('shop-hero', {
    title: 'Shop Contact Lenses',
    description: 'Browse premium colored, prescription, daily, and toric contact lenses in Mauritius. Fast delivery, cash on delivery.',
    ogImage: undefined,
  })
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://premiumlenses.mu/shop',
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    alternates: { canonical: 'https://premiumlenses.mu/shop' },
  }
}

export default async function ShopPage() {
  const [wooProducts, wooCategories, heroContent] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories(),
    getShopHeroContent(),
  ])

  const products = wooProducts.length > 0
    ? wooProducts.map(mapWooProduct)
    : staticProducts

  const categories = wooProducts.length > 0
    ? ['ALL ITEMS', ...wooCategories.map(c => c.name.toUpperCase())]
    : staticCategories

  return (
    <>
      <ItemListSchema products={products} />
      <ShopContent products={products} categories={categories} heroContent={heroContent} />
    </>
  )
}
