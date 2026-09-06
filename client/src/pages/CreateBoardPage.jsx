import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import { createBoard } from '../utils/board'
import './CreateBoardPage.css'

export default function CreateBoardPage() {
  const navigate = useNavigate()
  const { boards, setBoards } = useBoards()
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const error = name.trim().length >= 2 ? '' : 'Board name must be at least 2 characters.'

  return (
    <div className="board-settings-page">
      <Navbar />
      <main className="board-settings-content">
        <Link to="/boards">Back to boards</Link>
        <form
          className="board-settings-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
            if (error) return
            const nextBoards = createBoard(boards, name)
            setBoards(nextBoards)
            const created = nextBoards[nextBoards.length - 1]
            navigate(`/boards/${created.id}`)
          }}
        >
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
          <button type="submit" className="login-button">
            Create board
          </button>
        </form>
      </main>
    </div>
  )
}
