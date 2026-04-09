'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import type { GlobalContent } from '@/lib/wordpress'

interface Props {
  paymentInfo: Pick<GlobalContent, 'juice_number' | 'bank_account_number' | 'bank_name' | 'account_holder_name' | 'whatsapp_number'>
}

export default function OrderConfirmationContent({ paymentInfo }: Props) {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('order') || 'N/A'
  const total = searchParams.get('total') || ''

  const waMessage = encodeURIComponent(
    `Hi, I have completed payment for Order #${orderNumber}. Please find my payment screenshot attached.`
  )
  const waLink = `https://wa.me/${paymentInfo.whatsapp_number}?text=${waMessage}`

  return (
    <div className="min-h-screen bg-white pt-44 pb-40">
      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="text-center">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl mb-2">Order Confirmed!</h1>
            <p className="text-black/60 mb-1">Thank you for your purchase.</p>
            <p className="text-sm text-black/40">Order #{orderNumber}</p>
          </div>

          {/* Payment Instructions */}
          <div className="border border-black/10 rounded-xl p-6 space-y-5">
            <div>
              <h2 className="text-base font-semibold mb-1">Payment Instructions</h2>
              <p className="text-sm text-black/60">Please complete your payment to confirm your order.</p>
            </div>

            <div className="bg-[#F5F5F5] rounded-lg p-4 text-sm space-y-1">
              {total && (
                <div className="flex justify-between">
                  <span className="text-black/60">Amount to pay</span>
                  <span className="font-semibold">Rs {total}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-black/60">Reference</span>
                <span className="font-medium">Order #{orderNumber}</span>
              </div>
            </div>

            {/* Juice */}
            {paymentInfo.juice_number && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">Pay via Juice</p>
                <div className="text-sm flex justify-between">
                  <span className="text-black/60">Number</span>
                  <span className="font-medium">{paymentInfo.juice_number}</span>
                </div>
              </div>
            )}

            {/* Bank Transfer */}
            {(paymentInfo.bank_name || paymentInfo.bank_account_number) && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">Pay via Bank Transfer</p>
                <div className="text-sm space-y-1">
                  {paymentInfo.bank_name && (
                    <div className="flex justify-between">
                      <span className="text-black/60">Bank</span>
                      <span className="font-medium">{paymentInfo.bank_name}</span>
                    </div>
                  )}
                  {paymentInfo.account_holder_name && (
                    <div className="flex justify-between">
                      <span className="text-black/60">Account Name</span>
                      <span className="font-medium">{paymentInfo.account_holder_name}</span>
                    </div>
                  )}
                  {paymentInfo.bank_account_number && (
                    <div className="flex justify-between">
                      <span className="text-black/60">Account No.</span>
                      <span className="font-medium">{paymentInfo.bank_account_number}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* WhatsApp proof */}
          {paymentInfo.whatsapp_number && (
            <div className="border border-black/10 rounded-xl p-6 text-center space-y-3">
              <p className="text-sm text-black/60">Once payment is done, send us your screenshot on WhatsApp:</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#1ebe5d] transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send Proof of Payment
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
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
            <Link href="/home">
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
