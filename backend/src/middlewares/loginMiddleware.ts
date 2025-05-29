import type {Response,NextFunction} from 'express'
import { users } from '../util/users'
import { generateAccessToken, generateRefreshToken } from '../util/generateToken'
import { CustomRequest } from '../@types/express'
const loginMiddleware = (req:CustomRequest,res:Response,next:NextFunction) => {
  const {email,password} = req.body
  
  const findUser = users.find(user => user.email===email && user.password === password)

  if(!findUser){
    res.status(401).json({message:'user not found',login:false})
    return
  }
  const accessToken = generateAccessToken(findUser.userId,findUser.email)
  const refreshToken = generateRefreshToken(findUser.userId,findUser.email)

  res.cookie('ACCESS_TOKEN',accessToken,{httpOnly:true})
  res.cookie('REFRESH_TOKEN',refreshToken,{httpOnly:true})
  req.findUser = {userId:findUser.userId,email:findUser.email} 
  next()
}

export default loginMiddleware
