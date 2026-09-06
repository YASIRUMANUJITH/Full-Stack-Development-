import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import CreateTaskPage from '../pages/CreateTaskPage'

export const fixtureBoard = {
  id: 'b1',
  name: 'Fixture Board',
  columns: [
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ],
}

const addTask = vi.fn()

// Swap the live context for a stub — the page under test only.
vi.mock('../context/BoardsContext', () => ({
  useBoards: () => ({ boards: [fixtureBoard], addTask }),
}))
vi.mock('../components/Navbar', () => ({ default: () => null }))

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/boards/b1/tasks/new']}>
      <Routes>
        <Route path="/boards/:boardId/tasks/new" element={<CreateTaskPage />} />
        <Route path="/boards/:boardId" element={null} />
      </Routes>
    </MemoryRouter>,
  )

describe('CreateTaskPage', () => {
  beforeEach(() => addTask.mockReset())

  test('submitting with no title shows validation and never calls the API', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByRole('button', { name: /create task/i }))
    expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
    expect(addTask).not.toHaveBeenCalled()
  })

  test('a valid form posts through the context mutator with trimmed values', async () => {
    addTask.mockResolvedValue({ id: 't9', title: 'Ship it' })
    const user = userEvent.setup()
    renderPage()
    await user.type(screen.getByPlaceholderText('Task title'), '  Ship it  ')
    await user.click(screen.getByRole('button', { name: /create task/i }))
    expect(addTask).toHaveBeenCalledTimes(1)
    expect(addTask).toHaveBeenCalledWith('b1', expect.objectContaining({ title: 'Ship it', columnId: 'todo' }))
  })
})
