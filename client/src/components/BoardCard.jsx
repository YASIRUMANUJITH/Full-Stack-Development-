import { Link } from 'react-router-dom'
import './BoardCard.css'

export default function BoardCard({ board }) {
  const total = board.columns.reduce((sum, column) => sum + column.tasks.length, 0)
  const done = board.columns.find((column) => column.id === 'done')?.tasks.length ?? 0

  return (
    <Link to={`/boards/${board.id}`} className="board-card">
      <h3 className="board-card-name">{board.name}</h3>
      <p className="board-card-stats">
        {total} tasks · {done} done
      </p>
      <div className="board-card-preview">
        {board.columns.map((column) => (
          <span key={column.id} className="board-card-column">
            {column.title}: {column.tasks.length}
          </span>
        ))}
      </div>
    </Link>
  )
}
