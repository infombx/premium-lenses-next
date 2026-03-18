import { Menu, X, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Navigation</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Clean, minimal navigation patterns for seamless user experience across all devices.
      </p>

      {/* Primary Navigation */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Primary Navigation</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-b border-black/10 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full" />
                <span className="text-xl font-light tracking-tight">VisionLens</span>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#" className="text-sm hover:text-black/60 transition-colors">Shop</a>
                <a href="#" className="text-sm hover:text-black/60 transition-colors">Products</a>
                <a href="#" className="text-sm hover:text-black/60 transition-colors">About</a>
                <a href="#" className="text-sm hover:text-black/60 transition-colors">Contact</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/5">
            <p className="text-xs text-black/60">Standard header with logo, links, and actions</p>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Secondary Navigation</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white px-8 py-4 border-b border-black/10">
            <nav className="flex items-center gap-6">
              <a href="#" className="text-sm border-b-2 border-black pb-4 font-medium">Overview</a>
              <a href="#" className="text-sm text-black/60 hover:text-black pb-4 transition-colors">Features</a>
              <a href="#" className="text-sm text-black/60 hover:text-black pb-4 transition-colors">Specifications</a>
              <a href="#" className="text-sm text-black/60 hover:text-black pb-4 transition-colors">Reviews</a>
            </nav>
          </div>
          <div className="p-4 bg-black/5">
            <p className="text-xs text-black/60">Tab-style navigation with active indicator</p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Sidebar Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] border border-black/10 rounded-sm overflow-hidden">
          <div className="bg-white border-r border-black/10 p-6">
            <nav className="space-y-1">
              <a href="#" className="block px-4 py-3 bg-black text-white text-sm rounded-sm">
                Dashboard
              </a>
              <a href="#" className="block px-4 py-3 text-sm text-black/60 hover:bg-black/5 rounded-sm transition-colors">
                Orders
              </a>
              <a href="#" className="block px-4 py-3 text-sm text-black/60 hover:bg-black/5 rounded-sm transition-colors">
                Products
              </a>
              <a href="#" className="block px-4 py-3 text-sm text-black/60 hover:bg-black/5 rounded-sm transition-colors">
                Settings
              </a>
            </nav>
          </div>
          <div className="p-8 bg-black/5 flex items-center justify-center">
            <p className="text-sm text-black/60">Content area</p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Breadcrumbs</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <nav className="flex items-center gap-2 text-sm">
            <a href="#" className="text-black/60 hover:text-black transition-colors">Home</a>
            <span className="text-black/20">/</span>
            <a href="#" className="text-black/60 hover:text-black transition-colors">Products</a>
            <span className="text-black/20">/</span>
            <a href="#" className="text-black/60 hover:text-black transition-colors">Daily Lenses</a>
            <span className="text-black/20">/</span>
            <span className="text-black">Vision Pro</span>
          </nav>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Dropdown Menu</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="inline-block relative">
            <button className="px-6 py-3 border border-black text-sm flex items-center gap-2 hover:bg-black hover:text-white transition-all">
              Products
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="mt-2 border border-black/10 rounded-sm bg-white shadow-lg min-w-[200px]">
              <a href="#" className="block px-6 py-3 text-sm hover:bg-black/5 transition-colors">Daily Lenses</a>
              <a href="#" className="block px-6 py-3 text-sm hover:bg-black/5 transition-colors">Monthly Lenses</a>
              <a href="#" className="block px-6 py-3 text-sm hover:bg-black/5 transition-colors">Colored Lenses</a>
              <div className="border-t border-black/10" />
              <a href="#" className="block px-6 py-3 text-sm hover:bg-black/5 transition-colors">View All</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Mobile Navigation</h2>
        <div className="border border-black/10 rounded-sm overflow-hidden max-w-md">
          {/* Mobile Header */}
          <div className="bg-white border-b border-black/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full" />
                <span className="text-lg font-light">VisionLens</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center hover:bg-black/5 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="bg-white border-b border-black/10">
              <nav className="p-4 space-y-1">
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors">
                  Shop
                </a>
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors">
                  Products
                </a>
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors">
                  About
                </a>
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors">
                  Contact
                </a>
                <div className="border-t border-black/10 my-2" />
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Account
                </a>
                <a href="#" className="block px-4 py-3 text-sm hover:bg-black/5 rounded-sm transition-colors flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart (3)
                </a>
              </nav>
            </div>
          )}

          <div className="p-4 bg-black/5">
            <p className="text-xs text-black/60">Hamburger menu with slide-out navigation</p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Pagination</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-all">
              Previous
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-black text-white text-sm">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-black/10 text-sm hover:bg-black/5 transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center border border-black/10 text-sm hover:bg-black/5 transition-colors">
              3
            </button>
            <span className="px-2 text-black/40">...</span>
            <button className="w-10 h-10 flex items-center justify-center border border-black/10 text-sm hover:bg-black/5 transition-colors">
              10
            </button>
            <button className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-all">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
