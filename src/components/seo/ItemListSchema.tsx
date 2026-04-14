import type { Product } from '@/app/data/products'

interface Props {
  products: Product[]
}

/**
 * Renders ItemList JSON-LD schema for the shop page.
 * Allows AI engines to enumerate all products.
 */
export function ItemListSchema({ products }: Props) {
  if (!products.length) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Contact Lenses — Premium Lenses Mauritius',
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://premiumlenses.mu/shop/${p.slug}`,
      image: p.image,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
