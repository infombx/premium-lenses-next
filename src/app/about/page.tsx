import { getAboutContent } from '@/lib/wordpress'
import AboutContent from './AboutContent'

export default async function AboutPage() {
  const content = await getAboutContent()
  return <AboutContent content={content} />
}
