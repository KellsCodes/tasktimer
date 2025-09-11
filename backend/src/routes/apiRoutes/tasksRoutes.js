import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
} from "../../controllers/tasksController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const taskRoutes = Router();

taskRoutes.post("/add-task", authMiddleware, createTaskController);
taskRoutes.put("/update-task", authMiddleware, createTaskController);
taskRoutes.delete("/delete-task", authMiddleware, deleteTaskController);

export default taskRoutes;
