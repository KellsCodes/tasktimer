import { loginUser, registerUser } from "../services/userService.js";

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
    const { id, email: useremail, username } = user;
    res.status(200).json({
      code: 1,
      message: "Login successful",
      user: { id, email: useremail, username },
    });
  } catch (error) {
    res.status(500).json({ code: 2, message: error.message });
  }
};
