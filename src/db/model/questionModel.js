import { Schema, model } from "mongoose";

export default model(
  "Question",
  new Schema(
    {
      question: { type: Schema.Types.String },
      answer: { type: Schema.Types.String },
      points: { type: Schema.Types.Number },
    },
    { timestamps: true }
  )
);
