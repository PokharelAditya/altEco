import { Request, Response, NextFunction } from "express";

const searchProductMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { userId, type, data } = req.body.input;

  if (!userId) {
    res
      .status(400)
      .json({ message: "User Id is required for searching product" });
    return;
  }

  if (!type || !data) {
    res.status(400).json({ message: "Data is required for searching product" });
    return;
  }

  next();
};

export default searchProductMiddleware;
