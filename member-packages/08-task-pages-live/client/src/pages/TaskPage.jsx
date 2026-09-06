import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useBoards } from '../context/BoardsContext'
import { PRIORITIES, LABELS } from '../data/constants'
import './TaskPage.css'

export default function TaskPage() {
  const { boardId, taskId } = useParams()
  const navigate = useNavigate()
  const { boards, editTask, removeTask, refresh } = useBoards()
  const board = boards.find((item) => item.id === boardId)
  const column = board?.columns.find((col) => col.tasks.some((item) => item.id === taskId))
  const task = column?.tasks.find((item) => item.id === taskId)

  const [title, setTitle] = useState(task?.title ?? '')
  const [description, setDescription] = useState(task?.description ?? '')
  const [assignee, setAssignee] = useState(task?.assignee ?? '')
  const [priority, setPriority] = useState(task?.priority ?? 'medium')
  const [labels, setLabels] = useState(task?.labels ?? [])
  const [status, setStatus] = useState(column?.id ?? 'todo')
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [conflict, setConflict] = useState('')
  const [busy, setBusy] = useState(false)

  if (!board || !task || !column) {
    return (
      <div className="task-page">
        <Navbar />
        <main className="task-page-content">
          <p>Task not found.</p>
          <Link to="/boards" className="task-page-back">
            Back to boards
          </Link>
        </main>
      </div>
    )
  }

  const titleError = title.trim().length >= 2 ? '' : 'Title must be at least 2 characters.'
  const isValid = !titleError

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)
    setServerError('')
    setConflict('')
    if (!isValid) return
    setBusy(true)
    try {
      await editTask(boardId, taskId, {
        title: title.trim(),
        description: description.trim(),
        assignee: assignee.trim() || 'SU',
        priority,
        labels,
        status,
        version: task.version,
      })
      navigate(`/boards/${board.id}`)
    } catch (err) {
      if (err.status === 409) setConflict(err.message)
      else setServerError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return
    setServerError('')
    setBusy(true)
    try {
      await removeTask(boardId, taskId)
      navigate(`/boards/${board.id}`)
    } catch (err) {
      setServerError(err.message)
      setBusy(false)
    }
  }

  const handleReloadLatest = async () => {
    setConflict('')
    await refresh()
    navigate(`/boards/${board.id}`)
  }

  return (
    <div className="task-page">
      <Navbar />
      <main className="task-page-content">
        <Link to={`/boards/${board.id}`} className="task-page-back">
          Back to {board.name}
        </Link>
        <form className="task-form" onSubmit={handleSubmit}>
          <h1>Edit task</h1>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
          </label>
          {submitted && titleError && <p className="field-error">{titleError}</p>}
          <label>
            Description
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={4} placeholder="Details" />
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
            Assignee
            <input value={assignee} onChange={(event) => setAssignee(event.target.value)} placeholder="Initials" />
          </label>
          <label>
            Column
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              {board.columns.map((col) => (
                <option key={col.id} value={col.id}>
                  {col.title}
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
          {conflict && (
            <div className="field-error" role="alert">
              <p>{conflict}</p>
              <button type="button" className="task-save" onClick={handleReloadLatest}>
                Reload latest
              </button>
            </div>
          )}
          <div className="task-form-actions">
            <button type="button" className="task-delete" onClick={handleDelete} disabled={busy}>
              Delete
            </button>
            <button type="submit" className="task-save" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
