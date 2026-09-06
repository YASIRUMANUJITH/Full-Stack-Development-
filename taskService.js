import { taskRepo } from '../repositories/taskRepo.js'
import { boardService } from './boardService.js'
import { NotFoundError, ConflictError } from '../utils/AppError.js'

export const taskService = {
  async createTask(boardId, userId, data) {
    await boardService.getBoard(boardId, userId)
    return taskRepo.create(boardId, data.columnId || 'todo', data)
  },

  async updateTask(boardId, taskId, userId, patch) {
    await boardService.getBoard(boardId, userId)
    const found = await taskRepo.findTask(boardId, taskId)
    if (!found) throw new NotFoundError('Task not found')

    const { status, version, ...fields } = patch
    if (version !== undefined && found.task.version !== version) {
      throw new ConflictError('This task was changed elsewhere since you loaded it', 'CONFLICT', {
        currentVersion: found.task.version,
        yourVersion: version,
      })
    }
    return taskRepo.update(boardId, taskId, fields, status)
  },

  async deleteTask(boardId, taskId, userId) {
    await boardService.getBoard(boardId, userId)
    const removed = await taskRepo.remove(boardId, taskId)
    if (!removed) throw new NotFoundError('Task not found')
    return removed
  },
}
