import { getProducts, mapWooProduct } from '@/lib/woocommerce'
import { getHomepageContent } from '@/lib/wordpress'
import { HeroBanner } from '@/components/homepage/HeroBanner'
import { StatsBar } from '@/components/homepage/StatsBar'
import { CategorySection } from '@/components/homepage/CategorySection'
import { FeaturedProducts } from '@/components/homepage/FeaturedProducts'
import { AboutStats } from '@/components/homepage/AboutStats'
import { Testimonials } from '@/components/homepage/Testimonials'

export default async function HomePage() {
  const [wooProducts, cms] = await Promise.all([
    getProducts({ per_page: 4 }),
    getHomepageContent(),
  ])
  const products = wooProducts.length > 0 ? wooProducts.map(mapWooProduct) : undefined

  return (
    <>
      <HeroBanner content={cms} />
      <StatsBar stats={cms.stats} />
      <CategorySection content={cms} />
      <FeaturedProducts products={products} />
      <AboutStats content={cms} />
      <Testimonials content={cms} />
    </>
  )
}
