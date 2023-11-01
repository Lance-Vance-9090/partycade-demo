import { Schema, model } from "mongoose";

export default model(
  "EventCategory",
  new Schema(
    {
      name: { type: Schema.Types.String },
      isDeleted: { type: Schema.Types.Boolean, default: false },
      iconUrl: { type: Schema.Types.String },
      thumbnailUrl: { type: Schema.Types.String },
    },
    {
      timestamps: true,
    }
  )
);
