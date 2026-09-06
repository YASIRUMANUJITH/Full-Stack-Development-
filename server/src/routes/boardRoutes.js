import { Router } from 'express'
import { getBoards, getBoard, createBoard, updateBoard } from '../controllers/boardController.js'
import { listTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'
import { validate } from '../middleware/validate.js'
import { createBoardSchema, updateBoardSchema, createTaskSchema, updateTaskSchema } from '../schemas/index.js'

const router = Router()

router.get('/boards', getBoards)
router.post('/boards', validate(createBoardSchema), createBoard)
router.get('/boards/:boardId', getBoard)
router.patch('/boards/:boardId', validate(updateBoardSchema), updateBoard)
router.get('/boards/:boardId/tasks', listTasks)
router.post('/boards/:boardId/tasks', validate(createTaskSchema), createTask)
router.patch('/boards/:boardId/tasks/:taskId', validate(updateTaskSchema), updateTask)
router.delete('/boards/:boardId/tasks/:taskId', deleteTask)

export default router
