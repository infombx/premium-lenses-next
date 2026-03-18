import { ArrowRight, Search, ShoppingCart, Download } from 'lucide-react';

export function Buttons() {
  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Buttons</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Clean, minimal button styles with clear hierarchy and states for various interactions.
      </p>

      {/* Primary Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Primary Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-3 bg-black text-white text-sm transition-all hover:bg-black/90">
              Primary Button
            </button>
            <button className="px-8 py-3 bg-black text-white text-sm transition-all hover:bg-black/90 flex items-center gap-2">
              With Icon
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 bg-black text-white text-sm opacity-50 cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-black/10">
            <p className="text-sm text-black/60">
              <span className="font-medium">Usage:</span> Primary actions, CTAs, main navigation
            </p>
          </div>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Secondary Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-3 border border-black text-black text-sm transition-all hover:bg-black hover:text-white">
              Secondary Button
            </button>
            <button className="px-8 py-3 border border-black text-black text-sm transition-all hover:bg-black hover:text-white flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="px-8 py-3 border border-black/20 text-black/40 text-sm cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-black/10">
            <p className="text-sm text-black/60">
              <span className="font-medium">Usage:</span> Secondary actions, alternative options
            </p>
          </div>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Ghost Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-3 text-black text-sm transition-all hover:bg-black/5">
              Ghost Button
            </button>
            <button className="px-8 py-3 text-black text-sm transition-all hover:bg-black/5 flex items-center gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-8 py-3 text-black/40 text-sm cursor-not-allowed">
              Disabled
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-black/10">
            <p className="text-sm text-black/60">
              <span className="font-medium">Usage:</span> Tertiary actions, subtle interactions
            </p>
          </div>
        </div>
      </div>

      {/* Icon Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Icon Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center bg-black text-white transition-all hover:bg-black/90">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-black text-black transition-all hover:bg-black hover:text-white">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center text-black transition-all hover:bg-black/5">
              <Download className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-black/20 text-black/40 cursor-not-allowed">
              <Search className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-6 pt-6 border-t border-black/10">
            <p className="text-sm text-black/60">
              <span className="font-medium">Usage:</span> Compact actions, toolbars, navigation
            </p>
          </div>
        </div>
      </div>

      {/* Button Sizes */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Sizes</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-6 py-2 bg-black text-white text-xs">
              Small
            </button>
            <button className="px-8 py-3 bg-black text-white text-sm">
              Medium (Default)
            </button>
            <button className="px-10 py-4 bg-black text-white text-base">
              Large
            </button>
          </div>
        </div>
      </div>

      {/* Button States */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Interactive States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-lg mb-4">Default</h3>
            <button className="px-8 py-3 bg-black text-white text-sm">
              Button
            </button>
          </div>
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-lg mb-4">Hover</h3>
            <button className="px-8 py-3 bg-black/90 text-white text-sm">
              Button
            </button>
            <p className="text-xs text-black/60 mt-2">Slight opacity change (90%)</p>
          </div>
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-lg mb-4">Active/Pressed</h3>
            <button className="px-8 py-3 bg-black/80 text-white text-sm">
              Button
            </button>
            <p className="text-xs text-black/60 mt-2">More opacity change (80%)</p>
          </div>
          <div className="border border-black/10 rounded-sm p-8">
            <h3 className="text-lg mb-4">Disabled</h3>
            <button className="px-8 py-3 bg-black/50 text-white/70 text-sm cursor-not-allowed">
              Button
            </button>
            <p className="text-xs text-black/60 mt-2">Reduced opacity, no pointer</p>
          </div>
        </div>
      </div>

      {/* Button Groups */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Button Groups</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-6">
          <div>
            <p className="text-sm text-black/60 mb-4">Horizontal Group</p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-black text-white text-sm">
                Confirm
              </button>
              <button className="px-8 py-3 border border-black text-black text-sm hover:bg-black hover:text-white transition-all">
                Cancel
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm text-black/60 mb-4">Segmented Control</p>
            <div className="inline-flex border border-black">
              <button className="px-6 py-3 bg-black text-white text-sm border-r border-black">
                Daily
              </button>
              <button className="px-6 py-3 bg-white text-black text-sm border-r border-black hover:bg-black/5">
                Weekly
              </button>
              <button className="px-6 py-3 bg-white text-black text-sm hover:bg-black/5">
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
