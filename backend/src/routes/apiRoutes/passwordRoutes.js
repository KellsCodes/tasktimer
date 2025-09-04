import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { updatePassword } from "../../controllers/passwordController.js";

const passwordRouter = Router();

passwordRouter.put("/update-password", authMiddleware, updatePassword);
passwordRouter.put("/recover-password", updatePassword);
passwordRouter.put("/request-password-recovery", updatePassword);

export default passwordRouter;
