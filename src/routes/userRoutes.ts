import { router } from "./productRoutes.js";
import { registerUser, loginUser } from "../controllers/userController.js"

router.post("/register", registerUser);
router.post("/login", loginUser);