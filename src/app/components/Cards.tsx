import { ArrowRight, Glasses, Eye, Sparkles } from 'lucide-react';

export function Cards() {
  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Cards</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Versatile card components for organizing content with clean borders and minimal shadows.
      </p>

      {/* Basic Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Basic Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black/10 rounded-sm p-6">
            <h3 className="text-xl mb-2">Card Title</h3>
            <p className="text-sm text-black/60">
              Simple card with border, padding, and minimal styling for clean presentation.
            </p>
          </div>
          <div className="border border-black/10 rounded-sm p-6 hover:border-black/30 transition-colors cursor-pointer">
            <h3 className="text-xl mb-2">Hover Card</h3>
            <p className="text-sm text-black/60">
              Interactive card with hover state for clickable content.
            </p>
          </div>
          <div className="bg-black text-white rounded-sm p-6">
            <h3 className="text-xl mb-2">Inverted Card</h3>
            <p className="text-sm text-white/70">
              Dark background variant for contrast and emphasis.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Feature Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-black/10 rounded-sm p-8 hover:border-black/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <Glasses className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl mb-3">Daily Comfort</h3>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              Premium materials designed for all-day wearing comfort and clarity.
            </p>
            <button className="text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-black/10 rounded-sm p-8 hover:border-black/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl mb-3">Crystal Vision</h3>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              Advanced optics for exceptional visual acuity in all conditions.
            </p>
            <button className="text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="border border-black/10 rounded-sm p-8 hover:border-black/30 transition-all group cursor-pointer">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl mb-3">Easy Care</h3>
            <p className="text-sm text-black/60 leading-relaxed mb-6">
              Simple maintenance routines for hassle-free lens care every day.
            </p>
            <button className="text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Product Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-black/10 rounded-sm overflow-hidden group cursor-pointer">
              <div className="aspect-square bg-black/5 flex items-center justify-center">
                <Glasses className="w-16 h-16 text-black/20" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-wider text-black/40 mb-2">DAILY LENSES</p>
                <h3 className="text-xl mb-2">Vision Pro Series</h3>
                <p className="text-sm text-black/60 mb-4">
                  Premium daily disposable contact lenses
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-light">$49.99</span>
                  <button className="px-6 py-2 border border-black text-sm hover:bg-black hover:text-white transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Testimonial Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black/10 rounded-sm p-8">
            <p className="text-lg leading-relaxed mb-6">
              "The most comfortable lenses I've ever worn. I forget I'm even wearing them."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black/10 rounded-full" />
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-black/60">Verified Customer</p>
              </div>
            </div>
          </div>

          <div className="bg-black text-white rounded-sm p-8">
            <p className="text-lg leading-relaxed mb-6">
              "Crystal clear vision and exceptional comfort. These lenses changed my daily routine."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-full" />
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-white/70">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Stats Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-black/10 rounded-sm p-6 text-center">
            <p className="text-4xl font-light mb-2">10M+</p>
            <p className="text-sm text-black/60">Happy Customers</p>
          </div>
          <div className="border border-black/10 rounded-sm p-6 text-center">
            <p className="text-4xl font-light mb-2">99.8%</p>
            <p className="text-sm text-black/60">Satisfaction Rate</p>
          </div>
          <div className="border border-black/10 rounded-sm p-6 text-center">
            <p className="text-4xl font-light mb-2">50+</p>
            <p className="text-sm text-black/60">Countries</p>
          </div>
          <div className="border border-black/10 rounded-sm p-6 text-center">
            <p className="text-4xl font-light mb-2">24/7</p>
            <p className="text-sm text-black/60">Support</p>
          </div>
        </div>
      </div>

      {/* Complex Card */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Complex Card Example</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden max-w-2xl">
          <div className="aspect-video bg-black/5 flex items-center justify-center">
            <Eye className="w-24 h-24 text-black/20" />
          </div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-black text-white text-xs uppercase tracking-wider">
                Featured
              </span>
              <span className="text-xs uppercase tracking-wider text-black/40">
                New Release
              </span>
            </div>
            <h3 className="text-3xl font-light tracking-tight mb-4">
              Ultra Vision Pro
            </h3>
            <p className="text-base text-black/60 leading-relaxed mb-6">
              Experience the next generation of contact lens technology with our flagship 
              Ultra Vision Pro series. Engineered for exceptional clarity and unmatched comfort.
            </p>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-black/10">
              <div>
                <p className="text-xs text-black/40 mb-1">Starting at</p>
                <p className="text-3xl font-light">$89.99</p>
              </div>
              <div className="h-12 w-px bg-black/10" />
              <div>
                <p className="text-xs text-black/40 mb-1">Duration</p>
                <p className="text-lg">30 Day Supply</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3 bg-black text-white text-sm hover:bg-black/90 transition-all">
                Shop Now
              </button>
              <button className="flex-1 px-6 py-3 border border-black text-black text-sm hover:bg-black hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
