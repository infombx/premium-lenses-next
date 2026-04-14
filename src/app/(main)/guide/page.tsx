import type { Metadata } from 'next'
import { getGuideContent, getGlobalContent } from '@/lib/wordpress'
import { getPageSEO } from '@/lib/seo'
import { FAQSchema } from '@/components/seo/FAQSchema'
import GuideContent from './GuideContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('guide', {
    title: 'Contact Lens Guide',
    description: 'Complete guide to contact lenses — how to choose, insert, remove, and care for your lenses. FAQs and troubleshooting tips.',
    ogImage: undefined,
  })
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://premiumlenses.mu/guide',
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    alternates: { canonical: 'https://premiumlenses.mu/guide' },
  }
}

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
    <>
      <FAQSchema faqs={content.faqs} />
      <GuideContent
        content={content}
        orderNumber={params.order}
        orderTotal={params.total}
        paymentInfo={paymentInfo}
      />
    </>
  )
}
