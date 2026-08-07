import { router } from "../app.js";
import { registerUser, loginUser } from "../controllers/userController.js"

router.post("/register", registerUser);
router.post("/login", loginUser);