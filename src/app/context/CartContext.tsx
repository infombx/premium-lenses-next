'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import posthog from 'posthog-js'

export interface CartItem {
  id: number
  slug: string
  name: string
  price: number
  image: string
  quantity: number
  category: string
  variant?: string
}

interface CartContextType {
  items: CartItem[]
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, variant?: string) => void
  updateQuantity: (id: number, quantity: number, variant?: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) setItems(JSON.parse(stored))
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    posthog.capture('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      product_slug: product.slug,
      product_price: product.price,
      product_category: product.category,
      currency: 'MUR',
    })
    setItems(current => {
      const existing = current.find(i => i.id === product.id && i.variant === product.variant)
      if (existing) {
        return current.map(i => i.id === product.id && i.variant === product.variant ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...current, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id: number, variant?: string) => {
    setItems(current => current.filter(i => !(i.id === id && i.variant === variant)))
  }

  const updateQuantity = (id: number, quantity: number, variant?: string) => {
    if (quantity < 1) return
    setItems(current => current.map(i => i.id === id && i.variant === variant ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const getCartTotal = () => items.reduce((t, i) => t + i.price * i.quantity, 0)

  const getCartCount = () => items.reduce((t, i) => t + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, isCartOpen, openCart, closeCart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
