import Navbar from '../components/Navbar'
import BoardCard from '../components/BoardCard'
import { mockBoards } from '../data/mockData'
import './BoardsPage.css'

export default function BoardsPage() {
  return (
    <div className="boards-page">
      <Navbar />
      <header className="boards-header">
        <h1>Your boards</h1>
        <button type="button" className="new-board-button" title="Board creation arrives in Milestone 2">
          + New Board
        </button>
      </header>
      <div className="boards-list">
        {mockBoards.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  )
}
