import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    text: { type: String, required: true }
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    examBoard: {
      type: String,
      enum: ["CBSE 10th", "CBSE 12th"],
      required: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    questionText: {
      type: String,
      required: true
    },
    options: {
      type: [optionSchema],
      validate: {
        validator: (value) => value.length === 4,
        message: "Each question must have exactly 4 options"
      }
    },
    correctOptionId: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
