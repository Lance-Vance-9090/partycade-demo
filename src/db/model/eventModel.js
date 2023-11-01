import { Schema, model } from "mongoose";

export default model(
  "Event",
  new Schema(
    {
      categoryId: {
        type: Schema.Types.ObjectId,
        ref: "EventCategory",
        required: true,
      },
      hostId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      name: { type: Schema.Types.String },
      description: { type: Schema.Types.String },
      invitationCode: { type: Schema.Types.String },
      joinCode: { type: Schema.Types.String },
      status: {
        type: Schema.Types.String,
        enum: [
          "Scheduled",
          "Awaiting",
          "InProgress",
          "Completed",
          "Cancelled",
          "Expired",
        ],
      },
      cost: { type: Schema.Types.Number },
    },
    {
      timestamps: true,
    }
  )
);
