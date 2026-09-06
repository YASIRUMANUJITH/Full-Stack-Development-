import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import './CreateBoardPage.css'

export default function CreateBoardPage() {
  const navigate = useNavigate()
  const { addBoard } = useBoards()

  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)

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
      const board = await addBoard(name.trim())
      navigate(`/boards/${board.id}`)
    } catch (err) {
      setServerError(err.message)
      setBusy(false)
    }
  }

  return (
    <div className="create-board-page">
      <Navbar />

      <main className="create-board-content">
        <Link to="/boards" className="create-board-back">
          ← Back to boards
        </Link>

        <form className="create-board-form" onSubmit={handleSubmit}>
          <h1>Create a new board</h1>

          <p className="create-board-subtitle">
            Start a fresh workspace for your team and organize tasks into a simple workflow.
          </p>

          <label className="create-board-field">
            Board name
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Website Redesign"
            />
          </label>

          {submitted && error && (
            <p className="create-board-error">{error}</p>
          )}

          <label className="create-board-field">
            Columns
            <input value="To Do, Doing, Done" disabled />
          </label>

          <p className="create-board-hint">
            Your board will start with To Do, Doing, and Done columns.
          </p>

          {serverError && (
            <p className="create-board-error" role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            className="create-board-submit"
            disabled={busy}
          >
            {busy ? 'Creating…' : 'Create board'}
          </button>
        </form>
      </main>
    </div>
  )
}