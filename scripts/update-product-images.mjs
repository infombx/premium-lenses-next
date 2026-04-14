/**
 * update-product-images.mjs
 * Downloads Urban Layer product images and updates WooCommerce products.
 * Run: node scripts/update-product-images.mjs
 */

import { createWriteStream, mkdirSync } from 'fs'
import { unlink } from 'fs/promises'
import path from 'path'
import { tmpdir } from 'os'

const DST = {
  url: 'https://cms.premiumlenses.mu',
  key: 'ck_de65132d221cca7d5925d6db71d0aee67733d953',
  secret: 'cs_dd9ffc2220c3b2afeeb0a7cd13f417222018c5db',
}
const WP_USER = 'Admin Premium'
const WP_PASS = '3oyh VCPn qNTo ZChj fju4 AzFF'

function wcAuth(site) {
  return 'Basic ' + Buffer.from(`${site.key}:${site.secret}`).toString('base64')
}
function wpAuth() {
  return 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
}

async function wcGet(path) {
  const res = await fetch(`${DST.url}/wp-json/wc/v3${path}`, {
    headers: { Authorization: wcAuth(DST) },
  })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}`)
  return res.json()
}

async function wcPut(path, body) {
  const res = await fetch(`${DST.url}/wp-json/wc/v3${path}`, {
    method: 'PUT',
    headers: { Authorization: wcAuth(DST), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`PUT ${path} → ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download failed: ${url} → ${res.status}`)
  return Buffer.from(await res.arrayBuffer())
}

async function uploadToWordPress(buffer, filename, mimeType) {
  const res = await fetch(`${DST.url}/wp-json/wp/v2/media`, {
    method: 'POST',
    headers: {
      Authorization: wpAuth(),
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': mimeType,
    },
    body: buffer,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`WP media upload → ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = await res.json()
  return data.id
}

function squareUrl(shopifyUrl) {
  // Request a 600x600 square crop via Shopify CDN URL transform
  return shopifyUrl.replace(/\.jpg(\?.*)?$/, '_600x600.jpg$1')
    .replace(/\.png(\?.*)?$/, '_600x600.png$1')
    .replace(/\.webp(\?.*)?$/, '_600x600.webp$1')
}

function mimeFromUrl(url) {
  if (url.includes('.png')) return 'image/png'
  if (url.includes('.webp')) return 'image/webp'
  return 'image/jpeg'
}

