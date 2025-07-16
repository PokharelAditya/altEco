import { Router } from "express";
import searchProductMiddleware from "../middlewares/searchProductMiddleware";
import searchProductController from "../controllers/searchProductController";

const router = Router();

router.post("/search-product", searchProductMiddleware, searchProductController);

export default router;
