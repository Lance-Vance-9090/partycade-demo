import otpModel from "../db/model/otpModel.js";
import userModel from "../db/model/userModel.js";
import CustomError from "../utils/Response/customError.js"
import customSuccess from "../utils/Response/customSuccess.js"
import { signUpValidator } from "../utils/validators/authValidator.js";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import { config } from "dotenv";

config();
export const signUp = async (req, res, next) => {
  try {
    const { error } = signUpValidator.validate(req.body);
    if (error) {
      error.details.map((err) => {
        return next(CustomError.createError(err.message, 200));
      });
    }
    const { name, email, password, country,  } =
    req.body;
    const userExist = await userModel.findOne ({
      email: email
    });
    if (userExist){
      return next(CustomError.createError("user already exist", 200));
    }
    const hashPassword = await bcrypt.hashSync(password, genSalt)
    const user = await userModel.create({
      name: name,
      email: email,
      country: country,
      password: hashPassword,
      userType : "Registered"
    })
    const otp = randomInt(100000, 999999);
    const optKey = await otpModel.create({
      userId: user._id,
      optKey: otp,
    
    }) 
    const emailData = emailForSignUp( otp, "registration" );
    if (emailData.error) {
      return next(CustomError.createError(emailData.message, 200));
    }
    if (!user) {
      return next(CustomError.createError("error registering user", 200));
    }

    
  } catch (error) {
    return next(CustomError.createError(error.message, 400))
  }
};
