import { Router } from "express";
import { signUp } from "../controller/authController.js";

// import { AuthMiddleware } from "./Middleware/AuthMiddleware.js";
export let authRouter = Router();

// POST  Register Diyer
authRouter.route("/register").post([signUp]);
