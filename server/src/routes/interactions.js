import express from "express";
import { Interaction } from "../models/Interaction.js";

const router = express.Router();

router.get("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const interaction = await Interaction.findOne({ questionId });
  if (!interaction) {
    return res.json({ likes: 0, dislikes: 0, shares: 0, comments: [] });
  }
  return res.json(interaction);
});

router.post("/:questionId/react", async (req, res) => {
  const { questionId } = req.params;
  const { type } = req.body;

  if (!["like", "dislike", "share"].includes(type)) {
    return res.status(400).json({ message: "Invalid reaction type" });
  }

  const field = type === "like" ? "likes" : type === "dislike" ? "dislikes" : "shares";
  const interaction = await Interaction.findOneAndUpdate(
    { questionId },
    { $inc: { [field]: 1 } },
    { upsert: true, new: true }
  );

  return res.json(interaction);
});

router.post("/:questionId/comment", async (req, res) => {
  const { questionId } = req.params;
  const { text } = req.body;

  if (!text?.trim()) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  const interaction = await Interaction.findOneAndUpdate(
    { questionId },
    { $push: { comments: { text: text.trim() } } },
    { upsert: true, new: true }
  );

  return res.json(interaction);
});

export default router;
