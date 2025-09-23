import { prisma } from "../config/db.js";
import { DateTime } from "luxon";

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

export const getTasks = async (
  userId,
  page = 1,
  pageSize = 10,
  search,
  status,
  startDate,
  endDate
) => {
  if (isNaN(page)) page = 1;
  if (isNaN(pageSize)) pageSize = 10;
  const skip = (page - 1) * pageSize;
  const take = pageSize;
  const start = startDate
    ? DateTime.fromISO(startDate).startOf("day").toJSDate()
    : null;
  const end = endDate
    ? DateTime.fromISO(endDate).endOf("day").toJSDate()
    : null;
    // console.log({start, end})
  const where = {
    userId,
    ...(search
      ? {
          title: {
            contains: search.toLowerCase(),
          },
        }
      : {}),
    ...(!isNaN(status) && status >= 1 && status <= 4 ? { status } : {}),
    ...(start || end
      ? {
          AND: [
            ...(end ? [{ startAt: { lte: end } }] : []),
            ...(start ? [{ endAt: { gte: start } }] : []),
          ],
        }
      : {}),
  };
  const [data, totalTasks] = await Promise.all([
    prisma.tasks.findMany({
      where,
      skip,
      take,
      orderBy: {
        startAt: "asc",
      },
    }),
    prisma.tasks.count({ where }),
  ]);
  if (!data) return 0;
  const totalPages = Math.ceil(totalTasks / pageSize);
  return {
    data,
    currentPage: page,
    pageLimit: pageSize,
    totalTasks,
    totalPages,
  };
};
