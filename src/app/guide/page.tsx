import { getGuideContent } from '@/lib/wordpress'
import GuideContent from './GuideContent'

export default async function GuidePage() {
  const content = await getGuideContent()
  return <GuideContent content={content} />
}
