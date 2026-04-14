import type { FAQItem } from '@/lib/wordpress'

interface Props {
  faqs: FAQItem[]
}

/**
 * Renders FAQPage JSON-LD schema.
 * Enables FAQ rich results in Google SERP and AI Overview citations.
 */
export function FAQSchema({ faqs }: Props) {
  if (!faqs.length) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer.replace(/<[^>]+>/g, ''),
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
