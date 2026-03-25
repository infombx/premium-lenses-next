'use client'

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { HomepageContent } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { PAGE_IDS } from '@/lib/cmsFields';

const TESTIMONIAL_IMAGES = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
]

interface Props {
  content: Pick<HomepageContent, 'testimonials_title' | 'testimonials_subtitle' | 'testimonials' | 'testimonial_stats'>
}

export function Testimonials({ content }: Props) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs tracking-wider mb-4 text-black/40">TESTIMONIALS</p>
          <EditableField pageId={PAGE_IDS.homepage} fieldName="testimonials_title" value={content.testimonials_title}>
            <h2 className="text-3xl md:text-4xl mb-4">{content.testimonials_title}</h2>
          </EditableField>
          <EditableField pageId={PAGE_IDS.homepage} fieldName="testimonials_subtitle" value={content.testimonials_subtitle} multiline>
            <p className="text-black/60 max-w-2xl mx-auto">
              {content.testimonials_subtitle}
            </p>
          </EditableField>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {content.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
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
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>

                {/* Content */}
                <EditableField pageId={PAGE_IDS.homepage} fieldName={`testimonial_${index + 1}_quote`} value={testimonial.quote} multiline className="flex-grow">
                  <p className="text-black/80 mb-8 flex-grow leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </EditableField>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-black/10">
                  <ImageWithFallback
                    src={TESTIMONIAL_IMAGES[index % TESTIMONIAL_IMAGES.length]}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <EditableField pageId={PAGE_IDS.homepage} fieldName={`testimonial_${index + 1}_name`} value={testimonial.name}>
                      <p className="text-sm mb-1">{testimonial.name}</p>
                    </EditableField>
                    <EditableField pageId={PAGE_IDS.homepage} fieldName={`testimonial_${index + 1}_role`} value={testimonial.role}>
                      <p className="text-xs text-black/40">{testimonial.role}</p>
                    </EditableField>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-20 pt-16 border-t border-black/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.testimonial_stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl mb-2">{stat.value}</div>
                <p className="text-sm text-black/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
