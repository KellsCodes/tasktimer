import { Router } from "express";
import {
  emailVerification,
  login,
  logOut,
  register,
} from "../../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify-email", emailVerification);
router.put("/logout", logOut);

export default router;
