import TaskCard from './TaskCard'
import './Column.css'

export default function Column({ column }) {
  return (
    <section className="column">
      <header className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <span className="task-count">{column.tasks.length}</span>
      </header>
      <div className="column-tasks">
        {column.tasks.length === 0 && <p className="column-empty">No tasks here yet.</p>}
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} status={column.title} />
        ))}
      </div>
      <button
        type="button"
        className="add-task-button"
        title="Task creation arrives in Milestone 2"
      >
        + Add task
      </button>
    </section>
  )
}
