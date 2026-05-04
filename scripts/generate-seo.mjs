/**
 * Generate SEO fields for all WordPress pages using Claude AI.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-seo.mjs
 *
 * What it does:
 *   - Fetches each CMS page from WordPress
 *   - Sends the page content to Claude to generate seo_title + seo_description
 *   - Updates the ACF fields on the page via WordPress REST API
 *   - Skips pages that already have seo_title filled in (pass --force to overwrite)
 */

import Anthropic from '@anthropic-ai/sdk'

const WP_URL = 'https://cms.premiumlenses.mu'
const WP_USER = 'Admin Premium'
const WP_PASS = '3oyh VCPn qNTo ZChj fju4 AzFF'
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
const FORCE = process.argv.includes('--force')

const PAGES = [
  { id: 21, label: 'Homepage',     path: '/' },
  { id: 30, label: 'About',        path: '/about' },
  { id: 32, label: 'Contact',      path: '/contact' },
  { id: 34, label: 'Guide',        path: '/guide' },
  { id: 36, label: 'Shop',         path: '/shop' },
]

const SITE_CONTEXT = `
You are an SEO expert writing for premiumlenses.mu — a premium contact lens retailer in Mauritius.
The business sells colored, prescription, daily, and toric contact lenses.
Currency is Mauritian Rupees (Rs/MUR). Founded in 2014.
`.trim()

async function wpGet(path) {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    headers: { Authorization: AUTH },
  })
  return res.json()
}

async function wpPatch(path, body) {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    method: 'POST',
    headers: { Authorization: AUTH, 'Content-Type': 'application/json', 'X-HTTP-Method-Override': 'PATCH' },
    body: JSON.stringify(body),
  })
  return res.json()
}

function stripHtml(html) {
  return (html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000)
}

function buildPageSummary(page) {
  const title = page.title?.rendered || ''
  const content = stripHtml(page.content?.rendered || '')
  const acf = page.acf || {}

  const acfText = Object.entries(acf)
    .filter(([k, v]) => typeof v === 'string' && v.length > 0 && !k.startsWith('seo_') && k !== 'og_image')
    .map(([k, v]) => `${k}: ${v.slice(0, 200)}`)
    .join('\n')

  return `Page title: ${title}\n\nACF fields:\n${acfText}\n\nPage content:\n${content}`
}

async function generateSEO(client, label, summary) {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: `${SITE_CONTEXT}

Generate SEO metadata for the "${label}" page based on this content:

${summary}

Rules:
- seo_title: max 60 characters, descriptive, include brand "Premium Lenses" at the end with " | ", e.g. "Contact Lenses Guide | Premium Lenses"
- seo_description: 150-160 characters exactly, compelling, includes relevant keywords, ends with a call to action or benefit

Respond ONLY with valid JSON, nothing else:
{"seo_title": "...", "seo_description": "..."}`,
      },
    ],
  })

  const text = message.content[0].text.trim()
  return JSON.parse(text)
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ERROR: ANTHROPIC_API_KEY environment variable is required.')
    console.error('Usage: ANTHROPIC_API_KEY=sk-ant-... node scripts/generate-seo.mjs')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey })

  console.log(`Generating SEO for ${PAGES.length} pages${FORCE ? ' (force mode)' : ''}...\n`)

  for (const { id, label, path } of PAGES) {
    try {
      const page = await wpGet(`/wp/v2/pages/${id}?_fields=id,title,content,acf`)

      const existing = page.acf?.seo_title
      if (existing && !FORCE) {
        console.log(`⏭  ${label} — already has SEO title "${existing}", skipping (use --force to overwrite)`)
        continue
      }

      console.log(`⚙  ${label} — generating...`)
      const summary = buildPageSummary(page)
      const { seo_title, seo_description } = await generateSEO(client, label, summary)

      console.log(`   Title:       ${seo_title}`)
      console.log(`   Description: ${seo_description}`)

      const result = await wpPatch(`/wp/v2/pages/${id}`, {
        acf: { seo_title, seo_description },
      })

      if (result.id) {
        console.log(`   ✓ Saved to WordPress\n`)
      } else {
        console.log(`   ✗ Save failed:`, result.message || JSON.stringify(result), '\n')
      }
    } catch (err) {
      console.error(`   ✗ Error for ${label}:`, err.message, '\n')
    }
  }

  console.log('Done.')
}

main()
