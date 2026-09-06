import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import './BoardSettingsPage.css'

export default function BoardSettingsPage() {
  const { boardId } = useParams()
  const navigate = useNavigate()
  const { boards, renameBoard } = useBoards()
  const board = boards.find((item) => item.id === boardId)

  const [name, setName] = useState(board?.name ?? '')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!board) {
    return (
      <div className="board-settings-page">
        <Navbar />
        <main className="board-settings-content">
          <p>Board not found.</p>
          <Link to="/boards" className="board-settings-back">
            ← Back to boards
          </Link>
        </main>
      </div>
    )
  }

  const members = [
    ...new Set(
      board.columns.flatMap((column) =>
        column.tasks.map((task) => task.assignee)
      )
    ),
  ]

  const error =
    name.trim().length >= 2
      ? ''
      : 'Board name must be at least 2 characters.'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError('')

    if (error) return

    setBusy(true)

    try {
      await renameBoard(boardId, name.trim())
      navigate(`/boards/${boardId}`)
    } catch (err) {
      setServerError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="board-settings-page">
      <Navbar />

      <main className="board-settings-content">
        <Link
          to={`/boards/${board.id}`}
          className="board-settings-back"
        >
          ← Back to {board.name}
        </Link>

        <form className="board-settings-form" onSubmit={handleSubmit}>
          <h1>Board settings</h1>

          <p className="board-settings-subtitle">
            Update your board name and review the people currently working on it.
          </p>

          <label>
            Board name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          {submitted && error && (
            <p className="board-settings-error">{error}</p>
          )}

          <label>
            Columns
            <input
              value={board.columns
                .map((column) => column.title)
                .join(', ')}
              disabled
            />
          </label>

          <div>
            <p className="settings-section-title">Members</p>

            <ul className="settings-members">
              {members.map((member) => (
                <li key={member} className="settings-member">
                  {member}
                </li>
              ))}
            </ul>
          </div>

          {serverError && (
            <p className="board-settings-error" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="board-settings-submit"
            disabled={busy}
          >
            {busy ? 'Saving…' : 'Save changes'}
          </button>
        </form>
      </main>
    </div>
  )
}