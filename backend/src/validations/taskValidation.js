import Joi from "joi";

export const addTaskSchema = Joi.object({
  title: Joi.string().min(4).max(256).required(),
  startDate: Joi.date().required().messages({
    "date.format": "Start date must be in YYYY-MM-DD format",
  }),
  endDate: Joi.date().required().messages({
    "date.format": "end date must be in YYYY-MM-DD format",
  }),
  startHour: Joi.number().integer().min(0).max(23),
  endHour: Joi.number().integer().min(0).max(23),
  timeZone: Joi.string()
    .required()
    .custom((value, helpers) => {
      try {
        Intl.DateTimeFormat(undefined, { timeZone: value });
        return value;
      } catch (error) {
        return helpers.error("any.invalid");
      }
    })
    .messages({
      "any.invalid":
        "Invalid timezone. Use a valid IANA timezone (e.g., Asia/Tokyo, Africa/Lagos)",
    }),
});
