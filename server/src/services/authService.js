import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { userRepo } from '../repositories/userRepo.js'
import { AuthError, ValidationError } from '../utils/AppError.js'

export const authService = {
  async register({ name, email, password }) {
    if (userRepo.findByEmail(email.toLowerCase())) throw new ValidationError('Email already registered')
    const passwordHash = await bcrypt.hash(password, 10)
    const user = userRepo.create({ name, email, passwordHash })
    return this.signUser(user)
  },
  async login({ email, password }) {
    const user = userRepo.findByEmail(email.toLowerCase())
    if (!user) throw new AuthError('Invalid credentials', 'BAD_CREDENTIALS')
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new AuthError('Invalid credentials', 'BAD_CREDENTIALS')
    return this.signUser(user)
  },
  signUser(user) {
    const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
    const publicUser = { id: user.id, name: user.name, email: user.email }
    return { user: publicUser, token }
  },
  getMe(userId) {
    const user = userRepo.findById(userId)
    if (!user) throw new AuthError('User not found')
    return { id: user.id, name: user.name, email: user.email }
  },
}
