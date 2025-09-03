import { prisma } from "../config/db";

export const saveProfile = async (userId, profileData) => {
  await prisma.profile.upsert({
    where: { userId },
    update: profileData,
    create: { ...profileData, userId },
  });
};
