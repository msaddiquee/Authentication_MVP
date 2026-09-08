import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe, deleteUser,changePassword } from "../controllers/userController.js"
export const router = Router();
import { protect } from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getMe);
router.delete("/me", protect, deleteUser);
router.post("/changepassword", protect, changePassword);

export default router;