import { Schema, model } from "mongoose";

export default model(
  "gameTemplate",
  new Schema(
    {
      name: { type: Schema.Types.String },
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
      isEditable: { type: Schema.Types.Boolean, default: true },
      autoEvaluate: { type: Schema.Types.Boolean, default: true },
      randomize: { type: Schema.Types.Boolean, default: true },
      isDeleted: { type: Schema.Types.Boolean, default: false },
    },
    {
      timestamps: true,
    }
  )
);
