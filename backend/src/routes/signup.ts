import { Router } from 'express'
import { validateSignup } from '../middlewares/signupMiddleware'
import { signupUser } from '../controllers/signup'


const router = Router()

router.post('/signup', validateSignup, signupUser)

export default router
