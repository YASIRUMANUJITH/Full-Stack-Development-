import { boardRepo } from './boardRepo.js'

export const taskRepo = {
  findTask(boardId, taskId) {
    const board = boardRepo.findById(boardId)
    if (!board) return null
    for (const column of board.columns) {
      const task = column.tasks.find((item) => item.id === taskId)
      if (task) return { board, column, task }
    }
    return null
  },
  create(boardId, columnId, data) {
    const board = boardRepo.findById(boardId)
    if (!board) return null
    const column = board.columns.find((col) => col.id === columnId) || board.columns[0]
    const task = {
      id: `t-${Date.now()}`,
      title: data.title.trim(),
      description: data.description || '',
      assignee: data.assignee?.trim() || 'SU',
      priority: data.priority || 'medium',
      labels: data.labels || [],
    }
    column.tasks.push(task)
    return task
  },
  update(boardId, taskId, patch) {
    const found = this.findTask(boardId, taskId)
    if (!found) return null
    Object.assign(found.task, patch)
    return found.task
  },
  remove(boardId, taskId) {
    const found = this.findTask(boardId, taskId)
    if (!found) return null
    found.column.tasks = found.column.tasks.filter((item) => item.id !== taskId)
    return found.task
  },
  move(boardId, taskId, toColumnId) {
    const found = this.findTask(boardId, taskId)
    if (!found) return null
    found.column.tasks = found.column.tasks.filter((item) => item.id !== taskId)
    const target = found.board.columns.find((col) => col.id === toColumnId)
    if (!target) return null
    target.tasks.push(found.task)
    return found.task
  },
}
