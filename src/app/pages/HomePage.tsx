import { HeroBanner } from '../components/homepage/HeroBanner';
import { StatsBar } from '../components/homepage/StatsBar';
import { CategorySection } from '../components/homepage/CategorySection';
import { FeaturedProducts } from '../components/homepage/FeaturedProducts';
import { AboutStats } from '../components/homepage/AboutStats';
import { Testimonials } from '../components/homepage/Testimonials';

export function HomePage() {
  return (
    <>
      <HeroBanner />
      <StatsBar />
      <CategorySection />
      <FeaturedProducts />
      <AboutStats />
      <Testimonials />
    </>
  );
}
