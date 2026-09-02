import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";
import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";

export const router = Router();

router.get("/", protect,getAllProducts);
router.post("/", protect, createProduct);
router.delete("/:id", protect, deleteProduct);
router.put("/:id", protect, updateProduct);

export default router;