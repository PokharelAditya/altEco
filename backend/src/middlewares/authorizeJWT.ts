import type {Response,NextFunction} from 'express'
import jwt,{JwtPayload} from 'jsonwebtoken'
import { generateAccessToken } from '../util/generateToken'
import { CustomRequest } from '../@types/express'
import admin from '../firebase'
import pool from '../database'

interface UserPayload extends JwtPayload {
  userId: string
  email: string
}
export const authorizeJWT = async (req:CustomRequest,res:Response,next:NextFunction):Promise<void> => {
  const accessToken = req.cookies.ACCESS_TOKEN
  const refreshToken = req.cookies.REFRESH_TOKEN
  const {token} = req.body
  if(token){
    const decoded = await admin.auth().verifyIdToken(token)
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [decoded.email])
    const userId = existingUser.rows[0].id

    req.findUser = {
      userId,
      email:decoded.email || ''
    }
    next()
    return
  }
  if(!accessToken){
    res.status(401).json({message:'not authorized',authorized:false})
    return
  }

  try{
    const payload = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET!) as UserPayload
    req.findUser = payload
    next()
    return
    
  }catch(err){
    if(err instanceof jwt.TokenExpiredError){
      try{
        const payload = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET!) as UserPayload
        const newAccessToken = generateAccessToken(payload.userId,payload.email)
        res.clearCookie('ACCESS_TOKEN')
        res.cookie('ACCESS_TOKEN',newAccessToken,{httpOnly:true})
        console.log('new token set')
        req.findUser = payload
        next()
        return
      }
      catch(err){
        res.clearCookie('ACCESS_TOKEN')
        res.clearCookie('REFRESH_TOKEN')
        res.status(403).json({message:'not authorized',authorized:false})
        return
      }
    }
    else{
      res.status(403).json({message:'not authorized',authorized:false})
      return
    }
  }
}

