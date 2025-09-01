import { createUser, getUserByEmail } from "../repositories/userRepository.js";

import bcrypt from "bcrypt"

export const registerUser = async (userData) => {
  const { username, email, password } = userData;

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
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

  return newUser;
}
