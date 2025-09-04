import { prisma } from "../config/db.js";

export const updateUserPassword = async (userId, password) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password },
  });
};
