import { Router } from 'express'
import { getSampleProducts } from '../controllers/getSampleProducts'
import { authorizeJWT } from '../middlewares/authorizeJWT'
const router = Router()

router.get('/get-sample-products',authorizeJWT,getSampleProducts)

export default router
