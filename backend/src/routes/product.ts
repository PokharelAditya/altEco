import { Router } from 'express'
import { authorizeJWT } from '../middlewares/authorizeJWT'
import { recordUserInteraction } from '../controllers/userInteractionController'


const router = Router()

router.post('/product/:id', authorizeJWT, recordUserInteraction)
export default router