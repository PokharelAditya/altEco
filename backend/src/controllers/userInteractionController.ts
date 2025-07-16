import {Response } from "express";
import { CustomRequest } from "../@types/express";
import { getUserByEmail } from "../db/users";
import { fetchProduct } from "../db/products";


export const recordUserInteraction = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.findUser?.userId
    const userEmail = req.findUser?.email

    try {
        if (!userId || !userEmail) {
            res.status(401).json({
                status: false,
                message: 'User not found or not authenticated'
            })
            return;
        }
    
        const product_id = req.params.id
        const product = await fetchProduct(product_id)

        const user = await getUserByEmail(userEmail)

        res.json({
            status: true,
            message: 'Product information retrieved successfully',
            user_data: user,
            product_data: product,
            action: "viewed",
            timestamp: new Date().toISOString()
        })
    }
    catch (err) {
        console.error('Error fetching product and/or user information', err)
        res.status(500).json({
            status: false,
            message: 'Internal server error while fetching product and/or information'
        })
    }
}