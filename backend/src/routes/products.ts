
import express from 'express';
import { authorizeJWT } from '../middlewares/authorizeJWT';
import { getProducts } from '../controllers/productsController';

const router = express.Router();


router.get('/get-products', authorizeJWT, getProducts);

export default router;