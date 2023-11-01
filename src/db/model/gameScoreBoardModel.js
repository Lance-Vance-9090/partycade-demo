import { Schema, model } from "mongoose";

export default model(
  "GameScoreBoard",
  new Schema(
    {
      gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      userRank: { type: Schema.Types.Number },
      userScore: { type: Schema.Types.Number },
      total: { type: Schema.Types.Number },
    },
    {
      timestamps: true,
    }
  )
);
