'use client'

import { createContext, useContext, useState, useCallback, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface EditModeContextType {
  isLoggedIn: boolean
  isEditMode: boolean
  toggleEditMode: () => void
  saveField: (pageId: number, fieldName: string, value: string) => Promise<void>
}

const EditModeContext = createContext<EditModeContextType>({
  isLoggedIn: false,
  isEditMode: false,
  toggleEditMode: () => {},
  saveField: async () => {},
})

export function useEditMode() {
  return useContext(EditModeContext)
}

export function EditModeProvider({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean
  children: React.ReactNode
}) {
  const [isEditMode, setIsEditMode] = useState(isLoggedIn)
  const [, startTransition] = useTransition()
  const router = useRouter()

  const toggleEditMode = useCallback(() => {
    setIsEditMode(prev => !prev)
  }, [])

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
      // Refresh server component data after saving
      startTransition(() => {
        router.refresh()
      })
    },
    [router],
  )

  return (
    <EditModeContext.Provider value={{ isLoggedIn, isEditMode, toggleEditMode, saveField }}>
      {children}
    </EditModeContext.Provider>
  )
}
