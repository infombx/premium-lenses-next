/**
 * WordPress REST API client
 *
 * Fetches CMS content from WordPress using the REST API + ACF fields.
 * Every function has hardcoded fallbacks so the site works even when
 * WordPress pages/fields haven't been created yet.
 *
 * WordPress Setup Requirements:
 *  - Plugin: "Advanced Custom Fields" (free version from wordpress.org)
 *  - Each ACF field group must have "Show in REST API" enabled
 *  - Pages with these slugs: homepage, about, contact, guide, shop-hero, global-settings
 *
 * ACF Free Field Naming Convention for arrays:
 *  Instead of Repeater fields (Pro only), use numbered individual fields:
 *  e.g. stat_1_value / stat_1_label / stat_2_value / stat_2_label / ...
 *  The buildRepeater() and buildStringArray() helpers assemble them into arrays.
 */

const WP_URL = process.env.NEXT_PUBLIC_WC_URL ?? ''
const REVALIDATE = 3600 // 1 hour ISR

async function wpFetch<T>(path: string, options?: { revalidate?: number | false }): Promise<T | null> {
  try {
    const res = await fetch(`${WP_URL}/wp-json${path}`, {
      next: { revalidate: options?.revalidate !== undefined ? options.revalidate : REVALIDATE },
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Helpers for ACF Free (numbered individual fields → arrays)
// ---------------------------------------------------------------------------

/**
 * Builds an array of objects from numbered ACF fields.
 * e.g. prefix="stat", keys=["value","label"]
 * reads stat_1_value / stat_1_label / stat_2_value / stat_2_label / …
 */
function buildRepeater<T extends object>(
  acf: Record<string, unknown>,
  prefix: string,
  keys: (keyof T)[],
  max = 10,
): T[] {
  const items: T[] = []
  for (let i = 1; i <= max; i++) {
    const firstKey = `${prefix}_${i}_${String(keys[0])}`
    if (!acf[firstKey]) break
    const item = {} as T
    for (const key of keys) {
      ;(item as Record<string, unknown>)[String(key)] = acf[`${prefix}_${i}_${String(key)}`] ?? ''
    }
    items.push(item)
  }
  return items
}

/**
 * Builds a string array from numbered ACF fields.
 * e.g. prefix="safety_tip" reads safety_tip_1 / safety_tip_2 / …
 */
function buildStringArray(acf: Record<string, unknown>, prefix: string, max = 20): string[] {
  const items: string[] = []
  for (let i = 1; i <= max; i++) {
    const val = acf[`${prefix}_${i}`]
    if (typeof val !== 'string' || !val) break
    items.push(val)
  }
  return items
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface WPPage {
  id: number
  acf?: Record<string, unknown>
}

export interface Stat {
  value: string
  label: string
}

export interface Testimonial {
  name: string
  role: string
  quote: string
}

export interface Category {
  title: string
  description: string
  slug: string
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  details: string
}

export interface Value {
  title: string
  badge: string
  short: string
  expanded: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface GuideStep {
  title: string
  description: string
  tips: string[]
}

export interface GuideSection {
  id: string
  title: string
  content: unknown
}

// ---------------------------------------------------------------------------
// Homepage Content
// ---------------------------------------------------------------------------

export interface HomepageContent {
  hero_badge: string
  hero_headline: string
  hero_subheading: string
  hero_cta_primary: string
  hero_cta_secondary: string
  hero_image: string
  stats: Stat[]
  categories_title: string
  categories_description: string
  categories: Category[]
  featured_title: string
  featured_description: string
  about_label: string
  about_title: string
  about_body_1: string
  about_body_2: string
  about_images: string[]
  about_stats: Stat[]
  testimonials_title: string
  testimonials_subtitle: string
  testimonials: Testimonial[]
  testimonial_stats: Stat[]
}

const homepageFallback: HomepageContent = {
  hero_badge: 'BEAUTY COLLECTION',
  hero_headline: 'Transform Your Look, Naturally.',
  hero_subheading:
    'Discover stunning colored contact lenses that enhance your natural beauty with vibrant hues and comfortable all-day wear.',
  hero_cta_primary: 'Shop',
  hero_cta_secondary: 'Explore',
  hero_image: '/assets/7dcec5984ee2016a07e7cf6622999ce93bb0b5b8.png',
  stats: [
    { value: '50K+', label: 'CUSTOMERS' },
    { value: '99%', label: 'SATISFACTION' },
    { value: '24/7', label: 'SUPPORT' },
    { value: '100+', label: 'PRODUCTS' },
  ],
  categories_title: 'Shop by Category',
  categories_description:
    'Discover the perfect lenses tailored to your lifestyle and vision requirements',
  categories: [
    { title: 'COLORED SHADES', description: 'Transform your look with vibrant, natural-looking colors', slug: 'colored-shades' },
    { title: 'PRESCRIBED SHADES', description: 'Corrective lenses for clear, comfortable vision', slug: 'prescribed-shades' },
    { title: 'SOLUTIONS', description: 'Premium care products for your lenses', slug: 'solutions' },
    { title: 'ALL ITEMS', description: 'Browse our complete collection', slug: 'all' },
  ],
  featured_title: 'Featured Products',
  featured_description: 'Discover our most popular contact lenses, trusted by thousands of customers worldwide',
  about_label: 'ABOUT US',
  about_title: 'Beauty Meets Comfort',
  about_body_1:
    "For over 15 years, we've been helping people express their unique style through premium colored contact lenses. From subtle enhancements to bold transformations, our collection brings your vision to life with stunning, natural-looking colors.",
  about_body_2:
    'We partner with trusted manufacturers to ensure every lens combines breathtaking aesthetics with exceptional comfort and safety, so you can look amazing all day long.',
  about_images: [
    '/assets/3c7399a71e1ca7130bfad8769df3a0bd8a15e860.png',
    '/assets/7ce218e3c3182be1fd5d77b2fc156b9da7983fa5.png',
    '/assets/61f6e644cf51f6ae867d9a3d8576e7f2a6fbc311.png',
    '/assets/4323b2606492e25d7805f6e389ef484148cd1514.png',
    '/assets/477535dc8f09e1bbb59f0a34ca52544474e3fa96.png',
  ],
  about_stats: [
    { value: '500K+', label: 'Style Transformations' },
    { value: '50+', label: 'Countries Worldwide' },
    { value: '15+', label: 'Years of Beauty Innovation' },
    { value: '24/7', label: 'Customer Support' },
  ],
  testimonials_title: 'What Our Customers Say',
  testimonials_subtitle: 'Trusted by thousands of satisfied customers worldwide',
  testimonials: [
    {
      name: 'Sarah Mitchell',
      role: 'Beauty Enthusiast',
      quote: 'These lenses completely transformed my look! The color is so natural and vibrant. I get compliments everywhere I go.',
    },
    {
      name: 'James Chen',
      role: 'Fashion Blogger',
      quote: 'The perfect way to switch up my style! Comfortable to wear and the colors are absolutely stunning. A game-changer for my content.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Style Influencer',
      quote: "I love how these lenses enhance my natural eye color! So comfortable and they make my eyes pop in photos. Obsessed!",
    },
  ],
  testimonial_stats: [
    { value: '50K+', label: 'Happy Customers' },
    { value: '4.9', label: 'Average Rating' },
    { value: '98%', label: 'Love Their New Look' },
    { value: '15+', label: 'Years in Beauty' },
  ],
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=homepage&_fields=id,acf')
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return homepageFallback

  const base = { ...homepageFallback, ...acf } as HomepageContent

  // Support ACF Free (numbered fields) and ACF Pro (repeater arrays)
  const stats = Array.isArray(acf.stats) ? (acf.stats as Stat[]) : buildRepeater<Stat>(acf, 'stat', ['value', 'label'])
  if (stats.length) base.stats = stats

  const categories = Array.isArray(acf.categories) ? (acf.categories as Category[]) : buildRepeater<Category>(acf, 'category', ['title', 'description', 'slug'])
  if (categories.length) base.categories = categories

  const testimonials = Array.isArray(acf.testimonials) ? (acf.testimonials as Testimonial[]) : buildRepeater<Testimonial>(acf, 'testimonial', ['name', 'role', 'quote'])
  if (testimonials.length) base.testimonials = testimonials

  const testimonialStats = Array.isArray(acf.testimonial_stats) ? (acf.testimonial_stats as Stat[]) : buildRepeater<Stat>(acf, 'testimonial_stat', ['value', 'label'])
  if (testimonialStats.length) base.testimonial_stats = testimonialStats

  const aboutStats = Array.isArray(acf.about_stats) ? (acf.about_stats as Stat[]) : buildRepeater<Stat>(acf, 'about_stat', ['value', 'label'])
  if (aboutStats.length) base.about_stats = aboutStats

  if (acf.hero_image) base.hero_image = acf.hero_image as string

  const aboutImages = Array.isArray(acf.about_images)
    ? (acf.about_images as string[])
    : buildStringArray(acf, 'about_image', 5)
  if (aboutImages.length) base.about_images = aboutImages

  return base
}

// ---------------------------------------------------------------------------
// About Page Content
// ---------------------------------------------------------------------------

export interface AboutContent {
  hero_badge: string
  hero_headline: string
  hero_subheading: string
  hero_image: string
  stats: Stat[]
  story_title: string
  story_image: string
  story_paragraphs: string[]
  values_title: string
  values_description: string
  values: Value[]
  timeline_title: string
  timeline_subtitle: string
  timeline: TimelineItem[]
  cta_title: string
  cta_subtitle: string
  cta_button: string
}

const aboutFallback: AboutContent = {
  hero_badge: 'SINCE 2014',
  hero_headline: 'Redefining Beauty',
  hero_subheading:
    'We combine stunning aesthetics with uncompromising quality to deliver exceptional beauty transformation.',
  hero_image: '/assets/f7c7946c85a38c2f9e0c12270faf1c001faa0d27.png',
  stats: [
    { value: '10+', label: 'YEARS' },
    { value: '50K+', label: 'CUSTOMERS' },
    { value: '100+', label: 'PRODUCTS' },
    { value: '99%', label: 'SATISFACTION' },
  ],
  story_title: 'Our Story',
  story_image: '',
  story_paragraphs: [
    "Founded with a passion for beauty and self-expression, we've been serving customers for over a decade. What started as a small vision to enhance natural beauty has grown into a trusted source for stunning colored contact lenses.",
    "We believe that everyone deserves to express their unique style. That's why we partner with leading manufacturers to bring you the latest in beauty lens designs, all at prices that make transformation accessible.",
    "Our team of beauty specialists is committed to helping you find the perfect lenses for your look, whether you're seeking subtle enhancement, dramatic transformation, or versatile everyday styles.",
  ],
  values_title: 'Our Values',
  values_description: 'The principles that guide everything we do',
  values: [
    {
      title: 'Quality First',
      badge: '100% Certified',
      short: 'We source only certified lenses from trusted manufacturers, ensuring the highest standards of safety, comfort, and vibrant color.',
      expanded: 'Every product undergoes rigorous quality control testing before reaching you. We partner exclusively with industry-leading brands known for their commitment to eye health and stunning designs.',
    },
    {
      title: 'Customer Care',
      badge: '24/7 Support',
      short: 'Your beauty journey is our priority. Our expert team is always ready to help you find the perfect lenses for your style.',
      expanded: 'Our dedicated support specialists are beauty consultants with years of experience in colored contacts. Whether you need help choosing the right color or understanding lens options, we\'re here around the clock.',
    },
    {
      title: 'Innovation',
      badge: 'Latest Trends',
      short: 'We stay ahead of the curve, bringing you the latest advances in beauty lens design for stunning looks and superior comfort.',
      expanded: 'We continuously research and test emerging trends in lens colors, patterns, and designs. From natural enhancement shades to bold statement colors, we ensure you have access to cutting-edge products.',
    },
  ],
  timeline_title: 'Our Journey',
  timeline_subtitle: 'Milestones that shaped our story',
  timeline: [
    { year: '2014', title: 'Founded', description: 'Started with a vision to revolutionize beauty contact lens shopping', details: 'With just a small team of passionate beauty enthusiasts, we launched our first online platform. We started with 20 products and a commitment to exceptional customer service.' },
    { year: '2016', title: 'First 10K Customers', description: 'Reached our first major milestone in customer satisfaction', details: 'This milestone validated our approach to combining quality products with outstanding service. We expanded our customer support team and introduced our first loyalty program.' },
    { year: '2019', title: 'Expanded Product Line', description: 'Introduced diverse color palettes and special effects', details: 'Listening to customer feedback, we partnered with leading manufacturers to offer natural enhancement shades, bold transformation colors, and special effect designs.' },
    { year: '2022', title: 'Industry Recognition', description: 'Awarded Best Online Beauty Lens Provider', details: 'The Beauty Industry Association recognized our commitment to quality and innovation.' },
    { year: '2024', title: 'Innovation Leader', description: 'Launched next-generation color and comfort technology', details: 'We introduced exclusive partnerships with manufacturers using advanced pigment layering and bio-inspired materials.' },
  ],
  cta_title: 'Join Our Beauty Journey',
  cta_subtitle: 'Experience the difference that stunning colors and exceptional quality can make',
  cta_button: 'SHOP NOW',
}

export async function getAboutContent(): Promise<AboutContent> {
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=about&_fields=id,acf')
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return aboutFallback

  const base = { ...aboutFallback, ...acf } as AboutContent

  // ACF Image fields can return an object {url,...}, an ID (number), or a URL string
  // Normalise to a plain URL string
  if (acf.story_image) {
    const raw = acf.story_image as unknown
    if (typeof raw === 'object' && raw !== null && 'url' in raw) {
      base.story_image = (raw as { url: string }).url
    } else if (typeof raw === 'number') {
      // ID only — fetch the URL from the media endpoint
      try {
        const media = await wpFetch<{ source_url: string }>(`/wp/v2/media/${raw}`)
        base.story_image = media?.source_url ?? ''
      } catch { base.story_image = '' }
    } else {
      base.story_image = String(raw)
    }
  }

  const stats = Array.isArray(acf.stats) ? (acf.stats as Stat[]) : buildRepeater<Stat>(acf, 'stat', ['value', 'label'])
  if (stats.length) base.stats = stats

  const storyParas = Array.isArray(acf.story_paragraphs) ? (acf.story_paragraphs as string[]) : buildStringArray(acf, 'story_para')
  if (storyParas.length) base.story_paragraphs = storyParas

  const values = Array.isArray(acf.values) ? (acf.values as Value[]) : buildRepeater<Value>(acf, 'value', ['title', 'badge', 'short', 'expanded'])
  if (values.length) base.values = values

  const timeline = Array.isArray(acf.timeline) ? (acf.timeline as TimelineItem[]) : buildRepeater<TimelineItem>(acf, 'timeline', ['year', 'title', 'description', 'details'])
  if (timeline.length) base.timeline = timeline

  return base
}

// ---------------------------------------------------------------------------
// Contact Page Content
// ---------------------------------------------------------------------------

export interface ContactContent {
  hero_title: string
  hero_subtitle: string
  hero_image: string
  phone: string
  email: string
  address: string
  form_title: string
  form_description: string
  map_embed_url: string
}

const contactFallback: ContactContent = {
  hero_title: 'Contact Us',
  hero_subtitle: 'Get In Touch',
  hero_image: '/assets/bd6db3455f9fbd65eb2b7f615633839089ab5a7d.png',
  phone: '+230 XXX XXXX',
  email: 'hello@premiumlenses.mu',
  address: 'Mauritius',
  form_title: 'Connect With Us Today!',
  form_description:
    "Whether you have a question about colors, need help finding your perfect shade, or just want to share your transformation story, we're here to help.",
  map_embed_url:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.14!2d57.4977!3d-20.1609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA5JzM5LjIiUyA1N8KwMjknNTEuNyJF!5e0!3m2!1sen!2smu!4v1234567890',
}

export async function getContactContent(): Promise<ContactContent> {
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=contact&_fields=id,acf')
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return contactFallback
  return { ...contactFallback, ...acf } as ContactContent
}

// ---------------------------------------------------------------------------
// Guide Page Content
// ---------------------------------------------------------------------------

export interface GuideContentItem {
  title: string
  description: string
  pros?: string[]
  bestFor?: string
  dos?: string[]
  donts?: string[]
}

export interface GuideStep {
  number: number
  title: string
  description: string
  tips: string[]
}

export interface GuideProblem {
  issue: string
  causes: string[]
  solutions: string[]
}

export interface GuideTopic {
  title: string
  content?: GuideContentItem[]
  steps?: GuideStep[]
  problems?: GuideProblem[]
}

export interface GuideContent {
  hero_badge: string
  hero_title: string
  hero_subtitle: string
  safety_tips_title: string
  safety_tips: string[]
  guide_section_title: string
  guide_section_subtitle: string
  topics: GuideTopic[]
  faq_section_title: string
  faq_section_subtitle: string
  faqs: FAQItem[]
  cta_title: string
  cta_description: string
  cta_button: string
}

const guideFallback: GuideContent = {
  hero_badge: 'EXPERT KNOWLEDGE',
  hero_title: 'Complete Contact Lens Guide',
  hero_subtitle:
    'Everything you need to know about choosing, wearing, and caring for your contact lenses—from first-time wearers to experienced users',
  safety_tips_title: 'Quick Safety Tips',
  safety_tips: [
    'Always handle lenses with clean, dry hands',
    'Never wear lenses longer than recommended',
    'Use fresh solution every time—never reuse',
    'Remove lenses before sleeping (unless approved)',
    'Consider UV-blocking lenses for sun protection',
    'Mark your calendar for replacement dates',
  ],
  guide_section_title: 'Comprehensive Guide',
  guide_section_subtitle: 'Click on each section to explore detailed information',
  topics: [
    {
      title: 'Choosing the Right Lenses',
      content: [
        {
          title: 'Daily Disposables',
          description: 'Perfect for occasional wearers, travelers, or anyone who wants ultimate convenience. Wear once and throw away—no cleaning solution needed.',
          pros: ['No maintenance required', 'Most hygienic option', 'Great for allergies', 'Perfect for travel'],
          bestFor: 'Occasional wearers, active lifestyles, people with allergies',
        },
        {
          title: 'Monthly Lenses',
          description: 'Ideal for daily wearers seeking cost-effective comfort. Designed for 30 days of wear with proper daily cleaning and storage.',
          pros: ['Cost-effective for daily wear', 'Comfortable for all-day use', 'Wide variety of options', 'Environmentally friendlier'],
          bestFor: 'Regular daily wearers, budget-conscious users',
        },
        {
          title: 'Colored Lenses',
          description: 'Change or enhance your eye color while maintaining vision correction. Available in prescription and non-prescription varieties.',
          pros: ['Aesthetic enhancement', 'Wide color selection', 'Same comfort as clear lenses', 'FDA approved options'],
          bestFor: 'Style-conscious wearers, special occasions',
        },
        {
          title: 'Specialty Lenses',
          description: 'Designed for specific vision needs like astigmatism (toric) or age-related focus issues (multifocal/progressive).',
          pros: ['Addresses specific vision needs', 'Advanced technology', 'Customized correction', 'High precision'],
          bestFor: 'Astigmatism, presbyopia, unique prescriptions',
        },
      ],
    },
    {
      title: 'How to Insert & Remove Lenses',
      steps: [
        { number: 1, title: 'Prepare Your Workspace', description: 'Wash hands thoroughly with soap and water. Dry with a lint-free towel. Ensure your work area is clean and well-lit.', tips: ['Use antibacterial soap', 'Avoid hand lotions before handling', 'Keep nails trimmed and filed'] },
        { number: 2, title: 'Check the Lens', description: "Place lens on your index finger. Make sure it's not inside out—it should look like a bowl, not a plate with flared edges.", tips: ['Hold lens up to light', 'Edges should curve inward', 'If edges flare out, flip it over'] },
        { number: 3, title: 'Insert the Lens', description: 'Use your free hand to hold your upper eyelid. Pull down lower lid with middle finger of hand holding lens. Look up and gently place lens on eye.', tips: ['Relax and breathe', 'Look upward, not at the lens', 'Release lid slowly after placing'] },
        { number: 4, title: 'Center and Settle', description: 'Close your eye gently and roll it around to center the lens. Blink a few times. The lens should feel comfortable.', tips: ["Don't rub your eyes", 'If discomfort persists, remove and retry', 'May take practice—be patient'] },
        { number: 5, title: 'Removing Lenses', description: 'Wash hands. Look up, pull down lower lid, and gently pinch the lens with thumb and index finger. Remove gently.', tips: ['Never remove with fingernails', 'Always remove before sleeping', 'Store immediately in solution'] },
      ],
    },
    {
      title: 'Care & Maintenance',
      content: [
        {
          title: 'Daily Cleaning Routine',
          description: 'After removing lenses, rub each lens with solution for 5 seconds on each side. Rinse thoroughly and store in fresh solution.',
          dos: ['Use fresh solution daily', 'Rub lenses even with "no-rub" solution', 'Clean case with solution', 'Air dry case upside down'],
          donts: ['Never use tap water', 'Never reuse old solution', 'Never use saliva', 'Never sleep in daily lenses'],
        },
        {
          title: 'Storage Best Practices',
          description: 'Store lenses in a clean case filled with fresh multipurpose or prescribed solution. Never add new solution to old.',
          dos: ['Replace case every 3 months', 'Use only recommended solutions', 'Keep case clean and dry', 'Store in cool, dry place'],
          donts: ["Don't mix solution brands", "Don't use expired solution", "Don't share lenses or cases", "Don't store in water"],
        },
      ],
    },
    {
      title: 'Troubleshooting Common Issues',
      problems: [
        { issue: 'Lens Feels Uncomfortable', causes: ['Inside-out lens', 'Debris on lens', 'Dry eyes', 'Damaged lens'], solutions: ['Remove and check orientation', 'Rinse with solution', 'Use rewetting drops', 'Replace if torn'] },
        { issue: 'Blurry Vision', causes: ['Dirty lens', 'Wrong lens in wrong eye', 'Prescription changed', 'Lens decentered'], solutions: ['Clean thoroughly', 'Check left/right markings', 'Get eye exam', 'Blink and reposition'] },
        { issue: 'Red or Irritated Eyes', causes: ['Overwear', 'Poor hygiene', 'Allergic reaction', 'Eye infection'], solutions: ['Remove lenses immediately', 'Clean hands and lenses', 'Try different solution', 'See eye doctor if persists'] },
        { issue: 'Dry Eyes', causes: ['Low humidity', 'Extended screen time', 'Certain medications', 'Insufficient blinking'], solutions: ['Use rewetting drops', 'Take screen breaks', 'Use humidifier', 'Blink more frequently'] },
      ],
    },
  ],
  faq_section_title: 'Frequently Asked Questions',
  faq_section_subtitle: 'Common questions from contact lens wearers',
  faqs: [
    { question: 'How long can I wear my contact lenses each day?', answer: "Daily disposables can be worn for up to 12-14 hours, while monthly lenses typically allow 10-12 hours of comfortable wear. Never exceed the manufacturer's recommended wearing schedule." },
    { question: 'Can I swim or shower with contact lenses?', answer: "It's not recommended to swim or shower while wearing contact lenses. Water can introduce bacteria and microorganisms that may cause serious eye infections." },
    { question: 'What should I do if a lens gets stuck in my eye?', answer: "Don't panic—lenses cannot get lost behind your eye. Try using rewetting drops to lubricate your eye, then gently massage your closed eyelid." },
    { question: 'How often should I replace my contact lens case?', answer: 'Replace your contact lens case every 3 months, or sooner if it becomes damaged or difficult to clean.' },
    { question: 'Can I use any brand of contact lens solution?', answer: 'Not all solutions are compatible with all lenses. Always use the solution recommended by your eye care professional or the lens manufacturer.' },
    { question: 'When should I see an eye doctor about my contacts?', answer: 'Schedule annual eye exams even if your vision seems fine. See your eye doctor immediately if you experience persistent redness, pain, or sudden vision changes.' },
  ],
  cta_title: 'Ready to Find Your Perfect Lenses?',
  cta_description: 'Browse our curated collection of premium contact lenses, all FDA-approved and backed by our expert support team',
  cta_button: 'SHOP NOW',
}

export async function getGuideContent(): Promise<GuideContent> {
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=guide&_fields=id,acf')
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return guideFallback

  const base = { ...guideFallback, ...acf } as GuideContent

  const safetyTips = Array.isArray(acf.safety_tips) ? (acf.safety_tips as string[]) : buildStringArray(acf, 'safety_tip')
  if (safetyTips.length) base.safety_tips = safetyTips

  const faqs = Array.isArray(acf.faqs) ? (acf.faqs as FAQItem[]) : buildRepeater<FAQItem>(acf, 'faq', ['question', 'answer'])
  if (faqs.length) base.faqs = faqs

  // Topics: try ACF repeater, fall back to built fallback
  const topics = Array.isArray(acf.topics) ? (acf.topics as GuideTopic[]) : null
  if (topics?.length) base.topics = topics

  return base
}

// ---------------------------------------------------------------------------
// Global / Sitewide Content (Header + Footer)
// ---------------------------------------------------------------------------

export interface GlobalContent {
  site_tagline: string
  logo_light: string
  logo_dark: string
  nav_links: Array<{ label: string; href: string }>
  footer_description: string
  footer_links: {
    shop: Array<{ label: string; href: string }>
    support: Array<{ label: string; href: string }>
    company: Array<{ label: string; href: string }>
    legal: Array<{ label: string; href: string }>
  }
  newsletter_title: string
  newsletter_description: string
  social: { facebook: string; instagram: string; twitter: string }
  copyright: string
  juice_number: string
  bank_account_number: string
  bank_name: string
  account_holder_name: string
  whatsapp_number: string
}

const globalFallback: GlobalContent = {
  site_tagline: 'Premium Vision Care Since 2014',
  logo_light: '/logo_black_white.svg',
  logo_dark: '/logo_black.svg',
  nav_links: [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Guide', href: '/guide' },
  ],
  footer_description: 'Premium contact lenses and eye care products for exceptional comfort and clarity.',
  footer_links: {
    shop: [
      { label: 'Daily Lenses', href: '/shop' },
      { label: 'Monthly Lenses', href: '/shop' },
      { label: 'Colored Lenses', href: '/shop' },
      { label: 'Specialty Lenses', href: '/shop' },
    ],
    support: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQs', href: '/guide' },
      { label: 'Shipping Info', href: '/guide' },
      { label: 'Returns', href: '/guide' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '/contact' },
      { label: 'Press', href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Service', href: '/' },
      { label: 'Cookie Policy', href: '/' },
      { label: 'Accessibility', href: '/' },
    ],
  },
  newsletter_title: 'STAY UPDATED',
  newsletter_description: 'Subscribe to our newsletter for exclusive offers and eye care tips.',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
  },
  copyright: `© ${new Date().getFullYear()} Premium Lenses. All rights reserved.`,
  juice_number: '',
  bank_account_number: '',
  bank_name: '',
  account_holder_name: '',
  whatsapp_number: '',
}

export async function getGlobalContent(): Promise<GlobalContent> {
  // Uses a regular WordPress page (slug: global-settings) — ACF Free compatible.
  // ACF Pro users can use an Options Page instead; change the fetch path to
  // /acf/v3/options/options and adjust the acf extraction accordingly.
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=global-settings&_fields=id,acf', { revalidate: 60 })
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return globalFallback

  const result = { ...globalFallback, ...acf } as GlobalContent

  // ACF Free: individual fields facebook_url / instagram_url / twitter_url
  // instead of a nested 'social' object
  if (!acf.social && (acf.facebook_url || acf.instagram_url || acf.twitter_url)) {
    result.social = {
      facebook: (acf.facebook_url as string) || globalFallback.social.facebook,
      instagram: (acf.instagram_url as string) || globalFallback.social.instagram,
      twitter: (acf.twitter_url as string) || globalFallback.social.twitter,
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Shop Hero Content
// ---------------------------------------------------------------------------

export interface ShopHeroContent {
  badge: string
  headline: string
  subheading: string
  hero_image: string
  hero_image_mobile: string
  feature_pills: Array<{ icon: string; text: string }>
  cta_button: string
}

const shopHeroFallback: ShopHeroContent = {
  badge: 'BEAUTY COLLECTION',
  headline: 'Express Your Style',
  subheading: 'Curated selection of stunning colored contact lenses designed for effortless beauty, all-day comfort, and mesmerizing looks',
  hero_image: '/assets/d57cdca6fd40b75203c33e78dffacd20f4175fc8.png',
  hero_image_mobile: '/assets/3a74539b273495185fd1bd4324da22c3f1ca7f98.png',
  feature_pills: [
    { icon: 'Eye', text: 'Safe & Certified' },
    { icon: 'Star', text: 'Stunning Colors' },
    { icon: 'Sparkles', text: 'Free Shipping' },
  ],
  cta_button: 'EXPLORE COLLECTION',
}

export async function getShopHeroContent(): Promise<ShopHeroContent> {
  const page = await wpFetch<WPPage>('/wp/v2/pages?slug=shop-hero&_fields=id,acf')
  const acf = (Array.isArray(page) ? page[0]?.acf : null) ?? {}
  if (!Object.keys(acf).length) return shopHeroFallback
  return { ...shopHeroFallback, ...acf } as ShopHeroContent
}
