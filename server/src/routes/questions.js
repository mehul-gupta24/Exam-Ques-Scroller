import express from "express";
import { Question } from "../models/Question.js";
import { sampleQuestions } from "../data/sampleQuestions.js";

const router = express.Router();

router.get("/meta", async (_req, res) => {
  try {
    const boards = ["CBSE 10th", "CBSE 12th"];
    const subjects = await Question.distinct("subject");
    res.json({ boards, subjects: subjects.sort() });
  } catch (_error) {
    const subjects = [...new Set(sampleQuestions.map((q) => q.subject))].sort();
    res.json({ boards: ["CBSE 10th", "CBSE 12th"], subjects });
  }
});

router.get("/", async (req, res) => {
  const { board, subject } = req.query;

  const filter = {};
  if (board) filter.examBoard = board;
  if (subject) filter.subject = subject;

  try {
    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.json(questions);
  } catch (_error) {
    const filtered = sampleQuestions.filter(
      (q) => (!board || q.examBoard === board) && (!subject || q.subject === subject)
    );
    res.json(filtered);
  }
});

export default router;
