import pool from '../database'

async function getUserByEmail(email:string) {
    const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return rows
}

async function createNewUser(userId:string, name:string, email:string, hashedPassword:string,dateOfBirth:string, gender:string, photo_url:string) {
    await pool.query(
        'INSERT INTO users (id, name, email, hashed_password, DOB, gender, photo_url) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [userId, name, email, hashedPassword, dateOfBirth, gender, photo_url]
      )
}

async function setUserPhotoUrl(photo_url: string, email: string) {
    await pool.query(
        `UPDATE users SET photo_url=$1 WHERE email = $2`,[photo_url,email]
    )
}

export { getUserByEmail , createNewUser, setUserPhotoUrl}