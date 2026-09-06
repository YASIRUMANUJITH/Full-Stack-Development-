import { connectDB, disconnectDB } from '../src/db/connect.js'
import User from '../src/models/User.js'
import Board from '../src/models/Board.js'
import { seedUser, mockBoards } from '../src/data/mockData.js'

const force = process.argv.includes('--force')

async function seed() {
  await connectDB()

  const demo = await User.findOneAndUpdate(
    { email: seedUser.email },
    { $setOnInsert: seedUser },
    { upsert: true, new: true },
  )
  console.log(`Demo user ready: ${demo.email} (${demo._id})`)

  const existing = await Board.countDocuments({ owner: demo._id })
  if (existing > 0 && !force) {
    console.log(`Skipped: demo user already owns ${existing} board(s). Run with --force to reseed.`)
    return
  }
  if (existing > 0) {
    await Board.deleteMany({ owner: demo._id })
    console.log(`Cleared ${existing} existing demo board(s).`)
  }

  const docs = mockBoards.map((board) => ({ ...board, owner: demo._id, members: [demo._id] }))
  await Board.insertMany(docs)
  console.log(`Seeded ${docs.length} boards with starter tasks.`)
}

seed()
  .catch((err) => {
    console.error('Seed failed:', err.message)
    process.exitCode = 1
  })
  .finally(() => disconnectDB())
