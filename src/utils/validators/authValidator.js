import joi from "joi";
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
});

export const loginValidator = joi.object({
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
  deviceToken: joi.string().required(),
});

export const verifyOtpValidator = joi.object({
  userId: joi.string().required(),
  otpKey: joi.string().required().length(4),
});

export const changePasswordValidator = joi.object({
  oldPassword: joi.string(),
  newPassword: joi
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
});

export const resetPasswordValidator = joi.object({
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
});
export const socialLoginValidator = joi.object({
  socialType: joi.string().required().valid("google", "apple"),
  deviceToken: joi.string().required(),
  accessToken: joi.string().required(),
});

export const guestLoginValidator = joi.object({
  deviceToken: joi.string().required(),
});
