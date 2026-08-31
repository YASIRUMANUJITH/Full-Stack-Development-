import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { mockBoards as seedBoards } from '../data/mockData'
import { boardsApi } from '../api/boards'

const BoardsContext = createContext(null)

export function BoardsProvider({ children }) {
  const [boards, setBoardsState] = useState(seedBoards)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await boardsApi.list()
      setBoardsState(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const setBoards = useCallback((updater) => {
    setBoardsState((prev) => (typeof updater === 'function' ? updater(prev) : updater))
  }, [])

  return <BoardsContext.Provider value={{ boards, setBoards, loading, error, refresh }}>{children}</BoardsContext.Provider>
}

export function useBoards() {
  const context = useContext(BoardsContext)
  if (!context) throw new Error('useBoards must be used within BoardsProvider')
  return context
}
