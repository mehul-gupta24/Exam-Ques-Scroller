import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Question } from "../models/Question.js";
import { sampleQuestions } from "./sampleQuestions.js";

dotenv.config();

const seed = async () => {
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  console.log("Seeded sample questions");
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
