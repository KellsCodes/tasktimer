import { Router } from "express";
import {
  emailVerification,
  login,
  logOut,
  refreshTokenController,
  register,
  getUserByEmailController,
  loginWithGoogleController,
} from "../../controllers/userController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.put("/verify-email", emailVerification);
router.put("/logout", authMiddleware, logOut);
router.get("/get-user", authMiddleware, getUserByEmailController);
router.post("/refresh-token", refreshTokenController);
router.get("/auth/google", loginWithGoogleController);

export default router;
