import { RequestHandler } from 'express'
import type {Response} from 'express'
import { CustomRequest } from '../@types/express'

export const loginController:RequestHandler = (req:CustomRequest,res:Response) => {

  res.status(200).json({userId:req.findUser?.userId,email:req.findUser?.email,login:true})
} 

export const authController:RequestHandler = (req:CustomRequest,res:Response) => {
  if(req.findUser?.userId){
    res.status(200).json({userId:req.findUser?.userId,email:req.findUser?.email,login:true})
    return
  }
  res.status(401).json({userId:'',email:'',login:false})
}

export const logoutController:RequestHandler = (_req:CustomRequest,res:Response) => {
  res.clearCookie('ACCESS_TOKEN')
  res.clearCookie('REFRESH_TOKEN')
  res.sendStatus(200)
}
