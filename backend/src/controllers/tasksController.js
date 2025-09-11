import { addTaskService, deleteTaskService } from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  const task = req.body;
  const userId = req.user.id;
  const { statusCode, result } = await addTaskService(userId, task);
  return res.status(statusCode).json(result);
};

export const deleteTaskController = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.body.id;
  const { statusCode, result } = await deleteTaskService(userId, taskId);
  return res.status(statusCode).json(result);
};
