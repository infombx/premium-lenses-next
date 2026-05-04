import type { Metadata } from 'next'
import sanitizeHtml from 'sanitize-html'
import { getPrivacyPolicyContent } from '@/lib/wordpress'
import { LegalPageClient } from '@/components/cms/LegalPageClient'

export const metadata: Metadata = {
  title: 'Privacy Policy | Premium Lenses',
  description: 'Read our privacy policy to understand how Premium Lenses collects, uses, and protects your personal information.',
  robots: { index: false },
}

const ALLOWED_TAGS = {
  allowedTags: ['h2', 'h3', 'h4', 'p', 'a', 'ul', 'ol', 'li', 'strong', 'em', 'u', 's', 'br'],
  allowedAttributes: { a: ['href'] },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
}

export default async function PrivacyPolicyPage() {
  const { pageId, content: raw } = await getPrivacyPolicyContent()
  const content = sanitizeHtml(raw, ALLOWED_TAGS)

  return (
    <LegalPageClient
      title="Privacy Policy"
      pageId={pageId}
      pageSlug="privacy-policy"
      content={content}
    />
  )
}
