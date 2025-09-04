import { updatePasswordService } from "../services/passwordService.js";

export const updatePassword = async (req, res) => {
  const userId = req.user.id;
  const passwordData = req.body;
  const { statusCode, result } = await updatePasswordService(
    userId,
    passwordData
  );
  return res.status(statusCode).json(result);
};
