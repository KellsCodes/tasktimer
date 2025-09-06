import { addTaskService } from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  const task = req.body;
  const { statusCode, result } = await addTaskService(task);
  return res.status(statusCode).json(result);
};
