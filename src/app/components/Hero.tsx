import { ArrowRight, Play, Eye, Glasses } from 'lucide-react';

export function Hero() {
  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Hero Sections</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Impactful hero sections designed to capture attention and drive engagement with clear calls-to-action.
      </p>

      {/* Minimal Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Minimal Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white px-12 py-24 text-center">
            <p className="text-xs uppercase tracking-wider text-black/40 mb-6">INTRODUCING</p>
            <h1 className="text-7xl font-light tracking-tight mb-8 max-w-4xl mx-auto">
              The Future of Vision
            </h1>
            <p className="text-xl text-black/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience unparalleled clarity and comfort with our next-generation contact lenses.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-10 py-4 bg-black text-white hover:bg-black/90 transition-all flex items-center gap-2">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-10 py-4 border border-black hover:bg-black hover:text-white transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Split Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Split Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-white p-16 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-wider text-black/40 mb-4">NEW COLLECTION</p>
              <h2 className="text-5xl font-light tracking-tight mb-6">
                Crystal Clear Vision
              </h2>
              <p className="text-lg text-black/60 mb-8 leading-relaxed">
                Advanced optics technology meets superior comfort in our premium daily lenses.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-black text-white text-sm hover:bg-black/90 transition-all">
                  Discover More
                </button>
                <button className="px-8 py-3 text-sm flex items-center gap-2 hover:gap-3 transition-all">
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-black/5 min-h-[400px] flex items-center justify-center">
              <Eye className="w-32 h-32 text-black/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Dark Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Dark Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-black text-white px-12 py-24 text-center">
            <h1 className="text-6xl font-light tracking-tight mb-6">
              See The Difference
            </h1>
            <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              Premium contact lenses designed for the modern lifestyle. Comfort that lasts all day, vision that exceeds expectations.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="px-10 py-4 bg-white text-black hover:bg-white/90 transition-all">
                Get Started
              </button>
              <button className="px-10 py-4 border border-white hover:bg-white hover:text-black transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Full Width Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="relative bg-black/5 min-h-[500px] flex items-center justify-center">
            <Glasses className="absolute w-64 h-64 text-black/10" />
            <div className="relative z-10 text-center px-12">
              <h1 className="text-7xl font-light tracking-tight mb-6">
                Limitless Vision
              </h1>
              <p className="text-xl text-black/60 mb-8 max-w-2xl mx-auto">
                Redefine what's possible with cutting-edge lens technology
              </p>
              <button className="px-12 py-4 bg-black text-white hover:bg-black/90 transition-all flex items-center gap-2 mx-auto">
                Explore Collection
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Hero with Stats</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white px-12 py-20 text-center">
            <h1 className="text-6xl font-light tracking-tight mb-6">
              Trusted by Millions
            </h1>
            <p className="text-lg text-black/60 mb-16 max-w-2xl mx-auto leading-relaxed">
              Join the community of satisfied customers who have transformed their vision with VisionLens.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <p className="text-5xl font-light mb-2">10M+</p>
                <p className="text-sm text-black/60">Active Users</p>
              </div>
              <div>
                <p className="text-5xl font-light mb-2">99.8%</p>
                <p className="text-sm text-black/60">Satisfaction</p>
              </div>
              <div>
                <p className="text-5xl font-light mb-2">50+</p>
                <p className="text-sm text-black/60">Countries</p>
              </div>
              <div>
                <p className="text-5xl font-light mb-2">24/7</p>
                <p className="text-sm text-black/60">Support</p>
              </div>
            </div>
            <button className="px-10 py-4 bg-black text-white hover:bg-black/90 transition-all">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>

      {/* Layered Hero */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Layered Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="relative">
            <div className="bg-black/5 h-96 flex items-center justify-center">
              <Eye className="w-48 h-48 text-black/10" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white border border-black/10 rounded-sm p-12 max-w-2xl mx-8 shadow-lg">
                <p className="text-xs uppercase tracking-wider text-black/40 mb-4 text-center">PREMIUM QUALITY</p>
                <h2 className="text-4xl font-light tracking-tight mb-4 text-center">
                  Exceptional Comfort, Every Day
                </h2>
                <p className="text-base text-black/60 mb-6 text-center leading-relaxed">
                  Experience the perfect blend of technology and comfort with our award-winning contact lenses.
                </p>
                <div className="flex justify-center gap-4">
                  <button className="px-8 py-3 bg-black text-white text-sm hover:bg-black/90 transition-all">
                    Shop Now
                  </button>
                  <button className="px-8 py-3 border border-black text-sm hover:bg-black hover:text-white transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Hero */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">CTA Hero</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-black text-white px-12 py-20">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between flex-wrap gap-8">
                <div>
                  <h2 className="text-4xl font-light tracking-tight mb-3">
                    Ready to See Better?
                  </h2>
                  <p className="text-lg text-white/70">
                    Get started with a free consultation today
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all">
                    Book Consultation
                  </button>
                  <button className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
