import type { Product } from '@/app/data/products'

interface Props {
  product: Product
}

/**
 * Renders Product + Offer JSON-LD schema for a product page.
 * Enables Google rich snippets (price, availability, images).
 */
export function ProductSchema({ product }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description
      ? product.description.replace(/<[^>]+>/g, '').slice(0, 5000)
      : product.name,
    image: [product.image, ...(product.images ?? [])].filter(Boolean),
    sku: String(product.id),
    brand: {
      '@type': 'Brand',
      name: 'Premium Lenses',
    },
    ...(product.specs ? {
      additionalProperty: Object.entries(product.specs)
        .filter(([, v]) => v)
        .map(([name, value]) => ({
          '@type': 'PropertyValue',
          name,
          value,
        })),
    } : {}),
    offers: {
      '@type': 'Offer',
      url: `https://premiumlenses.mu/shop/${product.slug}`,
      priceCurrency: 'MUR',
      price: product.price.toFixed(2),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Premium Lenses',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
