import { Router } from 'express'
import { loginController,authController,logoutController, authControllerGoogle } from '../controllers/login'
import loginMiddleware from '../middlewares/loginMiddleware'
import { authorizeJWT } from '../middlewares/authorizeJWT'

const router = Router()

router.post('/login',loginMiddleware,loginController)

router.get('/auth',authorizeJWT,authController)
router.post('/auth/google',authControllerGoogle)

router.get('/logout',logoutController)
export default router
