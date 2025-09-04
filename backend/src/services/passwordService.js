import { updateUserPassword } from "../repositories/passwordRepository.js";
import { getUserByEmail, getUserById } from "../repositories/userRepository.js";
import { updatePasswordSchema } from "../validations/passwordValidations.js";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./mail.service.js";

export const updatePasswordService = async (userId, passwordData) => {
  const validData = updatePasswordSchema.validate(passwordData);
  if (validData?.error)
    return {
      statusCode: 400,
      result: { code: 2, message: validData.error.details[0]["message"] },
    };
  if (validData.password !== validData.confirmPassword) {
    return {
      statusCode: 400,
      result: { code: 2, message: "Password mismatch" },
    };
  }
  const user = await getUserById(userId);
  if (!user) {
    return {
      statusCode: 403,
      result: { code: 2, message: "Invalid user id." },
    };
  }
  // Password change is not valid for google accounts
  if (user.provider && user.provider.toLowerCase() === "google") {
    return {
      statusCode: 400,
      result: {
        code: 2,
        message: "Google accounts cannot change password.",
      },
    };
  }
  const isMatch = await bcrypt.compare(passwordData.oldPassword, user.password);
  if (!isMatch)
    return {
      statusCode: 400,
      result: { code: 2, message: "Incorrect password" },
    };
  const isSame = await bcrypt.compare(passwordData.password, user.password);
  if (isSame)
    return {
      statusCode: 400,
      result: {
        code: 2,
        message: "Password is used already.",
      },
    };

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(passwordData.password, salt);
  try {
    const data = await updateUserPassword(userId, hashedPassword);
    return {
      statusCode: 200,
      result: { code: 1, message: "password changed successfully." },
    };
  } catch (error) {
    return {
      statusCode: 500,
      result: { code: 2, message: error.message || "Internal server error." },
    };
  }
};

export const requestPasswordChange = async (email) => {
  try {
    if (!email) {
      return {
        statusCode: 400,
        result: { code: 1, message: "Invalid email address" },
      };
    }
    // check if user exists
    const user = await getUserByEmail(email);
    if (!user)
      return {
        statusCode: 400,
        result: { code: 2, message: "Email not found" },
      };
    // send email to user with token to reset password
    await sendVerificationEmail()
  } catch (error) {
    return {
      statusCode: 500,
      result: { code: 2, message: error.message || "Internal server error." },
    };
  }
};
