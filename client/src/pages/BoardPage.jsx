import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Board from '../components/Board'
import mockBoard, { mockBoards } from '../data/mockData'

export default function BoardPage() {
  const { boardId } = useParams()
  const board = boardId ? mockBoards.find((item) => item.id === boardId) ?? mockBoard : mockBoard

  return (
    <div className="board-page">
      <Navbar />
      <Board board={board} />
    </div>
  )
}
