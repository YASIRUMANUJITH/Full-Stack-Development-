import rateLimit from 'express-rate-limit'
import { AppError } from '../utils/AppError.js'

// 5 login attempts per minute per IP. Any more and credential stuffing becomes
// impractical; real users mistype at most a couple of times.
export const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) =>
    next(new AppError('Too many login attempts — try again in a minute', 429, 'RATE_LIMITED')),
})
