'use client'

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Beauty Enthusiast',
      content: 'These lenses completely transformed my look! The color is so natural and vibrant. I get compliments everywhere I go.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTg1MDAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 2,
      name: 'James Chen',
      role: 'Fashion Blogger',
      content: 'The perfect way to switch up my style! Comfortable to wear and the colors are absolutely stunning. A game-changer for my content.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzE4NTAwMDB8MA&ixlib=rb-4.1.0&q=80&w=400',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Style Influencer',
      content: 'I love how these lenses enhance my natural eye color! So comfortable and they make my eyes pop in photos. Obsessed!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTg1MDAwMHww&ixlib=rb-4.1.0&q=80&w=400',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-wider mb-4 text-black/40">TESTIMONIALS</p>
          <h2 className="text-3xl md:text-4xl mb-4">What Our Customers Say</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Trusted by thousands of satisfied customers worldwide
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <div className="border border-black/10 rounded-lg p-8 hover:border-black/20 transition-colors duration-300 h-full flex flex-col">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-black/80 mb-8 flex-grow leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                  <ImageWithFallback
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <p className="text-sm mb-1">{testimonial.name}</p>
                    <p className="text-xs text-black/40">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">50K+</div>
              <p className="text-sm text-black/60">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">4.9</div>
              <p className="text-sm text-black/60">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">98%</div>
              <p className="text-sm text-black/60">Love Their New Look</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl mb-2">15+</div>
              <p className="text-sm text-black/60">Years in Beauty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
