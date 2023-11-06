export const signUpValidator = joi.object({
 name: joi.string().required(),
    email: joi.string().email().required().messages({
        "string.email": "Email must be a valid email",
      }),
      password: joi
      .string()
      .pattern(
        new RegExp(
          /(?=[A-Za-z0-9@#$%^&+!=?*_-]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=?*_-])(?=.{8,}).*$/
        )
      )
      .messages({
        "string.pattern.base":
          "Password length should be 8 .Must include 1 uppercase 1 lowercase 1 number and 1 special character(@#$%^&+!=?*_-)",
      })
      .required(),
    country: joi.string().required(),
  });
  