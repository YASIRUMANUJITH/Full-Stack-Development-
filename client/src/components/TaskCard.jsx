import { useState } from 'react'
import TaskModal from './TaskModal'
import './TaskCard.css'

export default function TaskCard({ task, status, boardId }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <article
        className="task-card"
        role="button"
        tabIndex={0}
        onClick={() => setShowDetails(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') setShowDetails(true)
        }}
      >
        <header className="task-card-top">
          <h4 className="task-title">{task.title}</h4>
          <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
        </header>
        <p className="task-desc">{task.description}</p>
        {task.labels && task.labels.length > 0 && (
          <div className="task-labels">
            {task.labels.map((label) => (
              <span key={label} className="label-chip">
                {label}
              </span>
            ))}
          </div>
        )}
        <footer className="task-card-bottom">
          <span className="assignee-chip">{task.assignee}</span>
        </footer>
      </article>
      {showDetails && (
        <TaskModal task={task} status={status} boardId={boardId} onClose={() => setShowDetails(false)} />
      )}
    </>
  )
}
