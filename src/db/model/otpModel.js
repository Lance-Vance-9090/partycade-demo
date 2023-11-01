import { Schema, model } from "mongoose";

export default model(
  "Otp",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      otpKey: { type: Schema.Types.Number, required: true },
      expiry: { type: Schema.Types.Date },
      isUsed: { type: Schema.Types.Boolean, default: false },
    },
    { timestamps: true }
  )
);
