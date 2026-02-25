import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL
});

const fallback = {
  boards: ["CBSE 10th", "CBSE 12th"],
  subjects: ["Biology", "Mathematics", "Physics", "Science"],
  questions: [
    {
      _id: "fallback-1",
      examBoard: "CBSE 10th",
      subject: "Mathematics",
      questionText: "If x² - 5x + 6 = 0, what are the roots?",
      options: [
        { id: "A", text: "1 and 6" },
        { id: "B", text: "2 and 3" },
        { id: "C", text: "-2 and -3" },
        { id: "D", text: "0 and 6" }
      ],
      correctOptionId: "B"
    }
  ]
};

export const fetchMeta = async () => {
  try {
    const { data } = await api.get("/questions/meta");
    return data;
  } catch (_error) {
    return { boards: fallback.boards, subjects: fallback.subjects };
  }
};

export const fetchQuestions = async (board, subject) => {
  try {
    const { data } = await api.get("/questions", { params: { board, subject } });
    return data;
  } catch (_error) {
    return fallback.questions.filter((q) => q.examBoard === board && q.subject === subject);
  }
};

export const reactToQuestion = async (questionId, type) => {
  const { data } = await api.post(`/interactions/${questionId}/react`, { type });
  return data;
};

export const addComment = async (questionId, text) => {
  const { data } = await api.post(`/interactions/${questionId}/comment`, { text });
  return data;
};
