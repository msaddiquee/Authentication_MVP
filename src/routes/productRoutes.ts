import { getAllProducts,  createProduct,  deleteProduct,  updateProduct } from "../controllers/productController.js";
import { router } from "../app.js";


router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);
