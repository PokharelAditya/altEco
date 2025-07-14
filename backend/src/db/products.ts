import pool from "./setupDB";


export async function fetchProducts() {
    const { rows } = await pool.query(`SELECT * FROM product`)
    return rows;
}