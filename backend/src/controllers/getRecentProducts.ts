import pool from "../db/setupDB";
import { CustomRequest } from "../@types/express";
import { Response } from "express";
import cosineSimilarity from "../util/cosineSimilarity";

const getRecentProducts = async (
  req: CustomRequest,
  res: Response
):Promise<any> => {
  try {
    const userId = req.findUser?.userId;
    
    const input = await pool.query(`
      SELECT input FROM input
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 3
    `, [userId]);
    const inputTags = input.rows.map((i:any) => i.input).join(" ")

    console.log(inputTags)

    const tags = ""

    if(tags.trim())
    {
      console.log("...implementing cosine similarity to get recent products...")
      const recommendations = await cosineSimilarity(tags.trim()) 

      return res.status(200).json({
        message: "Products fetched successfully",
        recommendations: recommendations.sort((a: any, b: any) => {
          return b.eco_score - a.eco_score
        }),
      });
    }

    return res.status(200).json({
      message: "Tags are empty",
      recommendations: [],
    });
  } 
  catch (error) {
    console.error("Error in fetching recent products: ", error);
  }
};

export default getRecentProducts;
