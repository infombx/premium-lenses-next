'use client'

import { createContext, useContext, useState, useCallback, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Pencil } from 'lucide-react'

interface EditModeContextType {
  isEditMode: boolean
  saveField: (pageId: number, fieldName: string, value: string) => Promise<void>
}

const EditModeContext = createContext<EditModeContextType>({
  isEditMode: false,
  saveField: async () => {},
})

export function useEditMode() {
  return useContext(EditModeContext)
}

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const check = () => {
      const active = document.cookie.includes('edit-mode=1')
      setIsEditMode(active)
      document.body.classList.toggle('edit-mode-active', active)
    }
    check()
    document.addEventListener('visibilitychange', check)
    return () => document.removeEventListener('visibilitychange', check)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  const saveField = useCallback(
    async (pageId: number, fieldName: string, value: string) => {
      const res = await fetch('/api/cms/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, fieldName, value }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { error?: string }).error ?? 'Save failed')
      }
      startTransition(() => {
        router.refresh()
      })
    },
    [router],
  )

  return (
    <EditModeContext.Provider value={{ isEditMode, saveField }}>
      {isEditMode && (
        <>
          <div className="fixed top-0 left-0 right-0 z-[9999] h-8 flex items-center justify-between px-4 bg-black text-white text-xs font-medium border-b border-white/10">
            <span className="flex items-center gap-2">
              <Pencil className="w-3 h-3" />
              Edit Mode Active
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              Exit Edit
            </button>
          </div>
          {/* Spacer so fixed banner doesn't overlap header */}
          <div className="h-8" />
        </>
      )}
      {children}
    </EditModeContext.Provider>
  )
}
