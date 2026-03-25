'use client'

import { useState, useEffect } from 'react';
import { Eye, Heart, Zap, Users, Award, TrendingUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import type { AboutContent as AboutContentType } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { EditableImage } from '@/components/cms/EditableImage';
import { PAGE_IDS } from '@/lib/cmsFields';

const VALUE_ICONS = [Eye, Heart, Zap];

function parseStatValue(s: string): { value: number; suffix: string } {
  const match = s.match(/^(\d+)(.*)$/)
  if (!match) return { value: 0, suffix: '' }
  return { value: parseInt(match[1]), suffix: match[2] }
}

interface Props { content: AboutContentType }

export default function AboutContent({ content }: Props) {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [activeValue, setActiveValue] = useState<number | null>(null);
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen bg-black text-white overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <EditableImage
            pageId={PAGE_IDS.about}
            fieldName="hero_image"
            src={content.hero_image}
            alt="About hero background"
            className="w-full h-full object-cover object-[25%_20%] md:object-[center_35%]"
          />
          {/* Minimal gradient overlay - only for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center h-full">
            {/* Left side - empty space */}
            <div className="hidden lg:block"></div>

            {/* Right Content */}
            <div
              className="space-y-6 md:space-y-8 max-w-xl ml-auto text-right"
              style={{
                transform: `translateY(-${scrollY * 0.15}px)`,
              }}
            >
              <div className="inline-block mb-6 px-4 py-2 border border-white/20 rounded-full text-xs tracking-widest animate-pulse">
                {content.hero_badge}
              </div>
              <EditableField pageId={PAGE_IDS.about} fieldName="hero_headline" value={content.hero_headline}>
                <h1 className="text-3xl md:text-7xl mb-6 md:mb-8 leading-tight">
                  {content.hero_headline}
                </h1>
              </EditableField>
              <EditableField pageId={PAGE_IDS.about} fieldName="hero_subheading" value={content.hero_subheading} multiline>
                <p className="text-base md:text-2xl text-white/80 leading-relaxed">
                  {content.hero_subheading}
                </p>
              </EditableField>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-white/60" />
        </div>
      </section>

      {/* Interactive Stats Counter */}
      <section
        id="stats"
        data-animate
        className="py-24 md:py-32 bg-white"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {content.stats.map((s, index) => {
              const STAT_ICONS = [Award, Users, Eye, TrendingUp];
              const { value, suffix } = parseStatValue(s.value);
              return (
                <StatCounter
                  key={s.label}
                  stat={{ value, suffix, label: s.label, icon: STAT_ICONS[index % STAT_ICONS.length] }}
                  isVisible={visibleSections.has('stats')}
                  delay={index * 100}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story - Split Animation */}
      <section
        id="story"
        data-animate
        className="py-24 md:py-32 bg-black/[0.02]"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${
                visibleSections.has('story')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-12'
              }`}
            >
              <h2 className="text-4xl md:text-5xl mb-8">{content.story_title}</h2>
              <div className="space-y-6 text-black/70 leading-relaxed text-lg">
                {content.story_paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-200 ${
                visibleSections.has('story')
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-12'
              }`}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-500" />
                <div className="aspect-[4/3] bg-black/5 rounded-2xl relative overflow-hidden">
                  {/* Decorative grid pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <div
                          key={i}
                          className="border border-black/20 transform transition-all duration-500 hover:bg-black/10"
                          style={{
                            transitionDelay: `${i * 10}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Values Cards */}
      <section
        id="values"
        data-animate
        className="py-24 md:py-32"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl mb-4">{content.values_title}</h2>
            <p className="text-black/60 max-w-2xl mx-auto text-lg">
              {content.values_description}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.values.map((v, index) => {
              const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
              const value = { icon: Icon, title: v.title, description: v.short, stats: v.badge, expandedText: v.expanded };
              return (
              <ValueCard
                key={value.title}
                value={value}
                index={index}
                isActive={activeValue === index}
                onClick={() => setActiveValue(activeValue === index ? null : index)}
                isVisible={visibleSections.has('values')}
              />
            );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section
        id="timeline"
        data-animate
        className="py-24 md:py-32 bg-black text-white"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl mb-4">{content.timeline_title}</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              {content.timeline_subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {content.timeline.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative pl-8 md:pl-12 pb-12 border-l-2 transition-all duration-500 ${
                  hoveredTimeline === index || !visibleSections.has('timeline')
                    ? 'border-white/20'
                    : 'border-white/10'
                } ${
                  visibleSections.has('timeline')
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
                onMouseEnter={() => setHoveredTimeline(index)}
                onMouseLeave={() => setHoveredTimeline(null)}
              >
                <div className={`absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
                  hoveredTimeline === index
                    ? 'bg-white scale-150'
                    : 'bg-black'
                }`} />

                <div
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredTimeline === index ? 'translate-x-2' : ''
                  }`}
                  onClick={() => setExpandedTimeline(expandedTimeline === index ? null : index)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-sm text-white/50 tracking-wider">{milestone.year}</div>
                    <button className={`w-6 h-6 rounded-full border border-white/30 flex items-center justify-center transition-all duration-300 ${
                      expandedTimeline === index ? 'bg-white rotate-180' : 'hover:bg-white/10'
                    }`}>
                      {expandedTimeline === index ? (
                        <Minus className="w-4 h-4 text-black" />
                      ) : (
                        <Plus className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                  <h3 className="text-2xl md:text-3xl mb-2">{milestone.title}</h3>
                  <p className="text-white/70 leading-relaxed">{milestone.description}</p>

                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    expandedTimeline === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="border-l-2 border-white/20 pl-4 py-2">
                      <p className="text-white/60 leading-relaxed">
                        {milestone.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl mb-6">{content.cta_title}</h2>
          <p className="text-black/60 max-w-2xl mx-auto text-lg mb-8">
            {content.cta_subtitle}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg"
          >
            <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300">{content.cta_button}</span>
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </div>
      </section>
    </div>
  );
}

// Animated Stat Counter Component
function StatCounter({
  stat,
  isVisible,
  delay
}: {
  stat: { value: number; suffix: string; label: string; icon: any };
  isVisible: boolean;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, hasAnimated, stat.value]);

  const Icon = stat.icon;

  return (
    <div
      className="text-center group cursor-pointer"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center group-hover:bg-white group-hover:border-2 group-hover:border-black transition-all duration-300">
          <Icon className="w-8 h-8 text-white group-hover:text-black transition-colors duration-300" />
        </div>
      </div>
      <div className="text-5xl md:text-6xl mb-2 font-light">
        {count}{stat.suffix}
      </div>
      <p className="text-sm text-black/60 tracking-widest">{stat.label}</p>
    </div>
  );
}

// Interactive Value Card Component
function ValueCard({
  value,
  index,
  isActive,
  onClick,
  isVisible
}: {
  value: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
  isVisible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = value.icon;

  return (
    <div
      className={`relative border border-black/10 rounded-2xl p-8 cursor-pointer transition-all duration-500 ${
        isActive ? 'bg-black text-white scale-105' : 'bg-white hover:shadow-xl'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: hovered && !isActive ? 'translateY(-8px)' : '',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center transition-all duration-300 ${
        isActive ? 'bg-white' : 'bg-black'
      }`}>
        <Icon className={`w-8 h-8 transition-colors duration-300 ${
          isActive ? 'text-black' : 'text-white'
        }`} />
      </div>

      <h3 className="text-2xl mb-4">{value.title}</h3>
      <p className={`leading-relaxed mb-4 transition-colors duration-300 ${
        isActive ? 'text-white/80' : 'text-black/60'
      }`}>
        {value.description}
      </p>

      <div className={`inline-block px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 ${
        isActive
          ? 'bg-white/20 text-white'
          : 'bg-black/5 text-black/60'
      }`}>
        {value.stats}
      </div>

      {/* Click indicator */}
      <div className={`absolute bottom-4 right-4 text-xs transition-opacity duration-300 ${
        hovered && !isActive ? 'opacity-100' : 'opacity-0'
      }`}>
        Click to expand
      </div>

      {/* Expanded Text */}
      <div className={`overflow-hidden transition-all duration-500 ${
        isActive ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`border-t pt-4 ${
          isActive ? 'border-white/20' : 'border-black/10'
        }`}>
          <p className={`text-sm leading-relaxed ${
            isActive ? 'text-white/70' : 'text-black/60'
          }`}>
            {value.expandedText}
          </p>
        </div>
      </div>
    </div>
  );
}
