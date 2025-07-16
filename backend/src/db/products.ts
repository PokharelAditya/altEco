import pool from "./setupDB";


export async function fetchProducts(userId:string) {
    const { rows } = await pool.query(`SELECT * FROM product`)
    return rows;
}

export async function fetchProduct(productId: string) {
    const { rows } = await pool.query('SELECT * FROM product WHERE product_id = $1', [
        productId
    ])
    return rows
}
