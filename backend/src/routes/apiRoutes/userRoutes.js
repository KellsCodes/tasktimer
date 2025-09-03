import { Router } from "express";
import {
  emailVerification,
  login,
  logOut,
  refreshTokenController,
  register,
} from "../../controllers/userController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify-email", emailVerification);
router.put("/logout", authMiddleware, logOut);
router.post("/refresh-token", refreshTokenController);

export default router;
