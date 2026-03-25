import { Facebook, Instagram, Twitter } from 'lucide-react';
import type { GlobalContent } from '@/lib/wordpress';

const logo = '/logo_black_white.svg';

interface Props { content: GlobalContent }

export function Footer({ content }: Props) {
  const footerLinks = content.footer_links;

  return (
    <footer className="bg-white border-t border-black/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="/">
                <img src={logo} alt="Premium Lenses" className="h-16 mb-6 invert" />
              </a>
              <p className="text-sm text-black/60 leading-relaxed mb-6 max-w-xs">
                {content.footer_description}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href={content.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={content.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={content.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-black/10 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="text-sm mb-6 tracking-wider">SHOP</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black/60 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-sm mb-6 tracking-wider">SUPPORT</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black/60 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm mb-6 tracking-wider">COMPANY</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black/60 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-sm mb-6 tracking-wider">LEGAL</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-black/60 hover:text-black transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
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
              Design by{' '}
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
