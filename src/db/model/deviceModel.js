import { Schema, model } from "mongoose";

export default model(
  "Device",
  new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      deviceToken: { type: Schema.Types.String, default: "" },
    },
    {
      timestamps: true,
    }
  )
);
