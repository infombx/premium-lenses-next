interface BreadcrumbItem {
  name: string
  url: string
}

interface Props {
  items: BreadcrumbItem[]
}

/**
 * BreadcrumbList JSON-LD schema.
 * Helps Google show breadcrumb trails in search results.
 * Also helps AI engines understand site hierarchy.
 */
export function BreadcrumbSchema({ items }: Props) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
