'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Bold, Italic, UnderlineIcon, Strikethrough,
  Heading2, Heading3, List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  LinkIcon, Undo, Redo, Check, X, Loader2,
} from 'lucide-react'

interface Props {
  pageId: number
  pageSlug: string
  initialContent: string
  onCancel: () => void
}

export function TipTapEditor({ pageId, pageSlug, initialContent, onCancel }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: initialContent || '<p></p>',
    editorProps: {
      attributes: {
        class: 'tiptap-content prose max-w-none outline-none min-h-[40vh] text-black/80 leading-relaxed',
      },
    },
  })

  const save = async () => {
    if (!editor) return
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/cms/save-legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, pageSlug, value: editor.getHTML() }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error((data as { error?: string }).error ?? 'Save failed')
      }
      router.refresh()
      onCancel()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  if (!editor) return null

  const ToolbarBtn = ({
    onClick, active, disabled: dis, children, title,
  }: { onClick: () => void; active?: boolean; disabled?: boolean; children: React.ReactNode; title: string }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={dis}
      title={title}
      className={`
        w-8 h-8 flex items-center justify-center rounded text-sm transition-colors
        ${active ? 'bg-black text-white' : 'text-black/60 hover:bg-black/8 hover:text-black'}
        disabled:opacity-30 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  )

  return (
    <div className="border border-black/15 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-black/10 bg-black/[0.02]">
        <ToolbarBtn title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
          <Bold className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
          <Italic className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')}>
          <UnderlineIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')}>
          <Strikethrough className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-black/15 mx-1" />

        <ToolbarBtn title="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
          <Heading2 className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Heading 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
          <Heading3 className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-black/15 mx-1" />

        <ToolbarBtn title="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
          <List className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Ordered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
          <ListOrdered className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-black/15 mx-1" />

        <ToolbarBtn title="Align left" onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })}>
          <AlignLeft className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Align center" onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })}>
          <AlignCenter className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Align right" onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })}>
          <AlignRight className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-black/15 mx-1" />

        <ToolbarBtn
          title="Link"
          onClick={() => {
            const prev = editor.getAttributes('link').href ?? ''
            const url = window.prompt('Enter URL', prev)
            if (url === null) return
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run()
            } else {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            }
          }}
          active={editor.isActive('link')}
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="w-px h-5 bg-black/15 mx-1" />

        <ToolbarBtn title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
          <Undo className="w-3.5 h-3.5" />
        </ToolbarBtn>
        <ToolbarBtn title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
          <Redo className="w-3.5 h-3.5" />
        </ToolbarBtn>

        <div className="flex-1" />

        {/* Save / Cancel */}
        <div className="flex items-center gap-2 ml-2">
          {error && <span className="text-red-500 text-xs">{error}</span>}
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-black/60 border border-black/15 rounded-lg hover:bg-black/5 transition-colors disabled:opacity-50"
          >
            <X className="w-3 h-3" />
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-black text-white rounded-lg hover:bg-black/80 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>

      {/* Editor area */}
      <div className="px-8 py-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
