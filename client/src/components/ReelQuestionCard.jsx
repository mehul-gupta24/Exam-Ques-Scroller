import { useMemo, useState } from "react";

export default function ReelQuestionCard({ question, index, total, onNext, onPrev, onReact, onComment }) {
  const [selected, setSelected] = useState("");
  const [comment, setComment] = useState("");

  const isCorrect = useMemo(() => selected && selected === question.correctOptionId, [selected, question.correctOptionId]);

  const submitComment = () => {
    if (!comment.trim()) return;
    onComment(comment.trim());
    setComment("");
  };

  return (
    <article className="reel-card">
      <span className="counter">Question {index + 1} / {total}</span>
      <h2>{question.subject}</h2>
      <p className="question">{question.questionText}</p>

      <div className="options-grid">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`option ${selected === option.id ? "selected" : ""}`}
            onClick={() => setSelected(option.id)}
          >
            <strong>{option.id}.</strong> {option.text}
          </button>
        ))}
      </div>

      {selected && <p className={isCorrect ? "result correct" : "result wrong"}>{isCorrect ? "Correct answer!" : `Incorrect. Correct option is ${question.correctOptionId}.`}</p>}

      <div className="social-actions">
        <button type="button" onClick={() => onReact("like")}>👍 Like</button>
        <button type="button" onClick={() => onReact("dislike")}>👎 Dislike</button>
        <button type="button" onClick={() => onReact("share")}>🔗 Share</button>
      </div>

      <div className="comment-box">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment"
          maxLength={300}
        />
        <button type="button" onClick={submitComment}>Post</button>
      </div>

      <div className="nav-actions">
        <button type="button" onClick={onPrev} disabled={index === 0}>Previous</button>
        <button type="button" onClick={onNext} disabled={index === total - 1}>Next</button>
      </div>
    </article>
  );
}
