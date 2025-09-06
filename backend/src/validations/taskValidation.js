import Joi from "joi";

export const addTaskSchema = Joi.object({
  title: Joi.string().min(4).max(256).required(),
  
  oldPassword: Joi.string().min(8).max(25).required(),
  password: Joi.string()
    .min(8)
    .max(25)
    .disallow(Joi.ref("oldPassword"))
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .message("Password must include upper, lower, and number"),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match new password",
  }),
});
