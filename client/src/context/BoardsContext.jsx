import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { boardsApi } from '../api/boards'
import { API_URL } from '../api/client'
import { saveBoards, loadBoards, clearBoards } from '../api/cache'
import { useAuth } from './AuthContext'
import OfflineBanner from '../components/OfflineBanner'

const BoardsContext = createContext(null)

// All board state comes from the API — no mock data ships with the client
// anymore. A PouchDB snapshot mirrors every successful load so the app can
// still render when offline (see OfflineBanner).
export function BoardsProvider({ children }) {
  const { user } = useAuth()
  const [boards, setBoards] = useState([])
  const [loading, setLoading] = useState(Boolean(user))
  const [error, setError] = useState('')
  const [offline, setOffline] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const refresh = useCallback(async () => {
    if (!user) {
      setBoards([])
      setError('')
      setOffline(false)
      setLoading(false)
      clearBoards().catch(() => {})
      return
    }
    setLoading(true)
    setError('')
    try {
      const data = await boardsApi.list()
      setBoards(data)
      setOffline(false)
    } catch (err) {
      const cached = await loadBoards().catch(() => [])
      if (cached.length > 0) {
        setBoards(cached)
        setOffline(true)
      } else {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    setBannerDismissed(false)
    refresh()
  }, [refresh])

  // Realtime: while logged in, stay subscribed; any change reported by the
  // server (from ANY client) triggers one refetch. Two tabs/browsers on the
  // same board converge within a second without refreshing the page. If the
  // socket drops (server sleeping/offline), the app simply behaves as before.
  useEffect(() => {
    if (!user) return undefined
    const socket = io(API_URL)
    socket.on('boards:changed', () => refresh())
    return () => socket.disconnect()
  }, [user, refresh])

  // Mirror to the offline cache whenever the server-confirmed state changes.
  useEffect(() => {
    if (user && boards.length > 0) saveBoards(boards).catch(() => {})
  }, [boards, user])

  const addBoard = useCallback(async (name) => {
    const board = await boardsApi.create({ name })
    setBoards((prev) => [...prev, board])
    return board
  }, [])

  const renameBoard = useCallback(async (id, name) => {
    const board = await boardsApi.update(id, { name })
    setBoards((prev) => prev.map((item) => (item.id === id ? board : item)))
    return board
  }, [])

  const addTask = useCallback(async (boardId, data) => {
    const task = await boardsApi.createTask(boardId, data)
    const columnId = data.columnId || 'todo'
    setBoards((prev) =>
      prev.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              columns: board.columns.map((column) =>
                column.id === columnId ? { ...column, tasks: [...column.tasks, task] } : column,
              ),
            },
      ),
    )
    return task
  }, [])

  const editTask = useCallback(async (boardId, taskId, patch) => {
    const task = await boardsApi.updateTask(boardId, taskId, patch)
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== boardId) return board
        const fromColumn = board.columns.find((column) => column.tasks.some((item) => item.id === taskId))
        if (!fromColumn) return board
        const toColumnId = patch.status || fromColumn.id
        if (toColumnId === fromColumn.id) {
          // in-place edit: keep the task's position
          return {
            ...board,
            columns: board.columns.map((column) =>
              column.id === fromColumn.id
                ? { ...column, tasks: column.tasks.map((item) => (item.id === taskId ? task : item)) }
                : column,
            ),
          }
        }
        // move: strip from every column, append to the target
        return {
          ...board,
          columns: board.columns.map((column) => ({
            ...column,
            tasks:
              column.id === toColumnId
                ? [...column.tasks.filter((item) => item.id !== taskId), task]
                : column.tasks.filter((item) => item.id !== taskId),
          })),
        }
      }),
    )
    return task
  }, [])

  const removeTask = useCallback(async (boardId, taskId) => {
    await boardsApi.deleteTask(boardId, taskId)
    setBoards((prev) =>
      prev.map((board) =>
        board.id !== boardId
          ? board
          : {
              ...board,
              columns: board.columns.map((column) => ({
                ...column,
                tasks: column.tasks.filter((item) => item.id !== taskId),
              })),
            },
      ),
    )
  }, [])

  const value = { boards, loading, error, offline, refresh, addBoard, renameBoard, addTask, editTask, removeTask }

  return (
    <BoardsContext.Provider value={value}>
      {children}
      {offline && !bannerDismissed && <OfflineBanner onDismiss={() => setBannerDismissed(true)} />}
    </BoardsContext.Provider>
  )
}

export function useBoards() {
  const context = useContext(BoardsContext)
  if (!context) throw new Error('useBoards must be used within BoardsProvider')
  return context
}
