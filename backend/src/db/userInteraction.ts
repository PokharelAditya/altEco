import pool from "./setupDB";

export async function setUserInteraction(user_id:string, product_id:string, duration:number, rating:number) {
  return await pool.query(
    `INSERT INTO user_interaction (user_id, product_id, duration, viewed, rating)
VALUES ($1, $2, $3, 1, $4)
ON CONFLICT (user_id, product_id) 
DO UPDATE SET
  viewed = user_interaction.viewed + 1,
  duration = user_interaction.duration + $3;
`
  , [user_id, product_id, duration, rating]);
}

// if same user_id and product_id is sent,
// update viewed and duration
// viewed is increased by 1
// duration is increased cumulatively

