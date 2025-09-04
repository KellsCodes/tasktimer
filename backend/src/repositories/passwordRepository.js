import { prisma } from "../config/db.js";

export const updateUserPassword = async (userId, password) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { password },
  });
};

export const savePasswordResetToken = async (data) => {
  return await prisma.resetPasswordToken.create({
    data: { ...data },
  });
};

export const updatePasswordResetToken = async (token) => {
  // verify token exists and check if used or expired
  const isTokenValid = await prisma.resetPasswordToken.findUnique({
    where: { token },
  });
  if (!isTokenValid) return 0;
  if (isTokenValid.isUsed || isTokenValid.expiresAt < new Date()) return 1;
  return await prisma.resetPasswordToken.update({
    where: { token },
    data: {
      isUsed: true,
      expiresAt: new Date(),
    },
  });
};
