'use client'

import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';
import { useEditMode } from '@/app/context/EditModeContext';
import type { GlobalContent } from '@/lib/wordpress';

interface Props {
  content: Pick<GlobalContent, 'nav_links' | 'site_tagline' | 'logo_light' | 'logo_dark'>
}

export function Header({ content }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { isEditMode } = useEditMode();
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const navLinks = content.nav_links.map((l) => ({ path: l.href, label: l.label }));

  return (
    <>
      <header className="fixed left-0 right-0 z-50 pt-2 px-6 transition-all duration-200" style={{ top: isEditMode ? '2.5rem' : '0' }}>
        <div className="max-w-[1440px] mx-auto">
          <div
            className="
              bg-black/50 backdrop-blur-2xl rounded-2xl
              shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)]
              border border-white/10
              transition-all duration-500
              py-1.5 md:py-2
            "
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex items-center justify-between px-3 md:px-4">
              {/* Logo */}
              <Link href="/home" className="flex items-center group flex-shrink-0">
                <img
                  src={content.logo_light}
                  alt="Premium Lenses"
                  className="h-16 md:h-20 transition-all duration-500 mx-[20px] my-[0px]"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`
                      text-sm font-light tracking-tight transition-all duration-300
                      ${isActive(link.path)
                        ? 'text-white'
                        : 'text-white/90 hover:text-white'
                      }
                    `}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Right Actions */}
              <div className="flex items-center gap-3 md:gap-4">
                {/* Cart Button */}
                <Link
                  href="/cart"
                  className="
                    relative group
                    w-10 h-10 flex items-center justify-center
                    hover:bg-white/10 rounded-full
                    transition-all duration-300
                  "
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs flex items-center justify-center rounded-full font-medium">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="
                    lg:hidden w-10 h-10 flex items-center justify-center
                    hover:bg-white/10 rounded-full transition-all duration-300
                  "
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Shop Now Button */}
                <Link
                  href="/shop"
                  className="
                    hidden lg:block px-6 py-2.5
                    bg-white text-black text-sm font-light
                    rounded-lg
                    hover:bg-white/90
                    transition-all duration-300
                    hover:scale-105 active:scale-95
                    shadow-lg
                  "
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden
          transition-opacity duration-300
          ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[280px]
          bg-black/95 backdrop-blur-2xl
          border-l border-white/10
          z-50 lg:hidden
          transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                className={`
                  text-2xl font-light tracking-tight
                  transition-all duration-300 transform
                  ${isActive(link.path)
                    ? 'text-white translate-x-2'
                    : 'text-white/70 hover:text-white hover:translate-x-2'
                  }
                  ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Shop Now Button */}
          <Link
            href="/shop"
            className={`
              mt-12 px-8 py-4
              bg-white text-black text-center
              rounded-lg
              hover:bg-white/90
              transition-all duration-300
              ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: mobileMenuOpen ? '250ms' : '0ms' }}
          >
            Shop Now
          </Link>

          {/* Mobile Menu Footer */}
          <div
            className={`
              mt-auto pb-8 text-white/40 text-xs
              transition-all duration-300
              ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ transitionDelay: mobileMenuOpen ? '300ms' : '0ms' }}
          >
            {content.site_tagline}
          </div>
        </div>
      </div>
    </>
  );
}
