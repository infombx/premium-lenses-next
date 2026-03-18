import { useState, useEffect } from 'react';
import { Eye, Heart, Zap, Users, Award, TrendingUp, ChevronDown, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import aboutHeroImage from 'figma:asset/f7c7946c85a38c2f9e0c12270faf1c001faa0d27.png';

export function AboutPage() {
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
          <img 
            src={aboutHeroImage} 
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
                SINCE 2014
              </div>
              <h1 className="text-3xl md:text-7xl mb-6 md:mb-8 leading-tight">
                Redefining Beauty
              </h1>
              <p className="text-base md:text-2xl text-white/80 leading-relaxed">
                We combine stunning aesthetics with uncompromising quality to deliver 
                exceptional beauty transformation.
              </p>
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
            {[
              { value: 10, suffix: '+', label: 'YEARS', icon: Award },
              { value: 50, suffix: 'K+', label: 'CUSTOMERS', icon: Users },
              { value: 100, suffix: '+', label: 'PRODUCTS', icon: Eye },
              { value: 99, suffix: '%', label: 'SATISFACTION', icon: TrendingUp },
            ].map((stat, index) => (
              <StatCounter
                key={stat.label}
                stat={stat}
                isVisible={visibleSections.has('stats')}
                delay={index * 100}
              />
            ))}
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
              <h2 className="text-4xl md:text-5xl mb-8">Our Story</h2>
              <div className="space-y-6 text-black/70 leading-relaxed text-lg">
                <p>
                  Founded with a passion for beauty and self-expression, we've been serving customers 
                  for over a decade. What started as a small vision to enhance natural beauty has grown 
                  into a trusted source for stunning colored contact lenses.
                </p>
                <p>
                  We believe that everyone deserves to express their unique style. That's why we partner 
                  with leading manufacturers to bring you the latest in beauty lens designs, all at prices 
                  that make transformation accessible.
                </p>
                <p>
                  Our team of beauty specialists is committed to helping you find the perfect lenses 
                  for your look, whether you're seeking subtle enhancement, dramatic transformation, or 
                  versatile everyday styles.
                </p>
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
            <h2 className="text-4xl md:text-5xl mb-4">Our Values</h2>
            <p className="text-black/60 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: 'Quality First',
                description: 'We source only certified lenses from trusted manufacturers, ensuring the highest standards of safety, comfort, and vibrant color.',
                stats: '100% Certified',
                expandedText: 'Every product undergoes rigorous quality control testing before reaching you. We partner exclusively with industry-leading brands known for their commitment to eye health and stunning designs. Our quality assurance team inspects each batch, and we maintain full traceability from manufacturer to your doorstep.'
              },
              {
                icon: Heart,
                title: 'Customer Care',
                description: 'Your beauty journey is our priority. Our expert team is always ready to help you find the perfect lenses for your style.',
                stats: '24/7 Support',
                expandedText: 'Our dedicated support specialists are beauty consultants with years of experience in colored contacts. Whether you need help choosing the right color for your skin tone, understanding lens options, or troubleshooting any issues, we\'re here around the clock. We believe in building lasting relationships, not just processing orders.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'We stay ahead of the curve, bringing you the latest advances in beauty lens design for stunning looks and superior comfort.',
                stats: 'Latest Trends',
                expandedText: 'We continuously research and test emerging trends in lens colors, patterns, and designs. From natural enhancement shades to bold statement colors and advanced pigment technologies, we ensure you have access to cutting-edge products that enhance both your beauty and comfort.'
              },
            ].map((value, index) => (
              <ValueCard
                key={value.title}
                value={value}
                index={index}
                isActive={activeValue === index}
                onClick={() => setActiveValue(activeValue === index ? null : index)}
                isVisible={visibleSections.has('values')}
              />
            ))}
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
            <h2 className="text-4xl md:text-5xl mb-4">Our Journey</h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Milestones that shaped our story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {[
              { 
                year: '2014', 
                title: 'Founded', 
                description: 'Started with a vision to revolutionize beauty contact lens shopping',
                details: 'With just a small team of passionate beauty enthusiasts, we launched our first online platform. Our mission was simple: make stunning colored contact lenses accessible to everyone. We started with 20 products and a commitment to exceptional customer service.'
              },
              { 
                year: '2016', 
                title: 'First 10K Customers', 
                description: 'Reached our first major milestone in customer satisfaction',
                details: 'This milestone validated our approach to combining quality products with outstanding service. We expanded our customer support team and introduced our first loyalty program, rewarding customers who trusted us with their beauty transformation.'
              },
              { 
                year: '2019', 
                title: 'Expanded Product Line', 
                description: 'Introduced diverse color palettes and special effects',
                details: 'Listening to customer feedback, we partnered with leading manufacturers to offer natural enhancement shades, bold transformation colors, and stunning special effect designs. Our catalog grew to over 100 products, each meeting our rigorous quality and beauty standards.'
              },
              { 
                year: '2022', 
                title: 'Industry Recognition', 
                description: 'Awarded Best Online Beauty Lens Provider',
                details: 'The Beauty Industry Association recognized our commitment to quality and innovation. This award came after launching our advanced virtual try-on feature and color matching system, helping customers find their perfect shade before purchasing.'
              },
              { 
                year: '2024', 
                title: 'Innovation Leader', 
                description: 'Launched next-generation color and comfort technology',
                details: 'We introduced exclusive partnerships with manufacturers using advanced pigment layering and bio-inspired materials. Our new product line features the latest in vibrant, natural-looking colors with superior moisture-retention technology, providing all-day comfort and stunning looks that exceed industry standards.'
              },
            ].map((milestone, index) => (
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
          <h2 className="text-4xl md:text-5xl mb-6">Join Our Beauty Journey</h2>
          <p className="text-black/60 max-w-2xl mx-auto text-lg mb-8">
            Experience the difference that stunning colors and exceptional quality can make
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg"
          >
            <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300">SHOP NOW</span>
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