import { boardRepo } from '../repositories/boardRepo.js'
import { NotFoundError, ForbiddenError } from '../utils/AppError.js'

function assertMember(board, userId) {
  const isMember = board.owner === userId || board.members.includes(userId)
  if (!isMember) throw new ForbiddenError('You do not have access to this board')
}

export const boardService = {
  listBoards(userId) {
    return boardRepo.findAllForUser(userId)
  },

  async getBoard(id, userId) {
    const board = await boardRepo.findById(id)
    if (!board) throw new NotFoundError('Board not found')
    assertMember(board, userId)
    return board
  },

  createBoard(name, userId) {
    return boardRepo.create(name, userId)
  },

  async updateBoard(id, patch, userId) {
    const board = await boardRepo.findById(id)
    if (!board) throw new NotFoundError('Board not found')
    assertMember(board, userId)
    return boardRepo.update(id, patch)
  },

  async listTasks(boardId, query, userId) {
    const board = await this.getBoard(boardId, userId)
    let tasks = board.columns.flatMap((column) => column.tasks.map((task) => ({ ...task, status: column.id })))
    if (query.q) {
      const q = query.q.toLowerCase()
      tasks = tasks.filter(
        (task) => task.title.toLowerCase().includes(q) || (task.description || '').toLowerCase().includes(q),
      )
    }
    if (query.status) tasks = tasks.filter((task) => task.status === query.status)
    return tasks
  },
}
