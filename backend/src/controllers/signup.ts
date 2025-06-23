import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { getUserByEmail, createNewUser } from '../db/users'

export const signupUser = async (req: Request, res: Response) => {
  const { name, email, password, dateOfBirth, gender } = req.body

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser.length > 0) {
      res.status(400).json({ error: 'Email already in use' })
      return
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    // Insert new user into the DB
    await createNewUser(userId, name, email, hashedPassword, dateOfBirth, gender, '')

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const signupDetail = async (req: Request, res: Response) => {
  const { email, displayName, photoURL, password, dob, gender } = req.body

  const existingUser = await getUserByEmail(email)
  if (!existingUser[0]) {
    const userId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)
    await createNewUser(userId, displayName, email, hashedPassword, dob, gender, photoURL)
    res.status(201).json({ status: true })
  } else {
    res.status(400).json({ status: false })
  }
}

export const checkAccount = async (req: Request, res: Response) => {
  const { email } = req.body
  const existingUser = await getUserByEmail(email)
  if (existingUser[0].email === email) {
    res.status(200).json({ status: true })
  } else {
    res.status(404).json({ status: false })
  }

}

