// Librarys
import cors from "cors";
import express from "express";
import morgan from "morgan";
import morganBody from "morgan-body";

import path from "path";
import { fileURLToPath } from "url";

// Response Handler
// import { ResHandler } from "./Utils/ResponseHandler/ResHandler.js";
import { authRouter } from "./src/router/authRouter.js";

// import {ChatRouter} from "./Router/chatRouter.js";

export const filename = fileURLToPath(import.meta.url);
export const dirname = path.dirname(filename);

export let app = express();

const API_PreFix = "/api/v1";
const Auth_PreFix = "/auth";

app.use("/public/uploads", express.static("./public/uploads"));

var corsOptions = {
  origin: "*",
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(morgan("dev"));

morganBody(app, {
  prettify: true,
  logReqUserAgent: true,
  logReqDateTime: true,
});

// try {
//   Ffmpeg.setFfmpegPath(ffempgPath.path);
//   Ffmpeg.setFfprobePath(ffprobePath.path);
// } catch (error) {
//   console.log("Some error occured on ffempg");
// }
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to Party-Cade" });
});

// Root Routes
app.use(API_PreFix + Auth_PreFix, authRouter);
// app.use(API_PreFix + Preference_PreFix, PreferenceRouter);
// app.use(API_PreFix + Work_PreFix, WorkRouter);
// app.use(API_PreFix + Product_PreFix, ProductRouter);
// app.use(API_PreFix + Diyer_PreFix + Profile_PreFix, DiyerProfileRouter);
// app.use(API_PreFix + Diyer_PreFix, FollowRouter);
// app.use(API_PreFix + Diyer_PreFix + Story_PreFix, StoryRouter);
// app.use(API_PreFix + Diyer_PreFix + Reel_PreFix, ReelRouter);
// app.use(API_PreFix + Diyer_PreFix + Block_PreFix, BlockRouter);
// app.use(API_PreFix + Diyer_PreFix + Post_Prefix, PostRouter);
// app.use(API_PreFix + Diyer_PreFix + Session_Prefix, SessionsRouter);
// app.use(API_PreFix + Diyer_PreFix + Payment_Prefix, PaymentRouter);
// app.use(API_PreFix + Admin_Prefix, AdminRouter);

// app.use(API_PreFix + Diyer_PreFix + Chat_Prefix , ChatRouter);

// app.use(ResHandler);
