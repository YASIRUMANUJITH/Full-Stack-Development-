import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function TaskModal({ task, status, boardId, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={task.title}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-head">
          <h3>{task.title}</h3>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </header>
        <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
        <p className="modal-desc">{task.description}</p>
        {task.labels && task.labels.length > 0 && (
          <div className="task-labels">
            {task.labels.map((label) => (
              <span key={label} className="label-chip">
                {label}
              </span>
            ))}
          </div>
        )}
        <dl className="modal-meta">
          <div>
            <dt>Assignee</dt>
            <dd>{task.assignee}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>{status}</dd>
          </div>
        </dl>
        {boardId && (
          <Link to={`/boards/${boardId}/tasks/${task.id}`} className="modal-full-link">
            Open full page
          </Link>
        )}
      </div>
    </div>
  )
}
