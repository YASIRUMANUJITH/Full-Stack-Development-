import request from 'supertest'
import { startTestApp, stopTestApp } from './testHelpers.js'

let mem
let app

beforeAll(async () => {
  ;({ mem, app } = await startTestApp())
})

afterAll(async () => {
  await stopTestApp(mem)
})

describe('auth', () => {
  test('register creates a user and returns a token (201)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Suite User', email: 'suite@example.com', password: 'password123' })
    expect(res.status).toBe(201)
    expect(res.body.data.token).toBeTruthy()
    expect(res.body.data.user.email).toBe('suite@example.com')
    expect(res.body.data.user.passwordHash).toBeUndefined()
  })

  test('duplicate email is 409 EMAIL_TAKEN, not 400', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Copy Cat', email: 'demo@syncboard.app', password: 'password123' })
    expect(res.status).toBe(409)
    expect(res.body.error.code).toBe('EMAIL_TAKEN')
  })

  test('register rejects bad input with per-field details (400)', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'A', email: 'nope', password: 'short' })
    expect(res.status).toBe(400)
    expect(res.body.error.code).toBe('VALIDATION_ERROR')
    expect(res.body.error.details.length).toBe(3)
  })

  test('login returns a token; /me uses it and never leaks the hash', async () => {
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@syncboard.app', password: 'password123' })
    expect(login.status).toBe(200)
    const token = login.body.data.token
    expect(token).toBeTruthy()

    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`)
    expect(me.status).toBe(200)
    expect(me.body.data.email).toBe('demo@syncboard.app')
    expect(me.body.data.passwordHash).toBeUndefined()
  })

  test('wrong password is 401 BAD_CREDENTIALS', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@syncboard.app', password: 'wrong-password' })
    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('BAD_CREDENTIALS')
  })

  test('/me without a token is 401 NO_TOKEN', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
    expect(res.body.error.code).toBe('NO_TOKEN')
  })
})
