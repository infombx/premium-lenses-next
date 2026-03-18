import { getProducts, mapWooProduct } from '@/lib/woocommerce'
import { HeroBanner } from '@/components/homepage/HeroBanner'
import { StatsBar } from '@/components/homepage/StatsBar'
import { CategorySection } from '@/components/homepage/CategorySection'
import { FeaturedProducts } from '@/components/homepage/FeaturedProducts'
import { AboutStats } from '@/components/homepage/AboutStats'
import { Testimonials } from '@/components/homepage/Testimonials'

export default async function HomePage() {
  const wooProducts = await getProducts({ per_page: 4 })
  const products = wooProducts.length > 0 ? wooProducts.map(mapWooProduct) : undefined

  return (
    <>
      <HeroBanner />
      <StatsBar />
      <CategorySection />
      <FeaturedProducts products={products} />
      <AboutStats />
      <Testimonials />
    </>
  )
}
