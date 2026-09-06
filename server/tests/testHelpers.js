import { MongoMemoryServer } from 'mongodb-memory-server'
import User from '../src/models/User.js'
import Board from '../src/models/Board.js'
import { seedUser, mockBoards } from '../src/data/mockData.js'
import { connectDB, disconnectDB } from '../src/db/connect.js'
import app from '../src/app.js'

// Boots a real (in-memory) MongoDB, connects Mongoose to it, seeds the demo
// user + starter boards, and hands back the express app for Supertest.
export async function startTestApp() {
  const mem = await MongoMemoryServer.create()
  await connectDB(mem.getUri('syncboard-test'))
  const demo = await User.create(seedUser)
  await Board.insertMany(mockBoards.map((board) => ({ ...board, owner: demo._id, members: [demo._id] })))
  return { mem, app }
}

export async function stopTestApp(mem) {
  await disconnectDB()
  await mem.stop()
}
