import { useState } from 'react'
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import { addTask } from '../utils/board'
import { PRIORITIES, LABELS } from '../data/constants'
import './CreateTaskPage.css'

export default function CreateTaskPage() {
  const { boardId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { boards, setBoards } = useBoards()
  const board = boards.find((item) => item.id === boardId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('medium')
  const [labels, setLabels] = useState([])
  const [columnId, setColumnId] = useState(searchParams.get('column') || 'todo')
  const [submitted, setSubmitted] = useState(false)

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

  return (
    <div className="task-page">
      <Navbar />
      <main className="task-page-content">
        <Link to={`/boards/${board.id}`} className="task-page-back">
          Back to {board.name}
        </Link>
        <form
          className="task-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmitted(true)
            if (error) return
            setBoards((prev) => addTask(prev, boardId, columnId, { title, description, assignee, priority, labels }))
            navigate(`/boards/${boardId}`)
          }}
        >
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
          <button type="submit" className="login-button">
            Create task
          </button>
        </form>
      </main>
    </div>
  )
}
