const users = []

export const userRepo = {
  findByEmail(email) {
    return users.find((user) => user.email === email) || null
  },
  findById(id) {
    return users.find((user) => user.id === id) || null
  },
  create({ name, email, passwordHash }) {
    const user = {
      id: `u-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      passwordHash,
    }
    users.push(user)
    return user
  },
}
