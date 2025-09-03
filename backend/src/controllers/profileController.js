import { saveUserProfile } from "../services/profileService.js";

export const saveUserProfileController = async (req, res) => {
  const profileData = req.body;
  const userId = req.user.id;
  const file = req.file;
  const { statusCode, result } = await saveUserProfile(
    userId,
    profileData,
    file
  );
  return res.status(statusCode).json(result);
};
