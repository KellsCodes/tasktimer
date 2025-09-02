import { prisma } from "../config/db.js";

export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData,
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const createToken = async (tokenData) => {
  return await prisma.refreshToken.create({
    ...tokenData,
  });
};

export const emailVerificationToken = async (tokenData) => {
  return await prisma.emailVerificationToken.create({
    data: { ...tokenData },
  });
};

export const verifyEmail = async ({ token }) => {
  try {
    if (!token || typeof token !== "string") {
      return { code: 2, message: "Invalid or missing token." };
    }

    const tokenRecord = await prisma.emailVerificationToken.findUnique({
      where: { token },
    });

    if (!tokenRecord) {
      return { code: 2, message: "Invalid or missing token." };
    }

    if (tokenRecord.isUsed) {
      return { code: 2, message: "Token already used." };
    }

    if (new Date() > tokenRecord.expiresAt) {
      return { code: 2, message: "Token expired" };
    }

    // check if user was verified before
    const user = await getUserById(tokenRecord.userId);
    if (user && user.verifiedAt)
      return { code: 2, message: "User is already verified" };

    return await prisma.$transaction(async (tx) => {
      await tx.emailVerificationToken.update({
        where: { token },
        data: { isUsed: true, expiresAt: new Date() },
      });
      await tx.user.update({
        where: { id: tokenRecord.userId },
        data: { verifiedAt: new Date() },
      });
      return { code: 1, message: "Email successfully verified" };
    });
  } catch (error) {
    return { code: 0, message: "Internal server error", error };
  }
};

export const logOutUser = async (refreshToken) => {
  const token = await prisma.refreshToken.findUnique({
    where: { refreshToken },
  });
  if (!token) {
    return {
      result: { code: 2, message: "Invalid refreshToken" },
      statusCode: 403,
    };
  }
  await prisma.refreshToken.update({
    where: { refreshToken },
    data: { revoked: true },
  });
  return {
    result: { code: 1, message: "Logged out successfully" },
    statusCode: 200,
  };
};
