import { boardRepo } from '../repositories/boardRepo.js'
import { taskRepo } from '../repositories/taskRepo.js'
import { NotFoundError } from '../utils/AppError.js'

export const boardService = {
  listBoards() {
    return boardRepo.findAll()
  },
  getBoard(id) {
    const board = boardRepo.findById(id)
    if (!board) throw new NotFoundError('Board not found')
    return board
  },
  createBoard(name) {
    return boardRepo.create(name)
  },
  listTasks(boardId, query) {
    const board = boardRepo.findById(boardId)
    if (!board) throw new NotFoundError('Board not found')
    let tasks = board.columns.flatMap((column) => column.tasks.map((task) => ({ ...task, status: column.id })))
    if (query.q) {
      const q = query.q.toLowerCase()
      tasks = tasks.filter((task) => task.title.toLowerCase().includes(q) || task.description.toLowerCase().includes(q))
    }
    if (query.status) tasks = tasks.filter((task) => task.status === query.status)
    return tasks
  },
}
