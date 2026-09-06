import { useState } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import { PRIORITIES, LABELS } from '../data/constants'
import './CreateTaskPage.css'

export default function CreateTaskPage() {
  const { boardId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { boards, addTask } = useBoards()
  const board = boards.find((item) => item.id === boardId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('medium')
  const [labels, setLabels] = useState([])
  const [columnId, setColumnId] = useState(searchParams.get('column') || 'todo')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!board) {
    return (
      <div className="task-page">
        <Navbar />
        <main className="task-page-content">
          <p>Board not found.</p>
          <Link to="/boards" className="task-page-back">
            Back to boards
          </Link>
        </main>
      </div>
    )
  }

  const error = title.trim().length >= 2 ? '' : 'Title must be at least 2 characters.'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError('')
    if (error) return
    setBusy(true)
    try {
      await addTask(boardId, { title: title.trim(), description: description.trim(), assignee: assignee.trim(), priority, labels, columnId })
      navigate(`/boards/${boardId}`)
    } catch (err) {
      const details = err.details?.map((item) => item.message).join(' ')
      setServerError(details ? `${err.message}: ${details}` : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="task-page">
      <Navbar />
      <main className="task-page-content">
        <Link to={`/boards/${board.id}`} className="task-page-back">
          Back to {board.name}
        </Link>
        <form className="task-form" onSubmit={handleSubmit}>
          <h1>New task</h1>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
          </label>
          {submitted && error && <p className="field-error">{error}</p>}
          <label>
            Description
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="Details" />
          </label>
          <label>
            Assignee
            <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="Initials" />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
              {PRIORITIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Column
            <select value={columnId} onChange={(event) => setColumnId(event.target.value)}>
              {board.columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="labels-field">
            <legend>Labels</legend>
            {LABELS.map((label) => (
              <label key={label} className="label-option">
                <input
                  type="checkbox"
                  checked={labels.includes(label)}
                  onChange={(event) =>
                    setLabels((prev) => (event.target.checked ? [...prev, label] : prev.filter((item) => item !== label)))
                  }
                />
                {label}
              </label>
            ))}
          </fieldset>
          {serverError && (
            <p className="field-error" role="alert">
              {serverError}
            </p>
          )}
          <button type="submit" className="login-button" disabled={busy}>
            {busy ? 'Creating…' : 'Create task'}
          </button>
        </form>
      </main>
    </div>
  )
}
