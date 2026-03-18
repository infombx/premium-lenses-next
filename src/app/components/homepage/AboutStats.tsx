import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';
import { Award, Users, Globe, Clock } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Import all eye color variations
import image1 from 'figma:asset/3c7399a71e1ca7130bfad8769df3a0bd8a15e860.png';
import image2 from 'figma:asset/7ce218e3c3182be1fd5d77b2fc156b9da7983fa5.png';
import image3 from 'figma:asset/61f6e644cf51f6ae867d9a3d8576e7f2a6fbc311.png';
import image4 from 'figma:asset/4323b2606492e25d7805f6e389ef484148cd1514.png';
import image5 from 'figma:asset/477535dc8f09e1bbb59f0a34ca52544474e3fa96.png';

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

export function AboutStats() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const images = [image1, image2, image3, image4, image5];

  const stats: Stat[] = [
    {
      icon: Users,
      value: '500K+',
      label: 'Style Transformations',
    },
    {
      icon: Globe,
      value: '50+',
      label: 'Countries Worldwide',
    },
    {
      icon: Award,
      value: '15+',
      label: 'Years of Beauty Innovation',
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Customer Support',
    },
  ];

  // Start cycling through images when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Cycle through images with smooth transitions
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1200); // Change image every 1.2 seconds

    return () => clearInterval(interval);
  }, [isInView, images.length]);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-stretch">
          {/* Left Side - Image with Eye Color Transitions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex"
          >
            <div className="relative w-full aspect-[4/5] lg:aspect-auto lg:h-full rounded-lg overflow-hidden border border-black/10">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{
                    opacity: currentImageIndex === index ? 1 : 0,
                  }}
                >
                  <ImageWithFallback
                    src={image}
                    alt="About our brand - Eye color variations"
                    className="w-full h-full object-cover scale-[2.5] object-[75%_35%] lg:object-[50%_35%]"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-xs tracking-wider mb-4 text-black/40">ABOUT US</p>
            <h2 className="text-3xl md:text-4xl mb-6">
              Beauty Meets Comfort
            </h2>
            <div className="space-y-4 text-black/60 mb-12">
              <p>
                For over 15 years, we've been helping people express their unique style through 
                premium colored contact lenses. From subtle enhancements to bold transformations, 
                our collection brings your vision to life with stunning, natural-looking colors.
              </p>
              <p>
                We partner with trusted manufacturers to ensure every lens combines breathtaking 
                aesthetics with exceptional comfort and safety, so you can look amazing all day long.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.3 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    className="border border-black/10 rounded-lg p-6 bg-black/[0.02]"
                  >
                    <Icon className="w-6 h-6 mb-4 text-black/40" strokeWidth={1.5} />
                    <div className="text-2xl md:text-3xl mb-1">{stat.value}</div>
                    <div className="text-sm text-black/60">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}