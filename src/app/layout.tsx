import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { CartProvider } from './context/CartContext'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://premiumlenses.mu'),
  title: {
    default: 'Premium Lenses',
    template: '%s | Premium Lenses',
  },
  description: 'Premium contact lenses in Mauritius — colored, prescription, and daily lenses. Quality, comfort, and style since 2014.',
  openGraph: {
    siteName: 'Premium Lenses',
    locale: 'en_US',
    type: 'website',
    url: 'https://premiumlenses.mu',
    images: [{ url: '/logo_black.svg', width: 512, height: 512, alt: 'Premium Lenses' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@premiumlenses',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  other: {
    'ai:description': 'Premium contact lenses retailer in Mauritius. Shop colored, prescription, daily, and toric lenses.',
    'ai:category': 'E-commerce, Health & Beauty, Contact Lenses',
  },
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  )
}
