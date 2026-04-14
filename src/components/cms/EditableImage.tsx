'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, Check, X, Loader2, Upload } from 'lucide-react'
import { useEditMode } from '@/app/context/EditModeContext'

interface Props {
  pageId: number
  fieldName: string
  src: string
  alt: string
  className?: string
  /** Classes applied to the outer wrapper span (e.g. "w-full h-full block") */
  wrapperClassName?: string
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>
  /** Rendered when src is empty and not in edit mode */
  placeholder?: React.ReactNode
}

export function EditableImage({ pageId, fieldName, src, alt, className, wrapperClassName, imgProps, placeholder }: Props) {
  const { isEditMode, saveField } = useEditMode()
  const [editing, setEditing] = useState(false)
  // displayUrl — what's shown in the img tag
  const [displayUrl, setDisplayUrl] = useState(src)
  // saveValue — what gets sent to ACF (attachment ID for uploads, URL for pastes)
  const [saveValue, setSaveValue] = useState(src)
  // urlDraft — the text in the URL input
  const [urlDraft, setUrlDraft] = useState(src)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  // Track what we last successfully saved so router.refresh() doesn't reset it
  const savedRef = useRef(src)

  // Sync when parent prop updates — but only if it's a newer value from the server
  useEffect(() => {
    if (!editing && src && src !== savedRef.current) {
      setDisplayUrl(src)
      setSaveValue(src)
      setUrlDraft(src)
      savedRef.current = src
    }
  }, [src, editing])

  if (!isEditMode) {
    if (!src && placeholder) return <>{placeholder}</>
    return <img src={src} alt={alt} className={className} {...imgProps} />
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/cms/upload-media', { method: 'POST', body: fd })
      const data = await res.json() as { url?: string; id?: number; error?: string }
      if (!res.ok) throw new Error(data.error ?? 'Upload failed')
      // Display the URL, but save the attachment ID — ACF Image fields require the ID
      setDisplayUrl(data.url!)
      setSaveValue(String(data.id!))
      setUrlDraft(data.url!)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  function handleUrlChange(val: string) {
    setUrlDraft(val)
    setDisplayUrl(val)
    setSaveValue(val)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await saveField(pageId, fieldName, saveValue)
      savedRef.current = displayUrl // prevent useEffect from resetting
      setEditing(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  function handleCancel() {
    setDisplayUrl(savedRef.current)
    setSaveValue(savedRef.current)
    setUrlDraft(savedRef.current)
    setEditing(false)
    setError('')
  }

  const wrapClass = wrapperClassName
    ? `relative group/ei outline outline-1 outline-dashed outline-black/20 rounded ${wrapperClassName}`
    : 'relative group/ei inline-block outline outline-1 outline-dashed outline-black/20 rounded'

  return (
    <span className={wrapClass} style={wrapperClassName ? { display: 'block' } : undefined}>
      {displayUrl ? (
        <img src={displayUrl} alt={alt} className={className} {...imgProps} />
      ) : (
        <span className="flex items-center justify-center w-full h-full min-h-[160px] text-black/30 text-sm">
          {placeholder ?? 'No image — click camera to upload'}
        </span>
      )}

      {/* Camera button */}
      {!editing && (
        <button
          onClick={() => setEditing(true)}
          title={`Edit ${fieldName}`}
          className="
            absolute top-2 right-2
            w-7 h-7 flex items-center justify-center
            bg-black text-white rounded-full
            opacity-0 group-hover/ei:opacity-100
            transition-opacity duration-150 z-50 shadow-md
          "
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Edit panel overlay */}
      {editing && (
        <span className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-4 rounded-[inherit] z-50 gap-2">
          {/* Preview */}
          {displayUrl && (
            <img src={displayUrl} alt="preview" className="w-full max-h-40 object-contain rounded mb-1" />
          )}

          {/* Upload button */}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black text-xs rounded hover:bg-white/90 disabled:opacity-50 w-full justify-center"
          >
            {uploading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
            {uploading ? 'Uploading…' : 'Upload Image'}
          </button>

          {/* URL input */}
          <input
            type="url"
            value={urlDraft}
            onChange={e => handleUrlChange(e.target.value)}
            className="w-full border border-white/30 rounded px-2 py-1 text-xs text-black bg-white outline-none"
            placeholder="Or paste image URL…"
          />

          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          <span className="flex gap-1 w-full">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-black text-white text-xs rounded hover:bg-black/80 disabled:opacity-50 border border-white/20"
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-white/10 text-white text-xs rounded border border-white/20 hover:bg-white/20"
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
