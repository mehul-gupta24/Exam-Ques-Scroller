import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true, maxlength: 300 },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const interactionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
      unique: true
    },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    comments: { type: [commentSchema], default: [] }
  },
  { timestamps: true }
);

export const Interaction = mongoose.model("Interaction", interactionSchema);
