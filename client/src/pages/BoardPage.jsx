import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Board from '../components/Board'
import { useBoards } from '../context/BoardsContext'
import mockBoard from '../data/mockData'

export default function BoardPage() {
  const { boardId } = useParams()
  const { boards } = useBoards()
  const board = boardId ? boards.find((item) => item.id === boardId) ?? boards[0] ?? mockBoard : boards[0] ?? mockBoard

  return (
    <div className="board-page">
      <Navbar />
      <Board board={board} />
    </div>
  )
}
