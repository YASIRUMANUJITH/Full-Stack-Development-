import { Router } from 'express'
import { register, login, me } from '../controllers/authController.js'
import { validate } from '../middleware/validate.js'
import { registerSchema, loginSchema } from '../schemas/index.js'
import { authenticate } from '../middleware/authenticate.js'

const router = Router()

router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)
router.get('/me', authenticate, me)

export default router
