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
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

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
      const existing = current.find(i => i.id === product.id)
      if (existing) {
        return current.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(current => current.filter(i => i.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setItems(current => current.map(i => i.id === id ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])

  const getCartTotal = () => items.reduce((t, i) => t + i.price * i.quantity, 0)

  const getCartCount = () => items.reduce((t, i) => t + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
