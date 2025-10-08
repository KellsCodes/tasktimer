import { prisma } from "../config/db.js";
import {
  deleteCloudProfileImage,
  removeImage,
} from "../services/imageService.js";

export const saveProfile = async (userId, profileData) => {
  // find existing profile
  const existingProfile = await prisma.profile.findUnique({
    where: { userId },
  });
  if (
    existingProfile &&
    existingProfile.profileImage &&
    profileData.profileImage
  ) {
    /** This is for deleting cloud profile image */
    await deleteCloudProfileImage(existingProfile?.profileImageCloudID);
    
    /** Use the block below for fs storage */
    // await removeImage(existingProfile.profileImage);
  } else if (!profileData.profileImage) {
    delete profileData.profileImage;
  }
  const data = await prisma.profile.upsert({
    where: { userId },
    update: profileData,
    create: { ...profileData, userId },
  });
  return data;
};

export const getUserProfile = async (userId) => {
  return await prisma.profile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          email: true,
          username: true,
        },
      },
    },
  });
};
