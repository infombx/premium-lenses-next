import { getContactContent } from '@/lib/wordpress'
import ContactContent from './ContactContent'

export default async function ContactPage() {
  const content = await getContactContent()
  return <ContactContent content={content} />
}
