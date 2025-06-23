import pool from '../database'

async function getUserByEmail(email:string) {
    const {rows} = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return rows
}

export { getUserByEmail }