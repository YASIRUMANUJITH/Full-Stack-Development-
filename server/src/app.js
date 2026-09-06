import express from 'express'
import cors from 'cors'
import config from './config.js'
import boardRoutes from './routes/boardRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { authenticate } from './middleware/authenticate.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

// Render (and any other reverse proxy) sets X-Forwarded-For; trust the first
// hop so express-rate-limit sees the real client IP instead of the proxy's.
app.set('trust proxy', 1)

app.use(cors({ origin: config.clientOrigin, credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api', authenticate, boardRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
