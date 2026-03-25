import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { Header } from '@/components/homepage/Header'
import { Footer } from '@/components/homepage/Footer'
import { getGlobalContent } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Premium Lenses',
  description: 'Premium contact lenses for exceptional comfort and clarity',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobalContent()
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <CartProvider>
          <Header content={global} />
          <main>{children}</main>
          <Footer content={global} />
        </CartProvider>
      </body>
    </html>
  )
}
