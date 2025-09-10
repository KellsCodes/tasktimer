import { addTaskService } from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  const task = req.body;
  const userId = req.user.id;
  const { statusCode, result } = await addTaskService(userId, task);
  return res.status(statusCode).json(result);
};
