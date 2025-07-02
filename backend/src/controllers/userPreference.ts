import type { Response, NextFunction } from 'express';
import { CustomRequest } from '../@types/express';
import { 
  checkExistingPreferences, 
  insertPreferences, 
  updatePreferences,
  getPreferencesByUserId,
  deletePreferences 
} from '../db/userPreference';
import pool from '../database';

export const saveSustainabilityPreferences = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const client = await pool.connect();
  
  try {
    const userId = req.findUser?.userId;
    const preferences = req.body;
    console.log(userId);
    console.log(preferences)

    if (!userId) {
      res.status(401).json({
        status: false,
        message: 'User not authenticated'
      });
      return;
    }

    await client.query('BEGIN');

    // Check if user already has preferences
    const exists = await checkExistingPreferences(userId);
    let result;

    if (exists) {
      // Update existing preferences
      result = await updatePreferences(userId, preferences);
    } else {
      // Insert new preferences
      result = await insertPreferences(userId, preferences);
    }
    
    await client.query('COMMIT');

    res.status(200).json({
      status: true,
      message: 'Sustainability preferences saved successfully',
      data: result
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error saving sustainability preferences:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to save sustainability preferences',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  } finally {
    client.release();
  }
};

export const getUserPreferences = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.findUser?.userId;

    if (!userId) {
      res.status(401).json({
        status: false,
        message: 'User not authenticated'
      });
      return;
    }

    const preferences = await getPreferencesByUserId(userId);

    if (preferences.length === 0) {
      res.status(404).json({
        status: false,
        message: 'No sustainability preferences found'
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: 'Sustainability preferences retrieved successfully',
      data: preferences[0]
    });

  } catch (error) {
    console.error('Error retrieving sustainability preferences:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to retrieve sustainability preferences',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
};

export const removeUserPreferences = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.findUser?.userId;

    if (!userId) {
      res.status(401).json({
        status: false,
        message: 'User not authenticated'
      });
      return;
    }

    await deletePreferences(userId);

    res.status(200).json({
      status: true,
      message: 'Sustainability preferences deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting sustainability preferences:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to delete sustainability preferences',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    });
  }
};
