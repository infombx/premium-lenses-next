import { getGuideContent, getGlobalContent } from '@/lib/wordpress'
import GuideContent from './GuideContent'

interface Props {
  searchParams: Promise<{ order?: string; total?: string }>
}

export default async function GuidePage({ searchParams }: Props) {
  const params = await searchParams
  const [content, global] = await Promise.all([getGuideContent(), getGlobalContent()])

  const paymentInfo = params.order ? {
    juice_number: global.juice_number,
    bank_account_number: global.bank_account_number,
    bank_name: global.bank_name,
    account_holder_name: global.account_holder_name,
    whatsapp_number: global.whatsapp_number,
  } : null

  return (
    <GuideContent
      content={content}
      orderNumber={params.order}
      orderTotal={params.total}
      paymentInfo={paymentInfo}
    />
  )
}
