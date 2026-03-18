'use client'

import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { products } from '@/app/data/products';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export function FeaturedProducts() {
  const featuredProducts: Product[] = [
    {
      id: products[0].id,
      name: products[0].name,
      category: products[0].category,
      price: products[0].price,
      rating: 4.8,
      reviews: 1200,
      image: products[0].image,
      badge: 'Best Seller',
    },
    {
      id: products[1].id,
      name: products[1].name,
      category: products[1].category,
      price: products[1].price,
      rating: 4.6,
      reviews: 950,
      image: products[1].image,
    },
    {
      id: products[2].id,
      name: products[2].name,
      category: products[2].category,
      price: products[2].price,
      rating: 4.9,
      reviews: 2000,
      image: products[2].image,
      badge: 'New',
    },
    {
      id: products[3].id,
      name: products[3].name,
      category: products[3].category,
      price: products[3].price,
      rating: 4.7,
      reviews: 780,
      image: products[3].image,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex justify-between items-start mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4">Featured Products</h2>
            <p className="text-black/60 max-w-2xl">
              Discover our most popular contact lenses, trusted by thousands of customers worldwide
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="group cursor-pointer"
            >
              {/* Product Card */}
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                {/* Background Image */}
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Price Tag - Top Right */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                  <p className="text-xs">
                    starts at <span className="font-medium">${product.price}</span>
                  </p>
                </div>

                {/* Badge - Top Left */}
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-wider rounded">
                    {product.badge.toUpperCase()}
                  </div>
                )}

                {/* Content - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl mb-2">{product.name}</h3>

                  <p className="text-sm text-white/80 mb-3">{product.category}</p>

                  {/* Rating and Location */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-white text-white" />
                      <span>{product.rating}</span>
                      <span className="text-white/60">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">Available Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* View More Button */}
          <Link href="/shop" className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300 rounded text-center">
            VIEW MORE
          </Link>

          {/* Navigation Arrows */}
          <div className="flex gap-3 justify-center sm:justify-start">
            <button
              className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
