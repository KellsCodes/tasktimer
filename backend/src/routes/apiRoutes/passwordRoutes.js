import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {
  forgotPasswordResetToken,
  updatePassword,
  verifyResetPassword,
} from "../../controllers/passwordController.js";

const passwordRouter = Router();

passwordRouter.put("/update-password", authMiddleware, updatePassword);
passwordRouter.post("/forgot-password", forgotPasswordResetToken);
passwordRouter.put("/reset-password", verifyResetPassword);

export default passwordRouter;
