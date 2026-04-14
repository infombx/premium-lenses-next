import type { GlobalContent, ContactContent } from '@/lib/wordpress'

interface Props {
  global: GlobalContent
  contact?: ContactContent
}

/**
 * Renders Organization + LocalBusiness JSON-LD schema.
 * Critical for GEO — AI engines use this to understand who the business is.
 */
export function OrganizationSchema({ global, contact }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: 'Premium Lenses',
    url: 'https://premiumlenses.mu',
    logo: {
      '@type': 'ImageObject',
      url: 'https://premiumlenses.mu/logo_black.svg',
    },
    description: 'Premium contact lenses retailer in Mauritius. Colored, prescription, daily, and toric lenses. Founded in 2014.',
    foundingDate: '2014',
    areaServed: 'Mauritius',
    priceRange: 'Rs',
    currenciesAccepted: 'MUR',
    paymentAccepted: 'Cash on Delivery',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MU',
      addressRegion: 'Mauritius',
      ...(contact?.address ? { streetAddress: contact.address } : {}),
    },
    ...(contact?.phone ? { telephone: contact.phone } : {}),
    ...(contact?.email ? { email: contact.email } : {}),
    sameAs: [
      global.social?.facebook,
      global.social?.instagram,
      global.social?.twitter,
    ].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
