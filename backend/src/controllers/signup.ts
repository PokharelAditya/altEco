import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import  pool from "../database"
import { v4 as uuidv4 } from 'uuid'

export const signupUser = async (req: Request, res: Response) => {
  const { name, email, password, dateOfBirth, gender } = req.body

  try {
    // Check if user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
    res.status(400).json({ error: 'Email already in use' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    // Insert new user into the DB
    await pool.query(
      'INSERT INTO users (id, name, email, hashed_password, DOB, gender) VALUES ($1, $2, $3, $4, $5, $6)',
      [userId, name, email, hashedPassword, dateOfBirth, gender]
    )

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
