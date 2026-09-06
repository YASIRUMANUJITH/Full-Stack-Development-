import app from './app.js'
import config from './config.js'
import { connectDB } from './db/connect.js'

try {
  await connectDB()
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`)
  })
} catch (err) {
  console.error('Failed to start server:', err.message)
  process.exit(1)
}
