import { Link } from 'react-router';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CreditCard, Lock } from 'lucide-react';

export function CheckoutPage() {
  const { items, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    
    // Shipping Information
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    country: 'United States',
    state: '',
    zipCode: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Save preferences
    saveInfo: false,
    newsletter: false,
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for checkout functionality
    alert('Order placed successfully! This is a demo checkout.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-44">
        <div className="border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
            <div className="flex items-center gap-2 text-xs text-black/40">
              <Link to="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
              <span>/</span>
              <span className="text-black">Checkout</span>
            </div>
          </div>
        </div>

        <div className="py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
            <h1 className="text-2xl md:text-3xl mb-4">No items to checkout</h1>
            <p className="text-black/60 mb-8">Add some products to your cart first</p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-black text-white text-sm tracking-wider hover:bg-black/80 transition-colors rounded-lg"
            >
              CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-44">
      {/* Breadcrumb */}
      <div className="border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center gap-2 text-xs text-black/40">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/cart" className="hover:text-black transition-colors">Cart</Link>
            <span>/</span>
            <span className="text-black">Checkout</span>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
          <h1 className="text-2xl md:text-3xl">Checkout</h1>
        </div>
      </div>

      {/* Checkout Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Left: Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <div>
                  <h2 className="text-lg mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />
                    <label className="flex items-center gap-2 text-sm text-black/60">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-black"
                      />
                      Email me with news and offers
                    </label>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h2 className="text-lg mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />

                    <input
                      type="text"
                      name="apartment"
                      placeholder="Apartment, suite, etc. (optional)"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>

                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
                    />

                    <label className="flex items-center gap-2 text-sm text-black/60">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-black"
                      />
                      Save this information for next time
                    </label>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h2 className="text-lg mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs text-black/40 mb-4">
                      <Lock className="w-4 h-4" />
                      <span>All transactions are secure and encrypted</span>
                    </div>

                    <div className="bg-[#F5F5F5] rounded-lg p-6 space-y-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
                      />

                      <input
                        type="text"
                        name="cardName"
                        placeholder="Name on Card"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM / YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength={7}
                          className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#F5F5F5] rounded-2xl p-6 md:p-8 sticky top-24">
                  <h2 className="text-lg mb-6 pb-6 border-b border-black/10">Order Summary</h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 pb-6 border-b border-black/10">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-white rounded-lg p-2 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate">{item.name}</p>
                          <p className="text-xs text-black/40 mt-1">{item.category}</p>
                        </div>
                        <div className="text-xs font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Subtotal:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Shipping:</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Tax:</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-base mb-6 pt-6 border-t border-black/10">
                    <span className="font-medium">Total:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="group relative w-full px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 mb-4 rounded-lg"
                  >
                    <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300 flex items-center justify-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      COMPLETE ORDER
                    </span>
                    <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>

                  <Link
                    to="/cart"
                    className="block text-center text-xs text-black/60 hover:text-black transition-colors"
                  >
                    ← Return to Cart
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
