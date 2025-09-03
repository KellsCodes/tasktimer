import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { saveUserProfile } from "../../controllers/profileController.js";

const profileRoutes = Router();

profileRoutes.post("/profile", authMiddleware, saveUserProfile);
profileRoutes.put("/profile", authMiddleware, saveUserProfile);

export default profileRoutes;
