import { Request, Response } from 'express';


export const ecoscoreController = (req: Request, res: Response) => {
  const { tags } = req.body;

  if (typeof tags !== 'string') {
     res.status(400).json({ error: "Missing or invalid 'tags' in request body." });
  }

  const ecoScore = calculateEcoScore(tags);
   res.json({ ecoScore });
}

const calculateEcoScore = (tagString: string): number => {
  if (!tagString.trim()) return 50;

  const tags = tagString.toLowerCase().replace(/,/g, ' ').split(/\s+/);
  const positiveTagWeights: Record<string, number> = {
    "en:green-dot": 3,
    "plant-based": 3,
    "en:organic": 4,
    "en:eu-organic": 4,
    "bio": 4,
    "natural": 2,
    "organic": 3,
    "recyclable": 3,
    "sans": 1,
    "vert": 1
  };

  const negativeTagWeights: Record<string, number> = {
    "plastique": 5,
    "plastic": 5,
    "acid": 2,
    "acide": 2,
    "citric": 1,
    "e330": 1,
    "sodium": 1,
    "carton": 1,
    "arôme": 2,
    "arômes": 2,
    "additive": 3,
    "sachet": 2
  };

  const posScore = tags.reduce((sum, tag) => sum + (positiveTagWeights[tag] || 0), 0);
  const negScore = tags.reduce((sum, tag) => sum + (negativeTagWeights[tag] || 0), 0);
  const rawScore = 50 + (posScore - negScore) * 5;

  return Math.max(0, Math.min(100, rawScore));
};

