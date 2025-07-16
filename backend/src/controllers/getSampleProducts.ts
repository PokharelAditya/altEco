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

export const getSampleProducts = async (req:CustomRequest,res:Response):Promise<void> => {
  const userId = req.findUser?.userId

  let data = await pool.query('select attributes.display_name from user_preferences join attributes on user_preferences.attribute_id= attributes.attribute_id where user_preferences.user_id = $1',[userId])
 
  //for the time being, i have just included the products whose tags incldue the preferences but we ought to use a 
  //proper recommendation model :) next week
  //P.S. the recommendation model needs to randomly recommend products based on the tags, not the same products everytime

  
  const condition = data.rows.map((tag) => `clean_tags ilike '%${tag.display_name}%'`)
  const whereClause = condition.join(' or ')
  const query = 'select * from product where '+whereClause
  try{
    const products = await pool.query(query)
    if(products.rows.length>=6){
      res.send(products.rows)
      return
    }
  }catch(err){
    console.error(err)
    res.status(500).send(err)
  }

  data = await pool.query('select attributes.value from user_preferences join attributes on user_preferences.attribute_id= attributes.attribute_id where user_preferences.user_id = $1',[userId])

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
