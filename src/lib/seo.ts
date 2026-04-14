/**
 * SEO helper — fetches WordPress ACF SEO fields per page slug.
 *
 * WordPress ACF Setup (one-time):
 *   Create a field group named "SEO" with Location: Post Type = Page
 *   Fields:
 *     - seo_title      (Text)     — overrides <title> tag
 *     - seo_description (Textarea) — meta description (150-160 chars)
 *     - og_image       (Image, Return Format: Image URL) — social share image
 *
 *   Enable "Show in REST API" on the field group.
 *   An AI can then log into wp-admin, open any page, fill the SEO tab, hit Update.
 */

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''
const REVALIDATE = 3600

export interface PageSEO {
  title: string
  description: string
  ogImage?: string
  noIndex?: boolean
}

/**
 * Fetch SEO fields for a WordPress page by slug.
 * Falls back to `fallback` if ACF fields are empty or the page doesn't exist.
 */
export async function getPageSEO(slug: string, fallback: PageSEO): Promise<PageSEO> {
  try {
    const res = await fetch(
      `${WP_URL}/wp-json/wp/v2/pages?slug=${slug}&_fields=acf`,
      { next: { revalidate: REVALIDATE } },
    )
    if (!res.ok) return fallback
    const pages = await res.json() as Array<{ acf?: Record<string, unknown> }>
    const acf = pages[0]?.acf ?? {}

    const title = typeof acf.seo_title === 'string' && acf.seo_title.trim()
      ? acf.seo_title.trim()
      : fallback.title

    const description = typeof acf.seo_description === 'string' && acf.seo_description.trim()
      ? acf.seo_description.trim()
      : fallback.description

    // og_image: ACF Image (URL return) gives a plain string URL
    let ogImage = fallback.ogImage
    if (typeof acf.og_image === 'string' && acf.og_image.startsWith('http')) {
      ogImage = acf.og_image
    } else if (
      typeof acf.og_image === 'object' &&
      acf.og_image !== null &&
      'url' in acf.og_image
    ) {
      ogImage = (acf.og_image as { url: string }).url
    }

    return { title, description, ogImage }
  } catch {
    return fallback
  }
}
