import { useEffect, useState } from "react";
import { addComment, fetchMeta, fetchQuestions, reactToQuestion } from "./api/examApi";
import ExamSelector from "./components/ExamSelector";
import ReelQuestionCard from "./components/ReelQuestionCard";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [board, setBoard] = useState("");
  const [subject, setSubject] = useState("");

  const [amount, setAmount] = useState(20);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    fetchMeta().then((data) => {
      setBoards(data.boards || []);
      setSubjects(data.subjects || []);
    });
  }, []);

  const start = async () => {
    const data = await fetchQuestions(board, subject, amount);
    // const data = await fetchQuestions(board, subject);
    setQuestions(data);
    setCurrent(0);
    setStarted(true);
  };

  const currentQuestion = questions[current];

  return (
    <main className="app-shell">
      {!started ? (
        <ExamSelector
          boards={boards}
          subjects={subjects}
          board={board}
          subject={subject}
          amount={amount}
          onBoardChange={setBoard}
          onSubjectChange={setSubject}
          onAmountChange={(value) => setAmount(Math.max(10, Math.min(50, Number(value) || 20)))}
          onStart={start}
        />
      ) : currentQuestion ? (
        <ReelQuestionCard
          question={currentQuestion}
          index={current}
          total={questions.length}
          onNext={() => setCurrent((c) => Math.min(c + 1, questions.length - 1))}
          onPrev={() => setCurrent((c) => Math.max(c - 1, 0))}
          onReact={(type) => reactToQuestion(currentQuestion._id, type).catch(() => {})}
          onComment={(text) => addComment(currentQuestion._id, text).catch(() => {})}
        />
      ) : (
        <section className="selector-card">
          <h1>No questions found</h1>
          <p>Try another board or subject.</p>
          <button type="button" onClick={() => setStarted(false)}>
            Back
          </button>
          <button type="button" onClick={() => setStarted(false)}>Back</button>
        </section>
      )}
    </main>
  );
}
