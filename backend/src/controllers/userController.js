import { registerUser } from "../services/userService.js";


import { userSchema } from "../validations/userValidations.js";

export const register = async (req, res) => {
  try {
    // Validate request body
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Register the user
    const newUser = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};