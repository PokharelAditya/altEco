import { Router } from 'express'
import { validateSignup } from '../middlewares/signupMiddleware'
import { checkAccount, signupDetail, signupUser } from '../controllers/signup'


const router = Router()

router.post('/signup', validateSignup, signupUser)
router.post('/signup-detail',signupDetail)
router.post('/check-account',checkAccount)

export default router
