import User from '../models/User.js'

export const userRepo = {
  findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() })
  },
  async findById(id) {
    try {
      return await User.findById(id)
    } catch {
      return null
    }
  },
  create({ name, email, passwordHash }) {
    return User.create({ name: name.trim(), email: email.toLowerCase(), passwordHash })
  },
}
