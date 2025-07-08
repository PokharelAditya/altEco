import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
}

const createAttributesTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS attributes (
    attribute_id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL, 
    value VARCHAR(255) NOT NULL, 
    display_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`

  try {
    await pool.query(query)
    console.log('attributes table exists')
  } catch (err) {
    console.error('❌ Error creating attributes table:', err)
  }
}

const createPreferencesTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    attribute_id INTEGER REFERENCES attributes(attribute_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, attribute_id)
);`

  try {
    await pool.query(query)
    console.log('preferences table exists')
  } catch (err) {
    console.error('❌ Error creating preferences table:', err)
  }
}

async function createAllTables(){
  await createUsersTable();
  await createAttributesTable();
  await createPreferencesTable();
}

createAllTables()

export default pool;
