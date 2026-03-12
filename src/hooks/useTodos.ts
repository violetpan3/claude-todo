import { useEffect, useMemo, useReducer } from 'react'
import type { Filter, Todo } from '../types'

type State = { todos: Todo[]; filter: Filter }

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'EDIT'; id: string; text: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; filter: Filter }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: crypto.randomUUID(), text: action.text, completed: false, createdAt: Date.now() },
        ],
      }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.id ? { ...t, completed: !t.completed } : t),
      }
    case 'DELETE':
      return { ...state, todos: state.todos.filter(t => t.id !== action.id) }
    case 'EDIT':
      return {
        ...state,
        todos: state.todos.map(t => t.id === action.id ? { ...t, text: action.text } : t),
      }
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter(t => !t.completed) }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    todos: JSON.parse(localStorage.getItem('todos') ?? '[]') as Todo[],
    filter: 'all' as Filter,
  }))

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos))
  }, [state.todos])

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active': return state.todos.filter(t => !t.completed)
      case 'completed': return state.todos.filter(t => t.completed)
      default: return state.todos
    }
  }, [state.todos, state.filter])

  const activeCount = useMemo(() => state.todos.filter(t => !t.completed).length, [state.todos])
  const completedCount = useMemo(() => state.todos.filter(t => t.completed).length, [state.todos])

  return { todos: state.todos, filteredTodos, filter: state.filter, activeCount, completedCount, dispatch }
}
