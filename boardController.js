import { boardService } from '../services/boardService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getBoards = asyncHandler(async (req, res) => {
  const boards = await boardService.listBoards(req.user.id)
  res.json({ data: boards })
})

export const getBoard = asyncHandler(async (req, res) => {
  const board = await boardService.getBoard(req.params.boardId, req.user.id)
  res.json({ data: board })
})

export const createBoard = asyncHandler(async (req, res) => {
  const board = await boardService.createBoard(req.body.name, req.user.id)
  res.status(201).json({ data: board })
})

export const updateBoard = asyncHandler(async (req, res) => {
  const board = await boardService.updateBoard(req.params.boardId, req.body, req.user.id)
  res.json({ data: board })
})
