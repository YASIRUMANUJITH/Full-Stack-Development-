import { useState } from 'react'
import CreateTaskModal from './CreateTaskModal'
import Column from './Column'
import { filterTasks, getColumnCounts, countByPriority } from '../utils/board'
import './Board.css'

export default function Board({ board }) {
  const [query, setQuery] = useState('')
  const [showCreateTask, setShowCreateTask] = useState(false)

  const counts = getColumnCounts(board)
  const priorityCounts = countByPriority(board)

  const visibleColumns = board.columns.map((column) => ({
    ...column,
    tasks: filterTasks(column.tasks, query),
  }))

  const visibleCount = visibleColumns.reduce(
    (sum, column) => sum + column.tasks.length,
    0
  )

  return (
    <main className="board">
      <div className="board-header">
        <h2 className="board-name">{board.name}</h2>

        <span className="board-stats">
          <span className="stat-pill stat-total">
            {query
              ? `${visibleCount} match${visibleCount === 1 ? '' : 'es'}`
              : `${counts.total} tasks`}
          </span>

          <span className="stat-pill stat-done">
            {counts.done} done
          </span>
        </span>

        <button
          type="button"
          className="create-task-button"
          onClick={() => setShowCreateTask(true)}
        >
          + Create Task
        </button>

        <label className="board-filter">
          <input
            type="search"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <div className="columns">
        {visibleColumns.map((column) => (
          <Column
            key={column.id}
            column={column}
          />
        ))}
      </div>

      <p className="sr-only">
        {`Priorities: ${priorityCounts.high} high, ${priorityCounts.medium} medium, ${priorityCounts.low} low.`}
      </p>

      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onCreate={(newTask) => {
            console.log('New task:', newTask)
            setShowCreateTask(false)
          }}
        />
      )}
    </main>
  )
}
