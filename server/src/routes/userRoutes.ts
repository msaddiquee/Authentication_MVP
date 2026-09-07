import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe } from "../controllers/userController.js"
export const router = Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);


export default router;