import bcrypt from 'bcrypt'
import { Response } from 'express'
import { CustomRequest } from '../@types/express'
import db from '../database'

export const updateProfile = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  const { type } = req.params
  const userId = req.findUser?.userId
if (!userId) {
  res.status(401).json({ message: 'Unauthorized: User ID missing' })
  return
}
  const {
    displayName,
    gender,
    dob,
    currentPassword,
    newPassword
  } = req.body

  try {
    let query = ''
    let values: (string | number)[] = []

    switch (type) {
      case 'name':
        if (!displayName) {
           res.status(400).json({ message: 'Display name required' })
           return
        }
        query = 'UPDATE users SET name = $1 WHERE id = $2'
        values = [displayName, userId]
        break

      case 'gender':
        if (!gender) {
           res.status(400).json({ message: 'Gender required' })
           return
        }
        query = 'UPDATE users SET gender = $1 WHERE id = $2'
        values = [gender, userId]
        break

      case 'dob':
        if (!dob) {
        res.status(400).json({ message: 'Date of birth required' })
        return
        }
        query = 'UPDATE users SET dob = $1 WHERE id = $2'
        values = [dob, userId]
        break

      case 'password':
        if (!currentPassword || !newPassword) {
         res.status(400).json({ message: 'Passwords required' })
         return
        }

        const userRes = await db.query('SELECT hashed_password FROM users WHERE id = $1', [userId])
        const hashedPassword = userRes.rows[0]?.hashed_password
        const isMatch = await bcrypt.compare(currentPassword, hashedPassword)

        if (!isMatch) {
           res.status(400).json({ message: 'Incorrect current password' })
           return
        }

        if (newPassword.length < 6) {
           res.status(400).json({ message: 'Password must be at least 6 characters' })
           return
        }

        const newHashed = await bcrypt.hash(newPassword, 10)
        query = 'UPDATE users SET hashed_password = $1 WHERE id = $2'
        values = [newHashed, userId]
        break

      default:
     res.status(400).json({ message: 'Invalid update type' })
     return
    }

    await db.query(query, values)
     res.json({ success: true })
     return
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
       res.status(500).json({ message: 'Server error: ' + err.message })
       return
    }
     res.status(500).json({ message: 'Unknown server error' })
     return
  }
}
