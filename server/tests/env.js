// Jest setup file — runs before every test file, before any module imports.
process.env.JWT_SECRET = 'test-secret-not-real'
process.env.CLIENT_ORIGIN = 'http://localhost:5173'
