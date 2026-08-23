export function filterTasks(tasks, query) {
  const q = query.trim().toLowerCase()
  if (!q) return tasks
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q),
  )
}

export function getColumnCounts(board) {
  const allTasks = board.columns.flatMap((column) => column.tasks)
  const doneColumn = board.columns.find((column) => column.id === 'done')
  return {
    total: allTasks.length,
    done: doneColumn ? doneColumn.tasks.length : 0,
  }
}

export function countByPriority(board) {
  const allTasks = board.columns.flatMap((column) => column.tasks)
  return {
    high: allTasks.filter((task) => task.priority === 'high').length,
    medium: allTasks.filter((task) => task.priority === 'medium').length,
    low: allTasks.filter((task) => task.priority === 'low').length,
  }
}
