import type { Product } from '@/app/data/products'

interface Props {
  product: Product
}

/**
 * Product + Offer JSON-LD schema.
 * Enables Google rich snippets (price, availability, images).
 * Also used by AI engines (ChatGPT, Perplexity, etc.) to understand product details.
 */
export function ProductSchema({ product }: Props) {
  const cleanDescription = product.description
    ? product.description.replace(/<[^>]+>/g, '').trim().slice(0, 5000)
    : `${product.name} — premium contact lens available at Premium Lenses Mauritius.`

  // Extract color from category or product name for GEO
  const colorKeywords = ['blue', 'brown', 'gray', 'grey', 'green', 'hazel', 'honey', 'violet', 'purple', 'black']
  const nameAndCat = `${product.name} ${product.category ?? ''}`.toLowerCase()
  const color = colorKeywords.find(c => nameAndCat.includes(c))

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: cleanDescription,
    image: [product.image, ...(product.images ?? [])].filter(Boolean),
    sku: String(product.id),
    brand: {
      '@type': 'Brand',
      name: 'Premium Lenses',
    },
    category: product.category
      ? product.category.charAt(0) + product.category.slice(1).toLowerCase()
      : 'Contact Lenses',
    ...(color ? { color } : {}),
    offers: {
      '@type': 'Offer',
      url: `https://premiumlenses.mu/shop/${product.slug}`,
      priceCurrency: 'MUR',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'Premium Lenses',
        url: 'https://premiumlenses.mu',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'MU',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' },
          transitTime:  { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
        },
      },
    },
  }

  // Specs + features as additionalProperty — AI engines extract these for comparison
  const specEntries = product.specs
    ? Object.entries(product.specs).filter(([, v]) => v)
    : []

  if (specEntries.length || product.features?.length) {
    schema.additionalProperty = [
      ...specEntries.map(([name, value]) => ({
        '@type': 'PropertyValue',
        name,
        value,
      })),
      ...(product.features ?? []).map(f => ({
        '@type': 'PropertyValue',
        name: 'Feature',
        value: f,
      })),
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
