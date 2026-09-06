import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import { userRepo } from '../repositories/userRepo.js'
import { AuthError, ConflictError } from '../utils/AppError.js'

const publicUser = (user) => ({ id: user.id, name: user.name, email: user.email })

export const authService = {
  async register({ name, email, password }) {
    if (await userRepo.findByEmail(email)) throw new ConflictError('Email already registered', 'EMAIL_TAKEN')
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await userRepo.create({ name, email, passwordHash })
    return this.signUser(user)
  },
  async login({ email, password }) {
    const user = await userRepo.findByEmail(email)
    if (!user) throw new AuthError('Invalid credentials', 'BAD_CREDENTIALS')
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) throw new AuthError('Invalid credentials', 'BAD_CREDENTIALS')
    return this.signUser(user)
  },
  signUser(user) {
    const token = jwt.sign({ sub: user.id, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn })
    return { user: publicUser(user), token }
  },
  async getMe(userId) {
    const user = await userRepo.findById(userId)
    if (!user) throw new AuthError('User not found')
    return publicUser(user)
  },
}
