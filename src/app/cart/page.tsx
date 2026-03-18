'use client'

import Link from 'next/link';
import { Minus, Plus, X, Tag } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1); // 10% discount
    } else if (couponCode) {
      alert('Invalid coupon code');
    }
  };

  const handleUpdateCart = () => {
    // Placeholder for update cart functionality
    alert('Cart updated successfully!');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-44">
        {/* Breadcrumb */}
        <div className="border-b border-black/10">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4">
            <div className="flex items-center gap-2 text-xs text-black/40">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <span className="text-black">Shopping Cart</span>
            </div>
          </div>
        </div>

        {/* Empty Cart */}
        <div className="py-20 md:py-32">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-black/20" />
            <h1 className="text-2xl md:text-3xl mb-4">Your cart is empty</h1>
            <p className="text-black/60 mb-8">Add some products to get started!</p>
            <Link
              href="/shop"
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
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black">Shopping Cart</span>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
          <h1 className="text-2xl md:text-3xl">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-12 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Cart Items */}
            <div className="lg:col-span-2">
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-black/10 mb-6">
                <div className="col-span-5 text-xs text-black/60 tracking-wider">PRODUCTS</div>
                <div className="col-span-2 text-xs text-black/60 tracking-wider">PRICE</div>
                <div className="col-span-3 text-xs text-black/60 tracking-wider">QUANTITY</div>
                <div className="col-span-2 text-xs text-black/60 tracking-wider text-right">SUBTOTAL</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-4 md:space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 md:pb-6 border-b border-black/10"
                  >
                    {/* Product Info */}
                    <div className="md:col-span-5 flex gap-4">
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-black/40" />
                      </button>

                      {/* Image */}
                      <div className="w-20 h-20 bg-[#F5F5F5] rounded-lg p-2 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Name */}
                      <div className="flex flex-col justify-center">
                        <Link
                          href={`/shop/${item.id}`}
                          className="text-sm hover:text-black/60 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-black/40 mt-1">{item.category}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex items-center">
                      <span className="text-sm text-black/60 md:hidden mr-2">Price:</span>
                      <span className="text-sm">${item.price.toFixed(2)}</span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-3 flex items-center">
                      <span className="text-sm text-black/60 md:hidden mr-4">Quantity:</span>
                      <div className="flex items-center border border-black/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-10 flex items-center justify-center hover:bg-black/5 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <div className="w-12 h-10 flex items-center justify-center border-x border-black/10 text-sm">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-10 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="md:col-span-2 flex items-center md:justify-end">
                      <span className="text-sm text-black/60 md:hidden mr-2">Subtotal:</span>
                      <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon & Update Cart */}
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="px-4 py-3 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-colors flex-1 md:w-64"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="px-6 py-3 bg-black text-white text-xs tracking-wider hover:bg-black/80 transition-colors rounded-lg whitespace-nowrap"
                  >
                    APPLY COUPON
                  </button>
                </div>
                <button
                  onClick={handleUpdateCart}
                  className="px-6 py-3 border border-black/10 text-black text-xs tracking-wider hover:bg-black/5 transition-colors rounded-lg"
                >
                  UPDATE CART
                </button>
              </div>
            </div>

            {/* Right: Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#F5F5F5] rounded-2xl p-6 md:p-8 sticky top-24">
                <h2 className="text-lg mb-6 pb-6 border-b border-black/10">Cart Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-black/60">Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-black/60">Discount:</span>
                      <span className="text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-black/60">Shipping:</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                </div>

                <div className="flex justify-between text-base mb-6 pt-6 border-t border-black/10">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative w-full px-10 py-4 bg-black text-white overflow-hidden transition-all duration-300 mb-4 rounded-lg"
                  >
                    <span className="relative z-10 text-sm tracking-widest group-hover:text-black transition-colors duration-300">PROCEED TO CHECKOUT</span>
                    <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </motion.button>
                </Link>

                <Link
                  href="/shop"
                  className="block text-center text-xs text-black/60 hover:text-black transition-colors"
                >
                  ← Continue Shopping
                </Link>

                {/* Free Shipping Notice */}
                {subtotal < 50 && (
                  <div className="mt-6 pt-6 border-t border-black/10">
                    <p className="text-xs text-black/60">
                      Add <span className="font-medium text-black">${(50 - subtotal).toFixed(2)}</span> more to get free shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
