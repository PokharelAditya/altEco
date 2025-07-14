import { Request, Response } from "express";

const searchProductController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, type, data } = req.body.input;

    res.status(200).json({
      message: "Products fetched sucessfully",
      userId,
      type,
      data,
    });
  } catch (error) {
    console.error("Error in seaching products: ", error);
  }
};

export default searchProductController;
