import { Router } from 'express'
import { register, login, me } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/index.js'
import { authenticate } from '../middleware/authenticate.js'
import { loginLimiter } from '../middleware/rateLimiters.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', loginLimiter, validate(loginSchema), login)
router.get('/me', authenticate, me)

export default router
