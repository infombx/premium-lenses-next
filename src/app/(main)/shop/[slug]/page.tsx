import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts } from '@/app/data/products'
import ProductDetail from './ProductDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params

  const [wooProduct, wooAll] = await Promise.all([
    getProductBySlug(slug),
    getProducts({ per_page: 100 }),
  ])

  const allProducts = wooAll.length > 0 ? wooAll.map(mapWooProduct) : staticProducts
  const product = wooProduct ? mapWooProduct(wooProduct) : allProducts.find(p => p.slug === slug)

  if (!product) notFound()

  const relatedProducts = allProducts
    .filter(p => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
