import { Header } from '@/components/homepage/Header'
import { Footer } from '@/components/homepage/Footer'
import { EditModeProvider } from '@/app/context/EditModeContext'
import { getGlobalContent } from '@/lib/wordpress'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobalContent()

  return (
    <EditModeProvider>
      <Header content={global} />
      <main>{children}</main>
      <Footer content={global} />
    </EditModeProvider>
  )
}
