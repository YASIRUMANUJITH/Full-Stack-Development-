import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import CreateTaskPage from '../pages/CreateTaskPage'

const fixtureBoard = {
  id: 'b1',
  name: 'Fixture Board',
  columns: [
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ],
}

// The API says no: addTask rejects the way api/client.js would, with the
// server's message + field details attached.
const apiError = Object.assign(new Error('Validation failed'), {
  status: 400,
  details: [{ path: 'title', message: 'Title must be at least 2 characters' }],
})
const addTask = vi.fn().mockRejectedValue(apiError)

vi.mock('../context/BoardsContext', () => ({
  useBoards: () => ({ boards: [fixtureBoard], addTask }),
}))
vi.mock('../components/Navbar', () => ({ default: () => null }))

describe('CreateTaskPage (server error path)', () => {
  test('a rejected API call renders the server error inline instead of navigating away', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/boards/b1/tasks/new']}>
        <Routes>
          <Route path="/boards/:boardId/tasks/new" element={<CreateTaskPage />} />
        </Routes>
      </MemoryRouter>,
    )
    await user.type(screen.getByPlaceholderText('Task title'), 'Valid title here')
    await user.click(screen.getByRole('button', { name: /create task/i }))
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Validation failed')
    expect(alert).toHaveTextContent('Title must be at least 2 characters')
    // still on the form — the user can fix and retry
    expect(screen.getByPlaceholderText('Task title')).toBeInTheDocument()
  })
})
