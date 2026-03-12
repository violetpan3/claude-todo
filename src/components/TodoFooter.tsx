import type { Filter } from '../types'

interface Props {
  activeCount: number
  completedCount: number
  filter: Filter
  onFilterChange: (filter: Filter) => void
  onClearCompleted: () => void
}

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export function TodoFooter({ activeCount, completedCount, filter, onFilterChange, onClearCompleted }: Props) {
  return (
    <div className="flex items-center justify-between px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
      <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>

      <div className="flex gap-1">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-2 py-1 rounded transition-colors duration-150 ${
              filter === f.value
                ? 'text-blue-500 border border-blue-400 dark:border-blue-600'
                : 'hover:text-zinc-700 dark:hover:text-zinc-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="disabled:invisible hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors duration-150"
      >
        Clear completed
      </button>
    </div>
  )
}
