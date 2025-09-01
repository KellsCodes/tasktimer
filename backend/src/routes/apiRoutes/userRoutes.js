import { Router } from "express";
import {
  emailVerification,
  login,
  register,
} from "../../controllers/userController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", emailVerification);

export default router;
