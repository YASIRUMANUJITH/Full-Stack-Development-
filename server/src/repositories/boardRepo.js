import mongoose from 'mongoose'
import Board from '../models/Board.js'

const DEFAULT_COLUMNS = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'doing', title: 'Doing', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
]

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

export const boardRepo = {
  async findAllForUser(userId) {
    if (!isValidId(userId)) return []
    const boards = await Board.find({ $or: [{ owner: userId }, { members: userId }] }).sort({ createdAt: 1 })
    return boards.map((board) => board.toJSON())
  },
  async findById(id) {
    if (!isValidId(id)) return null
    const board = await Board.findById(id)
    return board ? board.toJSON() : null
  },
  async create(name, userId) {
    const board = await Board.create({
      name: name.trim(),
      owner: userId,
      members: [userId],
      columns: DEFAULT_COLUMNS,
    })
    return board.toJSON()
  },
  async update(id, patch) {
    if (!isValidId(id)) return null
    const board = await Board.findById(id)
    if (!board) return null
    Object.assign(board, patch)
    await board.save()
    return board.toJSON()
  },
}
