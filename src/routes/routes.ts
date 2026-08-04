import { Router } from "express";
import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";

export const router = Router();

router.get("/products", getAllProducts);
router.post("/product", createProduct);
router.delete("/product/:id", deleteProduct);
router.put("/product/:id", updateProduct);
