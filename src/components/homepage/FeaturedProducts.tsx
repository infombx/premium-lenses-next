'use client'

import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { products as staticProducts } from '@/app/data/products';
import type { Product as WooMappedProduct } from '@/app/data/products';

interface Props {
  products?: WooMappedProduct[];
}

const BADGES: Record<number, string> = { 0: 'Best Seller', 2: 'New' };
const VISIBLE = 4;

export function FeaturedProducts({ products }: Props) {
  const source = products ?? staticProducts;
  const [startIndex, setStartIndex] = useState(0);

  const prev = () => setStartIndex((i) => (i - 1 + source.length) % source.length);
  const next = () => setStartIndex((i) => (i + 1) % source.length);

  const visible = Array.from({ length: VISIBLE }, (_, i) => source[(startIndex + i) % source.length]);

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl mb-4">Featured Products</h2>
          <p className="text-black/60 max-w-2xl">
            Discover our most popular contact lenses, trusted by thousands of customers worldwide
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {visible.map((product, index) => (
              <motion.div
                key={`${product.id}-${startIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
                className="group cursor-pointer"
              >
                <Link href={`/shop/${product.slug}`} className="block">
                  {/* Product Card */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full">
                      <p className="text-xs">
                        starts at <span className="font-medium">Rs{product.price}</span>
                      </p>
                    </div>

                    {/* Badge */}
                    {BADGES[index] && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs tracking-wider rounded">
                        {BADGES[index].toUpperCase()}
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl mb-2">{product.name}</h3>
                      <p className="text-sm text-white/80 mb-3">{product.category}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-white text-white" />
                          <span>4.8</span>
                          <span className="text-white/60">(1200)</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">Available Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <Link href="/shop" className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-colors duration-300 rounded text-center">
            VIEW MORE
          </Link>

          {/* Navigation Arrows */}
          <div className="flex gap-3 justify-center sm:justify-start">
            <button
              onClick={prev}
              className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
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
