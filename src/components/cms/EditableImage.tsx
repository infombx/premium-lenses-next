'use client'

import { useState } from 'react'
import { Camera, Check, X, Loader2 } from 'lucide-react'
import { useEditMode } from '@/app/context/EditModeContext'

interface Props {
  pageId: number
  fieldName: string
  src: string
  alt: string
  className?: string
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
}

export function EditableImage({ pageId, fieldName, src, alt, className, imgProps }: Props) {
  const { isEditMode, saveField } = useEditMode()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(src)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  if (!isEditMode) {
    return <img src={src} alt={alt} className={className} {...imgProps} />
  }

  return (
    <span className="relative group/ei inline-block outline outline-1 outline-dashed outline-black/20 rounded">
      <img src={src} alt={alt} className={className} {...imgProps} />

      {/* Camera overlay */}
      {!editing && (
        <button
          onClick={() => setEditing(true)}
          title={`Edit ${fieldName}`}
          className="
            absolute top-1.5 right-1.5
            w-6 h-6 flex items-center justify-center
            bg-black text-white rounded-full
            opacity-0 group-hover/ei:opacity-100
            transition-opacity duration-150 z-50 shadow-md
          "
        >
          <Camera className="w-3 h-3" />
        </button>
      )}

      {/* URL edit panel */}
      {editing && (
        <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-3 rounded-[inherit] z-50">
          <p className="text-white text-xs mb-2 text-center">Paste image URL</p>
          <input
            type="url"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            autoFocus
            className="w-full border border-black/30 rounded px-2 py-1 text-xs text-black bg-white outline-none mb-1"
            placeholder="https://..."
          />
          {error && <p className="text-red-400 text-xs mb-1">{error}</p>}
          <span className="flex gap-1">
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
              onClick={() => { setDraft(src); setEditing(false); setError('') }}
              className="flex items-center gap-1 px-2 py-1 bg-white/20 text-white text-xs rounded border border-white/30 hover:bg-white/30"
            >
              <X className="w-3 h-3" />
              Cancel
            </button>
          </span>
        </span>
      )}
    </span>
  )
}
