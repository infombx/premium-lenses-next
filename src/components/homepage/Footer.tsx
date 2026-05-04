'use client'

import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import type { GlobalContent, ContactContent } from '@/lib/wordpress';
import { EditableField } from '@/components/cms/EditableField';
import { PAGE_IDS } from '@/lib/cmsFields';

interface Props {
  content: GlobalContent
  contact: ContactContent
}

export function Footer({ content, contact }: Props) {
  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 lg:gap-16 items-stretch">
            {/* Brand Column */}
            <div className="flex flex-col">
              <a href="/home">
                <img src={content.logo_dark} alt="Premium Lenses" className="h-16 mb-6" />
              </a>
              <EditableField pageId={PAGE_IDS.global} fieldName="footer_description" value={content.footer_description} multiline>
                <p className="text-sm text-black/60 leading-relaxed mb-6 max-w-xs">
                  {content.footer_description}
                </p>
              </EditableField>

              {/* Social Links */}
              <div className="flex gap-3 mt-auto">
                <EditableField pageId={PAGE_IDS.global} fieldName="social_facebook" value={content.social.facebook}>
                  <a href={content.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors" aria-label="Facebook">
                    <Facebook className="w-4 h-4" />
                  </a>
                </EditableField>
                <EditableField pageId={PAGE_IDS.global} fieldName="social_instagram" value={content.social.instagram}>
                  <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors" aria-label="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                </EditableField>
                <EditableField pageId={PAGE_IDS.global} fieldName="social_twitter" value={content.social.twitter}>
                  <a href={content.social.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors" aria-label="Twitter">
                    <Twitter className="w-4 h-4" />
                  </a>
                </EditableField>
              </div>
            </div>

            {/* Shop Links */}
            <div className="flex flex-col">
              <h3 className="text-sm mb-6 tracking-wider">SHOP</h3>
              <ul className="space-y-3">
                {[
                  { label: 'Colored Shades', href: '/shop?category=colored-shades' },
                  { label: 'Prescribed Shades', href: '/shop?category=prescribed-shades' },
                  { label: 'Solutions', href: '/shop?category=solutions' },
                  { label: 'All Items', href: '/shop' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h3 className="text-sm mb-6 tracking-wider">QUICK LINKS</h3>
              <ul className="space-y-3">
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms & Conditions', href: '/terms' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-black/60 hover:text-black transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <h3 className="text-sm mb-6 tracking-wider">CONTACT</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-black/50 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-0.5">Location</p>
                    <a
                      href="https://www.google.com/maps?q=-20.155972,57.517083"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/60 hover:text-black transition-colors leading-snug"
                    >
                      {contact.address}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-black/50 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-0.5">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-sm text-black/60 hover:text-black transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-black/50 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-black/40 uppercase tracking-wider mb-0.5">Phone</p>
                    <a href={`tel:${contact.phone}`} className="text-sm text-black/60 hover:text-black transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-black/40">
              &copy; {new Date().getFullYear()} Premium Lenses. All rights reserved.
            </p>
            <p className="text-sm text-black/40">
              Designed by{' '}
              <a href="https://blkbox.mu" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                BLKBOX Creative
              </a>
              {' | '}
              Developed by{' '}
              <a href="https://metabox.mu" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                MetaBox Technology
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
