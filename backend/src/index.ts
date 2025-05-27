import express from 'express'
import type {Request,Response} from 'express'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

  console.log(`server is listening at port ${PORT}`)
})

app.get('/',(req:Request,res:Response)=>{
  if(req.cookies){
    console.log(req.cookies)
  }
  res.send('hello')
})
