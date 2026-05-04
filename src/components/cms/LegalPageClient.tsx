'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useEditMode } from '@/app/context/EditModeContext'
import { TipTapEditor } from './TipTapEditor'

interface Props {
  title: string
  pageId: number | null
  pageSlug: string
  content: string
}

export function LegalPageClient({ title, pageId, pageSlug, content }: Props) {
  const { isEditMode } = useEditMode()
  const [editing, setEditing] = useState(false)

  return (
    <div className="max-w-[860px] mx-auto px-6 md:px-12 py-24 md:py-32">
      {/* Header */}
      <div className="mb-12 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.3em] text-black/40 uppercase mb-3">Legal</p>
          <h1 className="text-3xl md:text-4xl font-light text-black tracking-tight">{title}</h1>
        </div>
        {isEditMode && !editing && pageId && (
          <button
            onClick={() => setEditing(true)}
            className="flex-shrink-0 flex items-center gap-1.5 mt-2 px-3 py-2 text-xs border border-black/15 rounded-lg text-black/60 hover:bg-black/5 transition-colors"
          >
            <Pencil className="w-3 h-3" />
            Edit Content
          </button>
        )}
        {isEditMode && !pageId && (
          <p className="flex-shrink-0 mt-2 text-xs text-amber-600 border border-amber-200 bg-amber-50 px-3 py-2 rounded-lg">
            Create a WordPress page with slug <code className="font-mono">{pageSlug}</code> to enable editing.
          </p>
        )}
      </div>

      {/* Content */}
      {editing && pageId ? (
        <TipTapEditor
          pageId={pageId}
          pageSlug={pageSlug}
          initialContent={content}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div
          className="legal-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  )
}
