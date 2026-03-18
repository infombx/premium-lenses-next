import { getProducts, getCategories, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts, categories as staticCategories } from '@/app/data/products'
import ShopContent from './ShopContent'

export default async function ShopPage() {
  const [wooProducts, wooCategories] = await Promise.all([
    getProducts({ per_page: 100 }),
    getCategories(),
  ])

  const products = wooProducts.length > 0
    ? wooProducts.map(mapWooProduct)
    : staticProducts

  const categories = wooProducts.length > 0
    ? ['ALL ITEMS', ...wooCategories.map(c => c.name.toUpperCase())]
    : staticCategories

  return <ShopContent products={products} categories={categories} />
}
