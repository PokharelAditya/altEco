import type { Response } from 'express'
import { CustomRequest } from '../@types/express'
import pool from '../db/setupDB'

type Recommendation = {
  code:string,
  product_name:string,
  clean_tags:string,
  brands:string,
  image_url:string,
  eco_score:number,
  description:string
}

export const getSampleProducts = async (req:CustomRequest,res:Response) => {
  const userId = req.findUser?.userId

  const data = await pool.query('select attributes.value from user_preferences join attributes on user_preferences.attribute_id= attributes.attribute_id where user_preferences.user_id = $1',[userId])
  let tags:string = ''
  data.rows.forEach(tag => {
    tags+=tag.value+' ' 
  })
  try{
    const response = await fetch(`http://localhost:${process.env.PORT}/api/recommend`,{
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({tags})
    })
    const responseData = await response.json()
    
    responseData.recommendations.forEach(async (recommendation:Recommendation)=>{
      await pool.query('insert into product values($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (product_id) DO NOTHING',[
        recommendation.code,
        recommendation.product_name,
        recommendation.description,
        recommendation.brands,
        recommendation.clean_tags,
        recommendation.image_url,
        recommendation.eco_score
      ])
    })
    
    res.send(responseData.recommendations)
  
  }catch(err){
    console.error(err)
    res.status(500).send('error')
  }
}
