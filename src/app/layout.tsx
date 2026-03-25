import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { EditModeProvider } from './context/EditModeContext'
import { Header } from '@/components/homepage/Header'
import { Footer } from '@/components/homepage/Footer'
import { getGlobalContent } from '@/lib/wordpress'

export const metadata: Metadata = {
  title: 'Premium Lenses',
  description: 'Premium contact lenses for exceptional comfort and clarity',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('wp_jwt')?.value
  const global = await getGlobalContent()

  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <CartProvider>
          <EditModeProvider isLoggedIn={isLoggedIn}>
            <Header content={global} isLoggedIn={isLoggedIn} />
            <main>{children}</main>
            <Footer content={global} />
          </EditModeProvider>
        </CartProvider>
      </body>
    </html>
  )
}
