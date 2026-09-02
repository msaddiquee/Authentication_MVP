import { Router } from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController.js"
export const router = Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);


export default router;