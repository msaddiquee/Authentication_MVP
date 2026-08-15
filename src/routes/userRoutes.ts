import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js"
export const router = Router();

router.post("/", registerUser);
router.post("/", loginUser);


export default router;