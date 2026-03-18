import { notFound } from 'next/navigation'
import { getProduct, getProducts, mapWooProduct } from '@/lib/woocommerce'
import { products as staticProducts } from '@/app/data/products'
import ProductDetail from './ProductDetail'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const numId = Number(id)

  const [wooProduct, wooAll] = await Promise.all([
    getProduct(numId),
    getProducts({ per_page: 100 }),
  ])

  const allProducts = wooAll.length > 0 ? wooAll.map(mapWooProduct) : staticProducts
  const product = wooProduct ? mapWooProduct(wooProduct) : allProducts.find(p => p.id === numId)

  if (!product) notFound()

  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)

  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
