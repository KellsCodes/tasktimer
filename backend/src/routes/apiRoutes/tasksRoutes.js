import { Router } from "express";
import { createTaskController } from "../../controllers/tasksController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const taskRoutes = Router();

taskRoutes.post("/add-task", authMiddleware, createTaskController);
taskRoutes.put("/update-task", authMiddleware, createTaskController);

export default taskRoutes;
