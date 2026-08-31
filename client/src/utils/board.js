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

export function findTask(boards, taskId) {
  for (const board of boards) {
    for (const column of board.columns) {
      const task = column.tasks.find((item) => item.id === taskId)
      if (task) return { board, column, task }
    }
  }
  return null
}

export function addTask(boards, boardId, columnId, taskData) {
  return boards.map((board) => {
    if (board.id !== boardId) return board
    return {
      ...board,
      columns: board.columns.map((column) => {
        if (column.id !== columnId) return column
        const newTask = {
          id: `t-${Date.now()}`,
          title: taskData.title?.trim() || 'Untitled task',
          description: taskData.description?.trim() || '',
          assignee: taskData.assignee?.trim() || 'SU',
          priority: taskData.priority || 'medium',
          labels: taskData.labels || [],
        }
        return { ...column, tasks: [...column.tasks, newTask] }
      }),
    }
  })
}

export function updateTask(boards, boardId, taskId, patch) {
  return boards.map((board) => {
    if (board.id !== boardId) return board
    return {
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
      })),
    }
  })
}

export function deleteTask(boards, boardId, taskId) {
  return boards.map((board) => {
    if (board.id !== boardId) return board
    return {
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        tasks: column.tasks.filter((task) => task.id !== taskId),
      })),
    }
  })
}

export function moveTask(boards, boardId, taskId, toColumnId) {
  let movedTask = null
  const withoutTask = boards.map((board) => {
    if (board.id !== boardId) return board
    return {
      ...board,
      columns: board.columns.map((column) => {
        const task = column.tasks.find((item) => item.id === taskId)
        if (task) movedTask = task
        return { ...column, tasks: column.tasks.filter((item) => item.id !== taskId) }
      }),
    }
  })
  if (!movedTask) return boards
  return withoutTask.map((board) => {
    if (board.id !== boardId) return board
    return {
      ...board,
      columns: board.columns.map((column) =>
        column.id === toColumnId ? { ...column, tasks: [...column.tasks, movedTask] } : column,
      ),
    }
  })
}

export function createBoard(boards, name) {
  const newBoard = {
    id: `board-${Date.now()}`,
    name: name.trim() || 'Untitled Board',
    columns: [
      { id: 'todo', title: 'To Do', tasks: [] },
      { id: 'doing', title: 'Doing', tasks: [] },
      { id: 'done', title: 'Done', tasks: [] },
    ],
  }
  return [...boards, newBoard]
}

export function updateBoard(boards, boardId, patch) {
  return boards.map((board) => (board.id === boardId ? { ...board, ...patch } : board))
}
