export function errorHandler(err, req, res, _next) {
  const status = err.statusCode || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = status === 500 ? 'Internal server error' : err.message
  res.status(status).json({ error: { message, code, details: err.details || null } })
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: { message: 'Route not found', code: 'NOT_FOUND' } })
}
