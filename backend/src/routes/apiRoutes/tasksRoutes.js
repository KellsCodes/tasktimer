import { Router } from "express";
import {
  createTaskController,
  deleteTaskController,
  getTasksController,
} from "../../controllers/tasksController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const taskRoutes = Router();

taskRoutes.post("/add-task", authMiddleware, createTaskController);
taskRoutes.put("/update-task", authMiddleware, createTaskController);
taskRoutes.delete("/delete-task", authMiddleware, deleteTaskController);
taskRoutes.get("/get-tasks", authMiddleware, getTasksController);
taskRoutes.get("/filter-tasks", authMiddleware, getTasksController);

export default taskRoutes;
