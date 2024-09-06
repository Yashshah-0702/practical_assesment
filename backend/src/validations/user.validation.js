const joi = require("joi");

const fileExtensionValidation = (value, helpers) => {
  const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
  const fileExtension = value.split(".").pop().toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return helpers.message(`File must be one of the following types: ${allowedExtensions.join(", ")}`);
  }
  return value;
};

const signUpSchema = joi.object({
  first_name: joi.string().trim().required().messages({
    "string.empty": "First name is required",
  }),
  last_name: joi.string().trim().required().messages({
    "string.empty": "Last name is required",
  }), 
  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
  }),
  birth_date: joi.date().required().less('now').messages({
    "date.base": "Birth date must be a valid date",
    "date.less": "Birth date cannot be in the future",
    "any.required": "Birth date is required"
  }),
  password: joi
    .string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=<>?]).{8,14}$/, "password")
    .required()
    .messages({
      "string.pattern.name":
        "Password must contain at least one capital letter, one special character, and be between 8 and 14 characters in length",
      "string.empty": "Password is required",
    }),
}).unknown(true);


module.exports = {
  signUpSchema,
};
