import { describe, expect, test } from 'vitest'
import { filterTasks, getColumnCounts, countByPriority } from '../utils/board'

const tasks = [
  { id: '1', title: 'Design login', description: 'Wireframe the auth screens', priority: 'high' },
  { id: '2', title: 'Write API tests', description: 'Supertest for auth routes', priority: 'medium' },
  { id: '3', title: 'Fix CSS', description: 'Login button alignment', priority: 'low' },
]

const board = {
  id: 'b1',
  name: 'Test Board',
  columns: [
    { id: 'todo', title: 'To Do', tasks: [tasks[0], tasks[1]] },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [tasks[2]] },
  ],
}

describe('utils/board pure helpers', () => {
  test('filterTasks matches title and description, case-insensitive', () => {
    expect(filterTasks(tasks, 'login')).toHaveLength(2) // title + description hits
    expect(filterTasks(tasks, 'SUPERTEST')).toHaveLength(1)
    expect(filterTasks(tasks, 'nothing matches this')).toHaveLength(0)
    expect(filterTasks(tasks, '   ')).toHaveLength(3) // blank query = no filter
  })

  test('getColumnCounts totals all columns and counts done', () => {
    expect(getColumnCounts(board)).toEqual({ total: 3, done: 1 })
  })

  test('countByPriority buckets every task once', () => {
    expect(countByPriority(board)).toEqual({ high: 1, medium: 1, low: 1 })
  })
})
