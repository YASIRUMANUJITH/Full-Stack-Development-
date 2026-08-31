import { boardService } from '../services/boardService.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const getBoards = asyncHandler(async (req, res) => {
  const boards = boardService.listBoards()
  res.json({ data: boards })
})

export const getBoard = asyncHandler(async (req, res) => {
  const board = boardService.getBoard(req.params.boardId)
  res.json({ data: board })
})

export const createBoard = asyncHandler(async (req, res) => {
  const board = boardService.createBoard(req.body.name)
  res.status(201).json({ data: board })
})
