import { Server } from 'socket.io'

// Single shared Socket.io instance, initialised in server.js after DB connect.
// Controllers call emitBoardsChanged() after successful writes; clients react
// by refetching, so every open tab sees changes made elsewhere.
let io = null

export function initRealtime(httpServer, clientOrigin) {
  io = new Server(httpServer, {
    cors: { origin: clientOrigin, credentials: true },
  })
  return io
}

export function emitBoardsChanged(boardId) {
  if (io) io.emit('boards:changed', { boardId })
}
