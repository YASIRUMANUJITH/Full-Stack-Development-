import TaskCard from './TaskCard'
import './Board.css'

export default function Column({ column }) {
  return (
    <section className="column">
      <header className="column-header">
        <h3>{column.title}</h3>

        <span className="column-count">
          {column.tasks.length}
        </span>
      </header>

      <div className="column-tasks">
        {column.tasks.length === 0 ? (
          <p className="empty-column">
            No tasks yet
          </p>
        ) : (
          column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              status={column.title}
            />
          ))
        )}
      </div>
    </section>
  )
}

