import { Router } from "express";
import { createTaskController } from "../../controllers/tasksController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const taskRoutes = Router();

taskRoutes.get("/add-task", authMiddleware, createTaskController);

export default taskRoutes;
