import joi from "joi";

export const userSchema = joi.object({
  username: joi.string().min(3).max(12).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  confirm_password: joi.string().min(8).required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
