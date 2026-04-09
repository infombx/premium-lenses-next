import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from './context/CartContext'

export const metadata: Metadata = {
  title: 'Premium Lenses',
  description: 'Premium contact lenses for exceptional comfort and clarity',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
