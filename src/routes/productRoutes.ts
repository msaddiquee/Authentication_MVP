import { Router } from "express";
import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";

export const router = Router();

router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
