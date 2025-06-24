import pool from "../database";

const createUsersTable = async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        hashed_password TEXT NOT NULL,
        DOB DATE NOT NULL,
        gender TEXT NOT NULL,
        photo_url TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `
    try {
      await pool.query(query)
      console.log('users table exists')
    } catch (err) {
      console.error('❌ Error creating users table:', err)
    }
    finally {
        pool.end()
    }
}
  
createUsersTable()