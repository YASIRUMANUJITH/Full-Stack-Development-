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

  const error = name.trim().length >= 2 ? '' : 'Board name must be at least 2 characters.'

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
    <div className="board-settings-page">
      <Navbar />
      <main className="board-settings-content">
        <Link to="/boards">Back to boards</Link>
        <form className="board-settings-form" onSubmit={handleSubmit}>
          <h1>New board</h1>
          <label>
            Board name
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="My board" />
          </label>
          {submitted && error && <p className="field-error">{error}</p>}
          <label>
            Columns (preselected)
            <input value="To Do, Doing, Done" disabled />
          </label>
          <p className="login-note">Columns are preselected as To Do, Doing and Done for this milestone.</p>
          {serverError && (
            <p className="field-error" role="alert">
              {serverError}
            </p>
          )}
          <button type="submit" className="login-button" disabled={busy}>
            {busy ? 'Creating…' : 'Create board'}
          </button>
        </form>
      </main>
    </div>
  )
}
