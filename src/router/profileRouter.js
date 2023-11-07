import { Router } from "express";
import { editProfile, getProfile } from "../controller/profileController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { checkBearer } from "../middleware/checkBearer.js";
import { handleMultipartData } from "../utils/multipart.js";

export let profileRouter = Router();

profileRouter
  .route("/edit-profile")
  .post([checkAuth, handleMultipartData.single("avatar"), editProfile]);

profileRouter.route("/get-profile").get([checkAuth, getProfile]);
