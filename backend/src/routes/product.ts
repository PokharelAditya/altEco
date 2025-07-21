import { Router } from 'express'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { recordUserInteraction, getUserInteraction } from '../controllers/userInteractionController'


const router = Router()

router.post('/product/:id', authorizeJWT, recordUserInteraction)
router.get('/product/:id', authorizeJWT, getUserInteraction)
export default router