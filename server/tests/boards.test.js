import request from 'supertest'
import { startTestApp, stopTestApp } from './testHelpers.js'

let mem
let app
let demoToken
let demoBoardId

beforeAll(async () => {
  ;({ mem, app } = await startTestApp())
  const login = await request(app)
    .post('/api/auth/login')
    .send({ email: 'demo@syncboard.app', password: 'password123' })
  demoToken = login.body.data.token
  const boards = await request(app).get('/api/boards').set('Authorization', `Bearer ${demoToken}`)
  demoBoardId = boards.body.data[0].id
})

afterAll(async () => {
  await stopTestApp(mem)
})

describe('boards: auth + ownership', () => {
  test('board routes require a token (401 NO_TOKEN)', async () => {
    const res = await request(app).get('/api/boards')
    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('NO_TOKEN')
  })

  test('garbage token is 401 BAD_TOKEN', async () => {
    const res = await request(app).get('/api/boards').set('Authorization', 'Bearer not.real')
    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('BAD_TOKEN')
  })

  test('demo user sees exactly the two seeded boards', async () => {
    const res = await request(app).get('/api/boards').set('Authorization', `Bearer ${demoToken}`)
    expect(res.status).toBe(200)
    expect(res.body.data.map((board) => board.name)).toEqual(['SyncBoard Launch Plan', 'Marketing Sprint'])
  })

  test('a different registered user cannot read the demo board (403)', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Outsider User', email: 'outsider@example.com', password: 'password123' })
    const token = reg.body.data.token

    const list = await request(app).get('/api/boards').set('Authorization', `Bearer ${token}`)
    expect(list.status).toBe(200)
    expect(list.body.data).toEqual([])

    const res = await request(app).get(`/api/boards/${demoBoardId}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(403)
    expect(res.body.error.code).toBe('FORBIDDEN')
  })

  test('create + rename flow persists for the owner', async () => {
    const created = await request(app)
      .post('/api/boards')
      .set('Authorization', `Bearer ${demoToken}`)
      .send({ name: 'Sprint Zero' })
    expect(created.status).toBe(201)
    expect(created.body.data.name).toBe('Sprint Zero')
    const id = created.body.data.id

    const renamed = await request(app)
      .patch(`/api/boards/${id}`)
      .set('Authorization', `Bearer ${demoToken}`)
      .send({ name: 'Sprint One' })
    expect(renamed.status).toBe(200)
    expect(renamed.body.data.name).toBe('Sprint One')

    const fetched = await request(app).get(`/api/boards/${id}`).set('Authorization', `Bearer ${demoToken}`)
    expect(fetched.body.data.name).toBe('Sprint One')
  })

  test('missing board is 404', async () => {
    const res = await request(app)
      .get('/api/boards/64f1a2b3c4d5e6f7a8b9c0d1')
      .set('Authorization', `Bearer ${demoToken}`)
    expect(res.status).toBe(404)
  })
})
