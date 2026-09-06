export function errorHandler(err, req, res, _next) {
  // An ObjectId that cannot parse (e.g. GET /boards/not-an-id) is a 404, not a 500.
  if (err.name === 'CastError') {
    return res.status(404).json({ error: { message: 'Resource not found', code: 'NOT_FOUND', details: null } })
  }
  const status = err.statusCode || 500
  const code = err.code || 'INTERNAL_ERROR'
  const message = status === 500 ? 'Internal server error' : err.message
  if (status >= 500) console.error(`[${req.method} ${req.originalUrl}]`, err)
  res.status(status).json({ error: { message, code, details: err.details || null } })
}

export function notFoundHandler(req, res) {
  res.status(404).json({ error: { message: 'Route not found', code: 'NOT_FOUND' } })
}
