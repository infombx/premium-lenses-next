/**
 * restore-gallery-images.mjs
 * For each product on cms.premiumlenses.mu, fetches the additional images
 * (images[1]+) from premiumlensesmu.com, uploads them to WP media, and
 * appends them to the product's image gallery (keeping image[0] as-is).
 *
 * Run: node scripts/restore-gallery-images.mjs
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

function auth(site) {
  return 'Basic ' + Buffer.from(`${site.key}:${site.secret}`).toString('base64')
}
function wpAuth() {
  return 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
}

async function wcGet(site, path) {
  const res = await fetch(`${site.url}/wp-json/wc/v3${path}`, {
    headers: { Authorization: auth(site) },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status} ${await res.text().catch(() => '')}`)
  return res.json()
}

async function wcPut(path, body) {
  const res = await fetch(`${DST.url}/wp-json/wc/v3${path}`, {
    method: 'PUT',
    headers: { Authorization: auth(DST), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`PUT ${path} → ${res.status} ${(await res.text().catch(() => '')).slice(0, 200)}`)
  return res.json()
}

function mimeFromUrl(url) {
  if (/\.png/i.test(url)) return 'image/png'
  if (/\.webp/i.test(url)) return 'image/webp'
  return 'image/jpeg'
}

function filenameFromUrl(url) {
  return url.split('?')[0].split('/').pop() || 'image.jpg'
}

async function uploadImage(imageUrl) {
  const res = await fetch(imageUrl)
  if (!res.ok) throw new Error(`Download failed ${imageUrl} → ${res.status}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const filename = filenameFromUrl(imageUrl)
  const mime = mimeFromUrl(imageUrl)

  const uploadRes = await fetch(`${DST.url}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: wpAuth(),
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': mime,
    },
    body: buffer,
  })
  if (!uploadRes.ok) throw new Error(`Upload failed ${filename} → ${uploadRes.status} ${(await uploadRes.text().catch(() => '')).slice(0, 200)}`)
  const data = await uploadRes.json()
  return data.id
}

// Normalize name for matching
function normalize(name) {
  return name
    .toLowerCase()
    .replace(/&#\d+;/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function fetchAllProducts(site) {
  const all = []
  let page = 1
  while (true) {
    const batch = await wcGet(site, `/products?per_page=100&page=${page}&_fields=id,name,images`)
    if (!batch.length) break
    all.push(...batch)
    if (batch.length < 100) break
    page++
  }
  return all
}

async function main() {
  console.log('Fetching products from source (premiumlensesmu.com)...')
  const srcProducts = await fetchAllProducts(SRC)
  console.log(`Source: ${srcProducts.length} products`)

  console.log('Fetching products from destination (cms.premiumlenses.mu)...')
  const dstProducts = await fetchAllProducts(DST)
  console.log(`Destination: ${dstProducts.length} products\n`)

  // Build source name → images map
  const srcMap = new Map()
  for (const p of srcProducts) {
    srcMap.set(normalize(p.name), p.images)
  }

  const uploaded = new Map() // src image URL → dest media ID

  let updated = 0
  let skipped = 0

  for (const dstProduct of dstProducts) {
    const key = normalize(dstProduct.name)
    const srcImages = srcMap.get(key)

    if (!srcImages || srcImages.length <= 1) {
      // No extra images on source
      const reason = !srcImages ? 'no source match' : 'only 1 image on source'
      console.log(`⬜ SKIP  "${dstProduct.name}" — ${reason}`)
      skipped++
      continue
    }

    // Extra images = images[1..] from source
    const extraSrcImages = srcImages.slice(1)
    console.log(`\n🖼  "${dstProduct.name}" — adding ${extraSrcImages.length} extra image(s)`)

    const extraMediaIds = []
    for (const img of extraSrcImages) {
      try {
        let mediaId = uploaded.get(img.src)
        if (!mediaId) {
          process.stdout.write(`  ↓ ${filenameFromUrl(img.src)}... `)
          mediaId = await uploadImage(img.src)
          uploaded.set(img.src, mediaId)
          process.stdout.write(`media ID ${mediaId}\n`)
        } else {
          console.log(`  ♻ Reuse media ID ${mediaId}`)
        }
        extraMediaIds.push({ id: mediaId })
      } catch (err) {
        console.error(`  ❌ Failed to upload ${img.src}: ${err.message}`)
      }
    }

    if (extraMediaIds.length === 0) {
      console.log(`  ⚠ No extra images uploaded, skipping update`)
      skipped++
      continue
    }

    // Keep existing first image, append extra images
    const existingFirst = dstProduct.images[0] ? [{ id: dstProduct.images[0].id }] : []
    const newImages = [...existingFirst, ...extraMediaIds]

    try {
      await wcPut(`/products/${dstProduct.id}`, { images: newImages })
      console.log(`  ✅ Updated "${dstProduct.name}" with ${newImages.length} image(s) total`)
      updated++
    } catch (err) {
      console.error(`  ❌ WC update failed: ${err.message}`)
      skipped++
    }
  }

  console.log(`\n✅ Done — ${updated} updated, ${skipped} skipped`)
}

main().catch(err => { console.error(err); process.exit(1) })
