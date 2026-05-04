import type { Metadata } from 'next'
import sanitizeHtml from 'sanitize-html'
import { getTermsContent } from '@/lib/wordpress'
import { LegalPageClient } from '@/components/cms/LegalPageClient'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Premium Lenses',
  description: 'Read the terms and conditions governing your use of the Premium Lenses website and purchases.',
  robots: { index: false },
}

const ALLOWED_TAGS = {
  allowedTags: ['h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'u', 's', 'br'],
  allowedAttributes: { a: ['href'] },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

export default async function TermsPage() {
  const { pageId, content: raw } = await getTermsContent()
  const content = sanitizeHtml(raw, ALLOWED_TAGS)

  return (
    <LegalPageClient
      title="Terms & Conditions"
      pageId={pageId}
      pageSlug="terms"
      content={content}
    />
  )
}
