import { request } from './client.js'

export const boardsApi = {
  list: () => request('/api/boards'),
  get: (id) => request(`/api/boards/${id}`),
  create: (data) => request('/api/boards', { method: 'POST', body: JSON.stringify(data) }),
  listTasks: (boardId, params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/api/boards/${boardId}/tasks${q ? `?${q}` : ''}`)
  },
  createTask: (boardId, data) => request(`/api/boards/${boardId}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (boardId, taskId, data) => request(`/api/boards/${boardId}/tasks/${taskId}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTask: (boardId, taskId) => request(`/api/boards/${boardId}/tasks/${taskId}`, { method: 'DELETE' }),
}

export const authApi = {
  register: (data) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => request('/api/auth/me'),
}