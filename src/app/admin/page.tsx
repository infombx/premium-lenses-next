import { redirect } from 'next/navigation'

// /admin just redirects to homepage — edit mode is activated by the cookie
export default function AdminPage() {
  redirect('/')
}
