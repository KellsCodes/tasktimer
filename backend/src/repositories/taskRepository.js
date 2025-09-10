import { prisma } from "../config/db.js";

export const saveTask = async (task) => {
  const data = await prisma.tasks.upsert({
    where: { id: task.id ?? 0 },
    update: task,
    create: task,
  });

  return data;
};
