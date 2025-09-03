import { prisma } from "../config/db.js";

export const saveProfile = async (userId, profileData) => {
  const data = await prisma.profile.upsert({
    where: { userId },
    update: profileData,
    create: { ...profileData, userId },
  });
  return data;
};
