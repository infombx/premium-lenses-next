'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { Suspense } from 'react'

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || 'N/A'

  return (
    <div className="min-h-screen bg-white pt-44 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl md:text-4xl mb-4">Order Confirmed!</h1>
          <p className="text-black/60 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-black/40 mb-8">
            Order #{orderNumber}
          </p>

          <div className="bg-[#F5F5F5] rounded-2xl p-6 mb-8 text-left">
            <p className="text-sm text-black/60 leading-relaxed">
              We&apos;ve received your order and will process it shortly. You&apos;ll receive a
              confirmation email with tracking information once your order ships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-3 bg-black text-white overflow-hidden transition-all duration-300 rounded-lg flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="relative z-10 text-sm tracking-wider group-hover:text-black transition-colors duration-300">
                  CONTINUE SHOPPING
                </span>
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </Link>

            <Link href="/">
              <button className="px-8 py-3 border border-black/20 text-sm hover:bg-black/5 transition-colors rounded-lg">
                Back to Home
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-44 flex items-center justify-center">
        <div className="text-black/40">Loading...</div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  )
}
