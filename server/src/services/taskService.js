import { taskRepo } from '../repositories/taskRepo.js'
import { boardRepo } from '../repositories/boardRepo.js'
import { NotFoundError } from '../utils/AppError.js'

export const taskService = {
  createTask(boardId, data) {
    const board = boardRepo.findById(boardId)
    if (!board) throw new NotFoundError('Board not found')
    return taskRepo.create(boardId, data.columnId || 'todo', data)
  },
  updateTask(boardId, taskId, patch) {
    const task = taskRepo.update(boardId, taskId, patch)
    if (!task) throw new NotFoundError('Task not found')
    if (patch.status) taskRepo.move(boardId, taskId, patch.status)
    return task
  },
  deleteTask(boardId, taskId) {
    const task = taskRepo.remove(boardId, taskId)
    if (!task) throw new NotFoundError('Task not found')
    return task
  },
}
