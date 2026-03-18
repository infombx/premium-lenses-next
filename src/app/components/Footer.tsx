import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Footer</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Comprehensive footer designs with navigation, contact information, and social links.
      </p>

      {/* Minimal Footer */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Minimal Footer</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-t border-black/10 px-12 py-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full" />
                <span className="font-light">VisionLens</span>
              </div>
              <nav className="flex items-center gap-6">
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Privacy</a>
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Terms</a>
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Contact</a>
              </nav>
              <p className="text-sm text-black/40">© 2026 VisionLens. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Footer */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Standard Footer</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-t border-black/10 px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-black rounded-full" />
                  <span className="text-xl font-light">VisionLens</span>
                </div>
                <p className="text-sm text-black/60 leading-relaxed">
                  Premium contact lenses for the modern lifestyle. Clarity and comfort in every blink.
                </p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-black/40 mb-4">Products</h3>
                <nav className="space-y-3">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Daily Lenses</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Monthly Lenses</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Colored Lenses</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Solutions</a>
                </nav>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-black/40 mb-4">Company</h3>
                <nav className="space-y-3">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">About Us</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Our Story</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Careers</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Press</a>
                </nav>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-black/40 mb-4">Support</h3>
                <nav className="space-y-3">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Help Center</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Contact Us</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Shipping</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Returns</a>
                </nav>
              </div>
            </div>
            <div className="border-t border-black/10 pt-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-black/40">© 2026 VisionLens. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Privacy Policy</a>
                  <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Terms of Service</a>
                  <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Dark Footer</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-black text-white px-12 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-white rounded-full" />
                  <span className="text-xl font-light">VisionLens</span>
                </div>
                <p className="text-base text-white/70 leading-relaxed mb-6 max-w-md">
                  Experience the future of vision with our premium contact lenses. Designed for clarity, comfort, and style.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/40 mb-4">Quick Links</h3>
                <nav className="space-y-3">
                  <a href="#" className="block text-sm text-white/70 hover:text-white transition-colors">Shop</a>
                  <a href="#" className="block text-sm text-white/70 hover:text-white transition-colors">About</a>
                  <a href="#" className="block text-sm text-white/70 hover:text-white transition-colors">Contact</a>
                  <a href="#" className="block text-sm text-white/70 hover:text-white transition-colors">Blog</a>
                </nav>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-white/40 mb-4">Contact</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                    hello@visionlens.com
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                    1-800-VISION
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8">
              <p className="text-sm text-white/40 text-center">© 2026 VisionLens. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Footer */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Footer with Newsletter</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-t border-black/10 px-12 py-16">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h3 className="text-3xl font-light tracking-tight mb-4">Stay Updated</h3>
              <p className="text-base text-black/60 mb-8">
                Subscribe to our newsletter for exclusive offers and vision care tips.
              </p>
              <div className="flex gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
                />
                <button className="px-6 py-3 bg-black text-white text-sm hover:bg-black/90 transition-all whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-sm uppercase tracking-wider text-black/40 mb-4">Products</h4>
                <nav className="space-y-2">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Daily Lenses</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Monthly Lenses</a>
                </nav>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-black/40 mb-4">Company</h4>
                <nav className="space-y-2">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">About</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Careers</a>
                </nav>
              </div>
              <div>
                <h4 className="text-sm uppercase tracking-wider text-black/40 mb-4">Support</h4>
                <nav className="space-y-2">
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Help Center</a>
                  <a href="#" className="block text-sm text-black/60 hover:text-black transition-colors">Contact</a>
                </nav>
              </div>
            </div>
            <div className="border-t border-black/10 pt-8 text-center">
              <p className="text-sm text-black/40">© 2026 VisionLens. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Footer */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Centered Footer</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-t border-black/10 px-12 py-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 bg-black rounded-full" />
                <span className="text-xl font-light">VisionLens</span>
              </div>
              <nav className="flex items-center justify-center gap-8 mb-6">
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Shop</a>
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">About</a>
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Contact</a>
                <a href="#" className="text-sm text-black/60 hover:text-black transition-colors">Blog</a>
              </nav>
              <div className="flex items-center justify-center gap-4 mb-6">
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-all">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center border border-black/10 hover:bg-black hover:text-white transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sm text-black/40">© 2026 VisionLens. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
