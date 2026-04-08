import { Suspense } from 'react'
import { getGlobalContent } from '@/lib/wordpress'
import OrderConfirmationContent from './OrderConfirmationContent'

export default async function OrderConfirmationPage() {
  const global = await getGlobalContent()

  const paymentInfo = {
    juice_number: global.juice_number,
    bank_account_number: global.bank_account_number,
    bank_name: global.bank_name,
    account_holder_name: global.account_holder_name,
    whatsapp_number: global.whatsapp_number,
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white pt-44 flex items-center justify-center">
        <div className="text-black/40">Loading...</div>
      </div>
    }>
      <OrderConfirmationContent paymentInfo={paymentInfo} />
    </Suspense>
  )
}
