import pool from "./setupDB";


export async function fetchProducts(userId:string) {
    const { rows } = await pool.query(`SELECT * FROM product`)
    return rows;
}
