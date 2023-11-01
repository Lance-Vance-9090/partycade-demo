import { Schema, model } from "mongoose";

export default model(
  "Game",
  new Schema(
    {
      eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
      //templateId: { type: Schema.Types.ObjectId },
      name: { type: Schema.Types.String },
      howToPlay: { type: Schema.Types.String },
      time: { type: Schema.Types.Number, default: 20 }, //in minutes
      status: {
        type: Schema.Types.String,
        enum: ["Scheduled", "Open", "InProgress", "Completed", "Cancelled"],
      },
      participantsLimit: { type: Schema.Types.Number, default: 20 },
      participantsCount: { type: Schema.Types.Number, default: 0 },
      questionId: [{ type: Schema.Types.ObjectId, ref: "Question" }],
      totalQuestions: { type: Schema.Types.Number },
      gameType: {
        type: Schema.Types.String,
        enum: [
          "MultipleChoice",
          "TrueFalse",
          "FillIntheBlank",
          "PointBased",
          "Matching",
        ],
      },
      winner: { type: Schema.Types.ObjectId, ref: "User" },
      //   scoreBoard: { type: Schema.Types.ObjectId, ref: "GameScoreBoard" },
    },
    {
      timestamps: true,
    }
  )
);
