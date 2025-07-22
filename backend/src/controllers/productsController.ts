import { Response } from 'express'
import { fetchProducts, getFavoritesCount, getNotInterestedCount, getRatingsCount, getProductCount, getReviewLaterCount } from "../db/products";
import { CustomRequest } from '../@types/express'
import { getAverageViewedDuration } from '../db/userInteraction';
import { 
  getEcoScore, 
  getActivity, 
  getSustainability 
} from "../db/dashboard";

export const getProducts = async (req: CustomRequest, res: Response) => {
  try {
    const products = await fetchProducts(req.findUser?.userId ||'')
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json(err)
  }
}

export const getDashboardData = async (req: CustomRequest, res: Response): Promise<void> => {
  const userId = req.findUser?.userId;
  
  try {
    if (!userId) {
      res.status(401).json({
        status: false,
        message: 'User not found or not authenticated'
      });
      return;
    }

    // Fetch all dashboard data concurrently (removed engagementData)
    const [
      favoritesCount,
      productCount,
      reviewLaterCount,
      notInterestedCount,
      ratings,
      averageViewedDuration,
      ecoScoreData,
      activityData,
      sustainabilityData
    ] = await Promise.all([
      getFavoritesCount(userId),
      getProductCount(userId),
      getReviewLaterCount(userId),
      getNotInterestedCount(userId),
      getRatingsCount(userId),
      getAverageViewedDuration(userId),
      getEcoScore(userId),
      getActivity(userId),
      getSustainability(userId)
    ]);

    res.status(200).json({
      status: true,
      dashboardData: {
        // Collection counts
        favoritesCount: parseInt(favoritesCount),
        productCount: parseInt(productCount),
        reviewLaterCount: parseInt(reviewLaterCount),
        notInterestedCount: parseInt(notInterestedCount),
        
        // Ratings data
        ratings,
        
        // Average viewed duration and total views
        averageViewedDuration,
        
        // Chart data for dashboard (removed engagementPattern)
        ecoScoreProfile: ecoScoreData,
        activityTimeline: activityData,
        sustainabilityFocus: sustainabilityData
      }
    });
    
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    res.status(500).json({
      status: false,
      message: 'Internal server error while fetching dashboard data'
    });
  }
};