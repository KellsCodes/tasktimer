import { prisma } from "../config/db.js";

export const saveTask = async (task) => {
  const data = await prisma.tasks.upsert({
    where: { id: task.id ?? 0 },
    update: task,
    create: task,
  });

  return data;
};

export const getSingleTask = async (id, userId) => {
  const data = await prisma.tasks.findFirst({
    where: { id, userId },
  });
  if (!data) return 0;
  return data;
};

export const deleteTask = async (taskId, userId) => {
  const data = await getSingleTask(taskId, userId);
  if (data === 0) return 0;
  if (data.status === 3) return 1;
  const res = await prisma.tasks.delete({
    where: { id: taskId, userId },
  });
  return res;
};

export const getTasks = async (userId) => {
  return await prisma.tasks.findMany({
    where: { userId },
  });
};
