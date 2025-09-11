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
