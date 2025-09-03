import { saveProfile } from "../repositories/profileRepository.js";

export const saveUserProfile = async (req, res) => {
  const profileData = req.body;
  const userId = req.user.id;
  const profile = await saveProfile(userId, profileData);
  return res.json({ code: 1, message: "profile created", data: profile });
};
