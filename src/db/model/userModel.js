import { Schema, model } from "mongoose";

export default model(
  "User",
  new Schema(
    {
      name: { type: Schema.Types.String },
      email: { type: Schema.Types.String, unique: true, required: true },
      password: { type: Schema.Types.String },
      country: { type: Schema.Types.String },
      isVerified: { type: Schema.Types.Boolean, default: false },
      isDeleted: { type: Schema.Types.Boolean, default: false },
      userType: { type: Schema.Types.String, enum: ["Guest", "Registered"] },
      socialType: {
        type: Schema.Types.String,
        enum: ["google", "apple", ""],
        default: "",
      },
      devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
      avatarUrl: { type: Schema.Types.String, default: null },
      coins: { type: Schema.Types.Number, default: 150 },
      coinsSpent: { type: Schema.Types.Number, default: 0 },
    },
    {
      timestamps: true,
    }
  )
);
