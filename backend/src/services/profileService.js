import {
  getUserProfile,
  saveProfile,
} from "../repositories/profileRepository.js";
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
      profileImage: profileImagePath?.profileImage || null,
      profileImageCloudID: profileImagePath?.profileImageCloudID || null,
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
    if (profileImagePath && fs.existsSync(profileImagePath)) {
      fs.unlinkSync(profileImagePath);
    }
    return { statusCode: 500, result: { code: 2, message: error.message } };
  }
};

export const getProfileService = async (userId) => {
  try {
    const profile = await getUserProfile(userId);
    if (profile) {
      return {
        statusCode: 200,
        result: { code: 1, message: "user profile found", profile },
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: "user profile not found" },
    };
  } catch (error) {
    return { statusCode: 500, result: { code: 3, message: error.message } };
  }
};
