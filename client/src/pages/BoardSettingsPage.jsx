import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockBoards } from '../data/mockData'
import './BoardSettingsPage.css'

export default function BoardSettingsPage() {
  const { boardId } = useParams()
  const board = mockBoards.find((item) => item.id === boardId)

  if (!board) {
    return (
      <div className="board-settings-page">
        <Navbar />
        <main className="board-settings-content">
          <p>Board not found.</p>
          <Link to="/boards">Back to boards</Link>
        </main>
      </div>
    )
  }

  const members = [...new Set(board.columns.flatMap((column) => column.tasks.map((task) => task.assignee)))]

  return (
    <div className="board-settings-page">
      <Navbar />
      <main className="board-settings-content">
        <Link to={`/boards/${board.id}`}>Back to {board.name}</Link>
        <form className="board-settings-form" onSubmit={(event) => event.preventDefault()}>
          <h1>Board settings</h1>
          <label>
            Board name
            <input defaultValue={board.name} />
          </label>
          <label>
            Columns
            <input defaultValue={board.columns.map((column) => column.title).join(', ')} />
          </label>
          <div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Members</p>
            <ul className="settings-members">
              {members.map((member) => (
                <li key={member} className="settings-member">
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </form>
      </main>
    </div>
  )
}
