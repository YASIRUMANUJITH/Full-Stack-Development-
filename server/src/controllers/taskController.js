import { taskService } from '../services/taskService.js'
import { boardService } from '../services/boardService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listTasks = asyncHandler(async (req, res) => {
  const tasks = boardService.listTasks(req.params.boardId, req.query)
  res.json({ data: tasks })
})

export const createTask = asyncHandler(async (req, res) => {
  const task = taskService.createTask(req.params.boardId, req.body)
  res.status(201).json({ data: task })
})

export const updateTask = asyncHandler(async (req, res) => {
  const task = taskService.updateTask(req.params.boardId, req.params.taskId, req.body)
  res.json({ data: task })
})

export const deleteTask = asyncHandler(async (req, res) => {
  taskService.deleteTask(req.params.boardId, req.params.taskId)
  res.status(204).send()
})
