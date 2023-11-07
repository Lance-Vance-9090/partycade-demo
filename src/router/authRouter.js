import { Router } from "express";
import {
  signUp,
  login,
  verifyOtp,
  resendOtp,
  changePassword,
  forgetPassword,
  verifyOtpForgetPassword,
  resetPassword,
  resendOtpForgetPassword,
  socialLogin,
  loginAsGuest,
  verifyToken,
} from "../controller/authController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { checkBearer } from "../middleware/checkBearer.js";
import { handleMultipartData } from "../utils/multipart.js";

export let authRouter = Router();

authRouter.route("/register").post([checkBearer, signUp]);
authRouter.route("/login").post([checkBearer, login]);
authRouter.route("/verify-otp").post([checkBearer, verifyOtp]);
authRouter.route("/resend-otp").post([checkBearer, resendOtp]);
authRouter.route("/change-password").post([checkAuth, changePassword]);
authRouter.route("/forget-password").post([checkBearer, forgetPassword]);
authRouter
  .route("/verify-otp-forgetPassword")
  .post([checkBearer, verifyOtpForgetPassword]);

authRouter.route("/reset-password").post([checkAuth, resetPassword]);
authRouter
  .route("/resend-otp-forget-password")
  .post([checkBearer, resendOtpForgetPassword]);
authRouter.route("/social-login").post([checkBearer, socialLogin]);
authRouter.route("/guest-login").post([checkBearer, loginAsGuest]);
authRouter.route("/verify-token").post([checkBearer, verifyToken]);
