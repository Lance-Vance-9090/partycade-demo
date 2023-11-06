import otpModel from "../db/model/otpModel.js";
import userModel from "../db/model/userModel.js";
import deviceModel from "../db/model/deviceModel.js";
import CustomError from "../utils/Response/CustomError.js";
import CustomSuccess from "../utils/Response/CustomSuccess.js";
import {
  signUpValidator,
  loginValidator,
} from "../utils/validators/authValidator.js";
import { hash, compare } from "bcrypt";
import { randomInt } from "crypto";
import { ServerConfig } from "../config/serverConfig.js";
import { generateToken } from "../utils/generateToken.js";

export const signUp = async (req, res, next) => {
  try {
    const { error } = signUpValidator.validate(req.body);
    if (error) {
      error.details.map((err) => {
        return next(CustomError.createError(err.message, 200));
      });
    }
    const { name, email, password, country } = req.body;
    const userExist = await userModel.findOne({
      email: email,
    });
    if (userExist) {
      return next(CustomError.createError("user already exist", 200));
    }
    const hashPassword = await hash(password, ServerConfig.SALT_VAL);
    const user = await userModel.create({
      name: name,
      email: email,
      country: country,
      password: hashPassword,
      userType: "Registered",
    });
    const otp = randomInt(100000, 999999);
    const optKey = await otpModel.create({
      userId: user._id,
      optKey: otp,
    });
    const emailData = emailForSignUp(otp, "registration");
    if (emailData.error) {
      return next(CustomError.createError(emailData.message, 200));
    }
    if (!user) {
      return next(CustomError.createError("error registering user", 200));
    }
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, deviceToken } = req.body;

    await loginValidator.validateAsync(req.body);

    let user = await userModel.findOne({ email });

    if (!user) {
      return CustomError.createError("User not found", 404);
    }

    if (!user.isVerified) {
      return CustomError.createError("User is not verified", 404);
    }

    if (!compare(password, user.password)) {
      return next(
        CustomError.createError("Your Email or Password is incorrect", 400)
      );
    }

    const registerDevice = await new deviceModel({
      deviceToken,
      userId: user._id,
    }).save();

    user = userModel
      .findByIdAndUpdate(
        user._id,
        {
          $push: { devices: registerDevice._id },
        },
        { new: true }
      )
      .select("email isVerified");

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    return next(
      CustomSuccess.createSuccess(
        {
          user: user,
          token: token,
        },
        "User logged in successfully",
        200
      )
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};
