
import express from 'express';
import { authorizeJWT } from '../middlewares/authorizeJWT';
import { getProducts, getDashboardData } from '../controllers/productsController';

const router = express.Router();


router.get('/get-products', authorizeJWT, getProducts);
router.get('/dashboard', authorizeJWT, getDashboardData)

export default router;
