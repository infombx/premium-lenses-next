'use client'

import { Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const contactBgImage = '/assets/bd6db3455f9fbd65eb2b7f615633839089ab5a7d.png';

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section
        className="relative -mt-40 pt-72 pb-20 md:-mt-44 md:pt-80 md:pb-32 text-white overflow-hidden"
        style={{
          backgroundImage: `url(${contactBgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * 15}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              Contact Us
            </h1>
            <p
              className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              Get In Touch
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <div className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Call Us</p>
              <p className="text-black">+1 (555) 123-4567</p>
            </div>

            {/* Email Card */}
            <div className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Email Us</p>
              <p className="text-black">hello@beautylens.com</p>
            </div>

            {/* Location Card */}
            <div className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Visit Us</p>
              <p className="text-black">+971-043132-343</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Connect With Us Today!</h2>
              <p className="text-black/60 max-w-2xl mx-auto">
                Whether you have a question about colors, need help finding your perfect shade,
                or just want to share your transformation story, we&apos;re here to help. Fill out the form below and
                we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm mb-2 text-black/80">Name*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm mb-2 text-black/80">Company*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label className="block text-sm mb-2 text-black/80">Email*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm mb-2 text-black/80">Phone Number*</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm mb-2 text-black/80">Message*</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                  placeholder="Enter your message"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="group relative px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg"
              >
                <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300">SEND MESSAGE</span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-[400px] md:h-[500px] bg-black/5 border-t border-black/10 relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d479631.0317183673!2d57.3421191!3d-20.1608912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c504df94474c9%3A0x4203d9c2116bd031!2sMauritius!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mauritius Location"
          />
        </div>
      </section>
    </div>
  );
}
