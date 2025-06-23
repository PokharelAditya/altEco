import { RequestHandler } from 'express'
import type {Response} from 'express'
import { CustomRequest } from '../@types/express'
import pool from '../database'
import admin from '../firebase'

export const loginController:RequestHandler = (req:CustomRequest,res:Response) => {

  res.status(200).json({userId:req.findUser?.userId,email:req.findUser?.email,login:true})
} 

export const authController:RequestHandler = async (req:CustomRequest,res:Response):Promise<void> => {
  if(req.findUser?.userId){
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [req.findUser?.email])
    const existingUserData = existingUser.rows[0]
    res.status(200).json(
      {
        userId:req.findUser?.userId,
        email:req.findUser?.email,
        login:true,
        displayName:existingUserData.name,
        gender:existingUserData.gender,
        dob:existingUserData.dob,
        createdAt:existingUserData.created_at,
        photoURL:existingUserData.photo_url
      })
    return
  }
  res.status(401).json({userId:'',email:'',login:false})
}
export const logoutController:RequestHandler = (_req:CustomRequest,res:Response) => {
  res.clearCookie('ACCESS_TOKEN')
  res.clearCookie('REFRESH_TOKEN')
  res.sendStatus(200)
}
