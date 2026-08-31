import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { mockBoards } from '../data/mockData'
import './TaskPage.css'

export default function TaskPage() {
  const { boardId, taskId } = useParams()
  const board = mockBoards.find((item) => item.id === boardId)
  const task = board?.columns.flatMap((column) => column.tasks).find((item) => item.id === taskId)

  if (!board || !task) {
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

  return (
    <div className="task-page">
      <Navbar />
      <main className="task-page-content">
        <Link to={`/boards/${board.id}`} className="task-page-back">
          Back to {board.name}
        </Link>
        <form className="task-form" onSubmit={(event) => event.preventDefault()}>
          <h1>Edit task</h1>
          <label>
            Title
            <input defaultValue={task.title} />
          </label>
          <label>
            Description
            <textarea defaultValue={task.description} rows={4} />
          </label>
          <label>
            Priority
            <select defaultValue={task.priority}>
              <option value="high">high</option>
              <option value="medium">medium</option>
              <option value="low">low</option>
            </select>
          </label>
          <label>
            Assignee
            <input defaultValue={task.assignee} />
          </label>
          <div className="task-form-actions">
            <button type="button" className="task-delete" title="Deletion arrives in Milestone 2">
              Delete
            </button>
            <button type="submit" className="task-save" title="Saving arrives in Milestone 2">
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
