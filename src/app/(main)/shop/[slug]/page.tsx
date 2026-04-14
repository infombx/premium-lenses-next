import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts } from '@/app/data/products'
import { ProductSchema } from '@/components/seo/ProductSchema'
import ProductDetail from './ProductDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const wooProduct = await getProductBySlug(slug)
  const product = wooProduct ? mapWooProduct(wooProduct) : staticProducts.find(p => p.slug === slug)

  if (!product) return { title: 'Product Not Found' }

  const description = product.description
    ? product.description.replace(/<[^>]+>/g, '').slice(0, 160)
    : `Buy ${product.name} — premium contact lenses in Mauritius. Quality, comfort, and style.`

  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      url: `https://premiumlenses.mu/shop/${slug}`,
      type: 'website',
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    alternates: { canonical: `https://premiumlenses.mu/shop/${slug}` },
  }
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

  return (
    <>
      <ProductSchema product={product} />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  )
}
