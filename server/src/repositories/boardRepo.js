import mockBoard, { mockBoards as seedBoards } from '../data/mockData.js'

let boards = JSON.parse(JSON.stringify(seedBoards))
let nextBoardId = 100
let nextTaskId = 1000

export const boardRepo = {
  findAll() {
    return boards
  },
  findById(id) {
    return boards.find((board) => board.id === id) || null
  },
  create(name) {
    const newBoard = {
      id: `board-${nextBoardId++}`,
      name: name.trim(),
      columns: [
        { id: 'todo', title: 'To Do', tasks: [] },
        { id: 'doing', title: 'Doing', tasks: [] },
        { id: 'done', title: 'Done', tasks: [] },
      ],
    }
    boards.push(newBoard)
    return newBoard
  },
  update(id, patch) {
    const board = boards.find((item) => item.id === id)
    if (!board) return null
    Object.assign(board, patch)
    return board
  },
}
