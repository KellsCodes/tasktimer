import { generateAccessToken, generateRefreshToken } from "../config/jwt.js";
import {
  createToken,
  createUser,
  emailVerificationToken,
  getUserByEmail,
} from "../repositories/userRepository.js";

import bcrypt from "bcrypt";
import crypto from "crypto";

export const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { code: 2, message: "User already exists" };
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
  const emailToken = await generateEmailToken(newUser.id);
  // console.log({ emailToken });
  return { id: newUser.id, email: newUser.email, username: newUser.username };
};

export const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user) {
    return { code: 2, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { code: 2, message: "Invalid email or password" };
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
    user: { id: user.id, email: user.email, username: user.username },
  };
};

const generateEmailToken = async (userId) => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expires in 1hr
  const data = await emailVerificationToken({
    emailVerificationToken: verificationToken,
    expiresAt,
    userId,
  });
  return data;
};
