/**
 * WordPress page IDs for inline CMS editing.
 * These are the IDs of the WordPress pages that store ACF content.
 * Legal page IDs are dynamic — fetched from WordPress at runtime.
 */
export const PAGE_IDS = {
  homepage: 21,
  about: 30,
  contact: 32,
  guide: 34,
  shopHero: 36,
  global: 38,
} as const

/** Map from page ID back to the Next.js paths that should be revalidated on save */
export const REVALIDATE_PATHS: Record<number, string[]> = {
  21: ['/'],
  30: ['/about'],
  32: ['/contact'],
  34: ['/guide'],
  36: ['/shop'],
  38: ['/', '/shop', '/about', '/contact', '/guide'],
}

/** Slug → revalidation paths for pages whose IDs are discovered at runtime (legal pages) */
export const SLUG_REVALIDATE_PATHS: Record<string, string[]> = {
  'privacy-policy': ['/privacy-policy'],
  'terms': ['/terms'],
}
