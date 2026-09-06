import request from 'supertest'
import { startTestApp, stopTestApp } from './testHelpers.js'

let mem
let app
let token
let boardId

beforeAll(async () => {
  ;({ mem, app } = await startTestApp())
  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'demo@syncboard.app', password: 'password123' })
  token = login.body.data.token
  const boards = await request(app).get('/api/boards').set('Authorization', `Bearer ${token}`)
  boardId = boards.body.data[0].id
})

afterAll(async () => {
  await stopTestApp(mem)
})

const auth = () => ({ Authorization: `Bearer ${token}` })

describe('tasks', () => {
  test('list supports q + status filters', async () => {
    const byStatus = await request(app).get(`/api/boards/${boardId}/tasks?status=done`).set(auth())
    expect(byStatus.status).toBe(200)
    expect(byStatus.body.data.length).toBe(3)
    expect(byStatus.body.data.every((task) => task.status === 'done')).toBe(true)

    const byQuery = await request(app).get(`/api/boards/${boardId}/tasks?q=wireframe`).set(auth())
    expect(byQuery.body.data.length).toBe(1)
    expect(byQuery.body.data[0].title).toBe('Draw board wireframe')
  })

  test('create → 201, invalid title → 400 with field details', async () => {
    const created = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .set(auth())
      .send({ title: 'From the test suite', columnId: 'todo', priority: 'low' })
    expect(created.status).toBe(201)
    expect(created.body.data.version).toBe(1)

    const invalid = await request(app).post(`/api/boards/${boardId}/tasks`).set(auth()).send({ title: 'x' })
    expect(invalid.status).toBe(400)
    expect(invalid.body.error.details[0].path).toBe('title')
  })

  // REGRESSION: the A02 updateTaskSchema silently stripped `status`, so moving
  // a task via PATCH never persisted. This test fails on the old code.
  test('PATCH with status moves the task between columns', async () => {
    const created = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .set(auth())
      .send({ title: 'Move me', columnId: 'todo' })
    const taskId = created.body.data.id

    const res = await request(app)
      .patch(`/api/boards/${boardId}/tasks/${taskId}`)
      .set(auth())
      .send({ status: 'done' })
    expect(res.status).toBe(200)

    const done = await request(app).get(`/api/boards/${boardId}/tasks?status=done`).set(auth())
    expect(done.body.data.some((task) => task.id === taskId)).toBe(true)
  })

  test('optimistic concurrency: stale version is rejected (409)', async () => {
    const created = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .set(auth())
      .send({ title: 'Conflict bait', columnId: 'todo' })
    const taskId = created.body.data.id

    const ok = await request(app)
      .patch(`/api/boards/${boardId}/tasks/${taskId}`)
      .set(auth())
      .send({ title: 'first writer wins', version: 1 })
    expect(ok.status).toBe(200)
    expect(ok.body.data.version).toBe(2)

    const stale = await request(app)
      .patch(`/api/boards/${boardId}/tasks/${taskId}`)
      .set(auth())
      .send({ title: 'late writer', version: 1 })
    expect(stale.status).toBe(409)
    expect(stale.body.error.code).toBe('CONFLICT')
    expect(stale.body.error.details.currentVersion).toBe(2)
  })

  test('delete → 204; missing task → 404', async () => {
    const created = await request(app)
      .post(`/api/boards/${boardId}/tasks`)
      .set(auth())
      .send({ title: 'Delete me', columnId: 'doing' })
    const taskId = created.body.data.id

    const del = await request(app).delete(`/api/boards/${boardId}/tasks/${taskId}`).set(auth())
    expect(del.status).toBe(204)

    const again = await request(app).delete(`/api/boards/${boardId}/tasks/${taskId}`).set(auth())
    expect(again.status).toBe(404)
  })
})
