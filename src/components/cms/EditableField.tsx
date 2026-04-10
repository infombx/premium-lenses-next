'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Check, X, Loader2 } from 'lucide-react'
import { useEditMode } from '@/app/context/EditModeContext'

interface Props {
  pageId: number
  fieldName: string
  value: string
  multiline?: boolean
  /** Extra classes applied to the editable wrapper (not the children) */
  className?: string
  children: React.ReactNode
}

export function EditableField({ pageId, fieldName, value, multiline, className, children }: Props) {
  const { isEditMode, saveField } = useEditMode()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLTextAreaElement & HTMLInputElement>(null)

  // Keep draft in sync if the underlying value changes (e.g. after router.refresh)
  useEffect(() => {
    if (!editing) setDraft(value)
  }, [value, editing])

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  if (!isEditMode) return <>{children}</>

  if (editing) {
    return (
      <span className={`relative block w-full ${className ?? ''}`}>
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={4}
            className="w-full border border-black/30 rounded px-2 py-1 text-inherit bg-white/90 text-black outline-none resize-y text-sm"
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="w-full border border-black/30 rounded px-2 py-1 text-inherit bg-white/90 text-black outline-none text-sm"
          />
        )}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <span className="flex gap-1 mt-1">
          <button
            onClick={async () => {
              setSaving(true)
              setError('')
              try {
                await saveField(pageId, fieldName, draft)
                setEditing(false)
              } catch (e) {
                setError(e instanceof Error ? e.message : 'Save failed')
              } finally {
                setSaving(false)
              }
            }}
            disabled={saving}
            className="flex items-center gap-1 px-2 py-1 bg-black text-white text-xs rounded hover:bg-black/80 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            Save
          </button>
          <button
            onClick={() => { setDraft(value); setEditing(false); setError('') }}
            className="flex items-center gap-1 px-2 py-1 bg-white/80 text-black text-xs rounded border border-black/20 hover:bg-white"
          >
            <X className="w-3 h-3" />
            Cancel
          </button>
        </span>
      </span>
    )
  }

  return (
    <span className={`relative group/ef block outline outline-1 outline-dashed outline-black/20 rounded ${className ?? ''}`}>
      {children}
      <button
        onClick={() => setEditing(true)}
        title={`Edit ${fieldName}`}
        className="
          absolute top-1.5 right-1.5
          w-5 h-5 flex items-center justify-center
          bg-black text-white rounded-full
          opacity-0 group-hover/ef:opacity-100
          transition-opacity duration-150
          z-50 shadow-md
        "
      >
        <Pencil className="w-2.5 h-2.5" />
      </button>
    </span>
  )
}
