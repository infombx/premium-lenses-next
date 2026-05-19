'use client'

import { Phone, Mail, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

const MapboxMap = dynamic(() => import('@/components/MapboxMap'), { ssr: false })
import type { ContactContent as ContactContentType } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { PAGE_IDS } from '@/lib/cmsFields';

interface Props { content: ContactContentType }

export default function ContactContent({ content }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? 'sent' : 'error');
  };

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
          backgroundImage: `url(${content.hero_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center">
            <EditableField pageId={PAGE_IDS.contact} fieldName="hero_title" value={content.hero_title}>
              <h1
                className="text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * -15}deg) rotateY(${mousePosition.x * 15}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {content.hero_title}
              </h1>
            </EditableField>
            <EditableField pageId={PAGE_IDS.contact} fieldName="hero_subtitle" value={content.hero_subtitle} multiline>
              <p
                className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto transition-transform duration-200 ease-out"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {content.hero_subtitle}
              </p>
            </EditableField>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <a href={`tel:${content.phone.replace(/\s/g, '')}`} className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors block group">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black/10 transition-colors">
                <Phone className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Call Us</p>
              <EditableField pageId={PAGE_IDS.contact} fieldName="phone" value={content.phone}>
                <p className="text-black group-hover:underline underline-offset-2">{content.phone}</p>
              </EditableField>
            </a>

            {/* Email Card */}
            <a href={`mailto:${content.email}`} className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors block group">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black/10 transition-colors">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Email Us</p>
              <EditableField pageId={PAGE_IDS.contact} fieldName="email" value={content.email}>
                <p className="text-black group-hover:underline underline-offset-2">{content.email}</p>
              </EditableField>
            </a>

            {/* Location Card */}
            <a href={content.location_link} target="_blank" rel="noopener noreferrer" className="bg-white border border-black/10 rounded-xl p-8 text-center hover:border-black/20 transition-colors block group">
              <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black/10 transition-colors">
                <MapPin className="w-5 h-5 text-black" />
              </div>
              <p className="text-sm text-black/60 mb-2">Visit Us</p>
              <EditableField pageId={PAGE_IDS.contact} fieldName="location_link" value={content.location_link}>
                <p className="text-black group-hover:underline underline-offset-2">{content.address}</p>
              </EditableField>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <EditableField pageId={PAGE_IDS.contact} fieldName="form_title" value={content.form_title}>
                <h2 className="text-3xl md:text-4xl mb-4">{content.form_title}</h2>
              </EditableField>
              <EditableField pageId={PAGE_IDS.contact} fieldName="form_description" value={content.form_description} multiline>
                <p className="text-black/60 max-w-2xl mx-auto">{content.form_description}</p>
              </EditableField>
            </div>

            {status === 'sent' ? (
              <div className="text-center py-16">
                <div className="w-14 h-14 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl mb-2">Message sent!</h3>
                <p className="text-black/60 text-sm">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 text-black/80">Name *</label>
                    <input name="name" type="text" required value={form.name} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-black/80">Company</label>
                    <input name="company" type="text" value={form.company} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter your company name" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm mb-2 text-black/80">Email *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter your email" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2 text-black/80">Phone Number</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors"
                      placeholder="Enter your phone number" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 text-black/80">Message *</label>
                  <textarea name="message" rows={6} required value={form.message} onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-lg focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Enter your message" />
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg disabled:opacity-60"
                >
                  <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300">
                    {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="w-full h-[400px] md:h-[500px] border-t border-black/10">
          <MapboxMap />
        </div>
      </section>
    </div>
  );
}
