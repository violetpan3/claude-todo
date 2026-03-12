import { useRef, useState } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  return (
    <div className="flex gap-2 p-4 border-b border-zinc-200 dark:border-zinc-700">
      <input
        ref={inputRef}
        autoFocus
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSubmit()}
        placeholder="What needs to be done?"
        className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none text-sm"
      />
      <button
        onClick={handleSubmit}
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors duration-150 disabled:opacity-40"
        disabled={!text.trim()}
      >
        Add
      </button>
    </div>
  )
}
