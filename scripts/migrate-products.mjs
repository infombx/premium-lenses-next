/**
 * Product Migration Script
 * Migrates all products, categories, and images from premiumlensesmu.com to cms.premiumlenses.mu
 * Run: node scripts/migrate-products.mjs
 */

const SRC = {
  url: 'https://premiumlensesmu.com',
  key: 'ck_058bb4670f5bee443d15655e1099178c3fcfe40b',
  secret: 'cs_29cdf13705d47bea1cfca28bd74459162ffac3ac',
}

const DST = {
  url: 'https://cms.premiumlenses.mu',
  key: 'ck_de65132d221cca7d5925d6db71d0aee67733d953',
  secret: 'cs_dd9ffc2220c3b2afeeb0a7cd13f417222018c5db',
}

const WP_USER = 'Admin Premium'
const WP_PASS = '3oyh VCPn qNTo ZChj fju4 AzFF'
const WP_AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')

const MIME_MAP = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' }

function wcAuth(site) {
  return 'Basic ' + Buffer.from(`${site.key}:${site.secret}`).toString('base64')
}

async function wcGet(site, path) {
  const res = await fetch(`${site.url}/wp-json/wc/v3${path}`, {
    headers: { Authorization: wcAuth(site) },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function wcPost(site, path, body) {
  const res = await fetch(`${site.url}/wp-json/wc/v3${path}`, {
    method: 'POST',
    headers: { Authorization: wcAuth(site), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`)
  return res.json()
}

async function wcDelete(site, path) {
  const res = await fetch(`${site.url}/wp-json/wc/v3${path}`, {
    method: 'DELETE',
    headers: { Authorization: wcAuth(site) },
  })
  if (!res.ok) console.warn(`DELETE ${path} → ${res.status}`)
}

async function uploadImage(imageUrl, filename) {
  // Download from source
  let imgRes
  try {
    imgRes = await fetch(imageUrl)
    if (!imgRes.ok) throw new Error(`HTTP ${imgRes.status}`)
  } catch (e) {
    console.warn(`  ⚠ Could not download image ${filename}: ${e.message}`)
    return null
  }

  const buffer = await imgRes.arrayBuffer()
  const ext = filename.split('.').pop().toLowerCase()
  const mime = MIME_MAP[ext] || 'image/jpeg'

  // Upload to destination
  const res = await fetch(`${DST.url}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: WP_AUTH,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': mime,
    },
    body: buffer,
  })

  if (!res.ok) {
    const text = await res.text()
    console.warn(`  ⚠ Media upload failed for ${filename}: ${res.status} ${text.slice(0, 200)}`)
    return null
  }

  const data = await res.json()
  return data.id
}

async function getAllProducts() {
  let page = 1
  const all = []
  while (true) {
    const batch = await wcGet(SRC, `/products?per_page=100&page=${page}&status=publish`)
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < 100) break
    page++
  }
  return all
}

async function main() {
  console.log('=== Premium Lenses Product Migration ===\n')

  // ── Step 1: Categories ────────────────────────────────────────────────────
  console.log('Step 1: Migrating categories...')
  const srcCats = await wcGet(SRC, '/products/categories?per_page=100')
  const catMap = new Map() // srcId → dstId

  for (const cat of srcCats) {
    if (cat.slug === 'uncategorized') continue
    try {
      const created = await wcPost(DST, '/products/categories', {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      })
      catMap.set(cat.id, created.id)
      console.log(`  ✓ Category: ${cat.name} (${cat.id} → ${created.id})`)
    } catch (e) {
      // Category may already exist — try to find it
      try {
        const existing = await wcGet(DST, `/products/categories?slug=${cat.slug}`)
        if (existing.length) {
          catMap.set(cat.id, existing[0].id)
          console.log(`  ~ Category exists: ${cat.name} (using ${existing[0].id})`)
        }
      } catch {
        console.warn(`  ⚠ Failed to migrate category ${cat.name}: ${e.message}`)
      }
    }
  }
  console.log(`  → ${catMap.size} categories ready\n`)

  // ── Step 2 + 3 + 4: Products ─────────────────────────────────────────────
  console.log('Step 2: Fetching all source products...')
  const allProducts = await getAllProducts()
  console.log(`  → ${allProducts.length} products found\n`)

  const imageCache = new Map() // srcUrl → dstMediaId

  async function resolveImages(images) {
    const result = []
    for (const img of images) {
      if (imageCache.has(img.src)) {
        result.push({ id: imageCache.get(img.src) })
        continue
      }
      const filename = img.src.split('/').pop()
      console.log(`    ↑ Uploading image: ${filename}`)
      const id = await uploadImage(img.src, filename)
      if (id) {
        imageCache.set(img.src, id)
        result.push({ id })
      }
    }
    return result
  }

  const simpleProducts = allProducts.filter(p => p.type === 'simple')
  const variableProducts = allProducts.filter(p => p.type === 'variable')

  // Simple products
  console.log(`Step 3: Migrating ${simpleProducts.length} simple products...`)
  for (const p of simpleProducts) {
    try {
      console.log(`  • ${p.name}`)
      const images = await resolveImages(p.images || [])
      const categories = (p.categories || [])
        .filter(c => catMap.has(c.id))
        .map(c => ({ id: catMap.get(c.id) }))

      await wcPost(DST, '/products', {
        name: p.name,
        type: 'simple',
        status: 'publish',
        description: p.description,
        short_description: p.short_description,
        regular_price: p.regular_price || p.price || '',
        sale_price: p.sale_price || '',
        stock_status: p.stock_status,
        manage_stock: p.manage_stock,
        stock_quantity: p.stock_quantity,
        categories,
        images,
        attributes: p.attributes || [],
      })
      console.log(`    ✓ Created`)
    } catch (e) {
      console.warn(`    ✗ Failed: ${e.message}`)
    }
  }

  // Variable products
  console.log(`\nStep 4: Migrating ${variableProducts.length} variable products...`)
  for (const p of variableProducts) {
    try {
      console.log(`  • ${p.name}`)
      const images = await resolveImages(p.images || [])
      const categories = (p.categories || [])
        .filter(c => catMap.has(c.id))
        .map(c => ({ id: catMap.get(c.id) }))

      const created = await wcPost(DST, '/products', {
        name: p.name,
        type: 'variable',
        status: 'publish',
        description: p.description,
        short_description: p.short_description,
        regular_price: p.regular_price || '',
        sale_price: p.sale_price || '',
        stock_status: p.stock_status,
        categories,
        images,
        attributes: p.attributes || [],
      })
      console.log(`    ✓ Created parent (${created.id})`)

      // Fetch and create variations
      const variations = await wcGet(SRC, `/products/${p.id}/variations?per_page=100`)
      for (const v of variations) {
        await wcPost(DST, `/products/${created.id}/variations`, {
          regular_price: v.regular_price || v.price || '',
          sale_price: v.sale_price || '',
          stock_status: v.stock_status,
          manage_stock: v.manage_stock,
          stock_quantity: v.stock_quantity,
          attributes: v.attributes || [],
        })
      }
      console.log(`    ✓ Created ${variations.length} variations`)
    } catch (e) {
      console.warn(`    ✗ Failed: ${e.message}`)
    }
  }

  // ── Step 5: Delete test products ─────────────────────────────────────────
  console.log('\nStep 5: Deleting test products...')
  for (const id of [14, 17, 18, 19]) {
    await wcDelete(DST, `/products/${id}?force=true`)
    console.log(`  ✓ Deleted test product ${id}`)
  }

  console.log('\n=== Migration complete ===')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
