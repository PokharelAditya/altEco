import { Response } from 'express'
import { fetchProducts, getFavoritesCount, getNotInterestedCount, getRatingsCount, getProductCount, getReviewLaterCount } from "../db/products";
import { CustomRequest } from '../@types/express'
import { getAverageViewedDuration } from '../db/userInteraction';

export const getProducts = async (req: CustomRequest, res: Response) => {
  try {
    const products = await fetchProducts(req.findUser?.userId ||'')
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err)
  }
}

export const getCount = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.findUser?.userId
    const favoritesCount = await getFavoritesCount( userId ||'')
    const reviewLaterCount = await getReviewLaterCount(userId ||'')
    const notInterestedCount = await getNotInterestedCount(userId ||'')
    const averageViewedDuration = await getAverageViewedDuration(userId || '')
    const productCount = await getProductCount(userId || '')
    const ratings = await getRatingsCount(userId ||'')
    res.status(200).json({favoritesCount, reviewLaterCount, notInterestedCount, ratings , averageViewedDuration, productCount})
    } catch (err) {
      console.error(err);
      res.status(500).json(err)
  }
}


