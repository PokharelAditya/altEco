import { Request, Response } from 'express';
import { positiveTagWeights,negativeTagWeights } from '../util/tagWeights'

type tag = {
  name: string,
  value: any
}

export const ecoscoreController = (req: Request, res: Response) => {
  const { tags } = req.body;
  
  if (typeof tags !== "object") {
     res.status(400).json({ error: "Missing or invalid 'tags' in request body." });
  }

  const ecoScore = calculateEcoScore(tags);
   res.json({ ecoScore });
}

// const rms = (tags:tag[], TagWeights:Record<string,number>):number => {
//   let rms = tags.map(tag => tag.name).reduce((sum, tag) => sum + (TagWeights[tag]**2 || 0), 0)
//   rms = Math.sqrt(rms)
//   return rms
// }

const calculateEcoScore = (tags: tag[]): number => {
  
  if(!tags.length) return 50;
  // if (!tagString.trim()) return 50;

  // const tags = tagString.toLowerCase().replace(/,/g, ' ').split(/\s+/);
  
  // let posScore = tags.reduce((sum, tag) => sum + (positiveTagWeights[tag] || 0), 0);
  // if(posScore!=0) posScore = posScore/rms(tags,positiveTagWeights)
  // let negScore = tags.reduce((sum, tag) => sum + (negativeTagWeights[tag] || 0), 0);
  // if(negScore!=0) negScore = negScore/rms(tags,negativeTagWeights)
  // const rawScore = 50 + Math.atan((posScore - negScore)) * 100/Math.PI;

  // return Math.max(0, Math.min(100, rawScore));
  // return rawScore>50 ? Math.ceil(rawScore) : Math.floor(rawScore)

  let posScore = tags.reduce((sum, tag) => sum + (positiveTagWeights[tag.name] || 0) * (tag.value || 100)/100, 0)
  let negScore = tags.reduce((sum, tag) => sum + (negativeTagWeights[tag.name] || 0) * (tag.value || 100)/100, 0)
 
  // let p = tags.reduce((count, tag) => positiveTagWeights[tag.name] ? count+1 : count, 0) / 10
  // let n = tags.reduce((count, tag) => negativeTagWeights[tag.name] ? count+1 : count, 0) / 10

  const score = 50 + (100/Math.PI) * Math.atan(posScore - negScore)
  return Math.floor(score);
};

