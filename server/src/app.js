import express from 'express'
import cors from 'cors'
import config from './config.js'
import boardRoutes from './routes/boardRoutes.js'
import authRoutes from './routes/authRoutes.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(cors({ origin: config.clientOrigin, credentials: true }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api', boardRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
