import {
  requestPasswordChange,
  updatePasswordService,
  verifyResetPasswordToken,
} from "../services/passwordService.js";

export const updatePassword = async (req, res) => {
  const userId = req.user.id;
  const passwordData = req.body;
  const { statusCode, result } = await updatePasswordService(
    userId,
    passwordData
  );
  return res.status(statusCode).json(result);
};

export const forgotPasswordResetToken = async (req, res) => {
  const { email } = req.body;
  const { statusCode, result } = await requestPasswordChange(email);
  return res.status(statusCode).json(result);
};

export const verifyResetPassword = async (req, res) => {
  const data = req.body;
  const { statusCode, result } = await verifyResetPasswordToken(data);
  return res.status(statusCode).json(result);
};
