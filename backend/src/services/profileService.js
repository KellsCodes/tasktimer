import { saveProfile } from "../repositories/profileRepository.js";
import { processImage } from "./imageService.js";
import fs from "fs";

export const saveUserProfile = async (userId, profileData, file) => {
  let profileImagePath = null;

  try {
    if (file) {
      profileImagePath = await processImage(file, userId);
    }

    // save file in a DB
    const profile = await saveProfile(userId, {
      ...profileData,
      profileImage: profileImagePath,
    });

    return {
      statusCode: 200,
      result: {
        code: 1,
        message: "Profile saved successfully.",
        data: profile,
      },
    };
  } catch (error) {
    console.log("Errrrrrr....", error)
    if (profileImagePath && fs.existsSync(profileImagePath)) {
      fs.unlinkSync(profileImagePath);
    }
    console.error("Profile update error: ", error);
    return { statusCode: 500, result: { code: 2, message: error.message } };
  }
};
