import type { Metadata } from 'next'
import { getAboutContent } from '@/lib/wordpress'
import { getPageSEO } from '@/lib/seo'
import AboutContent from './AboutContent'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('about', {
    title: 'About Us',
    description: 'Learn about Premium Lenses — a Mauritius-based contact lens retailer founded in 2014. Our story, values, and journey.',
    ogImage: undefined,
  })
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://premiumlenses.mu/about',
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    alternates: { canonical: 'https://premiumlenses.mu/about' },
  }
}

export default async function AboutPage() {
  const content = await getAboutContent()
  return <AboutContent content={content} />
}
