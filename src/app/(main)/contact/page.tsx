import type { Metadata } from 'next'
import { getContactContent } from '@/lib/wordpress'
import { getPageSEO } from '@/lib/seo'
import ContactContent from './ContactContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('contact', {
    title: 'Contact Us',
    description: 'Get in touch with Premium Lenses in Mauritius. Call, email, or visit us — we\'re here to help with all your contact lens needs.',
    ogImage: undefined,
  })
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://premiumlenses.mu/contact',
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    alternates: { canonical: 'https://premiumlenses.mu/contact' },
  }
}

export default async function ContactPage() {
  const content = await getContactContent()
  return <ContactContent content={content} />
}
