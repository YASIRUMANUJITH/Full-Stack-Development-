import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BoardCard from '../components/BoardCard'
import { useBoards } from '../context/BoardsContext'
import './BoardsPage.css'

export default function BoardsPage() {
  const { boards, loading, error, refresh } = useBoards()

  const renderContent = () => {
    if (loading) {
      return <p className="boards-state">Loading boards…</p>
    }
    if (error) {
      return (
        <div className="boards-state" role="alert">
          <p>Could not load boards: {error}</p>
          <button type="button" className="new-board-button" onClick={refresh}>
            Retry
          </button>
        </div>
      )
    }
    if (boards.length === 0) {
      return (
        <div className="boards-state">
          <p>No boards yet.</p>
          <Link to="/boards/new" className="new-board-button">
            Create your first board
          </Link>
        </div>
      )
    }
    return (
      <div className="boards-list">
        {boards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    )
  }

  return (
    <div className="boards-page">
      <Navbar />
      <header className="boards-header">
        <h1>Your boards</h1>
        <Link to="/boards/new" className="new-board-button">
          + New Board
        </Link>
      </header>
      {renderContent()}
    </div>
  )
}
