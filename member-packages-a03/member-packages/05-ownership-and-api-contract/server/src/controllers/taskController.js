import { taskService } from '../services/taskService.js'
import { boardService } from '../services/boardService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listTasks = asyncHandler(async (req, res) => {
  const tasks = await boardService.listTasks(req.params.boardId, req.query, req.user.id)
  res.json({ data: tasks })
})

export const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.params.boardId, req.user.id, req.body)
  res.status(201).json({ data: task })
})

export const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.boardId, req.params.taskId, req.user.id, req.body)
  res.json({ data: task })
})

export const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.boardId, req.params.taskId, req.user.id)
  res.status(204).send()
})
