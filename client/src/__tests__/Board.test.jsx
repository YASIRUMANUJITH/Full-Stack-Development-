import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import Board from '../components/Board'

const board = {
  id: 'b1',
  name: 'QA Board',
  columns: [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 't1', title: 'Design login', description: 'Auth screens', priority: 'high', labels: ['design'], assignee: 'DW' },
        { id: 't2', title: 'Write API tests', description: 'Jest + Supertest', priority: 'medium', labels: [], assignee: 'AS' },
      ],
    },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [{ id: 't3', title: 'Fix CSS', description: '', priority: 'low', labels: [], assignee: 'PR' }] },
  ],
}

const renderBoard = () =>
  render(
    <MemoryRouter>
      <Board board={board} />
    </MemoryRouter>,
  )

describe('Board component', () => {
  test('renders the board name, three columns and the seeded task cards', () => {
    renderBoard()
    expect(screen.getByRole('heading', { name: 'QA Board' })).toBeInTheDocument()
    expect(screen.getByText('To Do')).toBeInTheDocument()
    expect(screen.getByText('Doing')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByText('Design login')).toBeInTheDocument()
    expect(screen.getByText('Write API tests')).toBeInTheDocument()
    expect(screen.getByText('Fix CSS')).toBeInTheDocument()
    // summary pill: "3 tasks", "1 done"
    expect(screen.getByText('3 tasks')).toBeInTheDocument()
    expect(screen.getByText('1 done')).toBeInTheDocument()
  })

  test('search box filters visible tasks', async () => {
    const user = userEvent.setup()
    renderBoard()
    const input = screen.getByPlaceholderText('Search tasks...')
    await user.type(input, 'wireframe')
    expect(screen.queryByText('Design login')).not.toBeInTheDocument()
    expect(screen.getByText('0 matches')).toBeInTheDocument()

    await user.clear(input)
    await user.type(input, 'API')
    expect(screen.queryByText('Design login')).not.toBeInTheDocument()
    expect(screen.getByText('Write API tests')).toBeInTheDocument()
    expect(screen.getByText('1 match')).toBeInTheDocument()
  })
})
