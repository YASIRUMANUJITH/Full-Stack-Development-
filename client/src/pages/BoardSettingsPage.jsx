import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import { updateBoard } from '../utils/board'
import './BoardSettingsPage.css'

export default function BoardSettingsPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { boards, setBoards } = useBoards()
  const board = boards.find((item) => item.id === boardId)

  const [name, setName] = useState(board?.name ?? '')
  const [submitted, setSubmitted] = useState(false)

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
  const error = name.trim().length >= 2 ? '' : 'Board name must be at least 2 characters.'

  return (
    <div className="board-settings-page">
      <Navbar />
      <main className="board-settings-content">
        <Link to={`/boards/${board.id}`}>Back to {board.name}</Link>
        <form
          className="board-settings-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
            if (error) return
            setBoards((prev) => updateBoard(prev, boardId, { name: name.trim() }))
            navigate(`/boards/${boardId}`)
          }}
        >
          <h1>Board settings</h1>
          <label>
            Board name
            <input value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          {submitted && error && <p className="field-error">{error}</p>}
          <label>
            Columns (preselected)
            <input value={board.columns.map((column) => column.title).join(', ')} disabled />
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
          <button type="submit" className="login-button">
            Save
          </button>
        </form>
      </main>
    </div>
  )
}
