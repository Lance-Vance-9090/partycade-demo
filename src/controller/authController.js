import { Router } from "express";
import {

  RegisterDiyer,

} from "../Controller/DiyerAuthController.js";
// import {
//   handleMultipartData,
//   handleMultipartDataForBoth,
// } from "../Utils/MultipartData.js";
import { AuthMiddleware } from "./Middleware/AuthMiddleware.js";
export let DiyerAuthRouter = Router();

// POST  Register Diyer
DiyerAuthRouter.route("/register").post([RegisterDiyer]);
// Account Verification
// DiyerAuthRouter.route("/accountVerification").post([DiyerAccountVerification]);
// // Login
// DiyerAuthRouter.route("/login").post([LoginDiyer]);
// // Resemd OTP for Account Verification
// DiyerAuthRouter.route("/resendOtpForAccountVerification").post([
//   ResendOtpForAccountVerification,
// ]);
// DiyerAuthRouter.route("/resendOtpForForgetPassword").post([
//   ResendOtpForForgetPassword,
// ]);
// // Add Profile details
// DiyerAuthRouter.route("/addProfileDetails").post([
//   AuthMiddleware,
//   handleMultipartData.single("image"),
//   AddProfileDetails,
// ]);
// // Forget Password
// DiyerAuthRouter.route("/forgetPassword").post([ForgetPasswordDiyer]);
// DiyerAuthRouter.route("/verifyOtp").post([VerifyOtpDiyer]);
// DiyerAuthRouter.route("/resetPassword").post([ResetPasswordDiyer]);

// // Socail Signup/Login

// DiyerAuthRouter.route("/social").post([SocialRegisterDiyer]);

// DiyerAuthRouter.route("/helpAndFeedBack").post([
//   AuthMiddleware,
//   handleMultipartDataForBoth.fields([{ name: "image", maxCount: 6 }]),
//   SubmitHelpAndFeedBack,
// ]);

// DiyerAuthRouter.route("/changePassword").post([AuthMiddleware, ChangePassword]);
// DiyerAuthRouter.route("/logout").post([AuthMiddleware, Logout]);
