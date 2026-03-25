'use client'

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import type { HomepageContent } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { EditableImage } from '@/components/cms/EditableImage';
import { PAGE_IDS } from '@/lib/cmsFields';

interface Props {
  content: Pick<HomepageContent, 'hero_headline' | 'hero_subheading' | 'hero_cta_primary' | 'hero_cta_secondary' | 'hero_image'>
}

export function HeroBanner({ content }: Props) {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <EditableImage
          pageId={PAGE_IDS.homepage}
          fieldName="hero_image"
          src={content.hero_image}
          alt="Hero background"
          className="w-full h-full object-cover object-[75%_center] md:object-center"
        />
        {/* Gradient overlay - lighter to show the woman's face */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent md:from-black/60 md:via-black/40 md:to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-80 md:pt-56 pb-12 md:pb-16 lg:pb-24 h-full min-h-screen z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">

          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 max-w-xl">
            {/* Main Headline */}
            <EditableField pageId={PAGE_IDS.homepage} fieldName="hero_headline" value={content.hero_headline}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] tracking-tight text-white">
                {content.hero_headline}
              </h1>
            </EditableField>

            {/* Description */}
            <div className="max-w-md">
              <EditableField pageId={PAGE_IDS.homepage} fieldName="hero_subheading" value={content.hero_subheading} multiline>
                <p className="text-sm md:text-base text-white/80 leading-relaxed">
                  {content.hero_subheading}
                </p>
              </EditableField>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-3 bg-white text-black overflow-hidden transition-all duration-300 w-full rounded-lg"
                >
                  <span className="relative z-10 text-sm tracking-wider group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-2">
                    {content.hero_cta_primary}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </Link>
              <Link href="/shop">
                <button className="px-8 py-3 border border-white/40 text-white hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group rounded-lg w-full">
                  {content.hero_cta_secondary}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right side - empty space */}
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </section>
  );
}
