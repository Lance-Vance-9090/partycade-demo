import otpModel from "../db/model/otpModel.js";
import userModel from "../db/model/userModel.js";
import CustomError from "../utils/Response/customError.js";
import CustomSuccess from "../utils/Response/customSuccess.js";
import { signUpValidator } from "../utils/validators/authValidator.js";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import ServerConfig from "../config/serverConfig.js";
import { sendEmail } from "../utils/sendEmail.js";
import { emailForSignUp } from "../utils/emailTemplate.js";

export const signUp = async (req, res, next) => {
  try {
    const { error } = signUpValidator.validate(req.body);
    if (error) {
      error.details.map((err) => {
        return next(CustomError.createError(err.message, 200));
      });
    }
    const { name, email, password } = req.body;
    const userExist = await userModel.findOne({
      email: email,
    });
    if (userExist) {
      return next(CustomError.createError("user already exist", 200));
    }
    const hashPassword = await bcrypt.hash(password, ServerConfig.SALT);
    const user = await userModel.create({
      name: name,
      email: email,

      password: hashPassword,
      userType: "Registered",
    });
    const otp = randomInt(1000, 9999);
    console.log(otp);
    await otpModel.create({
      userId: user._id,
      otpKey: otp,
    });
    const emailData = emailForSignUp(otp, "registration");
    if (emailData.error) {
      return next(CustomError.createError(emailData.message, 200));
    }
    if (!user) {
      return next(CustomError.createError("error registering user", 400));
    }
    const emailSent = await sendEmail(
      email,
      "Verify your email address",
      emailData
    );
    console.log(emailSent);
    if (emailSent) {
      return next(
        CustomSuccess.createSuccess(user, "Verification code sent", 200)
      );
    }
    return next(CustomError.createError("OTP not sent", 400));
  } catch (error) {
    return next(CustomError.createError(error.message, 400));
  }
};
