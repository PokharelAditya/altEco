import { Request, Response } from 'express'
import { fetchProducts } from "../db/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await fetchProducts();
    res.json(products);
    console.log(products);
  } catch (err) {
    res.status(500).json(err)
    console.error(err);
  }
}


