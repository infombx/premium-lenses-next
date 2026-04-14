/**
 * delete-unused-media.mjs
 * Deletes all WordPress media that is not referenced by any WooCommerce product
 * image or any WordPress page ACF field.
 *
 * Run: node scripts/delete-unused-media.mjs
 * Add --dry-run to preview without deleting.
 */

const DST = {
  url: 'https://cms.premiumlenses.mu',
  key: 'ck_de65132d221cca7d5925d6db71d0aee67733d953',
  secret: 'cs_dd9ffc2220c3b2afeeb0a7cd13f417222018c5db',
}
const WP_USER = 'Admin Premium'
const WP_PASS = '3oyh VCPn qNTo ZChj fju4 AzFF'

const DRY_RUN = process.argv.includes('--dry-run')

function wcAuth() {
  return 'Basic ' + Buffer.from(`${DST.key}:${DST.secret}`).toString('base64')
}
function wpAuth() {
  return 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
}

async function wpGet(path) {
  const res = await fetch(`${DST.url}/wp-json${path}`, {
    headers: { Authorization: wpAuth() },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return { data: await res.json(), headers: res.headers }
}

async function wcGet(path) {
  const res = await fetch(`${DST.url}/wp-json/wc/v3${path}`, {
    headers: { Authorization: wcAuth() },
  })
  if (!res.ok) throw new Error(`WC GET ${path} → ${res.status}`)
  return res.json()
}

async function wpDelete(mediaId) {
  const res = await fetch(`${DST.url}/wp-json/wp/v2/media/${mediaId}?force=true`, {
    method: 'DELETE',
    headers: { Authorization: wpAuth() },
  })
  if (!res.ok) throw new Error(`DELETE media/${mediaId} → ${res.status}`)
  return res.json()
}

// Fetch all pages of a WP REST endpoint (using X-WP-TotalPages header)
async function wpGetAll(path) {
  const all = []
  let page = 1
  while (true) {
    const sep = path.includes('?') ? '&' : '?'
    const { data, headers } = await wpGet(`${path}${sep}per_page=100&page=${page}`)
    all.push(...data)
    const totalPages = parseInt(headers.get('x-wp-totalpages') || '1', 10)
    if (page >= totalPages) break
    page++
  }
  return all
}

// Recursively extract all integer IDs from an ACF field value
function extractAcfImageIds(value) {
  const ids = new Set()
  if (!value) return ids
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    ids.add(value)
  } else if (typeof value === 'object' && value.id) {
    ids.add(Number(value.id))
  } else if (Array.isArray(value)) {
    for (const item of value) {
      for (const id of extractAcfImageIds(item)) ids.add(id)
    }
  } else if (typeof value === 'object') {
    for (const v of Object.values(value)) {
      for (const id of extractAcfImageIds(v)) ids.add(id)
    }
  }
  return ids
}

async function main() {
  if (DRY_RUN) console.log('--- DRY RUN — nothing will be deleted ---\n')

  // 1. Collect all media IDs currently in the library
  console.log('Fetching all media from WordPress...')
  const allMedia = await wpGetAll('/wp/v2/media')
  console.log(`Total media items: ${allMedia.length}`)
  const allMediaIds = new Set(allMedia.map(m => m.id))

  // 2. Collect all image IDs used by WooCommerce products (all pages)
  console.log('\nFetching all WooCommerce product images...')
  const usedIds = new Set()
  let wcPage = 1
  while (true) {
    const products = await wcGet(`/products?per_page=100&page=${wcPage}&_fields=id,images`)
    if (!products.length) break
    for (const p of products) {
      for (const img of p.images || []) {
        if (img.id) usedIds.add(img.id)
      }
    }
    if (products.length < 100) break
    wcPage++
  }
  console.log(`Product image IDs in use: ${usedIds.size}`)

  // 3. Collect image IDs used by WordPress pages (featured images + ACF fields)
  console.log('\nFetching WordPress pages for ACF image references...')
  const pages = await wpGetAll('/wp/v2/pages?_fields=id,featured_media,acf')
  for (const page of pages) {
    if (page.featured_media) usedIds.add(page.featured_media)
    if (page.acf) {
      for (const id of extractAcfImageIds(page.acf)) usedIds.add(id)
    }
  }
  console.log(`Total referenced IDs (products + pages): ${usedIds.size}`)

  // 4. Find unused
  const unusedIds = [...allMediaIds].filter(id => !usedIds.has(id))
  console.log(`\nUnused media items: ${unusedIds.length}`)

  if (unusedIds.length === 0) {
    console.log('Nothing to delete.')
    return
  }

  // Show what will be deleted
  const unusedMedia = allMedia.filter(m => unusedIds.includes(m.id))
  for (const m of unusedMedia) {
    const name = m.media_details?.file || m.slug || m.source_url?.split('/').pop()
    console.log(`  ${DRY_RUN ? '[DRY]' : ''} ${m.id} — ${name}`)
  }

  if (DRY_RUN) {
    console.log(`\nDry run complete — ${unusedIds.length} items would be deleted.`)
    return
  }

  // 5. Delete unused
  console.log(`\nDeleting ${unusedIds.length} unused media items...`)
  let deleted = 0
  let failed = 0
  for (const id of unusedIds) {
    try {
      await wpDelete(id)
      process.stdout.write('.')
      deleted++
    } catch (err) {
      process.stdout.write('x')
      console.error(`\n  ❌ Failed to delete media ID ${id}: ${err.message}`)
      failed++
    }
  }
  console.log(`\n\n✅ Done — ${deleted} deleted, ${failed} failed`)
}

main().catch(err => { console.error(err); process.exit(1) })
