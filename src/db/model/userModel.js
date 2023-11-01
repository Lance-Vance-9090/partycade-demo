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
      devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],

      //publicId, credId, socialId
    },
    {
      timestamps: true,
    }
  )
);
