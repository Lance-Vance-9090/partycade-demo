import { Schema, model } from "mongoose";

import { Schema, model } from "mongoose";

export default model(
  "GameSubmission",
  new Schema(
    {
      gameId: { type: Schema.Types.ObjectId, ref: "Game" },
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      //   submission : json
      type: {
        type: Schema.Types.String,
        enum: ["Normal", "Timeout", "DisconnectedTimeOut", "Partial"],
      },
    },

    {
      timestamps: true,
    }
  )
);
