import jwt from 'jsonwebtoken'
import config from '../config.js'
import { AuthError } from '../utils/AppError.js'

export function authenticate(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) throw new AuthError('No token provided', 'NO_TOKEN')
  const token = header.split(' ')[1]
  try {
    const payload = jwt.verify(token, config.jwtSecret)
    req.user = { id: payload.sub, email: payload.email }
    next()
  } catch {
    throw new AuthError('Invalid or expired token', 'BAD_TOKEN')
  }
}
