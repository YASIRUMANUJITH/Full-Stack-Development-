import http from 'node:http'
import app from './app.js'
import config from './config.js'
import { connectDB } from './db/connect.js'
import { initRealtime } from './realtime.js'

try {
  await connectDB()
  const server = http.createServer(app)
  initRealtime(server, config.clientOrigin)
  server.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port} (rest + websocket)`)
  })
} catch (err) {
  console.error('Failed to start server:', err.message)
  process.exit(1)
}
