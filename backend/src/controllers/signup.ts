import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
<<<<<<< HEAD
import { getUserByEmail, createNewUser } from '../db/users'
=======
import sendMail from '../util/sendMail'
import generateOTP from '../util/generateOTP'
>>>>>>> origin/slayer

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

<<<<<<< HEAD
export const checkAccount = async (req: Request, res: Response) => {
  const { email } = req.body
  const existingUser = await getUserByEmail(email)
  if (existingUser[0].email === email) {
    res.status(200).json({ status: true })
  } else {
    res.status(404).json({ status: false })
=======
export const checkAccount = async (req:Request,res:Response) => {
  const {email,photoURL} = req.body
  const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email])
  if(existingUser.rows[0].email === email){
    if(!existingUser.rows[0].photo_url){
      await pool.query(`UPDATE users SET photo_url=$1 WHERE email = $2`,[photoURL,email]) 
    }
    res.status(200).json({status:true})
  }else{
    res.status(404).json({status:false})
>>>>>>> origin/slayer
  }

}
export const sendMailController = async (req:Request,res:Response) => {
  const {name,email} = req.body

  const otp = generateOTP()
  await sendMail(email,name,otp)

  res.status(200).json({otp})
  
}

export const checkEmail = async (req:Request, res:Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ error: 'Email is required' });
      return
    }

    // Check if user already exists with this email
    const query = 'SELECT id FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);

    if (result.rows.length > 0) {
       res.status(200).json({ 
        exists: true, 
        message: 'Email is already registered' 
      });
      return
    }

     res.status(200).json({ 
      exists: false, 
      message: 'Email is available' 
    });
    return

  } catch (error) {
    console.error('Check email error:', error);
     res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
  return
};

