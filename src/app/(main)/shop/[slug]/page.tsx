import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductBySlug, getProducts, getProductVariations, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts } from '@/app/data/products'
import { ProductSchema } from '@/components/seo/ProductSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import ProductDetail from './ProductDetail'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const wooProduct = await getProductBySlug(slug)
  const product = wooProduct ? mapWooProduct(wooProduct) : staticProducts.find(p => p.slug === slug)

  if (!product) return { title: 'Product Not Found' }

  const rawDesc = product.description?.replace(/<[^>]+>/g, '').trim() ?? ''
  const category = product.category
    ? product.category.charAt(0) + product.category.slice(1).toLowerCase()
    : 'Contact Lenses'
  const price = product.price > 0 ? ` Rs${product.price}.` : ''

  const description = rawDesc.length > 20
    ? rawDesc.slice(0, 155) + (rawDesc.length > 155 ? '…' : '')
    : `Buy ${product.name} — ${category} in Mauritius.${price} Quality, comfort & style. Order today at Premium Lenses.`

  const title = `${product.name} | Premium Lenses`

  return {
    title: product.name,
    description,
    openGraph: {
      title,
      description,
      url: `https://premiumlenses.mu/shop/${slug}`,
      type: 'website',
      images: product.image
        ? [{ url: product.image, alt: product.name, width: 800, height: 800 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
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

  const allProducts = wooAll.length > 0 ? wooAll.map(p => mapWooProduct(p)) : staticProducts

  let product
  if (wooProduct) {
    const variations = wooProduct.type === 'variable' ? await getProductVariations(wooProduct.id) : []
    product = mapWooProduct(wooProduct, variations)
  } else {
    product = allProducts.find(p => p.slug === slug)
  }

  if (!product) notFound()

  const relatedProducts = allProducts
    .filter(p => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4)

  return (
    <>
      <ProductSchema product={product} />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://premiumlenses.mu' },
        { name: 'Shop', url: 'https://premiumlenses.mu/shop' },
        { name: product.name, url: `https://premiumlenses.mu/shop/${product.slug}` },
      ]} />
      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  )
}
