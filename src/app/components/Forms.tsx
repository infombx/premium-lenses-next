import { Search, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function Forms() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <h1 className="text-6xl font-light tracking-tight mb-6">Forms</h1>
      <p className="text-lg text-black/60 mb-12 max-w-2xl leading-relaxed">
        Clean, accessible form elements with clear states and minimal styling.
      </p>

      {/* Text Inputs */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Text Inputs</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-6">
          <div>
            <label className="block text-sm mb-2">Default Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Input with Icon</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Disabled Input</label>
            <input
              type="text"
              placeholder="Disabled"
              disabled
              className="w-full px-4 py-3 border border-black/10 bg-black/5 rounded-sm text-sm text-black/40 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Error State</label>
            <input
              type="text"
              placeholder="Invalid input"
              className="w-full px-4 py-3 border border-red-500 rounded-sm text-sm focus:border-red-500 focus:outline-none"
            />
            <p className="text-xs text-red-500 mt-2">This field is required</p>
          </div>
        </div>
      </div>

      {/* Specialized Inputs */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Specialized Inputs</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-6">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full pl-12 pr-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter password"
                className="w-full pl-12 pr-12 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="search"
                placeholder="Search..."
                className="w-full pl-12 pr-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Textarea</h2>
        <div className="border border-black/10 rounded-sm p-8">
          <label className="block text-sm mb-2">Message</label>
          <textarea
            placeholder="Enter your message..."
            rows={6}
            className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors resize-none"
          />
        </div>
      </div>

      {/* Select */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Select</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-6">
          <div>
            <label className="block text-sm mb-2">Lens Type</label>
            <select className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M6%209L1%204h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10">
              <option>Daily Disposable</option>
              <option>Monthly</option>
              <option>Extended Wear</option>
              <option>Colored Lenses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Checkboxes</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 border-2 border-black/20 rounded-sm checked:bg-black checked:border-black appearance-none cursor-pointer relative
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                       before:w-2 before:h-3 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0
                       checked:before:opacity-100"
            />
            <span className="text-sm">Daily wear contacts</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 border-2 border-black/20 rounded-sm checked:bg-black checked:border-black appearance-none cursor-pointer relative
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                       before:w-2 before:h-3 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0
                       checked:before:opacity-100"
            />
            <span className="text-sm">Monthly subscription</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer opacity-50">
            <input
              type="checkbox"
              disabled
              className="w-5 h-5 border-2 border-black/20 rounded-sm cursor-not-allowed"
            />
            <span className="text-sm">UV protection (unavailable)</span>
          </label>
        </div>
      </div>

      {/* Radio Buttons */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Radio Buttons</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              defaultChecked
              className="w-5 h-5 border-2 border-black/20 rounded-full checked:border-black appearance-none cursor-pointer relative
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                       before:w-2 before:h-2 before:bg-black before:rounded-full before:opacity-0
                       checked:before:opacity-100"
            />
            <span className="text-sm">Standard Shipping (5-7 days)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              className="w-5 h-5 border-2 border-black/20 rounded-full checked:border-black appearance-none cursor-pointer relative
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                       before:w-2 before:h-2 before:bg-black before:rounded-full before:opacity-0
                       checked:before:opacity-100"
            />
            <span className="text-sm">Express Shipping (2-3 days)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              className="w-5 h-5 border-2 border-black/20 rounded-full checked:border-black appearance-none cursor-pointer relative
                       before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                       before:w-2 before:h-2 before:bg-black before:rounded-full before:opacity-0
                       checked:before:opacity-100"
            />
            <span className="text-sm">Next Day Delivery</span>
          </label>
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="mb-16">
        <h2 className="text-3xl font-light tracking-tight mb-8">Toggle Switch</h2>
        <div className="border border-black/10 rounded-sm p-8 space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm">Email notifications</span>
            <div className="relative">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-black/20 rounded-full peer-checked:bg-black transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm">SMS updates</span>
            <div className="relative">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-black/20 rounded-full peer-checked:bg-black transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
          </label>
        </div>
      </div>

      {/* Complete Form Example */}
      <div>
        <h2 className="text-3xl font-light tracking-tight mb-8">Complete Form Example</h2>
        <div className="border border-black/10 rounded-sm p-8 max-w-2xl">
          <h3 className="text-2xl font-light mb-6">Contact Form</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Subject</label>
              <select className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors appearance-none bg-white bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M6%209L1%204h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10">
                <option>General Inquiry</option>
                <option>Product Question</option>
                <option>Order Support</option>
                <option>Technical Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                placeholder="Your message..."
                rows={6}
                className="w-full px-4 py-3 border border-black/20 rounded-sm text-sm focus:border-black focus:outline-none transition-colors resize-none"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 border-2 border-black/20 rounded-sm checked:bg-black checked:border-black appearance-none cursor-pointer relative
                         before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
                         before:w-2 before:h-3 before:border-r-2 before:border-b-2 before:border-white before:rotate-45 before:opacity-0
                         checked:before:opacity-100"
              />
              <span className="text-sm">I agree to the terms and conditions</span>
            </label>

            <div className="flex gap-4 pt-4">
              <button className="flex-1 px-6 py-3 bg-black text-white text-sm hover:bg-black/90 transition-all">
                Send Message
              </button>
              <button type="button" className="px-6 py-3 border border-black text-sm hover:bg-black hover:text-white transition-all">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
