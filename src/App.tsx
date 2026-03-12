import { useState } from 'react'
import { TodoFooter } from './components/TodoFooter'
import { TodoInput } from './components/TodoInput'
import { TodoList } from './components/TodoList'
import { useTodos } from './hooks/useTodos'

function App() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
  const { filteredTodos, filter, activeCount, completedCount, dispatch } = useTodos()

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200">
        <div className="max-w-lg mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-widest text-zinc-800 dark:text-zinc-100 uppercase">
              Todo
            </h1>
            <button
              onClick={() => setDark(d => !d)}
              className="p-2 rounded-full text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-150"
              aria-label="Toggle dark mode"
            >
              {dark ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg shadow-zinc-200/60 dark:shadow-zinc-950/60 overflow-hidden">
            <TodoInput onAdd={text => dispatch({ type: 'ADD', text })} />
            <TodoList
              todos={filteredTodos}
              onToggle={id => dispatch({ type: 'TOGGLE', id })}
              onDelete={id => dispatch({ type: 'DELETE', id })}
              onEdit={(id, text) => dispatch({ type: 'EDIT', id, text })}
            />
            <TodoFooter
              activeCount={activeCount}
              completedCount={completedCount}
              filter={filter}
              onFilterChange={filter => dispatch({ type: 'SET_FILTER', filter })}
              onClearCompleted={() => dispatch({ type: 'CLEAR_COMPLETED' })}
            />
          </div>

          <p className="mt-4 text-center text-xs text-zinc-400 dark:text-zinc-600">
            Double-click to edit a todo
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
