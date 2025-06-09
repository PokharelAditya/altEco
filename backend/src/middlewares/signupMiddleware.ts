import { Request, Response, NextFunction, RequestHandler } from 'express'

export const validateSignup: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, age, gender } = req.body

  if (!name || !email || !password || !age || !gender) {
    res.status(400).json({ error: 'All fields are required' })
    return 
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters long' })
    return
  }

  if (parseInt(age) < 13) {
    res.status(400).json({ error: 'You must be at least 13 years old to sign up' })
    return
  }

  next() 
}
