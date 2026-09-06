import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Board from '../components/Board'
import { useBoards } from '../context/BoardsContext'

export default function BoardPage() {
  const { boardId } = useParams()
  const { boards, loading } = useBoards()
  const board = boards.find((item) => item.id === boardId)

  if (loading) {
    return (
      <div className="board-page">
        <Navbar />
        <main className="board-page-content">
          <p>Loading board…</p>
        </main>
      </div>
    )
  }

  if (!board) {
    return (
      <div className="board-page">
        <Navbar />
        <main className="board-page-content">
          <p>Board not found. It may have been deleted, or you do not have access to it.</p>

          <Link to="/boards" className="task-page-back">
            Back to boards
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="board-page">
      <Navbar />
      <Board board={board} />
    </div>
  )
}