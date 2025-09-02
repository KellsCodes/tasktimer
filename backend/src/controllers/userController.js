import { verifyEmail } from "../repositories/userRepository.js";
import {
  loginUser,
  registerUser,
  userLogOut,
} from "../services/userService.js";

import { loginSchema, userSchema } from "../validations/userValidations.js";

export const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Register the user
    const newUser = await registerUser(req.body);
    res.status(201).json({
      code: 1,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ code: 2, message: error.details[0].message });
    }

    const { email, password } = req.body;
    const user = await loginUser(email, password);
    if (user.code === 2) {
      return res
        .status(401)
        .json({ code: 2, message: "Invalid email or password" });
    }
    if (user.code === 3) {
      return res.status(201).json({ code: 3, message: user.message });
    }
    res.status(200).json({
      code: 1,
      message: "Login successful",
      user: user.user,
      accesToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  } catch (error) {
    res.status(500).json({ code: 2, message: error.message });
  }
};

export const emailVerification = async (req, res) => {
  const token = req.body;
  const response = await verifyEmail(token);
  if (response.code === 1) {
    return res.status(200).json({ ...response });
  } else if (response.code === 2) {
    return res.status(400).json({ ...response });
  }
  return res.status(500).json({ ...response });
};

export const logOut = async (req, res) => {
  // return req.body
  const { refreshToken } = req.body;
  const { statusCode, result } = await userLogOut(refreshToken);
  return res.status(statusCode).json(result);
};
