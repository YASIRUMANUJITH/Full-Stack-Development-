import { useState } from 'react'

export default function CreateTaskModal({ onClose, onCreate }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [assignee, setAssignee] = useState('SU')
  const [priority, setPriority] = useState('medium')
  const [labels, setLabels] = useState('')
  const [columnId, setColumnId] = useState('todo')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!title.trim()) return

    const newTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      assignee,
      priority,
      labels: labels
        .split(',')
        .map((label) => label.trim())
        .filter(Boolean),
      columnId,
    }

    onCreate(newTask)
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-head">
          <h3>Create Task</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            &times;
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <label>
            Task Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter task title"
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter task description"
            />
          </label>

          <label>
            Assignee
            <input
              type="text"
              value={assignee}
              onChange={(event) => setAssignee(event.target.value)}
            />
          </label>

          <label>
            Priority
            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>

          <label>
            Labels
            <input
              type="text"
              value={labels}
              onChange={(event) => setLabels(event.target.value)}
              placeholder="frontend, bug, urgent"
            />
          </label>

          <label>
            Column
            <select
              value={columnId}
              onChange={(event) => setColumnId(event.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
