import { Response } from 'express'
import { fetchProducts } from "../db/products";
import { CustomRequest } from '../@types/express'

export const getProducts = async (req: CustomRequest, res: Response) => {
  try {
    const products = await fetchProducts(req.findUser?.userId ||'')
    res.json(products);
  } catch (err) {
    res.status(500).json(err)
    console.error(err);
  }
}


