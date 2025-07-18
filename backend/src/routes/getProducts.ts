import { Router } from 'express'
import { addToFavorites, addToNotInterested, addToReviewLater, deleteFromFavorites, deleteFromNotInterested, deleteFromReviewLater, getSampleProducts } from '../controllers/getSampleProducts'
import { authorizeJWT } from '../middlewares/authorizeJWT'
const router = Router()

router.get('/get-sample-products',authorizeJWT,getSampleProducts)
router.post('/favorites',authorizeJWT,addToFavorites)
router.delete('/favorites',authorizeJWT,deleteFromFavorites)
router.post('/review-later',authorizeJWT,addToReviewLater)
router.delete('/review-later',authorizeJWT,deleteFromReviewLater)
router.post('/not-interested',authorizeJWT,addToNotInterested)
router.delete('/not-interested',authorizeJWT,deleteFromNotInterested)
export default router
