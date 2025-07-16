import { Router } from 'express'
import { authorizeJWT } from '../middlewares/authorizeJWT'
// import { getProductInformation } from '../controllers/userInteractionController'
import { recordUserInteraction } from '../controllers/userInteractionController'


const router = Router()

router.get('/product/:id', authorizeJWT, recordUserInteraction)
export default router