import {Response } from "express";
import { CustomRequest } from "../@types/express";
import { getUserByEmail } from "../db/users";
import { fetchProduct } from "../db/products";
import { setUserInteraction, getRating } from "../db/userInteraction";

export const recordUserInteraction = async (req: CustomRequest, res: Response): Promise<void> => {
    const userId = req.findUser?.userId
    const userEmail = req.findUser?.email
    const { duration, rating } = req.body

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

        await setUserInteraction(userId, product_id, Math.floor(duration), rating) // DB QUERY


        //SEE IN NETWORK TAB FOR POST REQUEST
        res.status(201).json({
            status: true,
            message: 'Product information retrieved successfully',
            user_data: user,
            product_data: product,
            action: "viewed",
            duration,
            rating
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

export const getUserInteraction = async (req: CustomRequest, res: Response): Promise<void> => {
        const userId = req.findUser?.userId
        const product_id = req.params.id
        if(!userId)
        {
            return;
        }
        const rating = await getRating(userId, product_id)
        res.status(200).json({
            success: true,
            rating: rating
        })


}
