import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";
import {
  createToken,
  createUser,
  emailVerificationToken,
  getUserByEmail,
  logOutUser,
  refreshStoredToken,
} from "../repositories/userRepository.js";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendVerificationEmail } from "./mail.service.js";

export const registerUser = async (userData) => {
  const { username, email, password, confirm_password } = userData;
  if (password !== confirm_password)
    return {
      statusCode: 400,
      result: { code: 2, message: "Password mismatch" },
    };

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {
      statusCode: 400,
      result: { code: 2, message: "User already exists." },
    };
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create the user
  const newUser = await createUser({
    username,
    email,
    password: hashedPassword,
  });
  // Send email verification token
  const emailToken = await generateEmailToken(newUser.id);
  await sendVerificationEmail(newUser, emailToken.token);
  return {
    statusCode: 200,
    result: {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    },
  };
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return { code: 2, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { code: 2, message: "Invalid email or password" };
  // Send email verification token
  if (!user.verifiedAt) {
    const emailToken = await generateEmailToken(user.id);
    await sendVerificationEmail(user, emailToken.token);
    return { code: 3, message: `Email verifiction link sent to ${user.email}` };
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token in DB for invalidation support
  await createToken({
    data: {
      refreshToken: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    },
  });

  return {
    accessToken,
    refreshToken,
    user: { id: user.id, email: user.email, username: user.username, firstname: user?.profile?.firstname, lastname: user?.profile?.lastname, profileImage: user?.profile?.profileImage },
  };
};

export const generateEmailToken = async (userId) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expires in 1hr
  const data = await emailVerificationToken({
    token: verificationToken,
    expiresAt,
    userId,
  });
  return data;
};

export const userLogOut = async (refreshToken, user) => {
  try {
    if (!refreshToken) {
      return {
        result: { code: 2, message: "Invalid refreshToken" },
        statusCode: 400,
      };
    }
    // Delete the refreshToken
    return await logOutUser(refreshToken, user);
  } catch (error) {
    return {
      result: { code: 3, message: "Internal server error", error },
      statusCode: 500,
    };
  }
};

export const generateNewRefreshToken = async (token) => {
  if (!token) {
    return {
      statusCode: 400,
      result: { code: 2, message: "Refresh token is required" },
    };
  }
  try {
    const isRefreshTokenValid = verifyRefreshToken(token);
    if (isRefreshTokenValid) {
      const { statusCode, result } = await refreshStoredToken(token);

      return {
        statusCode,
        result,
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid refresh token." },
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return {
        statusCode: 400,
        result: { code: 2, message: "Refresh token expired." },
      };
    }
    return {
      statusCode: 400,
      result: { code: 2, message: "Invalid refresh token." },
    };
  }
};

export const getUserByEmailService = async (email) => {
	if (!email) return {statusCode: 400, result: {code: 2, message: "no record found"}}
	try {
	const user = await getUserByEmail(email)
	return {statusCode: 200, result: {code: 1, user: {id: user.id, email: user.email, username: user.username, firstname: user?.profile?.firstname || null, lastname: user?.profile?.lastname || null, profileImage: user?.profile?.profileImage || null}, message: "user found"}}
	} catch(err){
		return {statusCode: 400, result: {code: 2, message: "no record found"}}
	}
}
