import { ValidationError } from '../utils/AppError.js'

export function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message }))
      throw new ValidationError('Validation failed', details)
    }
    req.body = result.data
    next()
  }
}
