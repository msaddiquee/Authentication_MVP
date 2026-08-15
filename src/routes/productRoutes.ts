import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";
import { Router } from "express";

export const router = Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;