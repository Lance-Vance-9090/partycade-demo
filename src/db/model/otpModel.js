import { Schema, model } from "mongoose";

export default model(
  "Otp",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      otpKey: { type: Schema.Types.Number, required: true },
      expiry: { type: Schema.Types.Date, default: () => new Date(Date.now() + 10  * 60 * 1000), },
      isUsed: { type: Schema.Types.Boolean, default: false },
      reason :{type: Schema.Types.String, enum:["registration", "forget-password"]}
    },
    { timestamps: true }
  )
);
