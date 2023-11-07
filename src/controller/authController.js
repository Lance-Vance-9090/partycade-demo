import otpModel from "../db/model/otpModel.js";
import userModel from "../db/model/userModel.js";
import deviceModel from "../db/model/deviceModel.js";
import CustomError from "../utils/Response/CustomError.js";
import CustomSuccess from "../utils/Response/CustomSuccess.js";
import {
  signUpValidator,
  loginValidator,
  verifyOtpValidator,
  changePasswordValidator,
  resetPasswordValidator,
  socialLoginValidator,
} from "../utils/validators/authValidator.js";
import { hash, compare } from "bcrypt";
import { randomInt } from "crypto";
import ServerConfig from "../config/serverConfig.js";
import SocialConfig from "../config/socialConfig.js";
import { generateToken } from "../utils/generateToken.js";
import { emailForSignUp } from "../utils/emailTemplate.js";
import { sendEmail } from "../utils/sendEmail.js";
import { OAuth2Client } from "google-auth-library/build/src/index.js";

export const signUp = async (req, res, next) => {
  try {
    const { error } = signUpValidator.validate(req.body);
    if (error) {
      error.details.map((err) => {
        return next(CustomError.createError(err.message, 400));
      });
    }
    const { name, email, password } = req.body;
    const otp = randomInt(1000, 9999);
    const emailData = emailForSignUp(otp, "registration");
    const userExist = await userModel.findOne({
      email: email,
    });
    if (userExist && userExist.isVerified == false) {
      await otpModel.findOneAndUpdate(
        {
          userId: userExist._id,
          isUsed: false,
          reason: "registration",
        },
        {
          otpKey: otp,
          expiry: new Date(Date.now() + 10 * 60 * 1000),
        }
      );
      const verificationEmail = await sendEmail(
        email,
        "Verify your email address",
        emailData
      );
      if (verificationEmail) {
        return next(
          CustomSuccess.createSuccess(
            userExist,
            "User Registered successfully",
            200
          )
        );
      }
      return next(CustomError.createError("Otp not sent", 400));
    }
    if (userExist) {
      return next(CustomError.createError("user already exist", 200));
    }
    const hashPassword = await hash(password, ServerConfig.SALT);
    const user = await userModel.create({
      name: name,
      email: email,
      password: hashPassword,
      userType: "Registered",
    });

    await otpModel.create({
      userId: user._id,
      otpKey: otp,
      reason: "registration",
    });
    if (emailData.error) {
      return next(CustomError.createError(emailData.message, 200));
    }
    if (!user) {
      return next(CustomError.createError("error registering user", 400));
    }
    const verificationEmail = await sendEmail(
      email,
      "Verify your email address",
      emailData
    );
    if (verificationEmail) {
      return next(
        CustomSuccess.createSuccess(user, "User Registered successfully", 200)
      );
    }
    return next(CustomError.createError("Otp not sent", 400));
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
      return next(CustomError.createError("User not found", 404));
    }

    if (!user.isVerified) {
      return next(CustomError.createError("User is not verified", 404));
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

    user = await userModel
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

export const verifyOtp = async (req, res, next) => {
  try {
    const { userId, otpKey } = req.body;

    await verifyOtpValidator.validateAsync(req.body);

    const user = await userModel.findById(userId);

    if (!user) {
      return next(CustomError.createError("User not found", 404));
    }

    if (user.isVerified) {
      return next(CustomError.createError("User already verified", 400));
    }

    const otp = await otpModel
      .findOne({ userId, reason: "registration" })
      .select("otpKey expiry isUsed");

    if (otpKey !== otp.otpKey.toString()) {
      return next(CustomError.createError("invalid otp", 400));
    }

    if (otp.isUsed) {
      return next(CustomError.createError("Otp already used", 400));
    }

    if (!otp || new Date() > otp.expiry) {
      return next(CustomError.createError("Otp expired", 400));
    }

    await userModel.updateOne(
      { _id: user._id },
      {
        isVerified: true,
      }
    );

    await otpModel.updateOne({ _id: otp._id }, { isUsed: true });

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    return next(
      CustomSuccess.createSuccess(
        { token: token },
        "Otp verified successfully",
        200
      )
    );
  } catch (error) {
    console.log(error);
    return next(CustomError.createError(error.message, 500));
  }
};

export const resendOtp = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const user = await userModel.findById(userId);
    if (!user) {
      return next(CustomError.createError("user not found", 404));
    }
    const newOtp = randomInt(1000, 9999);
    await otpModel.findOneAndUpdate(
      {
        userId: userId,
        isUsed: false,
        reason: "registration",
      },
      {
        otpKey: newOtp,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
      }
    );
    const emailData = emailForSignUp(newOtp, "registration");
    const verificationEmail = await sendEmail(
      user.email,
      "Resend OTP for email verification",
      emailData
    );
    if (verificationEmail) {
      return next(
        CustomSuccess.createSuccess(user, "Otp Sent Successfully", 200)
      );
    }
    return next(CustomError.createError("Otp not sent", 400));
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const changePassword = async (req, res, next) => {
  try {
    await changePasswordValidator.validateAsync(req.body);
    const { oldPassword, newPassword } = req.body;
    const user = await userModel.findById(req.userId);
    if (!user) {
      return next(CustomError.createError("User Does not exist", 404));
    }
    const matchedpassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchedpassword) {
      return next(CustomError.createError("Old Password does not match", 400));
    }
    const password = await hash(newPassword, ServerConfig.SALT);
    await userModel.findByIdAndUpdate(req.userId, {
      password: password,
    });
    return next(
      CustomSuccess.createSuccess(user, "Password Changed Successfully", 200)
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(CustomError.createError("User Does not exist", 404));
    }
    const otp = randomInt(1000, 9999);
    await otpModel.create({
      userId: user._id,
      otpKey: otp,
      reason: "forget-password",
    });
    const emailData = emailForSignUp(otp, "forget-password");
    const verificationEmail = await sendEmail(
      email,
      "Verify your email address",
      emailData
    );
    if (verificationEmail) {
      return next(
        CustomSuccess.createSuccess(user, "Otp Sent Successfully", 200)
      );
    }
    return next(CustomError.createError("Otp not sent", 400));
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const verifyOtpForgetPassword = async (req, res, next) => {
  try {
    const { otpKey, userId } = req.body;
    const otp = await otpModel.findOne({
      userId: userId,
      reason: "forget-password",
    });
    const user = await userModel.findById(userId).select("email");
    if (!otp) {
      return next(CustomError.createError("Otp not found", 404));
    }
    if (otpKey !== otp.otpKey.toString()) {
      return next(CustomError.createError("Wrong OTP Entered", 400));
    }
    if (otp.isUsed) {
      return next(CustomError.createError("OTP already used", 400));
    }

    await otpModel.findByIdAndUpdate(otp._id, {
      isUsed: true,
    });
    const token = generateToken({
      id: userId,
      email: user.email,
    });

    return next(
      CustomSuccess.createSuccess(
        { token: token },
        "Otp verified Successfully",
        200
      )
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await resetPasswordValidator.validateAsync(req.body);
    const userId = req.userId;
    const { password } = req.body;
    const checkOtp = await otpModel.findOne({
      userId: userId,
      reason: "forget-password",
    });
    if (!checkOtp) {
      return next(CustomError.createError("otp not found", 404));
    }
    if (checkOtp.isUsed == false) {
      return next(CustomError.createError("otp not verified", 404));
    }
    const newPassword = await hash(password, ServerConfig.SALT);
    const user = await userModel.findByIdAndUpdate(userId, {
      password: newPassword,
    });

    return next(
      CustomSuccess.createSuccess(user, "Password reset Successfully", 200)
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const resendOtpForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return next(CustomError.createError("user does not exist", 404));
    }
    const otp = await otpModel.findOne({
      userId: user._id,
      reason: "forget-password",
    });
    if (!otp) {
      return next(CustomError.createError("Otp not found", 404));
    }
    if (otp.isUsed) {
      return next(CustomError.createError("otp is already used", 404));
    }
    const newOtp = randomInt(1000, 9999);
    const emailData = emailForSignUp(newOtp, "forget-password");
    const verificationEmail = await sendEmail(
      email,
      "Verify your email address",
      emailData
    );

    if (verificationEmail) {
      await otpModel.findByIdAndUpdate(otp._id, {
        otpKey: newOtp,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
      });
      return next(
        CustomSuccess.createSuccess(user, "Otp Sent Successfully", 200)
      );
    }
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};

export const socialLogin = async (req, res, next) => {
  const client = new OAuth2Client(SocialConfig.GOOGLE_CLIENT_ID);
  try {
    const { socialType, accessToken, deviceToken } = req.body;

    await socialLoginValidator.validateAsync(req.body);

    let googleOAuth = await client.verifyIdToken({
      idToken: accessToken,
      audience: SocialConfig.GOOGLE_CLIENT_ID,
    });

    googleOAuth = googleOAuth.getPayload();

    let user = await userModel.findOne({
      email: googleOAuth.email,
      socialType,
    });

    if (!user) {
      user = await userModel.create({
        name: googleOAuth.name,
        email: googleOAuth.email,
        password: "",
        socialType,
        isVerified: true,
        userType: "Registered",
      });

      const registerDevice = await deviceModel.create({
        deviceToken,
        userId: user._id,
      });

      user = await userModel.updateOne(
        { _id: user._id },
        {
          $push: { devices: registerDevice._id },
        }
      );
      return next(
        CustomSuccess.createSuccess(user, "User Signed up successfully", 200)
      );
    }

    const registerDevice = await deviceModel.create({
      deviceToken,
      userId: user._id,
    });

    user = await userModel.updateOne(
      { _id: user._id },
      {
        $push: { devices: registerDevice._id },
      }
    );

    return next(
      CustomSuccess.createSuccess(user, "User logged in successfully", 200)
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};
