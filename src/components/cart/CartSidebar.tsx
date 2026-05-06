'use client'

import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function CartSidebar() {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const pathname = usePathname()

  // Close when navigating
  useEffect(() => { closeCart() }, [pathname])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isCartOpen])

  const subtotal = getCartTotal()

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-white z-[70] flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm tracking-widest uppercase">Your Cart</span>
            {items.length > 0 && (
              <span className="w-5 h-5 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                {items.reduce((t, i) => t + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
              <ShoppingBag className="w-12 h-12 text-black/15" strokeWidth={1} />
              <p className="text-sm text-black/40">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-xs tracking-wider underline underline-offset-4 text-black/50 hover:text-black transition-colors"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-black/8 px-6">
              {items.map((item) => (
                <li key={item.id} className="py-5 flex gap-4">
                  {/* Image */}
                  <Link href={`/shop/${item.slug}`} onClick={closeCart} className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Link href={`/shop/${item.slug}`} onClick={closeCart} className="text-sm font-light leading-snug hover:underline line-clamp-2">
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-black/30 hover:text-black transition-colors"
                        aria-label="Remove item"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-black/40 mb-3">{item.category}</p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-black/10 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/5 disabled:opacity-30 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-xs border-x border-black/10">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="text-sm">Rs{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/10 px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/50">Subtotal</span>
              <span className="text-sm font-medium">Rs{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-black/40">Shipping calculated at checkout</p>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="group relative flex items-center justify-center gap-2 w-full py-4 bg-black text-white text-sm tracking-widest rounded-lg overflow-hidden transition-all"
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                CHECKOUT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>

            <Link
              href="/cart"
              onClick={closeCart}
              className="flex items-center justify-center w-full py-3 border border-black/10 text-sm text-black/60 rounded-lg hover:bg-black/5 transition-colors"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
