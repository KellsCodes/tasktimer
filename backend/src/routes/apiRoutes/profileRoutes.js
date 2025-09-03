import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { saveUserProfileController } from "../../controllers/profileController.js";
import uploadMiddleware from "../../middlewares/uploadMiddleware.js";

const profileRoutes = Router();

profileRoutes.post(
  "/profile",
  authMiddleware,
  uploadMiddleware,
  saveUserProfileController
);
profileRoutes.put(
  "/profile",
  authMiddleware,
  uploadMiddleware,
  saveUserProfileController
);

export default profileRoutes;