// Map: lowercase product name → Urban Layer CDN image URL
const IMAGE_MAP = {
  // Blue / Rain
  'blue rain':           'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BlueRain_04251.jpg?v=1682399847',

  // Venus
  'venus gray':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/VenusGray_011300.jpg?v=1618382341',
  'venus blue':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/VenusBlue_011300.jpg?v=1618382326',
  'venus brown':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/VenusBrown_011300.jpg?v=1618382300',

  // Cloud
  'cloud gray':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CloudGray_11242.jpg?v=1702621232',
  'cloud deep gray':     'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/CloudDeepGray_01101.jpg?v=1593677225',
  'cloud blue':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Cloud_Blue_111.jpg?v=1603692636',
  'cloud ash blue':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Cloud_Blue_111.jpg?v=1603692636',
  'cloud green':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/06_CloudGreen.jpg?v=1593677338',
  'cloud choco':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Cloud_choco.jpg?v=1593677105',
  'cloud brown':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/05_CloudBrown_2.jpg?v=1593677159',

  // Cloud R (R = Retail, same lens design)
  'cloud r gray':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CloudGray_11242.jpg?v=1702621232',
  'cloud r deep gray':   'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/CloudDeepGray_01101.jpg?v=1593677225',
  'cloud r ice gray':    'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/CloudDeepGray_01101.jpg?v=1593677225',
  'cloud r blue':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Cloud_Blue_111.jpg?v=1603692636',
  'cloud r green':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/06_CloudGreen.jpg?v=1593677338',
  'cloud r brown':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/05_CloudBrown_2.jpg?v=1593677159',

  // Cleopatra
  'cleopatra gray':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraGray_02061.jpg?v=1707354685',
  'cleopatra green':     'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraGreen_02073.jpg?v=1707354632',
  'cleopatra hazel':     'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraHazel_08291.jpg?v=1725004656',
  'cleopatra sky blue':  'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraSkyBlue_12131.jpg?v=1734319690',
  'cleopatra turquoise': 'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraSkyBlue_12131.jpg?v=1734319690',

  // Breeze
  'breeze gray':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BreezeGray_03261.jpg?v=1743044611',
  'breeze green':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BreezeGreen_03261.jpg?v=1743044609',
  'breeze hazel':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BreezeHazel_03262.jpg?v=1743044650',
  'breeze light blue':   'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BreezeLightBlue_10232.jpg?v=1761875602',

  // Hepburn
  'hepburn brown':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/HepburnBrown_06141.jpg?v=1655281684',

  // Orlando N
  'orlando n emerald':   'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/OrlandoNEmerald_08101.jpg?v=1660111207',
  'orlando n gray':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AngelesNGray_03231.jpg?v=1648006747',
  'orlando n blue':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AngelesNBlue_03231.jpg?v=1648006374',
  'orlando brown':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AngelesNBrown_120701.jpg?v=1639728445',

  // Moscow
  'moscow':              'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Moscow_01021.jpg?v=1592460094',

  // Amazon (used for Morocco/Maldives series as closest match)
  'morocco blue':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonBlue_03071.jpg?v=1678693734',
  'morocco brown':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonBrown_03071.jpg?v=1678693779',
  'morocco gray':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonGray_03071.jpg?v=1678693814',
  'morocco green':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonGreen_03071.jpg?v=1678693913',

  // Brooklyn (for Maldives/Monet)
  'maldives blue':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BrooklynBlue_06153.jpg?v=1686885628',
  'maldives brown':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/Brown2.jpg?v=1686885714',
  'maldives gray':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/BrooklynGray_02221.jpg?v=1686885836',
  'maldives green':      'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/Green2.jpg?v=1686896560',

  // Monet → Broadway (similar style)
  'monet blue':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/BroadwayBlue_082801wm.jpg?v=1598859881',
  'monet gray':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/BroadwayGray_082801wm.jpg?v=1598859664',
  'monet green':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/BreezeGreen_03261.jpg?v=1743044609',

  // Olivia → Angeles (similar style)
  'olivia gray':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AngelesGray_08200.jpg?v=1592477713',
  'olivia green':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonGreen_03071.jpg?v=1678693913',
  'olivia brown':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/AmazonBrown_03071.jpg?v=1678693779',

  // Biella → Gogh
  'biella gray':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/Gogh_021301.jpg?v=1603176248',
  'biella brown':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/GoghNBrown_09142.jpg?v=1663202999',

  // Jolie Blue → Andes Blue
  'jolie blue':          'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/AndesBlue_10302.jpg?v=1730279522',

  // Pandora Blue → Andes Blue (different shade)
  'pandora blue':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/AndesBlue_10302.jpg?v=1730279522',

  // Havana Brown → Seoul Brown
  'havana brown':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/SeoulBrown_0330.jpg?v=1650421930',

  // Aurora → Stardust
  'aurora brown':        'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/StardustBrown_020703.jpg?v=1586828620',
  'aurora gray':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/StardustGray_020702.jpg?v=1586828692',

  // Sofia Beige → Hepburn Brown (warm tone)
  'sofia beige':         'https://cdn.shopify.com/s/files/1/0370/7414/1323/products/HepburnBrown_06141.jpg?v=1655281684',

  // Orlando Hazel → Cleopatra Hazel
  'orlando hazel':       'https://cdn.shopify.com/s/files/1/0370/7414/1323/files/CleopatraHazel_08291.jpg?v=1725004656',
}

async function main() {
  console.log('Fetching all products from destination...')
  const products = await wcGet('/products?per_page=100&_fields=id,name,images')
  console.log(`Found ${products.length} products\n`)

  const uploaded = new Map() // sourceUrl → mediaId (dedup)

  let updated = 0
  let skipped = 0

  for (const product of products) {
    const key = product.name.toLowerCase().trim()
    const sourceUrl = IMAGE_MAP[key]

    if (!sourceUrl) {
      console.log(`⬜ SKIP  "${product.name}" — no Urban Layer match`)
      skipped++
      continue
    }

    const squareSrc = squareUrl(sourceUrl)
    const filename = path.basename(squareSrc.split('?')[0])
    const mimeType = mimeFromUrl(squareSrc)

    try {
      let mediaId = uploaded.get(squareSrc)
      if (!mediaId) {
        process.stdout.write(`  ↓ Downloading ${filename}...`)
        const buffer = await downloadImage(squareSrc)
        process.stdout.write(` uploading...`)
        mediaId = await uploadToWordPress(buffer, filename, mimeType)
        uploaded.set(squareSrc, mediaId)
        process.stdout.write(` media ID ${mediaId}\n`)
      } else {
        console.log(`  ♻ Reusing media ID ${mediaId} for ${filename}`)
      }

      await wcPut(`/products/${product.id}`, { images: [{ id: mediaId }] })
      console.log(`✅ UPDATED "${product.name}" (ID ${product.id})`)
      updated++
    } catch (err) {
      console.error(`❌ FAILED  "${product.name}" (ID ${product.id}): ${err.message}`)
    }
  }

  console.log(`\n✅ Done — ${updated} updated, ${skipped} skipped (no match)`)
}

main().catch(err => { console.error(err); process.exit(1) })
