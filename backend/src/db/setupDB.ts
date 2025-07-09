import { Pool } from "pg";
import dotenv from "dotenv";

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
  `;
  try {
    await pool.query(query);
    console.log("users table exists");
  } catch (err) {
    console.error("❌ Error creating users table:", err);
  }
};

const createAttributesTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS attributes (
    attribute_id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL, 
    value VARCHAR(255) NOT NULL, 
    display_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

  try {
    await pool.query(query);
    console.log("attributes table exists");
  } catch (err) {
    console.error("❌ Error creating attributes table:", err);
  }
};

const createPreferencesTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    attribute_id INTEGER REFERENCES attributes(attribute_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, attribute_id)
);`;

  try {
    await pool.query(query);
    console.log("preferences table exists");
  } catch (err) {
    console.error("❌ Error creating preferences table:", err);
  }
};

const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS product (
    product_id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL, 
    description VARCHAR(255) NOT NULL, 
    brand VARCHAR(100),
    origin VARCHAR(100),
    ecoscore INTEGER
);`;
  try {
    await pool.query(query);
    console.log("product table exists");
  } catch (err) {
    console.error("Error creating products table", err);
  }
};

const createUserInteractionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS user_interaction (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    duration INTEGER,
    viewed BOOLEAN,
    rating INTEGER,
    PRIMARY KEY (user_id, product_id)
);
 `;
  try {
    await pool.query(query);
    console.log("user_interaction table exists");
  } catch (err) {
    console.error("Error creating user_interaction table", err);
  }
};

const createProductSustainabilityTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS product_sustainability (
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    attribute_id INTEGER NOT NULL REFERENCES attributes(attribute_id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, attribute_id)
);
 `;
  try {
    await pool.query(query);
    console.log("product_sustainability table exists");
  } catch (err) {
    console.error("Error creating product_sustainability table", err);
  }
};

const createFavoritesTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);

 `;
  try {
    await pool.query(query);
    console.log("favorites table exists");
  } catch (err) {
    console.error("Error creating favorites table", err);
  }
};

const createReviewLaterTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS review_later (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);

 `;
  try {
    await pool.query(query);
    console.log("review_later table exists");
  } catch (err) {
    console.error("Error creating review_later table", err);
  }
};

const createExclusionListTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS exclusion_list (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, product_id)
);

 `;
  try {
    await pool.query(query);
    console.log("exclusion_list table exists");
  } catch (err) {
    console.error("Error creating exclusion_list table", err);
  }
};

const createProductCertificationTable = async () => {
  const query = `
CREATE TABLE IF NOT EXISTS product_certification (
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    certification_id UUID NOT NULL,
    PRIMARY KEY (product_id, certification_id)
);

 `;
  try {
    await pool.query(query);
    console.log("product_certification table exists");
  } catch (err) {
    console.error("Error creating product_certification table", err);
  }
};

const createProductTagsTable = async () => {
  const query = `

  CREATE TABLE IF NOT EXISTS product_tags (
    product_id UUID NOT NULL REFERENCES product(product_id) ON DELETE CASCADE,
    tag_id UUID NOT NULL,
    PRIMARY KEY (product_id, tag_id)
);

 `;
  try {
    await pool.query(query);
    console.log("product_tags table exists");
  } catch (err) {
    console.error("Error creating product_tags table", err);
  }
};

async function createAllTables() {
  await createUsersTable();
  await createAttributesTable();
  await createPreferencesTable();
  await createProductTable();
  await createUserInteractionTable();
  await createProductSustainabilityTable();
  await createFavoritesTable();
  await createReviewLaterTable();
  await createExclusionListTable();
  await createProductCertificationTable();
  await createProductTagsTable();
}

createAllTables();

export default pool;
