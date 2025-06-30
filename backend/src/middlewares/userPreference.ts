import type { Response, NextFunction } from 'express';
import { CustomRequest } from '../@types/express';

export const validateSustainabilityPreferences = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const {
    materialSafety,
    wasteImpact,
    carbonImpact,
    animalEthics,
    sourcing,
    certifications,
    productTypes,
    distancePreference,
    packaging,
    educationEngagement
  } = req.body;
  console.log("rochak gandu");

  const errors: string[] = [];

  // Validate array fields
  const arrayFields = {
    materialSafety,
    wasteImpact,
    carbonImpact,
    animalEthics,
    sourcing,
    certifications,
    productTypes,
    packaging
  };

  Object.entries(arrayFields).forEach(([field, value]) => {
    if (value !== undefined && !Array.isArray(value)) {
      errors.push(`${field} must be an array`);
    }
  });

  // Validate distance preference
  const validDistanceValues = ['local', 'regional', 'national', 'global-offset', 'global'];
  if (distancePreference && !validDistanceValues.includes(distancePreference)) {
    errors.push('Invalid distance preference value');
  }

  // Validate education engagement
  if (educationEngagement !== undefined && typeof educationEngagement !== 'boolean') {
    errors.push('educationEngagement must be a boolean');
  }

  // Validate array content (basic string validation)
  Object.entries(arrayFields).forEach(([field, value]) => {
    if (Array.isArray(value)) {
      const invalidItems = value.filter(item => typeof item !== 'string' || item.trim() === '');
      if (invalidItems.length > 0) {
        errors.push(`${field} must contain only non-empty strings`);
      }
    }
  });

  if (errors.length > 0) {
    res.status(400).json({
      status: false,
      message: 'Validation failed',
      errors
    });
    return;
  }

  next();
};