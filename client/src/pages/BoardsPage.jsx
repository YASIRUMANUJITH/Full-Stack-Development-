import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BoardCard from '../components/BoardCard'
import { useBoards } from '../context/BoardsContext'
import './BoardsPage.css'

export default function BoardsPage() {
  const { boards } = useBoards()

  return (
    <div className="boards-page">
      <Navbar />
      <header className="boards-header">
        <h1>Your boards</h1>
        <Link to="/boards/new" className="new-board-button">
          + New Board
        </Link>
      </header>
      <div className="boards-list">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  )
}
