import {
  savePasswordResetToken,
  updatePasswordResetToken,
  updateUserPassword,
} from "../repositories/passwordRepository.js";
import { getUserByEmail, getUserById } from "../repositories/userRepository.js";
import { updatePasswordSchema } from "../validations/passwordValidations.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendResetPasswordEmail } from "./mail.service.js";
// import { sendVerificationEmail } from "./mail.service.js";

export const updatePasswordService = async (userId, passwordData) => {
  const validData = updatePasswordSchema.validate(passwordData);
  if (validData?.error) {
    return {
      statusCode: 400,
      result: { code: 2, message: validData.error.details[0]["message"] },
    };
  }
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
    await updateUserPassword(userId, hashedPassword);
    return {
      statusCode: 200,
      result: { code: 1, message: "Password changed successfully." },
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
        result: { code: 1, message: "Email address is empty." },
      };
    }
    // check if user exists
    const user = await getUserByEmail(email);
    if (!user)
      return {
        statusCode: 403,
        result: { code: 2, message: "Invalid email address" },
      };
    // send email to user with token to reset password
    const emailToken = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expires in 1hr
    await savePasswordResetToken({
      token: emailToken,
      expiresAt,
      userId: user.id,
    });
    await sendResetPasswordEmail(user, emailToken);
    return {
      statusCode: 200,
      result: { code: 1, message: `Password reset link sent to ${email}` },
    };
  } catch (error) {
    return {
      statusCode: 500,
      result: { code: 2, message: error.message || "Internal server error." },
    };
  }
};

export const verifyResetPasswordToken = async (passwordData) => {
  const { token } = passwordData;
  if (!token)
    return {
      statusCode: 400,
      result: { code: 2, mesaage: "Token is required." },
    };
  try {
    const data = await updatePasswordResetToken(token);
    if (data === 0)
      return {
        statusCode: 400,
        result: { code: 2, message: "Token not found" },
      };
    if (data === 1)
      return {
        statusCode: 400,
        result: { code: 2, message: "Token is invalid." },
      };

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordData.password, salt);
    await updateUserPassword(data.userId, hashedPassword);
    return {
      statusCode: 200,
      result: { code: 1, message: "Password changed successfully." },
    };
  } catch (error) {
    return {
      statusCode: 500,
      result: {
        code: 2,
        message: error.message || "Internal server error.",
      },
    };
  }
};
