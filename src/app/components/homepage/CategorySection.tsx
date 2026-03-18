import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { ArrowRight, Eye, Droplets, Palette, Grid } from 'lucide-react';
import { products } from '../../data/products';
import { Link } from 'react-router';

interface Category {
  title: string;
  description: string;
  link: string;
  image: string;
  icon: any;
}

export function CategorySection() {
  const categories: Category[] = [
    {
      title: 'COLORED SHADES',
      description: 'Transform your look with vibrant, natural-looking colors',
      link: '/shop?category=COLORED SHADES',
      image: products[0].image, // AI Blue
      icon: Palette,
    },
    {
      title: 'PRESCRIBED SHADES',
      description: 'Corrective lenses for clear, comfortable vision',
      link: '/shop?category=PRESCRIBED SHADES',
      image: products[1].image, // Angeles Fe Gray
      icon: Eye,
    },
    {
      title: 'SOLUTIONS',
      description: 'Premium care products for your lenses',
      link: '/shop?category=SOLUTIONS',
      image: 'https://images.unsplash.com/photo-1550572017-4b7a301b9d81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250YWN0JTIwbGVucyUyMHNvbHV0aW9uJTIwYm90dGxlfGVufDF8fHx8MTc3MjY5NjM0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      icon: Droplets,
    },
    {
      title: 'ALL ITEMS',
      description: 'Browse our complete collection',
      link: '/shop',
      image: products[3].image, // Amazon Brown
      icon: Grid,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-black/[0.02]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Shop by Category</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Discover the perfect lenses tailored to your lifestyle and vision requirements
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:max-h-[600px]">
          {/* Large Card - Left Side (spans 2 columns and 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-2 md:row-span-2"
          >
            <Link to={categories[0].link} className="block group cursor-pointer h-full">
              <div className="relative h-[320px] md:h-full rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={categories[0].image}
                  alt={categories[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = categories[0].icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl md:text-3xl mb-2">{categories[0].title}</h3>
                  <p className="text-sm md:text-base text-white/80">{categories[0].description}</p>
                </div>

                <div className="absolute bottom-6 right-6">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-5 h-5 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Top Right - Card 2 (spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:col-span-2"
          >
            <Link to={categories[1].link} className="block group cursor-pointer h-full">
              <div className="relative h-[240px] md:h-full rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={categories[1].image}
                  alt={categories[1].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-5 left-5">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = categories[1].icon;
                      return <Icon className="w-5 h-5 text-white" />;
                    })()}
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-xl md:text-2xl mb-1">{categories[1].title}</h3>
                  <p className="text-xs md:text-sm text-white/80">{categories[1].description}</p>
                </div>

                <div className="absolute bottom-5 right-5">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Bottom Right - Card 3 (1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link to={categories[2].link} className="block group cursor-pointer h-full">
              <div className="relative h-[240px] md:h-full rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={categories[2].image}
                  alt={categories[2].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-5 left-5">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = categories[2].icon;
                      return <Icon className="w-4 h-4 text-white" />;
                    })()}
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg md:text-xl mb-1">{categories[2].title}</h3>
                  <p className="text-xs text-white/80">{categories[2].description}</p>
                </div>

                <div className="absolute bottom-5 right-5">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Bottom Right - Card 4 (1 column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link to={categories[3].link} className="block group cursor-pointer h-full">
              <div className="relative h-[240px] md:h-full rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src={categories[3].image}
                  alt={categories[3].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-5 left-5">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    {(() => {
                      const Icon = categories[3].icon;
                      return <Icon className="w-4 h-4 text-white" />;
                    })()}
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <h3 className="text-lg md:text-xl mb-1">{categories[3].title}</h3>
                  <p className="text-xs text-white/80">{categories[3].description}</p>
                </div>

                <div className="absolute bottom-5 right-5">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
