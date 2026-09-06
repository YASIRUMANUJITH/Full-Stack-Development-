import mongoose from 'mongoose'
import Board from '../models/Board.js'

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

export const taskRepo = {
  async findTask(boardId, taskId) {
    if (!isValidId(boardId)) return null
    const board = await Board.findById(boardId)
    if (!board) return null
    for (const column of board.columns) {
      const task = column.tasks.find((item) => item.id === taskId)
      if (task) return { board, column, task }
    }
    return null
  },

  async create(boardId, columnId, data) {
    if (!isValidId(boardId)) return null
    const board = await Board.findById(boardId)
    if (!board) return null
    const column = board.columns.find((col) => col.id === columnId) || board.columns[0]
    column.tasks.push({
      title: data.title.trim(),
      description: data.description || '',
      assignee: data.assignee?.trim() || 'SU',
      priority: data.priority || 'medium',
      labels: data.labels || [],
    })
    await board.save()
    return column.tasks[column.tasks.length - 1].toJSON()
  },

  // Applies field edits, bumps the optimistic-concurrency version, and moves
  // the task between columns — all inside one document save, so it is atomic.
  async update(boardId, taskId, fields, toColumnId) {
    const found = await this.findTask(boardId, taskId)
    if (!found) return null
    const { board, column, task } = found

    Object.assign(task, fields)
    task.version += 1

    if (toColumnId && toColumnId !== column.id) {
      const target = board.columns.find((col) => col.id === toColumnId)
      if (!target) return null
      const taskData = task.toObject()
      column.tasks.pull(task._id)
      target.tasks.push(taskData)
    }

    await board.save()

    const destination = toColumnId && toColumnId !== column.id ? board.columns.find((col) => col.id === toColumnId) : column
    const saved = destination.tasks.id(taskId)
    return saved.toJSON()
  },

  async remove(boardId, taskId) {
    const found = await this.findTask(boardId, taskId)
    if (!found) return null
    found.column.tasks.pull(found.task._id)
    await found.board.save()
    return found.task.toJSON()
  },
}
