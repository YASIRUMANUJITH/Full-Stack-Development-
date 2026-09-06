import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  jwtExpiresIn: '1h',
  mongoUri: process.env.MONGODB_URI || '',
}

export default config
