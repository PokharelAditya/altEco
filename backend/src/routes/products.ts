
import express from 'express';
import { authorizeJWT } from '../middlewares/authorizeJWT';
import { getProducts, getCount } from '../controllers/productsController';

const router = express.Router();


router.get('/get-products', authorizeJWT, getProducts);
router.get('/dashboard', authorizeJWT, getCount)

export default router;
