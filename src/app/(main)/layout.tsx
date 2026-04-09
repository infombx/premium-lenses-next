import { cookies } from 'next/headers'
import { Header } from '@/components/homepage/Header'
import { Footer } from '@/components/homepage/Footer'
import { EditModeProvider } from '@/app/context/EditModeContext'
import { getGlobalContent } from '@/lib/wordpress'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('wp_jwt')?.value
  const global = await getGlobalContent()

  return (
    <EditModeProvider isLoggedIn={isLoggedIn}>
      <Header content={global} isLoggedIn={isLoggedIn} />
      <main>{children}</main>
      <Footer content={global} />
    </EditModeProvider>
  )
}
