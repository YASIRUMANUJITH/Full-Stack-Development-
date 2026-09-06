import mongoose from 'mongoose'
import config from '../config.js'

export async function connectDB(uri = config.mongoUri) {
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Copy .env.example to .env and paste your Atlas connection string.',
    )
  }
  mongoose.set('strictQuery', true)
  await mongoose.connect(uri)
  console.log(`MongoDB connected (db: ${mongoose.connection.name})`)
}

export async function disconnectDB() {
  await mongoose.disconnect()
}

export default connectDB
