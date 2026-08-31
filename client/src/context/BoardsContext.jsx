import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { mockBoards as seedBoards } from '../data/mockData'

const BoardsContext = createContext(null)
const STORAGE_KEY = 'syncboard:boards'

export function BoardsProvider({ children }) {
  const [boards, setBoardsState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : seedBoards
    } catch {
      return seedBoards
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(boards))
  }, [boards])

  const setBoards = useCallback((updater) => {
    setBoardsState((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  return <BoardsContext.Provider value={{ boards, setBoards }}>{children}</BoardsContext.Provider>
}

export function useBoards() {
  const context = useContext(BoardsContext)
  if (!context) throw new Error('useBoards must be used within BoardsProvider')
  return context
}
