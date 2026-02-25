import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectDB } from "./config/db.js";
import questionsRoute from "./routes/questions.js";
import interactionsRoute from "./routes/interactions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/questions", questionsRoute);
app.use("/api/interactions", interactionsRoute);

const PORT = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.warn("MongoDB not connected, API will run with limited fallback for questions.", error.message);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start();
