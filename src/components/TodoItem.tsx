import { useEffect, useRef, useState } from 'react'
import type { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const editRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) editRef.current?.focus()
  }, [editing])

  const commitEdit = () => {
    const trimmed = draft.trim()
    onEdit(todo.id, trimmed || todo.text)
    setDraft(trimmed || todo.text)
    setEditing(false)
  }

  const cancelEdit = () => {
    setDraft(todo.text)
    setEditing(false)
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0">
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-zinc-300 dark:border-zinc-600 hover:border-emerald-400'
        }`}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={editRef}
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commitEdit}
          onKeyDown={e => {
            if (e.key === 'Enter') commitEdit()
            if (e.key === 'Escape') cancelEdit()
          }}
          className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 outline-none border-b border-blue-500 text-sm pb-0.5"
        />
      ) : (
        <span
          onDoubleClick={() => { setDraft(todo.text); setEditing(true) }}
          className={`flex-1 text-sm cursor-default select-none ${
            todo.completed
              ? 'line-through text-zinc-400 dark:text-zinc-500'
              : 'text-zinc-800 dark:text-zinc-200'
          }`}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-zinc-400 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 transition-all duration-150 text-lg leading-none"
        aria-label="Delete todo"
      >
        ×
      </button>
    </li>
  )
}
