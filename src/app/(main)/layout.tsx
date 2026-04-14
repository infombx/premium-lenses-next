import type { Metadata } from 'next'
import { Header } from '@/components/homepage/Header'
import { Footer } from '@/components/homepage/Footer'
import { EditModeProvider } from '@/app/context/EditModeContext'
import { getGlobalContent, getContactContent } from '@/lib/wordpress'
import { getPageSEO } from '@/lib/seo'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageSEO('homepage', {
    title: 'Premium Contact Lenses in Mauritius',
    description: 'Shop colored, prescription, and daily contact lenses in Mauritius. Premium quality, comfortable wear, cash on delivery. Trusted since 2014.',
    ogImage: undefined,
  })
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: 'https://premiumlenses.mu',
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    alternates: { canonical: 'https://premiumlenses.mu' },
  }
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const [global, contact] = await Promise.all([getGlobalContent(), getContactContent()])

  return (
    <EditModeProvider>
      <OrganizationSchema global={global} contact={contact} />
      <Header content={global} />
      <main>{children}</main>
      <Footer content={global} />
    </EditModeProvider>
  )
}
