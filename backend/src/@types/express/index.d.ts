import { Request } from 'express'

export interface CustomRequest extends Request {
  findUser?: {
    userId: string
    email: string
  }
}
