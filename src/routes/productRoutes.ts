import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";
import { Router } from "express";

export const router = Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;